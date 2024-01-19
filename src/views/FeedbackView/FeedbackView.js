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
    currentRecords,
    currentPage,
    getColoumConfigs,
    getStatusStyle,
    filterCategory,
    headingTexts,
    handlePageChange,
    handleRowPerPageChange,
    handleSearchResults,
    isHeading,
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
            currentPage,
            currentRecords,
            data: feedbackData,
            filterCategory,
            getColoumConfigs,
            getStatusStyle,
            handlePageChange,
            handleRowPerPageChange,
            handleSearchResults,
            headingTexts,
            isHeading,
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
