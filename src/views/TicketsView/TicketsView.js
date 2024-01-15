import React from "react";
import { useIntl } from "react-intl";

import { useNavigate } from "../../routes";
import CustomTable from "../../components/CustomTable";
import IconHeader from "../../components/IconHeader/IconHeader";
import useTicketView from "./controller/useTicketView";
import { navigations } from "../../constants/routeNames";
import {
  ROWS_PER_PAGE_ARRAY as rowsLimit,
  TABLE_HEADING as tableHeading,
} from "../../constants/constants";

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
  } = useTicketView();
  const intl = useIntl();
  const navigate = useNavigate();

  const onGoBack = () => {
    navigate(navigations.PROFILE);
  };

  return (
    <>
      <IconHeader
        headerText={intl.formatMessage({ id: "label.tickets" })}
        onPressLeftIcon={onGoBack}
        hasIconBar
      />
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
        }}
      />
    </>
  );
};

export default TicketsView;
