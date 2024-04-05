import React from "react";
import styles from "./ViewJobApplicants.styles";
import { useIntl } from "react-intl";
import CustomTable from "../../../components/CustomTable";
import DownloadMoreComponent from "../../PostedJobs/DownloadMoreComponent";
import useGetApplicantList from "../../../views/ViewPostedJobDetails/controller/useGetApplicantList";
import {
  ROWS_PER_PAGE_ARRAY as rowsLimit,
  APPLICANT_LISTING as tableHeading,
} from "../../../constants/constants";
import RenderMobileItem from "../component/RenderMobileItem/RenderMobileItem";
const ViewJobApplicants = ({ id }) => {
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
  } = useGetApplicantList(id);

  const getMobileView = (item, index) => {
    return (
      <RenderMobileItem
        lastElement={postedJobData.length - 1 === index}
        item={item}
      />
    );
  };

  return (
    <CustomTable
      {...{
        allDataLoaded,
        currentPage,
        currentRecords,
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
        tableHeading,
        tableIcon,
        totalcards,
        placeholder: intl.formatMessage({
          id: "label.search_by_applicant_name",
        }),
      }}
      mobileComponentToRender={getMobileView}
      isFilterVisible={false}
      containerStyle={styles.innerContainerStyle}
      isTotalCardVisible={false}
      data={postedJobData}
      ThirdSection={<DownloadMoreComponent onPress={() => {}} />}
    />
  );
};
export default ViewJobApplicants;
