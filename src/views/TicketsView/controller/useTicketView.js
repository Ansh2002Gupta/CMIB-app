import React, { useEffect, useState } from "react";

import CommonText from "../../../components/CommonText";
import CustomImage from "../../../components/CustomImage";
import { gridData } from "../constant";
import {
  ROWSLIMIT as rowsLimit,
  TABLE_HEADING as tableHeading,
} from "../../../constants/constants";
import images from "../../../images";
import styles from "../TicketsView.style";

const useTicketView = () => {
  const [rowsToShow, setRowsToShow] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentRecords, setCurrentRecords] = useState([]);

  const indexOfLastRecord = currentPage * rowsToShow;
  const indexOfFirstRecord = indexOfLastRecord - rowsToShow;

  useEffect(() => {
    let newRecords = gridData.slice(indexOfFirstRecord, indexOfLastRecord);
    setCurrentRecords(newRecords);
  }, [rowsToShow, currentPage]);

  const totalcards = gridData.length;

  let isHeading = true;
  
  const handleSearchResults = (filteredData) => {};

  const handleSelect = (option) => {
    setRowsToShow(option.value);
  };

  function getStatusStyle(status, isHeading, styles, isWebView) {
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
    const tableStyle = isHeading
      ? styles.tableHeadingText
      : styles.cellTextStyle();
    return [
      {
        content: (
          <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
            {item.id}
          </CommonText>
        ),
        style: styles.columnStyle("15%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText customTextStyle={tableStyle}>
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
          <CommonText customTextStyle={tableStyle}>
            {item.assigned_to}
          </CommonText>
        ),
        style: styles.columnStyle("20%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText customTextStyle={tableStyle}>
            {item.created_at}
          </CommonText>
        ),
        style: styles.columnStyle("15%"),
        isFillSpace: true,
      },
      {
        content: !isHeading && (
          <CustomImage source={images.iconTicket} style={styles.iconTicket} />
        ),
        style: styles.columnStyle("10%"),
        isFillSpace: true,
      },
    ];
  };

  return {
    rowsToShow,
    setRowsToShow,
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
  };
};

export default useTicketView;
