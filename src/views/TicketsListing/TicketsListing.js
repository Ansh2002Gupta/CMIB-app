import React from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "../../routes";

import { TwoRow } from "../../core/layouts";

import CustomTable from "../../components/CustomTable";
import IconHeader from "../../components/IconHeader/IconHeader";
import useTicketListing from "./controller/useTicketListing";
import { ticketData } from "./constant";
import { navigations } from "../../constants/routeNames";
import {
  ROWS_PER_PAGE_ARRAY as rowsLimit,
  TICKET_TABLE_HEADING as tableHeading,
} from "../../constants/constants";

const TicketsListing = () => {
  const {
    ticketListingData,
    allDataLoaded,
    currentRecords,
    currentPage,
    getColoumConfigs,
    getStatusStyle,
    filterCategory,
    headingTexts,
    handleAddTicket,
    handlePageChange,
    handleRowPerPageChange,
    handleSearchResults,
    handleLoadMore,
    isHeading,
    indexOfFirstRecord,
    indexOfLastRecord,
    loadingMore,
    onIconPress,
    queryTypeData,
    statusData,
    rowsPerPage,
    statusText,
    subHeadingText,
    tableIcon,
    setCurrentRecords,
    totalcards,
  } = useTicketListing();

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
            ticketListingData,
            allDataLoaded,
            currentPage,
            currentRecords,
            data: ticketListingData,
            getStatusStyle,
            getColoumConfigs,
            filterCategory,
            handleAddTicket,
            handleSearchResults,
            handleLoadMore,
            handleRowPerPageChange,
            handlePageChange,
            headingTexts,
            isHeading,
            indexOfFirstRecord,
            indexOfLastRecord,
            loadingMore,
            onIconPress,
            queryTypeData,
            statusData,
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

export default TicketsListing;
