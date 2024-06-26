import { View } from "@unthinkable/react-core-components";
import React, { useRef, useState } from "react";
import { useTheme } from "@unthinkable/react-theme";
import MobileCard from "../../PostedJobs/MobileCard";
import CustomTable from "../../../components/CustomTable";
import DownloadMoreComponent from "../../PostedJobs/DownloadMoreComponent";
import {
  ROWS_PER_PAGE_ARRAY as rowsLimit,
  SCHEDULE_LISTING as tableHeading,
} from "../../../constants/constants";
import { useIntl } from "react-intl";
import useGetScheduleList from "../../../views/ViewPostedJobDetails/controller/useGetScheduleList";
import ErrorComponent from "../../../components/ErrorComponent/ErrorComponent";
import ViewInterviewDetails from "../../ViewInterviewDetails";
import ScheduleInterviewModal from "../../ScheduleInterviewModal/ScheduleInterviewModal";
import RenderMobileItem from "../component/RenderMobileItem/RenderMobileItem";
import ToastComponent from "../../../components/ToastComponent/ToastComponent";
import getStyles from "./ViewScheduleInterview.styles";

const ViewScheduleInterview = ({ id }) => {
  const [isModalVisible, setIsModalVisible] = useState(null);
  const selectedApplicant = useRef(null);
  const applicantId = useRef(null);
  const intl = useIntl();
  const theme = useTheme();
  const styles = getStyles(theme);

  const onClickAction = (selectedItem, item) => {
    applicantId.current = item.application_id;
    selectedApplicant.current = item.interview_id;
    setIsModalVisible(selectedItem);
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
    scheduleInterviewData,
    totalcards,
    initialFilterState,
    errorWhileApplicantStatusChange,
    setErrorWhileApplicantStatusChange,
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
        <View style={styles.flex1}>
          <CustomTable
            {...{
              allDataLoaded,
              currentPage,
              currentRecords,
              customFilterInfo,
              data: scheduleInterviewData,
              defaultCategory,
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
              selectedFilterOptions: filterState,
              setSelectedFilterOptions: setFilterState,
              setCurrentRecords,
              statusData,
              statusText,
              subHeadingText,
              tableIcon,
              totalcards,
              initialFilterState,
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
        </View>
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
              selectedApplicant.current = null;
              applicantId.current = null;
            }}
            applicant_id={applicantId.current}
            interviewId={selectedApplicant.current}
          />
        )}
      {isError && !!getErrorDetails()?.errorMessage && (
        <ErrorComponent
          errorMsg={getErrorDetails()?.errorMessage}
          onRetry={() => getErrorDetails()?.onRetry()}
        />
      )}
      {!!errorWhileApplicantStatusChange && (
        <View style={styles.zIndex2}>
          <ToastComponent
            toastMessage={errorWhileApplicantStatusChange}
            onDismiss={() => {
              setErrorWhileApplicantStatusChange(null);
            }}
          />
        </View>
      )}
    </>
  );
};
export default ViewScheduleInterview;
