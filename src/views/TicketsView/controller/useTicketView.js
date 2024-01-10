import React, { useState } from "react";

import CommonText from "../../../components/CommonText";
import CustomImage from "../../../components/CustomImage";
import images from "../../../images";
import styles from "../TicketsView.style";

const rowsLimit = [
  { value: 10, label: "10" },
  { value: 15, label: "15" },
  { value: 20, label: "20" },
];

const tableHeading = {
  id: "Ticket ID",
  query_type: "Query Type",
  status: "Status",
  assigned_to: "Assigned To",
  created_at: "Created On",
};

const useTicketView = (data) => {
  const [rowsToShow, setRowsToShow] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastRecord = currentPage * rowsToShow;
  const indexOfFirstRecord = indexOfLastRecord - rowsToShow;

  let currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);

  const totalcards = data.length;

  let isHeading = true;

  const handleSearchResults = (filteredData) => {
    //TODO: Implement searching 
  };

  const handleSelect = (option) => {
    setRowsToShow(option.value);
  };

  let headingTexts = ["id"];
  let subHeadingText = ["query_type"];
  let statusText = ["status"];
  let tableIcon = images.iconTicket;

  function getStatusStyle(status, isHeading, isWebView) {
    status = status.toLowerCase();

    if (isHeading) {
      return styles.tableHeadingText;
    }
    switch (status) {
      case "pending":
        return [
          !isWebView ? styles.pending : styles.pendingWeb,
          styles.cellTextStyle(12),
        ];
      case "close":
        return [
          !isWebView ? styles.close : styles.closeWeb,
          styles.cellTextStyle(12),
        ];
      case "in progress":
        return [
          !isWebView ? styles.inProgress : styles.inProgressWeb,
          styles.cellTextStyle(12),
        ];
      default:
        return styles.cellTextStyle(12);
    }
  }

  const getColoumConfigs = (item, isHeading) => {
    return [
      {
        content: (
          <CommonText
            fontWeight={"600"}
            customTextStyle={
              isHeading ? styles.tableHeadingText : styles.cellTextStyle()
            }
          >
            {item.id}
          </CommonText>
        ),
        style: styles.columnStyle("15%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText
            customTextStyle={
              isHeading ? styles.tableHeadingText : styles.cellTextStyle()
            }
          >
            {item.query_type}
          </CommonText>
        ),
        style: styles.columnStyle("20%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText
            customTextStyle={getStatusStyle(
              item.status,
              isHeading,
              styles,
              true
            )}
          >
            {item.status}
          </CommonText>
        ),
        style: styles.columnStyle("15%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText
            customTextStyle={
              isHeading ? styles.tableHeadingText : styles.cellTextStyle()
            }
          >
            {item.assigned_to}
          </CommonText>
        ),
        style: styles.columnStyle("20%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText
            customTextStyle={
              isHeading ? styles.tableHeadingText : styles.cellTextStyle()
            }
          >
            {item.created_at}
          </CommonText>
        ),
        style: styles.columnStyle("15%"),
        isFillSpace: true,
      },
      {
        content: !isHeading && (
          <CustomImage source={tableIcon} style={styles.iconTicket} />
        ),
        style: styles.columnStyle("10%"),
        isFillSpace: true,
      },
    ];
  };

  return {
    currentPage,
    currentRecords,
    getColoumConfigs,
    getStatusStyle,
    handleSearchResults,
    handleSelect,
    headingTexts,
    indexOfFirstRecord,
    indexOfLastRecord,
    isHeading,
    rowsLimit,
    rowsToShow,
    setCurrentPage,
    statusText,
    subHeadingText,
    tableHeading,
    tableIcon,
    totalcards,
  };
};

export default useTicketView;
