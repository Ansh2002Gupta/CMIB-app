import React from "react";

import CommonText from "../../../components/CommonText";
import CustomImage from "../../../components/CustomImage";
import images from "../../../images";
import styles from "../FeedbackView.style";

const tableHeading = {
  id: "Feedback ID",
  status: "Status",
  created_at: "Created On",
};

const useFeedbackView = () => {
  let headingTexts = ["id"];
  let subHeadingText = ["created_at"];
  let statusText = ["status"];
  let tableIcon = images.iconEye;

  function getStatusStyle(status, isHeading, isWebView) {
    status = status.toLowerCase();

    if (isHeading) {
      return styles.tableHeadingText;
    }
    switch (status) {
      case "published":
        return [
          !isWebView ? styles.published : styles.publishedWeb,
          styles.cellTextStyle(12),
        ];
      case "not published":
        return [
          !isWebView ? styles.notPublished : styles.notPublishedWeb,
          styles.cellTextStyle(12),
        ];
      case "pending":
        return [
          !isWebView ? styles.pending : styles.pendingWeb,
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
        style: styles.columnStyle("25%"),
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
        style: styles.columnStyle("25%"),
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
        style: styles.columnStyle("30%"),
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
    getColoumConfigs,
    getStatusStyle,
    headingTexts,
    statusText,
    subHeadingText,
    tableHeading,
    tableIcon,
  };
};

export default useFeedbackView;
