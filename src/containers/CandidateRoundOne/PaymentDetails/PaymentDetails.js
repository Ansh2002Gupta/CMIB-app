import React, { useEffect } from "react";
import { ScrollView } from "@unthinkable/react-core-components";

import MultiRow from "../../../core/layouts/MultiRow";

import Pay from "./Pay";
import PaymentHistory from "./PaymentHistory";
import styles from "./PaymentDetails.style";

const PaymentDetails = ({ intl, isWebView, handleSave = () => {} }) => {
  const paymentDetailsConfig = [
    {
      content: <Pay intl={intl} isWebView={isWebView} />,
    },
    {
      content: <PaymentHistory intl={intl} isWebView={isWebView} />,
    },
  ];

  useEffect(() => {
    handleSave(true);
  }, []);

  return (
    <ScrollView>
      <MultiRow rows={paymentDetailsConfig} style={styles.mainContainer} />
    </ScrollView>
  );
};

export default PaymentDetails;
