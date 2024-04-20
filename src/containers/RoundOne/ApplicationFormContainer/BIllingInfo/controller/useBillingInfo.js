import React, { useEffect } from "react";
import { View } from "@unthinkable/react-core-components";

import commonStyles from "../../../../../theme/styles/commonStyles";
import Chip from "../../../../../components/Chip";
import CommonText from "../../../../../components/CommonText";
import { formatDate } from "../../../../../utils/util";
import useIsWebView from "../../../../../hooks/useIsWebView";
import styles from "../BillingInfo.style";
import useFetch from "../../../../../hooks/useFetch";
import { useParams } from "react-router";
import useGetCurrentUser from "../../../../../hooks/useGetCurrentUser";
import {
  APPLICATION,
  BILLING_INFO,
  ROUNDS,
  USER_TYPE_COMPANY,
} from "../../../../../services/apiServices/apiEndPoint";

const useBillingInfo = () => {
  const { isWebView } = useIsWebView();
  const { id } = useParams();
  const { currentModule } = useGetCurrentUser();

  const { fetchData, data } = useFetch({
    url:
      USER_TYPE_COMPANY +
      `/${currentModule}` +
      ROUNDS +
      `/${id}` +
      APPLICATION +
      BILLING_INFO,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  useEffect(() => {
    const fetchBillingData = async () => {
      if (currentModule) {
        const newData = await fetchData();
        console.log("newData", newData);
      }
    };
    fetchBillingData();
  }, [currentModule]);

  function getStatusStyle(status) {
    status = status.toLowerCase();
    switch (status) {
      case "pending":
        return {
          ...(!isWebView ? styles.pending : styles.pendingWeb),
          ...commonStyles.cellTextStyle(12),
        };
      case "closed":
        return {
          ...(!isWebView ? styles.close : styles.closeWeb),
          ...commonStyles.cellTextStyle(12),
        };
      case "published":
        return {
          ...(!isWebView ? styles.inProgress : styles.inProgressWeb),
          ...commonStyles.cellTextStyle(12),
        };
      default:
        return commonStyles.cellTextStyle(12);
    }
  }

  const getColoumConfigs = (item, isHeading) => {
    const tableStyle = isHeading
      ? commonStyles.tableHeadingText
      : commonStyles.cellTextStyle();

    return [
      {
        content: (
          <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
            {item.transaction_id}
          </CommonText>
        ),
        style: commonStyles.columnStyle("20%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText customTextStyle={tableStyle}>
            {item.online_offline_transaction}
          </CommonText>
        ),
        style: commonStyles.columnStyle("20%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText customTextStyle={tableStyle}>
            {item.payment_mode}
          </CommonText>
        ),
        style: commonStyles.columnStyle("20%"),
        isFillSpace: true,
      },
      {
        content: isHeading ? (
          <CommonText customTextStyle={tableStyle}>{item.date}</CommonText>
        ) : (
          <CommonText customTextStyle={tableStyle}>
            {formatDate(item.date)}
          </CommonText>
        ),
        style: commonStyles.columnStyle("20%"),
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
              <Chip label={item.status} style={getStatusStyle(item.status)} />
            )}
          </View>
        ),
        style: commonStyles.columnStyle("20%"),
        isFillSpace: true,
      },
    ];
  };

  const handleSaveAndNext = () => {};

  return {
    handleSaveAndNext,
    getStatusStyle,
    getColoumConfigs,
  };
};

export default useBillingInfo;

export const transactionList = [
  {
    transaction_id: "T0123456",
    online_offline_transaction: "Online",
    payment_mode: "Credit Card",
    date: "10/10/2010",
    status: "Pending",
  },
  {
    transaction_id: "T0123456",
    online_offline_transaction: "Online",
    payment_mode: "Credit Card",
    date: "10/10/2010",
    status: "Pending",
  },
  {
    transaction_id: "T0123457",
    online_offline_transaction: "Online",
    payment_mode: "Credit Card",
    date: "11/15/2011",
    status: "Published",
  },
  {
    transaction_id: "T0123458",
    online_offline_transaction: "Online",
    payment_mode: "Credit Card",
    date: "05/20/2012",
    status: "Published",
  },
  {
    transaction_id: "T0123459",
    online_offline_transaction: "Online",
    payment_mode: "Credit Card",
    date: "03/07/2013",
    status: "Pending",
  },
];
