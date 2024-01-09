import React from "react";

import TicketViewTemplate from "./TicketsViewTemplate";
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
  } = useTicketView();
  return (
    <TicketViewTemplate
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
    />
  );
};

export default TicketsView;
