import React, { useEffect, useState } from "react";
import { mappedDataToUI } from "../mappedData";

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

  useEffect(() => {
    setPaymentDetails(mappedDataToUI(apiData));
  }, []);

  console.log("paymentDetails", paymentDetails);

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

  return {
    paymentDetails,
    isEditProfile,
    handleInputChange,
    handleBlur,
  };
};

export default usePaymentForm;
