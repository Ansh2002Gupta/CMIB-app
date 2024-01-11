import React from "react";
import { useIntl } from "react-intl";

import { TwoRow } from "../../core/layouts";

import { useNavigate } from "../../routes";
import { feedbackData } from "./constant";
import CustomTable from "../../components/CustomTable";
import IconHeader from "../../components/IconHeader/IconHeader";
import useFeedbackView from "./controller/useFeedbackView";
import useTicketView from "../TicketsView/controller/useTicketView";

const FeedbackView = () => {
  const {
    getColoumConfigs,
    getStatusStyle,
    headingTexts,
    statusText,
    subHeadingText,
    tableHeading,
    tableIcon,
  } = useFeedbackView();

  const {
    currentPage,
    currentRecords,
    handleSearchResults,
    handleSelect,
    handleLoadMore,
    isHeading,
    loadingMore,
    rowsLimit,
    rowsToShow,
    setCurrentPage,
    setCurrentRecords,
    totalcards,
  } = useTicketView(feedbackData);

  const intl = useIntl();
  const navigate = useNavigate();

  const onGoBack = () => {
    navigate(-1);
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
            currentPage,
            currentRecords,
            getColoumConfigs,
            getStatusStyle,
            handleSearchResults,
            handleSelect,
            handleLoadMore,
            headingTexts,
            isHeading,
            loadingMore,
            rowsLimit,
            rowsToShow,
            setCurrentPage,
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
