import React, { useEffect, useState } from "react";
import { View } from "@unthinkable/react-core-components";

import commonStyles from "../../../../../theme/styles/commonStyles";
import Chip from "../../../../../components/Chip";
import CommonText from "../../../../../components/CommonText";
import { mappedDataToUI, mappedPayload, offlineFields } from "../mappedData";
import { formatDate, formatTime } from "../../../../../utils/util";
import useGetCurrentUser from "../../../../../hooks/useGetCurrentUser";
import useIsWebView from "../../../../../hooks/useIsWebView";
import styles from "../PaymentForm.style";
import {
  APPLICATION,
  PAY,
  PAYMENT_INFO,
  ROUNDS,
  TRANSACTIONS,
  USER_TYPE_COMPANY,
} from "../../../../../services/apiServices/apiEndPoint";
import useFetch from "../../../../../hooks/useFetch";
import { useParams } from "react-router";
import { useIntl } from "react-intl";
import {
  validateGSTIN,
  validatePAN,
  validateTAN,
} from "../../../../../utils/validation";
import { usePost } from "../../../../../hooks/useApiRequest";
import CustomTouchableOpacity from "../../../../../components/CustomTouchableOpacity";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../../../../constants/errorMessages";

const usePaymentForm = () => {
  const [paymentDetails, setPaymentDetails] = useState();
  const [paymentList, setPaymentList] = useState();
  const isEditProfile = true;
  const intl = useIntl();
  // const { id } = useParams();
  const id = 261;
  const { currentModule } = useGetCurrentUser();
  const { isWebView } = useIsWebView();

  const {
    data,
    fetchData: fetchPaymentDetails,
    isLoading: isLoadingPaymentDetails,
    isError: isErrorPaymentDetails,
    error: errorWhileFetchingListPaymentDetails,
  } = useFetch({
    url:
      USER_TYPE_COMPANY +
      `/${currentModule}` +
      ROUNDS +
      `/${id}` +
      APPLICATION +
      PAYMENT_INFO,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  const {
    fetchData: fetchTransactionList,
    isLoading: isLoadingTransactionList,
    isError: isErrorTransactionList,
    error: errorWhileTransactionList,
  } = useFetch({
    url:
      USER_TYPE_COMPANY +
      `/${currentModule}` +
      ROUNDS +
      `/${id}` +
      APPLICATION +
      TRANSACTIONS,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  const {
    makeRequest,
    isLoading: isLoadingPaymentInit,
    error: errorWhilePaymentInit,
    setError: setErrorWhilePayment,
  } = usePost({
    url:
      USER_TYPE_COMPANY +
      `/${currentModule}` +
      ROUNDS +
      `/${id}` +
      APPLICATION +
      PAY,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  const isLoading = isLoadingTransactionList || isLoadingPaymentDetails;

  const getErrorDetails = () => {
    if (isErrorPaymentDetails && isErrorTransactionList) {
      let errorMessage = "";
      if (
        errorWhileFetchingListPaymentDetails ===
          GENERIC_GET_API_FAILED_ERROR_MESSAGE &&
        errorWhileTransactionList === GENERIC_GET_API_FAILED_ERROR_MESSAGE
      ) {
        errorMessage = GENERIC_GET_API_FAILED_ERROR_MESSAGE;
      } else {
        errorMessage = `${errorWhileFetchingListPaymentDetails?.data?.message} , ${errorWhileTransactionList?.data?.message}`;
      }
      return {
        errorMessage,
        onRetry: () => {
          fetchTransactionList({});
          fetchPaymentDetails();
        },
      };
    }
    if (isErrorPaymentDetails)
      return {
        errorMessage: errorWhileFetchingListPaymentDetails?.data?.message,
        onRetry: () => fetchPaymentDetails({}),
      };
    if (isErrorTransactionList)
      return {
        errorMessage: errorWhileTransactionList?.data?.message,
        onRetry: () => fetchTransactionList(),
      };
    return {
      errorMessage: "",
      onRetry: () => {},
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      if (currentModule) {
        const newData = await fetchPaymentDetails();
        const newTransactionList = await fetchTransactionList();
        setPaymentList([...newTransactionList]);
        setPaymentDetails(mappedDataToUI(newData));
      }
    };
    fetchData();
  }, [currentModule]);

  // const handleValidation = () => {
  //   // const isValid = !paymentDetails.some((detail) => {
  //   //   const isMandatoryAndEmpty =
  //   //     detail.isMandatory && (detail.value === "" || detail.value === null);
  //   //   const hasError = detail.isError === true;
  //   //   return isMandatoryAndEmpty || hasError;
  //   // });
  //   // return isValid;
  // };

  // const isDisabled = !handleValidation();

  const handlePay = () => {
    // const isValid = handleValidation();

    // if (isValid) {
    const payload = mappedPayload(paymentDetails);
    makeRequest({
      body: payload,
      onSuccessCallback: (data) => {
        if (isWebView) {
          if (data?.data && data?.data?.url) {
            window.open(data?.data?.url, "_self");
          } else {
            window.location.reload();
          }
        }
      },
    });
    // }
  };

  const handleInputChange = (fieldName, value) => {
    setPaymentDetails((prevPaymentDetails) => {
      let newPaymentDetails = prevPaymentDetails.map((detail) => {
        if (detail.label === fieldName) {
          return {
            ...detail,
            value: value,
            isError: !value && detail.isMandatory,
            error:
              !value && detail.isMandatory
                ? intl.formatMessage({ id: "label.error.cannot_be_empty" })
                : null,
          };
        }
        return detail;
      });
      if (
        [
          "label.amount_paid",
          "label.total_tds_number",
          "label.amount_to_pay",
        ].includes(fieldName)
      ) {
        const previousAmount = parseFloat(
          newPaymentDetails.find((detail) => detail.key === "amount_paid")
            ?.value || 0
        );
        const tdsNumber = parseFloat(
          newPaymentDetails.find((detail) => detail.key === "totaltdsNumber")
            ?.value || 0
        );
        const amountToPay = parseFloat(
          newPaymentDetails.find((detail) => detail.key === "amount_to_pay")
            ?.value || 0
        );
        const finalAmount = amountToPay - (previousAmount + tdsNumber);
        if (finalAmount < 0) {
          const finalAmountIndex = newPaymentDetails.findIndex(
            (detail) => detail.key === "final_amount"
          );
          if (finalAmountIndex !== -1) {
            newPaymentDetails[finalAmountIndex] = {
              ...newPaymentDetails[finalAmountIndex],
              value: finalAmount,
              isError: true,
              error: intl.formatMessage({
                id: "label.error.cannot_be_negative",
              }),
            };
          }
        } else {
          const finalAmountIndex = newPaymentDetails.findIndex(
            (detail) => detail.key === "final_amount"
          );
          if (finalAmountIndex !== -1) {
            newPaymentDetails[finalAmountIndex] = {
              ...newPaymentDetails[finalAmountIndex],
              value: finalAmount,
              isError: null,
              error: null,
            };
          }
        }
      }

      if (
        fieldName === "label.payment_mode" &&
        value.toLowerCase() === "offline"
      ) {
        // Append the offlineFields to the payment details
        const additionalFields = offlineFields();
        newPaymentDetails = [...newPaymentDetails, ...additionalFields];
      }

      // Remove offlineFields if payment_mode is not "offline"
      if (
        fieldName === "label.payment_mode" &&
        value.toLowerCase() !== "offline"
      ) {
        newPaymentDetails = newPaymentDetails.filter((detail) => {
          return !offlineFields().some(
            (offlineField) => offlineField.key === detail.key
          );
        });
      }

      return newPaymentDetails;
    });
  };

  const handleBlur = (key, index) => {
    setPaymentDetails((prevPaymentDetails) => {
      return prevPaymentDetails.map((detail, detailIndex) => {
        if (index !== detailIndex) {
          return detail;
        }
        let validationError = null;
        switch (key) {
          case "gstin":
            validationError = !!detail.value ? validateGSTIN(detail.value) : "";
            break;
          case "tan":
            validationError = !!detail.value ? validateTAN(detail.value) : "";
            break;
          case "pan":
            validationError = !!detail.value ? validatePAN(detail.value) : "";
            break;
          case "poNumber":
            validationError = !!detail.value ? validatePAN(detail.value) : "";
            break;
          default:
            validationError = !!detail.value
              ? ""
              : intl.formatMessage({ id: "label.error.cannot_be_empty" });
            break;
        }
        return {
          ...detail,
          isError: !!validationError,
          error: validationError,
        };
      });
    });
  };

  const handleDownload = () => {};

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
  const handleSaveAndNext = () => {};

  return {
    currentModule,
    getStatusStyle,
    getColoumConfigs,
    handleDownload,
    handlePay,
    handleBlur,
    paymentList,
    // isDisabled,
    handleInputChange,
    handleSaveAndNext,
    getErrorDetails,
    isLoading,
    // handleValidation,
    errorWhilePaymentInit,
    setErrorWhilePayment,
    isLoadingPaymentInit,
    isEditProfile,
    paymentDetails,
  };
};

export default usePaymentForm;
