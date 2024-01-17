import React from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "../../routes";

import { TwoRow } from "../../core/layouts";

import CustomTable from "../../components/CustomTable";
import IconHeader from "../../components/IconHeader/IconHeader";
import useFeedbackView from "./controller/useFeedbackView";
import useTicketView from "../TicketsView/controller/useTicketView";
import { feedbackData } from "./constant";
import { navigations } from "../../constants/routeNames";
import {
  ROWS_PER_PAGE_ARRAY as rowsLimit,
  FEEDBACK_TABLE_HEADING as tableHeading,
} from "../../constants/constants";

const FeedbackView = () => {
  const {
    getColoumConfigs,
    getStatusStyle,
    headingTexts,
    statusText,
    subHeadingText,
    tableIcon,
  } = useFeedbackView();

  const {
    allDataLoaded,
    currentPage,
    currentRecords,
    handleSearchResults,
    handleRowPerPageChange,
    handlePageChange,
    loadingMore,
    isHeading,
    rowsToShow,
    setCurrentRecords,
    totalcards,
  } = useTicketView(feedbackData);

  const intl = useIntl();
  const navigate = useNavigate();

  const onGoBack = () => {
    navigate(navigations.PROFILE);
  };

  return (
    <TwoRow
      topSection={
        <IconHeader
          intl={intl}
          headerText={intl.formatMessage({ id: "label.feedback" })}
          onPressLeftIcon={onGoBack}
          hasIconBar
        />
      }
      isBottomFillSpace
      bottomSection={
        <CustomTable
          {...{
            allDataLoaded,
            currentPage,
            currentRecords,
            data: feedbackData,
            getColoumConfigs,
            getStatusStyle,
            handlePageChange,
            handleRowPerPageChange,
            handleSearchResults,
            headingTexts,
            isHeading,
            loadingMore,
            rowsLimit,
            rowsToShow,
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
