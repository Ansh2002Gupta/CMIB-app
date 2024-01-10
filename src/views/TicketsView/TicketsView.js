import React from "react";
import { useIntl } from "react-intl";

import { useNavigate } from "../../routes";
import CustomTable from "../../components/CustomTable";
import IconHeader from "../../components/IconHeader/IconHeader";
import useTicketView from "./controller/useTicketView";

const TicketsView = () => {
  const {
    rowsToShow,
    getStatusStyle,
    getColoumConfigs,
    isHeading,
    currentPage,
    setCurrentPage,
    currentRecords,
    totalcards,
    rowsLimit,
    indexOfFirstRecord,
    indexOfLastRecord,
    handleSearchResults,
    handleSelect,
    tableHeading,
  } = useTicketView();
  const intl = useIntl();
  const navigate = useNavigate();

  const onGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <IconHeader
        intl={intl}
        headerText={intl.formatMessage({ id: "label.tickets" })}
        onPressLeftIcon={onGoBack}
        hasIconBar
      />
      <CustomTable
        {...{
          rowsToShow,
          getStatusStyle,
          getColoumConfigs,
          isHeading,
          currentPage,
          setCurrentPage,
          currentRecords,
          totalcards,
          rowsLimit,
          indexOfFirstRecord,
          indexOfLastRecord,
          handleSearchResults,
          handleSelect,
          tableHeading,
        }}
      />
    </>
  );
};

export default TicketsView;
