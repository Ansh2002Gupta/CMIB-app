import React, { useState } from "react";

import CommonText from "../../../components/CommonText";
import CustomImage from "../../../components/CustomImage";
import { gridData } from "../constant";
import images from "../../../images";
import styles from "../TicketsView.style";

const rowsLimit = [
 { value:10, label:"10"},
  {value:15, label:"15"},
  {value:20, label:"20"},
];

const useTicketView = () => {
  const [rowsToShow, setRowsToShow] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastRecord = currentPage * rowsToShow;
  const indexOfFirstRecord = indexOfLastRecord - rowsToShow;

  const currentRecords = gridData.slice(indexOfFirstRecord, indexOfLastRecord);

  const totalcards = gridData.length;

  let isHeading = true;

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
    return [
      {
        content: (
          <CommonText
            title={item.id}
            customTextStyle={
              isHeading
                ? styles.tableHeadingText
                : styles.cellTextStyle(14, 600)
            }
          />
        ),
        style: styles.columnStyle("15%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText
            title={item.query_type}
            customTextStyle={
              isHeading ? styles.tableHeadingText : styles.cellTextStyle()
            }
          />
        ),
        style: styles.columnStyle("20%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText
            title={item.status}
            customTextStyle={getStatusStyle(
              item.status,
              isHeading,
              styles,
              true
            )}
          />
        ),
        style: styles.columnStyle("15%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText
            title={item.assigned_to}
            customTextStyle={
              isHeading ? styles.tableHeadingText : styles.cellTextStyle()
            }
          />
        ),
        style: styles.columnStyle("20%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText
            title={item.created_at}
            customTextStyle={
              isHeading ? styles.tableHeadingText : styles.cellTextStyle()
            }
          />
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
    indexOfLastRecord
  };
};

export default useTicketView;
