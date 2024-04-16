import { View } from "@unthinkable/react-core-components";
import React from "react";
import MobileCard from "../../PostedJobs/MobileCard";
import CustomTable from "../../../components/CustomTable";
import DownloadMoreComponent from "../../PostedJobs/DownloadMoreComponent";
import {
  ROWS_PER_PAGE_ARRAY as rowsLimit,
  SCHEDULE_LISTING as tableHeading,
} from "../../../constants/constants";
import styles from "./ViewScheduleInterview.styles";
import { useIntl } from "react-intl";
import useGetScheduleList from "../../../views/ViewPostedJobDetails/controller/useGetScheduleList";

const ViewScheduleInterview = ({ id }) => {
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
    getErrorDetails,
    isErrorGetPostedJob,
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
  } = useGetScheduleList(id);

  const getMobileView = (item, index) => {
    return (
      <MobileCard
        item={item}
        getStatusStyle={getStatusStyle}
        lastElement={postedJobData.length - 1 === index}
        statusData={statusData ? statusData : []}
        onEditPress={() => {}}
        onViewPress={() => {}}
      />
    );
  };

  return (
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
        handleLoadMore,
        getErrorDetails,
        tableHeading,
        isErrorGetPostedJob,
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
        tableIcon,
        totalcards,
        placeholder: intl.formatMessage({
          id: "label.search_by_applicant_name",
        }),
      }}
      mobileComponentToRender={getMobileView}
      containerStyle={styles.customTableStyle}
      isTotalCardVisible={false}
      ThirdSection={<DownloadMoreComponent onPress={() => {}} />}
      renderCalendar={true}
    />
  );
};
export default ViewScheduleInterview;
