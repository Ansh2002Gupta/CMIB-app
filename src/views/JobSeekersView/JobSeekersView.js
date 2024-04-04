import React, { useRef, useState } from "react";
import { Platform } from "@unthinkable/react-core-components";
import { useIntl } from "react-intl";
import { TwoRow } from "../../core/layouts";

import CustomTable from "../../components/CustomTable";
import IconHeader from "../../components/IconHeader/IconHeader";
import useJobSeekersListing from "./controllers/useJobSeekersListing";
import useOutsideClick from "../../hooks/useOutsideClick";
import {
  UNITS,
  ROWS_PER_PAGE_ARRAY as rowsLimit,
  JOBS_SEEKERS_TABLE_HEADING as tableHeading,
} from "../../constants/constants";
import images from "../../images";

const isIos = Platform.OS.toLowerCase() === "ios";

const JobSeekersView = () => {
  const {
    allDataLoaded,
    currentRecords,
    currentPage,
    customFilterInfo,
    filterApplyHandler,
    filterCategory,
    filterState,
    getColoumConfigs,
    getStatusStyle,
    handleLoadMore,
    handlePageChange,
    handleRowPerPageChange,
    handleSearchResults,
    handleSaveAddTicket,
    indexOfFirstRecord,
    indexOfLastRecord,
    isHeading,
    isAppliedJobsListingLoading,
    fetchDataAppliedJobs,
    isFirstPageReceived,
    loadingMore,
    onIconPress,
    popUpMessage,
    rowsPerPage,
    setCurrentRecords,
    defaultCategory,
    appliedJobsData,
    totalcards,
    showJobOfferResponseModal,
    setShowJobOfferResponseModal,
    showInterviewTimeModal,
    setShowInterviewTimeModal,
    handleAcceptRejectOffer,
    confirmationModal,
    setConfirmationModal,
    modalData,
    isLoading,
    setIsLoading,
    showPopUpWithID,
    setModalData,
    setShowPopUpWithID,
    handleConfirmation,
    toastMsg,
    setToastMsg,
    isPatching,
    isPatchingSuccess,
    isPatchingError,
    setFilterState,
  } = useJobSeekersListing();

  const intl = useIntl();
  const modalRef = useRef(null);
  useOutsideClick(modalRef, () => {
    setShowJobOfferResponseModal(false);
    setShowInterviewTimeModal(false);
  });

  return (
    <TwoRow
      topSection={
        <IconHeader
          headerText={intl.formatMessage({ id: "label.job_seekers" })}
        />
      }
      isBottomFillSpace
      bottomSection={
        <>
          <CustomTable
            {...{
              selectedFilterOptions: filterState,
              setSelectedFilterOptions: setFilterState,
              allDataLoaded,
              currentPage,
              currentRecords,
              customFilterInfo,
              data: appliedJobsData,
              filterApplyHandler,
              filterCategory,
              getColoumConfigs,
              getStatusStyle,
              handleLoadMore,
              handlePageChange,
              handleRowPerPageChange,
              handleSearchResults,
              handleSaveAddTicket,
              headingTexts: ["designation"],
              indexOfFirstRecord,
              indexOfLastRecord,
              isHeading,
              isAppliedJobsListingLoading,
              isFirstPageReceived,
              loadingMore,
              onIconPress,
              rowsLimit,
              rowsPerPage,
              setCurrentRecords,
              defaultCategory,
              statusText: ["active"],
              isStatusTextBoolean: true,
              statusLabels: ["Inactive", "Active"],
              subHeadingText: ["status"],
              tableHeading,
              tableIcon: images.iconMore,
              totalcards,
              placeholder: intl.formatMessage({
                id: "label.search_applied_jobs",
              }),
              showJobOfferResponseModal,
              setShowJobOfferResponseModal,
              showInterviewTimeModal,
              setShowInterviewTimeModal,
              modalData,
              isLoading,
              setIsLoading,
              showPopUpWithID,
              popUpMessage,
              setModalData,
              setShowPopUpWithID,
              isTicketListingLoading: isAppliedJobsListingLoading,
              unit: UNITS.YRS,
            }}
          />
        </>
      }
    />
  );
};

export default JobSeekersView;
