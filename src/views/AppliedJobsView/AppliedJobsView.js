import React, { useState } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "../../routes";
import { TwoRow } from "../../core/layouts";

import CustomTable from "../../components/CustomTable";
import IconHeader from "../../components/IconHeader/IconHeader";
import useAppliedJobsListing from "./controllers/useAppliedJobsListing";
import { navigations } from "../../constants/routeNames";
import {
  ROWS_PER_PAGE_ARRAY as rowsLimit,
  APPLIED_JOBS_TABLE_HEADING as tableHeading,
} from "../../constants/constants";
import images from "../../images";
import styles from "./AppliedJobsView.style";
import PopupMessage from "../../components/PopupMessage/PopupMessage";

const AppliedJobsView = () => {
  const {
    allDataLoaded,
    currentRecords,
    currentPage,
    filterApplyHandler,
    filterCategory,
    getColoumConfigs,
    getStatusStyle,
    handleLoadMore,
    handlePageChange,
    handleRowPerPageChange,
    handleSearchResults,
    handleSaveAddTicket,
    headingTexts,
    indexOfFirstRecord,
    indexOfLastRecord,
    isHeading,
    isTicketListingLoading,
    isFirstPageReceived,
    loadingMore,
    onIconPress,
    popUpMessage,
    rowsPerPage,
    setCurrentRecords,
    showPopup,
    defaultCategory,
    statusData,
    workModeData,
    jobTypeData,
    experienceData,
    locationData,
    educationData,
    salaryData,
    departmentData,
    freshnessData,
    companyData,
    industryData,
    statusText,
    subHeadingText,
    tableIcon,
    ticketListingData,
    totalcards,
  } = useAppliedJobsListing();

  const intl = useIntl();
  const navigate = useNavigate();
  const [addNewTicket, setAddNewTicket] = useState(false);

  const handleTicketModal = () => {
    setAddNewTicket((prev) => !prev);
  };

  const onGoBack = () => {
    navigate(navigations.PROFILE);
  };

  return (
    <TwoRow
      topSection={
        <IconHeader
          handleButtonClick={handleTicketModal}
          headerText={intl.formatMessage({ id: "label.applied_jobs" })}
        />
      }
      isBottomFillSpace
      bottomSection={
        <>
          <CustomTable
            {...{
              addNewTicket,
              allDataLoaded,
              currentPage,
              currentRecords,
              data: ticketListingData,
              filterApplyHandler,
              filterCategory,
              getColoumConfigs,
              getStatusStyle,
              handleTicketModal,
              handleLoadMore,
              handlePageChange,
              handleRowPerPageChange,
              handleSearchResults,
              handleSaveAddTicket,
              headingTexts,
              indexOfFirstRecord,
              indexOfLastRecord,
              isHeading,
              isTicketListingLoading,
              isFirstPageReceived,
              loadingMore,
              onIconPress,
              rowsLimit,
              rowsPerPage,
              setCurrentRecords,
              defaultCategory,
              statusData,
              workModeData,
              jobTypeData,
              experienceData,
              locationData,
              educationData,
              salaryData,
              departmentData,
              freshnessData,
              companyData,
              industryData,
              statusText,
              subHeadingText,
              tableHeading,
              tableIcon,
              totalcards,
              placeholder: intl.formatMessage({
                id: "label.search_applied_jobs",
              }),
            }}
          />
        </>
      }
    />
  );
};

export default AppliedJobsView;
