import React from "react";
import { useIntl } from "react-intl";
import { TwoRow } from "../../core/layouts";

import CustomTable from "../../components/CustomTable";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import IconHeader from "../../components/IconHeader/IconHeader";
import useJobSeekers from "./controller/useJobSeekers";
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

  return (
    <TwoRow
      topSection={
        <IconHeader
          hasIconBar
          headerText={intl.formatMessage({ id: "label.job_seekers" })}
        />
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
                getColoumConfigs,
                handleLoadMore,
                handlePageChange,
                handleRowPerPageChange,
                handleSearchResults,
                indexOfFirstRecord,
                indexOfLastRecord,
                isFirstPageReceived,
                loadingMore,
                rowsLimit,
                rowsPerPage,
                tableHeading,
                totalcards,
                filterCategory,
                headingTexts,
                tableIcon,
                isHeading,
                placeholder: intl.formatMessage({
                  id: "label.search_by_candidate_name_or_id",
                }),
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
