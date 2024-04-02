import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { MediaQueryContext } from "@unthinkable/react-theme";
import { Platform, ScrollView, View } from "@unthinkable/react-core-components";

import FiveColumn from "../../core/layouts/FiveColumn";

import ActionPairButton from "../../components/ActionPairButton/ActionPairButton";
import CustomTextInput from "../../components/CustomTextInput";
import ToastComponent from "../../components/ToastComponent/ToastComponent";
import useIsWebView from "../../hooks/useIsWebView";
import styles from "./PaymentInitiateModal.style";
import { TwoColumn, TwoRow } from "../../core/layouts";
import CommonText from "../../components/CommonText";
import { usePost } from "../../hooks/useApiRequest";
import { COMPANY_INIT_PAYMENT } from "../../services/apiServices/apiEndPoint";

const PaymentInitiateModal = ({ onPressCancel, amount, subscriptionId }) => {
  const intl = useIntl();
  const { isWebView } = useIsWebView();
  const [error, setError] = useState("");
  const [tdsAmount, setTdsAmount] = useState("");
  const [tan, setTan] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [PONumber, setPONumber] = useState("");
  const [address, setAddress] = useState("");

  // const {
  //     errorWhileChangePassword,
  //     handleUseChangePassword,
  //     isLoading,
  //     isSuccess,
  //     setErrorWhileChangePassword,
  // } = useChangePasswordApi();

  const {
    isLoading: isPaymentInitializedLoading,
    makeRequest: getpaymentInitialized,
  } = usePost({
    url: COMPANY_INIT_PAYMENT,
  });

  const isNextDisabled = () => {
    return !gstNumber || !panNumber || !tdsAmount || !tan || Number(amount)<= Number(tdsAmount);
  };

  // const handleDismissToast = () => {
  //     setErrorWhileChangePassword("");
  // };

  const handleSave = () => {
    if (isNextDisabled()) return;

    getpaymentInitialized({
      body: {
        final_amt: finalAmount,
        subscription_id: subscriptionId,
        pan: panNumber,
        tan: tan,
        po_number: PONumber,
        address: address,
        gstin: gstNumber,
      },
      onErrorCallback: (errorMessage) => {
        console.log("Error", errorMessage);
        onPressCancel();
      },
      onSuccessCallback: (data) => {
        if (isWebView) {
          window.open(data?.data, "_self");
        }
        onPressCancel();
      },
    });
  };

  const baseStyle = isWebView ? styles.containerStyle : styles.inputStyle;
  const errorStyle = isWebView
    ? styles.erroInputStyleWeb
    : styles.erroInputStyle;
  const customStyle = error ? errorStyle : baseStyle;

  const isWebProps =
    Platform.OS.toLowerCase() === "web"
      ? {
          buttonOneStyle: styles.buttonStyle,
          buttonTwoStyle: styles.buttonStyle,
          buttonOneContainerStyle: styles.buttonStyle,
          buttonTwoContainerStyle: styles.buttonStyle,
        }
      : {};

  const isMobileProps =
    Platform.OS.toLowerCase() !== "web"
      ? { automaticallyAdjustKeyboardInsets: false }
      : {};

  const renderAmountHeading = (heading, amount) => {
    return (
      <View>
        <CommonText customTextStyle={styles.amountHeading} fontWeight={"500"}>
          {heading}
        </CommonText>
        <CommonText customTextStyle={styles.amountValueText}>
          {amount}
        </CommonText>
      </View>
    );
  };


  const finalAmount = tdsAmount ? Number(amount) - Number(tdsAmount) : amount;
  const CREDIT_SCORE = 0;

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          ...styles.contentContainerStyle,
          ...(isWebView ? styles.webContentContainerStyle : {}),
        }}
        keyboardShouldPersistTaps="handled"
        {...isMobileProps}
      >
        <View style={styles.subscriptionCostContainer}>
          {renderAmountHeading("Subscription Cost", amount)}
        </View>
        <FiveColumn
          firstSection={
            <CustomTextInput
              label={"TDS/GTDS amount"}
              placeholder={"Enter TDS/GTDS amount"}
              customStyle={styles.containerStyle}
              value={tdsAmount}
              onChangeText={(val) => {
                setTdsAmount(val);
              }}
              isError={Number(amount)<= Number(tdsAmount)}
              errorMessage={Number(amount)<= Number(tdsAmount) ? "TDS/GTDS amount must be less than Subscription Cost" : ""}
              isMandatory
              isNumeric
            />
          }
          secoundSection={
            <CustomTextInput
              label={"TAN"}
              placeholder={"Enter TAN"}
              customStyle={styles.containerStyle}
              value={tan}
              onChangeText={(val) => {
                setTan(val);
              }}
              isMandatory
            />
          }
          thirdSection={
            <CustomTextInput
              label={"PAN"}
              placeholder={"Enter PAN"}
              value={panNumber}
              onChangeText={(val) => {
                setPanNumber(val);
              }}
              customStyle={customStyle}
              isMandatory
              isError={!!error}
              errorMessage={error}
            />
          }
          fourthSection={
            <CustomTextInput
              label={"GSTIN"}
              placeholder={"Enter GSTIN"}
              value={gstNumber}
              onChangeText={(val) => {
                setGstNumber(val);
              }}
              customHandleBlur={() => {}}
              customStyle={customStyle}
              isMandatory
              isError={!!error}
              errorMessage={error}
            />
          }
          fiveSection={
            <CustomTextInput
              label={"PO Number"}
              placeholder={"Enter PO Number"}
              value={PONumber}
              onChangeText={(val) => {
                setPONumber(val);
              }}
              customStyle={customStyle}
              isError={!!error}
              errorMessage={error}
            />
          }
        ></FiveColumn>
        <CustomTextInput
          label={"Address For Hard Copy"}
          placeholder={"Enter Address"}
          value={address}
          onChangeText={(val) => {
            setAddress(val);
          }}
          customStyle={customStyle}
          isError={!!error}
          errorMessage={error}
        />
        <TwoColumn
          leftSection={
            <View>{renderAmountHeading("Final Amount", finalAmount)}</View>
          }
          rightSection={
            <View>{renderAmountHeading("Credit Score", CREDIT_SCORE)}</View>
          }
          isLeftFillSpace
          isRightFillSpace
        />
        <View style={{ marginTop: 24 }}>
          {renderAmountHeading("Amount to be Paid", finalAmount)}
        </View>
      </ScrollView>
      <View style={isWebView ? styles.buttonWebStyle : {}}>
        <View style={isWebView ? styles.subContainerStyle : {}}>
          <ActionPairButton
            buttonOneText={intl.formatMessage({ id: "label.cancel" })}
            buttonTwoText={intl.formatMessage({ id: "label.save" })}
            customStyles={{
              ...isWebProps,
              customContainerStyle: styles.customContainerStyle,
            }}
            // displayLoader={isLoading}
            isDisabled={isNextDisabled()}
            isButtonTwoGreen
            onPressButtonOne={() => {
              onPressCancel(false);
            }}
            onPressButtonTwo={handleSave}
          />
        </View>
      </View>
    </>
  );
};

PaymentInitiateModal.propTypes = {
  onPressCancel: PropTypes.func,
  amount: PropTypes.string,
};

export default PaymentInitiateModal;
