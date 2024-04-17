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
  } = useSavedCandidates();

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
