import React from "react";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";

import { TwoRow } from "../../core/layouts";

import Chip from "../../components/Chip";
import CommonText from "../../components/CommonText";
import CustomModal from "../../components/CustomModal";
import CustomTouchableOpacity from "../../components/CustomTouchableOpacity";
import CustomTable from "../../components/CustomTable";
import IconHeader from "../../components/IconHeader/IconHeader";
import TouchableImage from "../../components/TouchableImage";
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
    isJobApplicantListingLoading,
    subHeadingText,
    statusText,
    tableIcon,
    totalcards,
    filterApplyHandler,
    handleActions,
    filterCategory,
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
            <CustomModal
              headerText={intl.formatMessage({ id: "label.actions" })}
              isIconCross
              onPressIconCross={() => setCurrentPopupMessage(-1)}
              onBackdropPress={() => setCurrentPopupMessage(-1)}
            >
              {item?.action.length &&
                item?.action.map((item, index) => {
                  return (
                    <CustomTouchableOpacity
                      key={index}
                      onPress={() => {
                        handleActions(item);
                      }}
                    >
                      <CommonText customTextStyle={styles.customMessageSTyle}>
                        {item}
                      </CommonText>
                    </CustomTouchableOpacity>
                  );
                })}
            </CustomModal>
          )}
        </View>
      </View>
    );
  };

  return (
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
            isTicketListingLoading: isJobApplicantListingLoading,
            totalcards,
            filterApplyHandler,
            filterCategory,
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
  );
};

export default JobApplicants;
