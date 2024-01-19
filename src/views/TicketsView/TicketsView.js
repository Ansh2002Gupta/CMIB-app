import React from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "../../routes";

import { TwoRow } from "../../core/layouts";

import CustomTable from "../../components/CustomTable";
import IconHeader from "../../components/IconHeader/IconHeader";
import useTicketView from "./controller/useTicketView";
import useCustomTablePagination from "../../hooks/useCustomTablePagination";
import { TicketData } from "./constant";
import { navigations } from "../../constants/routeNames";
import {
  ROWS_PER_PAGE_ARRAY as rowsLimit,
  TICKET_TABLE_HEADING as tableHeading,
} from "../../constants/constants";

const TicketsView = () => {
  const {
    getColoumConfigs,
    getStatusStyle,
    filterCategory,
    headingTexts,
    isHeading,
    statusText,
    subHeadingText,
    tableIcon,
  } = useTicketView();

  const {
    currentPage,
    currentRecords,
    handlePageChange,
    handleRowPerPageChange,
    handleSearchResults,
    rowsToShow,
    setCurrentRecords,
    totalcards,
  } = useCustomTablePagination(TicketData);

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
            currentPage,
            currentRecords,
            data: TicketData,
            getStatusStyle,
            getColoumConfigs,
            filterCategory,
            handleSearchResults,
            handleRowPerPageChange,
            handlePageChange,
            headingTexts,
            isHeading,
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

export default TicketsView;
