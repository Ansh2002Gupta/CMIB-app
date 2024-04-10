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
          }}
          ThirdSection={
            <DownloadMoreComponent
              onPress={() => {
                console.log("HI I AM pressed");
              }}
              message={intl.formatMessage({
                id: "label.download_candidates_list",
              })}
            />
          }
        />
      }
    />
  );
};

export default SavedCandidatesView;
