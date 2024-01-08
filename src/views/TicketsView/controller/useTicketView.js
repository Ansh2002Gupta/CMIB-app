import React, { useState } from "react";

import CommonText from "../../../components/CommonText";
import CustomImage from "../../../components/CustomImage";
import images from "../../../images";
import styles from "../TicketsView.style";

const useTicketView = () => {
  const [visibleData, setVisibleData] = useState([]);
  const [rowsToShow, setRowsToShow] = useState(10);

  let isHeading = true;

  function getStatusStyle(status, isHeading, styles) {
    status = status.toLowerCase();

    if (isHeading) {
      return styles.tableHeadingText;
    }
    switch (status) {
      case "pending":
        return [!isHeading ? styles.pending : styles.pendingWeb, styles.cellTextStyle(12)];
      case "close":
        return [!isHeading ? styles.close : styles.closeWeb, styles.cellTextStyle(12)];
      case "in progress":
        return [!isHeading ?  styles.inProgress : styles.inProgressWeb, styles.cellTextStyle(12)];
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
            customTextStyle={getStatusStyle(item.status, isHeading, styles)}
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
    visibleData,
    setVisibleData,
    rowsToShow,
    setRowsToShow,
    getStatusStyle,
    getColoumConfigs,
    isHeading,
  };
};

export default useTicketView;
