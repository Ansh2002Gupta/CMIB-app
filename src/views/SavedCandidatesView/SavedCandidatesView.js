import React from "react";
import { useIntl } from "react-intl";

import { TwoRow } from "../../core/layouts";

import CustomTable from "../../components/CustomTable";
import IconHeader from "../../components/IconHeader/IconHeader";
import useIsWebView from "../../hooks/useIsWebView";
import useSavedCandidates from "./controllers/useSavedCandidates";
import {
  ROWS_PER_PAGE_ARRAY,
  SAVED_CANDIDATES_TABLE_HEADING,
} from "../../constants/constants";
import DownloadMoreComponent from "../../containers/PostedJobs/DownloadMoreComponent";
import images from "../../images";
import ToastComponent from "../../components/ToastComponent/ToastComponent";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import styles from "./SavedCandidatesView.styles";
import { View } from "@unthinkable/react-core-components";
import CommonText from "../../components/CommonText";
import TouchableImage from "../../components/TouchableImage";
import PopupMessage from "../../components/PopupMessage/PopupMessage";

const SavedCandidatesView = () => {
  const intl = useIntl();
  const { isWebView } = useIsWebView();

  const {
    data,
    formatConfig,
    getStatusStyle,
    filterCategory,
    getColoumConfigs,
    headingTexts,
    queryTypeData,
    statusData,
    isFirstPageReceived,
    handleLoadMore,
    handleRowPerPageChange,
    handlePageChange,
    isSavedCadidatesDataLoading,
    handleSearchResults,
    filterApplyHandler,
    subHeadingText,
    allDataLoaded,
    loadingMore,
    statusText,
    tableIcon,
    errorWhileMarkJob,
    errorWhileFetchingCandidatesData,
    rowsPerPage,
    setMarkedSavedJobError,
    fetchingCandidatesData,
    totalPages,
    currentPage,
    showCurrentPopupmessage,
    onIconPress,
    popupOptions,
  } = useSavedCandidates();

  const getMobileView = (item, index) => {
    return (
      <View style={styles.mobileContainer} key={index}>
        <View>
          <CommonText
            fontWeight={"600"}
            customTextStyle={styles.cellTextStyle()}
          >
            {item.candidate_name || "-"}
          </CommonText>
          <View style={styles.descriptionRow}>
            <CommonText customTextStyle={styles.tableQueryText}>
              {item?.candidate_id || "-"}
            </CommonText>
            <View style={styles.dot} />
            <CommonText customTextStyle={styles.tableQueryText}>
              {}
              {`${intl.formatMessage({ id: "label.experience" })} ${
                item?.experience
              } ${intl.formatMessage({ id: "label.years" })}`}
            </CommonText>
          </View>
        </View>
        <View style={styles.rowsPerPageWeb}>
          <TouchableImage
            onPress={() => {
              onIconPress(index);
            }}
            source={tableIcon}
            style={styles.iconTicket}
          />
          {showCurrentPopupmessage === index && (
            <PopupMessage
              message={popupOptions(item)}
              isPopupModal={true}
              customStyle={styles.popupMessageStyle}
              onPopupClick={(configData) => {
                configData?.popupAction(item);
              }}
              labelName="label"
            />
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
            headerText={intl.formatMessage({ id: "label.saved_candidates" })}
          />
        )
      }
      isBottomFillSpace
      bottomSection={
        <>
          {!errorWhileFetchingCandidatesData && (
            <CustomTable
              {...{
                getColoumConfigs,
                data,
                tableHeading: SAVED_CANDIDATES_TABLE_HEADING,
                isHeading: true,
                headingTexts,
                subHeadingText,
                statusText,
                filterCategory,
                queryTypeData,
                statusData,
                allDataLoaded,
                loadingMore,
                getStatusStyle,
                tableIcon,
                rowsPerPage,
                rowsLimit: ROWS_PER_PAGE_ARRAY,
                isTicketListingLoading: isSavedCadidatesDataLoading,
                isFirstPageReceived,
                handleLoadMore,
                handleRowPerPageChange,
                handlePageChange,
                handleSearchResults,
                mobileComponentToRender: getMobileView,
                filterApplyHandler,
                formatConfig,
                isTotalCardVisible: false,
                isFilterVisible: false,
                totalcards: totalPages,
                currentPage,
              }}
              ThirdSection={
                <DownloadMoreComponent
                  onPress={() => {}}
                  message={intl.formatMessage({
                    id: "label.download_candidates_list",
                  })}
                />
              }
            />
          )}
          {errorWhileFetchingCandidatesData && (
            <ErrorComponent
              errorMsg={errorWhileFetchingCandidatesData?.data.message}
              onRetry={() => fetchingCandidatesData()}
            />
          )}
          {!!errorWhileMarkJob && (
            <ToastComponent
              toastMessage={errorWhileMarkJob}
              onDismiss={() => setMarkedSavedJobError("")}
            />
          )}
        </>
      }
    />
  );
};

export default SavedCandidatesView;
