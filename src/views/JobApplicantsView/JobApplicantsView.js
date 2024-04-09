import React from "react";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";

import { TwoRow } from "../../core/layouts";

import Chip from "../../components/Chip";
import CommonText from "../../components/CommonText";
import CustomTable from "../../components/CustomTable";
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

const JobApplicants = () => {
  const intl = useIntl();
  const { isWebView } = useIsWebView();
  const {
    allDataLoaded,
    currentPage,
    jobApplicantListingData,
    getColoumConfigs,
    getStatusStyle,
    headingTexts,
    isHeading,
    isLoading,
    subHeadingText,
    statusText,
    tableIcon,
    totalcards,
    filterApplyHandler,
    handleActions,
    setModals,
    setModalsState,
    filterCategory,
    queryTypeData,
    statusData,
    handleLoadMore,
    handlePageChange,
    handleRowPerPageChange,
    handleSearchResults,
    isFirstPageReceived,
    loadingMore,
    onIconPress,
    showCurrentPopupmessage,
    setCurrentPopupMessage,
    rowsPerPage,
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
          {showCurrentPopupmessage === item?.user_id && (
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
          <CustomTable
            {...{
              allDataLoaded,
              currentPage,
              getColoumConfigs,
              data: jobApplicantListingData,
              tableHeading: JOB_APPLICANTS_HEADING,
              isHeading,
              headingTexts,
              subHeadingText,
              statusText,
              getStatusStyle,
              tableIcon,
              rowsLimit: ROWS_PER_PAGE_ARRAY,
              isTicketListingLoading: isLoading,
              totalcards,
              filterApplyHandler,
              filterCategory,
              queryTypeData,
              statusData,
              handleLoadMore,
              handlePageChange,
              handleRowPerPageChange,
              handleSearchResults,
              isFirstPageReceived,
              loadingMore,
              onIconPress,
              rowsPerPage,
              isTotalCardVisible: false,
              mobileComponentToRender: getMobileView,
            }}
          />
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
