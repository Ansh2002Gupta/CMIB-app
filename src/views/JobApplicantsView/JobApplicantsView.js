import React from "react";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";

import { TwoRow } from "../../core/layouts";

import Chip from "../../components/Chip";
import CommonText from "../../components/CommonText";
import CustomTable from "../../components/CustomTable";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import PopupMessage from "../../components/PopupMessage/PopupMessage";
import IconHeader from "../../components/IconHeader/IconHeader";
import TouchableImage from "../../components/TouchableImage";
import ScheduleInterviewModal from "../../containers/ScheduleInterviewModal/ScheduleInterviewModal";
import ViewInterviewDetails from "../../containers/ViewInterviewDetails";
import useIsWebView from "../../hooks/useIsWebView";
import useJobApplicants from "./controllers/useJobApplicantsView";
import {
  JOB_APPLICANTS_HEADING,
  ROWS_PER_PAGE_ARRAY,
} from "../../constants/constants";
import styles from "./JobApplicantsView.style";
import ToastComponent from "../../components/ToastComponent/ToastComponent";

const JobApplicants = () => {
  const intl = useIntl();
  const { isWebView } = useIsWebView();
  const {
    allDataLoaded,
    currentPage,
    error,
    errorWhileUpdatingStatus,
    setErrorStatus,
    fetchingJobApplicantListing,
    filterApplyHandler,
    filterCategory,
    getColoumConfigs,
    getStatusStyle,
    handleActions,
    handleLoadMore,
    handlePageChange,
    handleRowPerPageChange,
    handleSearchResults,
    headingTexts,
    isError,
    isFirstPageReceived,
    isLoading,
    isHeading,
    jobApplicantListingData,
    loadingMore,
    onIconPress,
    queryTypeData,
    rowsPerPage,
    setModals,
    setModalsState,
    setCurrentPopupMessage,
    showCurrentPopupmessage,
    statusData,
    statusText,
    subHeadingText,
    tableIcon,
    totalcards,
  } = useJobApplicants();

  const getMobileView = (item, index) => {
    const currentStatus = item?.job_status === 1 ? "Active" : "Inactive";
    return (
      <View style={styles.mobileContainer} key={index}>
        <View>
          <CommonText
            fontWeight={"600"}
            customTextStyle={styles.cellTextStyle()}
          >
            {item.name || "-"}
          </CommonText>
          <CommonText customTextStyle={styles.tableQueryText}>
            {item?.status || "-"}
          </CommonText>
        </View>
        <View style={styles.rowsPerPageWeb}>
          <Chip label={currentStatus} style={getStatusStyle(currentStatus)} />
          <TouchableImage
            onPress={() => {
              onIconPress(item);
            }}
            source={tableIcon}
            style={styles.iconTicket}
          />
          {showCurrentPopupmessage === item?.job_applicantion_id && (
            <PopupMessage
              popUpHeaderText={intl.formatMessage({
                id: "label.actions",
              })}
              message={item?.action}
              customStyle={styles.popupMessageStyle}
              onPopupClick={(action) => handleActions(action, item)}
              isPopupModal
              onPopUpClose={() => setCurrentPopupMessage(-1)}
            />
          )}
        </View>
      </View>
    );
  };

  return (
    <>
      <TwoRow
        topSection={
          isWebView && (
            <IconHeader
              headerText={intl.formatMessage({ id: "label.job_applicants" })}
            />
          )
        }
        isBottomFillSpace
        bottomSection={
          <>
            {!isError && (
              <CustomTable
                {...{
                  allDataLoaded,
                  currentPage,
                  data: jobApplicantListingData,
                  filterApplyHandler,
                  filterCategory,
                  getColoumConfigs,
                  getStatusStyle,
                  handleLoadMore,
                  handlePageChange,
                  handleRowPerPageChange,
                  handleSearchResults,
                  headingTexts,
                  isHeading,
                  isFirstPageReceived,
                  isTicketListingLoading: isLoading,
                  isTotalCardVisible: false,
                  loadingMore,
                  mobileComponentToRender: getMobileView,
                  onIconPress,
                  subHeadingText,
                  statusText,
                  statusData,
                  totalcards,
                  tableIcon,
                  tableHeading: JOB_APPLICANTS_HEADING,
                  rowsLimit: ROWS_PER_PAGE_ARRAY,
                  rowsPerPage,
                  queryTypeData,
                }}
              />
            )}
            {isError && (
              <ErrorComponent
                errorMsg={error.data.message}
                onRetry={() => fetchingJobApplicantListing()}
              />
            )}
            {!!errorWhileUpdatingStatus && (
              <ToastComponent
                toastMessage={errorWhileUpdatingStatus}
                onDismiss={() => setErrorStatus("")}
              />
            )}
          </>
        }
      />
      {!!setModals?.interviewModal && (
        <ViewInterviewDetails
          applicant_id={setModals?.interviewModal}
          onClose={() =>
            setModalsState((prev) => ({
              ...prev,
              interviewModal: null,
            }))
          }
        />
      )}
      {!!setModals?.scheduleModal && (
        <ScheduleInterviewModal
          applicant_id={setModals?.scheduleModal}
          onClose={() =>
            setModalsState((prev) => ({
              ...prev,
              scheduleModal: null,
            }))
          }
        />
      )}
    </>
  );
};

export default JobApplicants;
