import React from "react";

import useTicketView from "./controller/useTicketView";
import CustomTable from "../../components/CustomTable";

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
  return (
    <CustomTable
      rowsToShow={rowsToShow}
      getStatusStyle={getStatusStyle}
      getColoumConfigs={getColoumConfigs}
      isHeading={isHeading}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      currentRecords={currentRecords}
      totalcards={totalcards}
      rowsLimit={rowsLimit}
      indexOfFirstRecord={indexOfFirstRecord}
      indexOfLastRecord={indexOfLastRecord}
      handleSearchResults={handleSearchResults}
      handleSelect={handleSelect}
      tableHeading={tableHeading}
    />
  );
};

export default TicketsView;
