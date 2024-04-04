import { View } from "@unthinkable/react-core-components";
import React from "react";
import styles from "./ViewJobApplicants.styles";
import { useIntl } from "react-intl";
import usePostedJobListing from "../../../views/PostedJobsView/controller/usePostedJobListing";
import { useNavigate } from "../../../routes";
import MobileCard from "../../PostedJobs/MobileCard";
import { TwoRow } from "../../../core/layouts";
import IconHeader from "../../../components/IconHeader/IconHeader";
import CustomTable from "../../../components/CustomTable";
import DownloadMoreComponent from "../../PostedJobs/DownloadMoreComponent";
import images from "../../../images";
import useGetApplicantList from "../../../views/ViewPostedJobDetails/controller/useGetApplicantList";
import PopupMessage from "../../../components/PopupMessage/PopupMessage";
import TouchableImage from "../../../components/TouchableImage";
import {
  ROWS_PER_PAGE_ARRAY as rowsLimit,
  APPLICANT_LISTING as tableHeading,
} from "../../../constants/constants";
const ViewJobApplicants = () => {
  const intl = useIntl();
  const onEditPress = (item) => {
    //   navigate(navigations.EDIT_JOB, {
    //     state: item,
    //   });
  };
  const onViewPress = (item) => {
    //   navigate(navigations.DETAILS_JOBS, {
    //     state: item,
    //   });
  };
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
    rowsLimit,
  } = useGetApplicantList();

  const navigate = useNavigate();

  const handleTicketModal = () => {
    // navigate(navigations.ADD_NEW_JOBS);
  };

  const getMobileView = (item, index) => {
    return (
      <View />
      // <MobileCard
      //   item={item}
      //   getStatusStyle={getStatusStyle}
      //   lastElement={postedJobData.length - 1 === index}
      //   statusData={statusData}
      //   onEditPress={onEditPress}
      //   onViewPress={onViewPress}
      // />
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
        handleTicketModal,
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
          id: "label.search_by_designation",
        }),
      }}
      mobileComponentToRender={getMobileView}
      containerStyle={styles.customTableStyle}
      isTotalCardVisible={false}
      data={postedJobData}
      ThirdSection={
        <DownloadMoreComponent
          onPress={() => {
            console.log("HI I AM pressed");
          }}
        />
      }
    />
  );
};
export default ViewJobApplicants;
