import React, { useRef, useState } from "react";
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
import { CHANGE_APPLICANT_STATUS } from "../../../services/apiServices/apiEndPoint";
import ScheduleInterviewModal from "../../ScheduleInterviewModal/ScheduleInterviewModal";
import useChangeApplicantStatusApi from "../../../services/apiServices/hooks/useChangeApplicantStatusApi";
const ViewJobApplicants = ({ id }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {
    handleUseApplicantStatus,
    isLoading,
    isError: isErrorApplicantStatusChange,
    errorWhileApplicantStatusChange,
  } = useChangeApplicantStatusApi();
  const activeUserId = useRef();

  const navigate = useNavigate();
  const onEditPress = (selectedItem, item) => {
    if (JOB_STATUS_RESPONSE_CODE[selectedItem]) {
      const request = {
        status: JOB_STATUS_RESPONSE_CODE[selectedItem],
      };
      handleUseApplicantStatus(item.id, request);
      getAllRecords();
    } else {
      activeUserId.current = item.id;
      setIsModalVisible(true);
      // navigate(navigations.VIEW_JOB_DETAILS, { state: { questionaireData } });
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
  } = useGetApplicantList(id, onEditPress);

  const getMobileView = (item, index) => {
    return (
      <RenderMobileItem
        lastElement={applicantListingData.length - 1 === index}
        item={item}
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
      {isModalVisible && (
        <ScheduleInterviewModal
          applicant_id={activeUserId.current}
          onClose={() => {
            setIsModalVisible(false);
            activeUserId.current = null;
          }}
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
