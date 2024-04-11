import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./ViewJobApplicants.styles";
import { useIntl } from "react-intl";
import CustomTable from "../../../components/CustomTable";
import DownloadMoreComponent from "../../PostedJobs/DownloadMoreComponent";
import useGetApplicantList from "../../../views/ViewPostedJobDetails/controller/useGetApplicantList";
import {
  JOB_STATUS_RESPONSE_CODE,
  ROWS_PER_PAGE_ARRAY as rowsLimit,
  APPLICANT_LISTING as tableHeading,
} from "../../../constants/constants";
import RenderMobileItem from "../component/RenderMobileItem/RenderMobileItem";
import { useNavigate } from "../../../routes";
import { navigations } from "../../../constants/routeNames";
import ErrorComponent from "../../../components/ErrorComponent/ErrorComponent";
import Http from "../../../services/http-service";
import {
  CHANGE_APPLICANT_STATUS,
  JOBS,
} from "../../../services/apiServices/apiEndPoint";
import ScheduleInterviewModal from "../../ScheduleInterviewModal/ScheduleInterviewModal";
import useChangeApplicantStatusApi from "../../../services/apiServices/hooks/useChangeApplicantStatusApi";
import ViewInterviewDetails from "../../ViewInterviewDetails";
import { SideBarContext } from "../../../globalContext/sidebar/sidebarProvider";
const ViewJobApplicants = ({ id }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {
    handleUseApplicantStatus,
    isLoading,
    isSuccess,
    isError: isErrorApplicantStatusChange,
    errorWhileApplicantStatusChange,
  } = useChangeApplicantStatusApi();
  const activeUserId = useRef();
  useEffect(() => {
    if (isSuccess) {
      getAllRecords();
    }
  }, [isSuccess]);

  const navigate = useNavigate();
  const [sideBarState] = useContext(SideBarContext);
  const { selectedModule } = sideBarState;
  const onClick = (selectedItem, item) => {
    if (JOB_STATUS_RESPONSE_CODE[selectedItem]) {
      const request = {
        status: JOB_STATUS_RESPONSE_CODE[selectedItem],
      };
      handleUseApplicantStatus(item.id, request);
    } else if (selectedItem === "View Details") {
      navigate(
        `/${selectedModule.key}/${navigations.JOBS}/${id}/applicant-details/${item.user_id}`
      );
    } else {
      activeUserId.current = item.interview_id;
      setIsModalVisible(selectedItem);
    }
  };

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
    applicantListingData,
    totalcards,
    getAllRecords,
  } = useGetApplicantList(id, onClick);

  const getMobileView = (item, index) => {
    return (
      <RenderMobileItem
        lastElement={applicantListingData.length - 1 === index}
        item={item}
        onPress={onClick}
      />
    );
  };

  return (
    <>
      {!isError && !isErrorApplicantStatusChange && (
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
            handlePageChange,
            handleRowPerPageChange,
            handleSearchResults,
            handleSaveAddTicket,
            headingTexts,
            indexOfFirstRecord,
            indexOfLastRecord,
            isHeading,
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
          isTicketListingLoading={isTicketListingLoading || isLoading}
          mobileComponentToRender={getMobileView}
          isFilterVisible={false}
          containerStyle={styles.innerContainerStyle}
          isTotalCardVisible={false}
          data={applicantListingData}
          ThirdSection={<DownloadMoreComponent onPress={() => {}} />}
        />
      )}
      {isModalVisible &&
        isModalVisible ===
          intl.formatMessage({ id: "label.schedule_interview" }) && (
          <ScheduleInterviewModal
            applicant_id={activeUserId.current}
            onClose={() => {
              setIsModalVisible(null);
              activeUserId.current = null;
            }}
          />
        )}
      {isModalVisible &&
        isModalVisible ===
          intl.formatMessage({ id: "label.view_interview_details" }) && (
          <ViewInterviewDetails
            onClose={() => {
              setIsModalVisible(null);
              activeUserId.current = null;
            }}
            applicant_id={activeUserId.current}
          />
        )}
      {(isError || isErrorApplicantStatusChange) &&
        (!!getErrorDetails()?.errorMessage ||
          errorWhileApplicantStatusChange) && (
          <ErrorComponent
            errorMsg={
              getErrorDetails()?.errorMessage || errorWhileApplicantStatusChange
            }
            onRetry={() => getErrorDetails()?.onRetry()}
          />
        )}
    </>
  );
};
export default ViewJobApplicants;
