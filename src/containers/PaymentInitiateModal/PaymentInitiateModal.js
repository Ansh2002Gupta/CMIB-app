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
import CommonText from "../../components/CommonText";
import { usePost } from "../../hooks/useApiRequest";
import { COMPANY_INIT_PAYMENT } from "../../services/apiServices/apiEndPoint";
import Spinner from "../../components/Spinner";
import { ADDRESS_MAX_LENGTH, GSTIN_MAX_LENGTH, PAN_MAX_LENGTH } from "../../constants/constants";

const PaymentInitiateModal = ({ onPressCancel, amount, subscriptionId }) => {
  const intl = useIntl();
  const { isWebView } = useIsWebView();
  const [error, setError] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [PONumber, setPONumber] = useState("");
  const [address, setAddress] = useState("");

  const {
    isLoading: isPaymentInitializedLoading,
    makeRequest: packagePaymentInitialization,
    error: errorWhilePaymentInitialization,
    setError: setErrorWhilePaymentInitialization,
  } = usePost({
    url: COMPANY_INIT_PAYMENT,
  });

  const handleDismissToast = () => {
    setErrorWhilePaymentInitialization("");
  };

  const handleSave = () => {

    packagePaymentInitialization({
      body: {
        subscription_id: subscriptionId,
        pan: panNumber,
        po_number: PONumber,
        address: address,
        gstin: gstNumber,
      },
      onErrorCallback: (errorMessage) => {
        // onPressCancel();
      },
      onSuccessCallback: (data) => {
        if (isWebView && data?.data && data?.data?.url) {
          window.open(data?.data?.url, "_self");
        } else {
          window.location.reload();
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


  if (isPaymentInitializedLoading) {
    return (
      <View style={{ ...(isWebView ? styles.loaderStyle : { flex: 1 }) }}>
        <Spinner />
      </View>
    );
  }

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
          {renderAmountHeading(
            intl.formatMessage({ id: "label.subscription_cost" }),
            amount
          )}
        </View>
        <FiveColumn
          firstSection={
            <CustomTextInput
              label={intl.formatMessage({ id: "label.pan" })}
              placeholder={`${intl.formatMessage({
                id: "label.enter",
              })} ${intl.formatMessage({ id: "label.pan" })}`}
              value={panNumber}
              onChangeText={(val) => {
                setPanNumber(val);
              }}
              customStyle={customStyle}
              isError={!!error}
              errorMessage={error}
              maxLength={PAN_MAX_LENGTH}
            />
          }
          secoundSection={
            <CustomTextInput
              label={intl.formatMessage({ id: "label.gstin" })}
              placeholder={"Enter GSTIN"}
              value={gstNumber}
              onChangeText={(val) => {
                setGstNumber(val);
              }}
              customHandleBlur={() => {}}
              customStyle={customStyle}
              isError={!!error}
              errorMessage={error}
              maxLength={GSTIN_MAX_LENGTH}
            />
          }
          thirdSection={
            <CustomTextInput
              label={intl.formatMessage({ id: "label.po_number" })}
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
          fourthSection={
            <CustomTextInput
              label={intl.formatMessage({ id: "label.address_for_hard_copy" })}
              placeholder={"Enter Address"}
              value={address}
              onChangeText={(val) => {
                setAddress(val);
              }}
              customStyle={customStyle}
              isError={!!error}
              errorMessage={error}
              maxLength={ADDRESS_MAX_LENGTH}
            />
          }
        ></FiveColumn>
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
            isButtonTwoGreen
            onPressButtonOne={() => {
              onPressCancel(false);
            }}
            onPressButtonTwo={handleSave}
          />
        </View>
        {!!errorWhilePaymentInitialization && (
          <ToastComponent
            toastMessage={errorWhilePaymentInitialization}
            onDismiss={handleDismissToast}
          />
        )}
      </View>
    </>
  );
};

PaymentInitiateModal.propTypes = {
  onPressCancel: PropTypes.func,
  amount: PropTypes.string,
};

export default PaymentInitiateModal;
