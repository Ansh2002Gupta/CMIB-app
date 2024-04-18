import React, { useState } from "react";
import { Text, View } from "@unthinkable/react-core-components";
import usePaymentForm from "./controllers/usePaymentForm";
import DetailCard from "../../../../components/DetailCard";
import { useIntl } from "react-intl";

const PaymentForm = () => {
  const { paymentDetails, handleBlur, handleInputChange, isEditProfile } =
    usePaymentForm();

  const intl = useIntl();
  return (
    <View>
      <DetailCard
        details={paymentDetails}
        handleBlur={handleBlur}
        headerId={intl.formatMessage({
          id: "label.fill_the_payment_form_slots",
        })}
        handleChange={(fieldName, value) => {
          handleInputChange(fieldName, value);
        }}
        isEditProfile={isEditProfile}
      />
    </View>
  );
};

export default PaymentForm;
