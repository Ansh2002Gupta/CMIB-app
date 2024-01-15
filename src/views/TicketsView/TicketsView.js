import React from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "../../routes";

import { TwoRow } from "../../core/layouts";

import CustomTable from "../../components/CustomTable";
import IconHeader from "../../components/IconHeader/IconHeader";
import useTicketView from "./controller/useTicketView";
import { navigations } from "../../constants/routeNames";
import {
  ROWS_PER_PAGE_ARRAY as rowsLimit,
  TICKET_TABLE_HEADING as tableHeading,
} from "../../constants/constants";
import { gridData } from "./constant";

const TicketsView = () => {
  const {
    currentPage,
    currentRecords,
    getColoumConfigs,
    getStatusStyle,
    handlePageChange,
    handleRowPerPageChange,
    handleSearchResults,
    headingTexts,
    indexOfFirstRecord,
    indexOfLastRecord,
    isHeading,
    setCurrentRecords,
    statusText,
    subHeadingText,
    tableIcon,
    totalcards,
    rowsToShow,
  } = useTicketView(gridData);

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
            rowsToShow,
            getStatusStyle,
            getColoumConfigs,
            handleSearchResults,
            handleRowPerPageChange,
            handlePageChange,
            isHeading,
            currentPage,
            currentRecords,
            totalcards,
            rowsLimit,
            indexOfFirstRecord,
            indexOfLastRecord,
            tableHeading,
            headingTexts,
            setCurrentRecords,
            statusText,
            subHeadingText,
            tableIcon,
          }}
        />
      }
    />
  );
};

export default TicketsView;
