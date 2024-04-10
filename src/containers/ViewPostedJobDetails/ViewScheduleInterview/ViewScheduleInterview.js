import { View } from "@unthinkable/react-core-components";
import React, { useRef, useState } from "react";
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
import ErrorComponent from "../../../components/ErrorComponent/ErrorComponent";
import ViewInterviewDetails from "../../ViewInterviewDetails";
import ScheduleInterviewModal from "../../ScheduleInterviewModal/ScheduleInterviewModal";
import RenderMobileItem from "../component/RenderMobileItem/RenderMobileItem";

const ViewScheduleInterview = ({ id }) => {
  const [isModalVisible, setIsModalVisible] = useState(null);
  const selectedApplicant = useRef(null);
  const intl = useIntl();

  const onClickAction = (selectedItem, item) => {
    selectedApplicant.current = item.id;
    setIsModalVisible(selectedItem);
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
    isError,
    loadingMore,
    onIconPress,
    queryTypeData,
    rowsPerPage,
    setCurrentRecords,
    statusData,
    statusText,
    subHeadingText,
    tableIcon,
    scheduleInterviewData,
    totalcards,
  } = useGetScheduleList(id, onClickAction);

  const getMobileView = (item, index) => {
    return (
      <RenderMobileItem
        lastElement={scheduleInterviewData.length - 1 === index}
        item={item}
        onPress={onClickAction}
      />
    );
  };

  return (
    <>
      {!isError && (
        <CustomTable
          {...{
            allDataLoaded,
            currentPage,
            currentRecords,
            data: scheduleInterviewData,
            filterApplyHandler,
            filterCategory,
            getColoumConfigs,
            getStatusStyle,
            handleLoadMore,
            getErrorDetails,
            tableHeading,
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
      )}
      {isModalVisible &&
        isModalVisible ===
          intl.formatMessage({ id: "label.view_interview_details" }) && (
          <ViewInterviewDetails
            onClose={() => {
              setIsModalVisible(null);
            }}
            applicant_id={selectedApplicant.current}
          />
        )}
      {isModalVisible &&
        isModalVisible ===
          intl.formatMessage({ id: "label.edit_interview_details" }) && (
          <ScheduleInterviewModal
            onClose={() => {
              setIsModalVisible(null);
            }}
            applicant_id={selectedApplicant.current}
            interviewId={selectedApplicant.current}
          />
        )}
      {isError && !!getErrorDetails()?.errorMessage && (
        <ErrorComponent
          errorMsg={getErrorDetails()?.errorMessage}
          onRetry={() => getErrorDetails()?.onRetry()}
        />
      )}
    </>
  );
};
export default ViewScheduleInterview;
