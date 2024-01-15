import React from "react";
import { useIntl } from "react-intl";

import { TwoRow } from "../../core/layouts";

import { useNavigate } from "../../routes";
import CustomTable from "../../components/CustomTable";
import IconHeader from "../../components/IconHeader/IconHeader";
import useTicketView from "./controller/useTicketView";
import { navigations } from "../../constants/routeNames";
import {
  ROWS_PER_PAGE_ARRAY as rowsLimit,
  TABLE_HEADING as tableHeading,
} from "../../constants/constants";
import { gridData } from "./constant";

const TicketsView = () => {
  const {
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
    indexOfFirstRecord,
    indexOfLastRecord,
    headingTexts,
    setCurrentPage,
    setCurrentRecords,
    statusText,
    subHeadingText,

    tableIcon,
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
            setCurrentPage,
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
