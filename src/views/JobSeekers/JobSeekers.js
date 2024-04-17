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
    setFilterState,
    allDataLoaded,
    currentPage,
    currentRecords,
    customFilterInfo,
    filterApplyHandler,
    filterCategory,
    filterState,
    setCurrentRecords,
    defaultCategory,
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
    isGeetingJobbSeekers,
    subHeadingText,
    extraDetailsText,
    extraDetailsKey,
    loadingMore,
    rowsPerPage,
    jobSeekersData,
    totalcards,
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
                customFilterInfo,
                selectedFilterOptions: filterState,
                setSelectedFilterOptions: setFilterState,
                allDataLoaded,
                currentPage,
                currentRecords,
                data: jobSeekersData,
                filterApplyHandler,
                filterCategory,
                setCurrentRecords,
                defaultCategory,
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
                isGeetingJobbSeekers,
                isHeading,
                loadingMore,
                placeholder: intl.formatMessage({
                  id: "label.serach_by_applicant_name_id",
                }),
                rowsLimit,
                rowsPerPage,
                subHeadingText,
                tableHeading,
                totalcards,
                tableIcon,
                extraDetailsText,
                extraDetailsKey,
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
