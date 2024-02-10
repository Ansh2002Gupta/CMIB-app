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
    allDataLoaded,
    currentRecords,
    currentPage,
    getColoumConfigs,
    getStatusStyle,
    fetchTickets,
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
    onIconPress,
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

  const filterApplyHandler = ({ selectedStatus, selectedQueryType }) => {
    const requestedParams = {
      q: "T000001",
      status: selectedStatus,
      queryType: selectedQueryType,
    }; // TODO: Manage what filters you want to pass
    fetchTickets({ queryParamsObject: requestedParams });
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
            onIconPress,
            rowsLimit,
            rowsPerPage,
            setCurrentRecords,
            statusText,
            subHeadingText,
            tableHeading,
            tableIcon,
            totalcards,
            filterApplyHandler,
          }}
        />
      }
    />
  );
};

export default TicketsListing;
