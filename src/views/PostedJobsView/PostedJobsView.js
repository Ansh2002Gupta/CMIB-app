import React, { useContext, useState } from "react";
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
import { SideBarContext } from "../../globalContext/sidebar/sidebarProvider";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";

const PostedJobsView = () => {
  const intl = useIntl();
  const [sideBarState] = useContext(SideBarContext);
  const { selectedModule } = sideBarState;
  const onViewPress = (item) => {
    navigate(
      `/${selectedModule.key}/${navigations.POSTED_JOBS}/${item.id}?mode=view&activeTab=0`
    );
  };
  const onEditPress = (item) => {
    navigate(
      `/${selectedModule.key}/${navigations.POSTED_JOBS}/${item.id}?mode=edit&activeTab=0`
    );
  };

  const {
    allDataLoaded,
    currentRecords,
    currentPage,
    customFilterInfo,
    defaultCategory,
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
    headingTexts,
    indexOfFirstRecord,
    indexOfLastRecord,
    isHeading,
    isTicketListingLoading,
    isFirstPageReceived,
    getErrorDetails,
    isError,
    loadingMore,
    onIconPress,
    queryTypeData,
    rowsPerPage,
    setCurrentRecords,
    setFilterState,
    statusData,
    statusText,
    subHeadingText,
    tableIcon,
    postedJobData,
    totalcards,
  } = usePostedJobListing(onViewPress, onEditPress);

  const navigate = useNavigate();

  const handleTicketModal = () => {
    navigate(navigations.ADD_NEW_JOBS);
  };

  const getMobileView = (item, index) => {
    return (
      <MobileCard
        item={item}
        getStatusStyle={getStatusStyle}
        lastElement={postedJobData.length - 1 === index}
        statusData={statusData}
        onEditPress={onEditPress}
        onViewPress={onViewPress}
      />
    );
  };

  return (
    <TwoRow
      topSection={
        <IconHeader
          actionButtonIcon={images.iconAddWhite}
          buttonTitle={intl.formatMessage({ id: "label.add_new_jobs" })}
          customActionButtonStyle={styles.addNewButton}
          customActionButtonText={styles.addNewText}
          hasActionButton
          handleButtonClick={handleTicketModal}
          headerText={intl.formatMessage({ id: "label.posted_job" })}
        />
      }
      isBottomFillSpace
      bottomSection={
        <>
          {!isError && (
            <CustomTable
              {...{
                customFilterInfo,
                allDataLoaded,
                currentPage,
                currentRecords,
                data: postedJobData,
                defaultCategory,
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
                selectedFilterOptions: filterState,
                setSelectedFilterOptions: setFilterState,
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
              ThirdSection={<DownloadMoreComponent onPress={() => {}} />}
            />
          )}
          {isError && !!getErrorDetails()?.errorMessage && (
            <ErrorComponent
              errorMsg={getErrorDetails()?.errorMessage}
              onRetry={() => getErrorDetails()?.onRetry()}
            />
          )}
        </>
      }
    />
  );
};

export default PostedJobsView;
