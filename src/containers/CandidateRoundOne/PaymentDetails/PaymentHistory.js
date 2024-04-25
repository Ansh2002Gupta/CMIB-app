import React from "react";
import { useParams } from "react-router";
import { View } from "@unthinkable/react-core-components";

import CardComponent from "../../../components/CardComponent";
import CustomTable from "../../../components/CustomTable";
import CommonText from "../../../components/CommonText";
import useFetch from "../../../hooks/useFetch";
import useGetUserDetails from "../../../services/apiServices/hooks/UserProfile/useGetUserDetails";
import { TRANSACTION_LIST_HEADING_FOR_NQCA } from "../../../constants/constants";
import { formatDate, formatTime } from "../../../utils/util";
import {
  USER_TYPE_MEMBER,
  ROUNDS,
  TRANSACTIONS,
} from "../../../services/apiServices/apiEndPoint";
import Chip from "../../../components/Chip";
import commonStyles from "../../../theme/styles/commonStyles";
import styles from "./PaymentDetails.style";

const PaymentHistory = ({ intl, isWebView }) => {
  const { currentModules } = useGetUserDetails;
  const id = useParams();
  const { data: paymentList } = useFetch({
    url: `${USER_TYPE_MEMBER}/${currentModules}${ROUNDS}/${id}${TRANSACTIONS}`,
  });

  function getStatusStyle(status) {
    status = status.toLowerCase();
    switch (status) {
      case "pending":
        return {
          ...(!isWebView ? styles.pending : styles.pendingWeb),
          ...commonStyles.cellTextStyle(12),
        };
      case "success":
        return {
          ...(!isWebView ? styles.close : styles.closeWeb),
          ...commonStyles.cellTextStyle(12),
        };
      case "inprogress":
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
            {item.txn_id ?? "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("20%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText customTextStyle={tableStyle}>
            {item.payment_type ?? "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("20%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText customTextStyle={tableStyle}>
            {item.payment_mode ?? "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("20%"),
        isFillSpace: true,
      },
      {
        content: isHeading ? (
          <CommonText customTextStyle={tableStyle}>
            {item.created_at ?? "-"}
          </CommonText>
        ) : (
          <CommonText customTextStyle={tableStyle}>
            {formatDate(item.created_at)}, {formatTime(item.created_at)}
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
                {item.payment_status ?? "-"}
              </CommonText>
            ) : (
              <Chip
                label={item.payment_status ?? "-"}
                style={getStatusStyle(item.payment_status)}
              />
            )}
          </View>
        ),
        style: commonStyles.columnStyle("20%"),
        isFillSpace: true,
      },
    ];
  };

  return (
    <CardComponent customStyle={styles.tableCard}>
      <View style={styles.headerContainer}>
        <CommonText customTextStyle={styles.headerText} fontWeight={"600"}>
          {intl.formatMessage({
            id: "label.paymentHistory",
          })}
        </CommonText>
      </View>
      <CustomTable
        {...{
          customTableStyle: styles.customTableStyle,
          showSearchBar: false,
          currentRecords: paymentList,
          data: paymentList,
          getColoumConfigs,
          getStatusStyle,
          isShowPagination: false,
          isHeading: true,
          tableHeading: TRANSACTION_LIST_HEADING_FOR_NQCA(),
        }}
      />
    </CardComponent>
  );
};

export default PaymentHistory;
