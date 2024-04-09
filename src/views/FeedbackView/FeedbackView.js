import React from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "../../routes";

import { TwoRow } from "../../core/layouts";

import CustomTable from "../../components/CustomTable";
import IconHeader from "../../components/IconHeader/IconHeader";
import useFeedbackView from "./controller/useFeedbackView";
import { feedbackData } from "./constant";
import { navigations } from "../../constants/routeNames";
import {
  ROWS_PER_PAGE_ARRAY as rowsLimit,
  FEEDBACK_TABLE_HEADING as tableHeading,
} from "../../constants/constants";

const FeedbackView = () => {
  const {
    allDataLoaded,
    currentRecords,
    currentPage,
    customFilterInfo,
    filterState,
    setFilterState,
    defaultCategory,
    getColoumConfigs,
    getStatusStyle,
    filterCategory,
    headingTexts,
    handlePageChange,
    handleRowPerPageChange,
    handleSearchResults,
    handleLoadMore,
    isHeading,
    indexOfFirstRecord,
    indexOfLastRecord,
    loadingMore,
    rowsPerPage,
    statusText,
    subHeadingText,
    tableIcon,
    setCurrentRecords,
    totalcards,
  } = useFeedbackView();

  const intl = useIntl();
  const navigate = useNavigate();

  const onGoBack = () => {
    navigate(navigations.PROFILE);
  };

  return (
    <TwoRow
      topSection={
        <IconHeader
          headerText={intl.formatMessage({ id: "label.feedback" })}
          onPressLeftIcon={onGoBack}
          hasIconBar
        />
      }
      isBottomFillSpace
      bottomSection={
        <CustomTable
          {...{
            selectedFilterOptions: filterState,
            setSelectedFilterOptions: setFilterState,
            allDataLoaded,
            currentPage,
            currentRecords,
            customFilterInfo,
            data: feedbackData,
            filterCategory,
            defaultCategory,
            getColoumConfigs,
            getStatusStyle,
            handlePageChange,
            handleRowPerPageChange,
            handleSearchResults,
            handleLoadMore,
            headingTexts,
            isHeading,
            indexOfFirstRecord,
            indexOfLastRecord,
            loadingMore,
            rowsLimit,
            rowsPerPage,
            setCurrentRecords,
            statusText,
            subHeadingText,
            tableHeading,
            tableIcon,
            totalcards,
          }}
        />
      }
    />
  );
};

export default FeedbackView;
