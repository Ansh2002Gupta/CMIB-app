import React from "react";
import { View } from "@unthinkable/react-core-components";

import Chip from "../../../components/Chip";
import CommonText from "../../../components/CommonText";
import TouchableImage from "../../../components/TouchableImage";
import useIsWebView from "../../../hooks/useIsWebView";
import images from "../../../images";
import styles from "../FeedbackView.style";

const useFeedbackView = () => {
  const {isWebView} = useIsWebView();

  let headingTexts = ["id"];
  let subHeadingText = ["created_at"];
  let statusText = ["status"];
  let tableIcon = images.iconEye;
  let filterCategory = ["Status", "Role"];

  function getStatusStyle(status) {
    status = status.toLowerCase();
    switch (status) {
      case "published":
        return {
          ...(!isWebView ? styles.published : styles.publishedWeb),
          ...styles.cellTextStyle(12),
        };
      case "not published":
        return {
          ...(!isWebView ? styles.notPublished : styles.notPublishedWeb),
          ...styles.cellTextStyle(12),
        };
      case "pending":
        return {
          ...(!isWebView ? styles.pending : styles.pendingWeb),
          ...styles.cellTextStyle(12),
        };
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
        style: styles.columnStyle("25%"),
        isFillSpace: true,
      },
      {
        content: (
          <View style={styles.statusStyle}>
            {isHeading ? (
              <CommonText customTextStyle={tableStyle}>
                {item.status}
              </CommonText>
            ) : (
              <Chip
                label={item.status}
                style={getStatusStyle(item.status)}
              />
            )}
          </View>
        ),
        style: styles.columnStyle("25%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText customTextStyle={tableStyle}>
            {item.created_at}
          </CommonText>
        ),
        style: styles.columnStyle("30%"),
        isFillSpace: true,
      },
      {
        content: !isHeading && (
          <TouchableImage source={tableIcon} style={styles.iconTicket} />
        ),
        style: { ...styles.columnStyle("10%"), ...styles.iconTicketColoum },
        isFillSpace: true,
      },
    ];
  };

  return {
    getColoumConfigs,
    getStatusStyle,
    filterCategory,
    headingTexts,
    statusText,
    subHeadingText,
    tableIcon,
  };
};

export default useFeedbackView;
