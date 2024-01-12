import React from "react";
import { useIntl } from "react-intl";

import { TwoRow } from "../../core/layouts";

import { useNavigate } from "../../routes";
import CustomTable from "../../components/CustomTable";
import IconHeader from "../../components/IconHeader/IconHeader";
import useTicketView from "./controller/useTicketView";
import { gridData } from "./constant";

const TicketsView = () => {
  const {
    allDataLoaded,
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
  } = useTicketView(gridData);

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
          headerText={intl.formatMessage({ id: "label.tickets" })}
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

export default TicketsView;
