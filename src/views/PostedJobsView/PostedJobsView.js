import React, { useState } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "../../routes";
import { TwoRow } from "../../core/layouts";

import CustomTable from "../../components/CustomTable";
import IconHeader from "../../components/IconHeader/IconHeader";
import { navigations } from "../../constants/routeNames";
import {
  ROWS_PER_PAGE_ARRAY as rowsLimit,
  POSTED_JOB_LISTING as tableHeading,
} from "../../constants/constants";
import images from "../../images";
import styles from "./PostedJobsView.styles";
import usePostedJobListing from "./controller/usePostedJobListing";
import MobileCard from "../../containers/PostedJobs/MobileCard";
import DownloadMoreComponent from "../../containers/PostedJobs/DownloadMoreComponent";

const PostedJobsView = () => {
  const intl = useIntl();
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
    queryTypeData,
    rowsPerPage,
    setCurrentRecords,
    statusData,
    statusText,
    subHeadingText,
    tableIcon,
    postedJobData,
    totalcards,
  } = usePostedJobListing();

  const navigate = useNavigate();

  const handleTicketModal = () => {
    // setAddNewTicket((prev) => !prev);
  };

  const onGoBack = () => {
    navigate(navigations.PROFILE);
  };
  const getMobileView = (item, index) => {
    return (
      <MobileCard
        item={item}
        getStatusStyle={getStatusStyle}
        tableIcon={tableIcon}
        lastElement={postedJobData.length - 1 === index}
        statusData={statusData}
      />
    );
  };

  return (
    <TwoRow
      topSection={
        <IconHeader
          actionButtonIcon={images.iconAddWhite}
          buttonTitle={intl.formatMessage({ id: "label.add" })}
          customActionButtonStyle={styles.addNewButton}
          customActionButtonText={styles.addNewText}
          hasActionButton
          handleButtonClick={handleTicketModal}
          headerText={intl.formatMessage({ id: "label.posted_job" })}
          onPressLeftIcon={onGoBack}
        />
      }
      isBottomFillSpace
      bottomSection={
        <CustomTable
          {...{
            allDataLoaded,
            currentPage,
            currentRecords,
            data: postedJobData,
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
            queryTypeData,
            rowsLimit,
            rowsPerPage,
            setCurrentRecords,
            statusData,
            statusText,
            subHeadingText,
            tableHeading,
            tableIcon,
            totalcards,
            placeholder: intl.formatMessage({
              id: "label.search_by_designation",
            }),
          }}
          mobileComponentToRender={getMobileView}
          containerStyle={styles.customTableStyle}
          isTotalCardVisible={false}
          ThirdSection={
            <DownloadMoreComponent
              onPress={() => {
                console.log("HI I AM pressed");
              }}
            />
          }
        />
      }
    />
  );
};

export default PostedJobsView;
