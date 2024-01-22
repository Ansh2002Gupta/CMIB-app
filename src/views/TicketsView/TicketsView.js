import React from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "../../routes";

import { TwoRow } from "../../core/layouts";

import CustomTable from "../../components/CustomTable";
import IconHeader from "../../components/IconHeader/IconHeader";
import useTicketView from "./controller/useTicketView";
import { ticketData } from "./constant";
import { navigations } from "../../constants/routeNames";
import {
  ROWS_PER_PAGE_ARRAY as rowsLimit,
  TICKET_TABLE_HEADING as tableHeading,
} from "../../constants/constants";

const TicketsView = () => {
  const {
    allDataLoaded,
    currentRecords,
    currentPage,
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
  } = useTicketView();

  const intl = useIntl();
  const navigate = useNavigate();

  const onGoBack = () => {
    navigate(navigations.PROFILE);
  };

  return (
    <TwoRow
      topSection={
        <IconHeader
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
            data: ticketData,
            getStatusStyle,
            getColoumConfigs,
            filterCategory,
            handleSearchResults,
            handleLoadMore,
            handleRowPerPageChange,
            handlePageChange,
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

export default TicketsView;
