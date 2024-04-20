import React, { useEffect, useState } from "react";
import { View } from "@unthinkable/react-core-components";

import commonStyles from "../../../../../theme/styles/commonStyles";
import Chip from "../../../../../components/Chip";
import CommonText from "../../../../../components/CommonText";
import { mappedDataToUI } from "../mappedData";
import { formatDate } from "../../../../../utils/util";
import useGetCurrentUser from "../../../../../hooks/useGetCurrentUser";
import useIsWebView from "../../../../../hooks/useIsWebView";
import styles from "../PaymentForm.style";

const apiData = {
  gstin: 3,
  tan: 3,
  pan: 5,
  po_number: 7,
  address_for_hard_copy: "kjdfjkasdhjkf dasfjajsdf ",
  total_tds_added: 23,
  final_amount: 23,
};

const usePaymentForm = () => {
  const [paymentDetails, setPaymentDetails] = useState();
  const isEditProfile = true;
  const { currentModule } = useGetCurrentUser();
  const { isWebView } = useIsWebView();

  useEffect(() => {
    setPaymentDetails(mappedDataToUI(apiData));
  }, []);

  const handleInputChange = (fieldName, value) => {
    setPaymentDetails((prevPaymentDetails) => {
      return prevPaymentDetails.map((detail) => {
        if (detail.label === fieldName) {
          return { ...detail, value: value };
        }
        return detail;
      });
    });
  };
  const handleBlur = () => {};
  const handleDownload = () => {};

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
    currentModule,
    getStatusStyle,
    getColoumConfigs,
    handleDownload,
    handleBlur,
    handleInputChange,
    handleSaveAndNext,
    isEditProfile,
    paymentDetails,
  };
};

export default usePaymentForm;

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
