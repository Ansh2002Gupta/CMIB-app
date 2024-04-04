import React from "react";
import { useIntl } from "react-intl";
import { TwoRow } from "../../core/layouts";

import CustomTable from "../../components/CustomTable";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import IconHeader from "../../components/IconHeader/IconHeader";
import useJobSeekers from "./controller/useJobSeekers";
import useIsWebView from "../../hooks/useIsWebView";
import {
  ROWS_PER_PAGE_ARRAY as rowsLimit,
  JOB_SEEKERS_TABLE_HEADING as tableHeading,
} from "../../constants/constants";

const JobSeekers = () => {
  const {
    allDataLoaded,
    currentPage,
    filterApplyHandler,
    getColoumConfigs,
    handleLoadMore,
    handlePageChange,
    handleRowPerPageChange,
    handleSearchResults,
    getErrorDetails,
    indexOfFirstRecord,
    indexOfLastRecord,
    isError,
    isFirstPageReceived,
    subHeadingText,
    loadingMore,
    rowsPerPage,
    jobSeekersData,
    totalcards,
    filterCategory,
    headingTexts,
    tableIcon,
    isHeading,
  } = useJobSeekers();

  const intl = useIntl();
  const { isWebView } = useIsWebView();

  return (
    <TwoRow
      topSection={
        isWebView ? (
          <IconHeader
            hasIconBar
            headerText={intl.formatMessage({ id: "label.job_seekers" })}
          />
        ) : null
      }
      isBottomFillSpace
      bottomSection={
        <>
          {!isError && (
            <CustomTable
              {...{
                allDataLoaded,
                currentPage,
                data: jobSeekersData,
                filterApplyHandler,
                filterCategory,
                getColoumConfigs,
                handleLoadMore,
                handlePageChange,
                handleRowPerPageChange,
                handleSearchResults,
                headingTexts,
                hideTotalCount: true,
                indexOfFirstRecord,
                indexOfLastRecord,
                isFirstPageReceived,
                isHeading,
                loadingMore,
                placeholder: intl.formatMessage({
                  id: "label.search_by_candidate_name_or_id",
                }),
                rowsLimit,
                rowsPerPage,
                subHeadingText,
                tableHeading,
                totalcards,
                tableIcon,
              }}
            />
          )}
          {isError && !!getErrorDetails()?.errorMessage && (
            <ErrorComponent
              errorMsg={getErrorDetails()?.errorMessage}
              onRetry={() => getErrorDetails()?.onRetry()}
            />
          )}
        </>
      }
    />
  );
};

export default JobSeekers;
