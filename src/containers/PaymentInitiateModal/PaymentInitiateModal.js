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
// import { WebView } from "react-native-webview";
import {
  ADDRESS_MAX_LENGTH,
  GSTIN_MAX_LENGTH,
  PAN_MAX_LENGTH,
} from "../../constants/constants";
import { validateGSTIN, validatePAN } from "../../utils/validation";

const PaymentInitiateModal = ({ onPressCancel, amount, subscriptionId }) => {
  const intl = useIntl();
  const { isWebView } = useIsWebView();
  const [errors, setErrors] = useState({
    panNumber: "",
    gstNumber: "",
    address: "",
  });
  const [panNumber, setPanNumber] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [PONumber, setPONumber] = useState("");
  const [address, setAddress] = useState("");
  const [ccAvenueUrl, setCcAvenueUrl] = useState("");

  const {
    isLoading: isPaymentInitializedLoading,
    makeRequest: packagePaymentInitialization,
    error: errorWhilePaymentInitialization,
    setError: setErrorWhilePaymentInitialization,
  } = usePost({
    url: COMPANY_INIT_PAYMENT,
  });

  const validateFields = ({ field }) => {
    let isValid = true;
    let newErrors = {
      panNumber: "",
      gstNumber: "",
      address: "",
    };

    if (!field || field === "address") {
      const enteredAddress = address;
      if (enteredAddress && enteredAddress.trim().length > ADDRESS_MAX_LENGTH) {
        newErrors.address = intl.formatMessage({
          id: "label.address_validation",
        });
        isValid = false;
      }
    }

    if (!field || field === "panNumber") {
      const enteredGstin = panNumber;
      if (enteredGstin && validatePAN(enteredGstin)) {
        newErrors.panNumber = intl.formatMessage({
          id: "label.pan_validation",
        });
        isValid = false;
      }
    }

    if (!field || field === "gstNumber") {
      const enteredPAN = gstNumber;
      if (enteredPAN && validateGSTIN(enteredPAN)) {
        newErrors.gstNumber = intl.formatMessage({
          id: "label.gstin_validation",
        });
        isValid = false;
      }
    }

    if (field && newErrors[field] !== undefined) {
      setErrors({
        ...errors,
        [field]: newErrors[field],
      });
    } else {
      setErrors(newErrors);
    }

    return isValid;
  };

  const handleDismissToast = () => {
    setErrorWhilePaymentInitialization("");
  };

  const isNextDisabled = () => {
    return errors.address || errors.panNumber || errors.gstNumber;
  };

  const handleSave = () => {
    if (isNextDisabled()) return;
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
        if (isWebView) {
          if (data?.data && data?.data?.url) {
            window.open(data?.data?.url, "_self");
          } else {
            window.location.reload();
          }
        } else {
          if (data?.data) {
            setCcAvenueUrl(data?.data?.url);
          }
        }
        onPressCancel();
      },
    });
  };

  const handleBlur = (name) => {
    validateFields({ field: name });
  };

  const baseStyle = isWebView ? styles.containerStyle : styles.inputStyle;
  const customStyle = baseStyle;

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
              customHandleBlur={() => handleBlur("panNumber")}
              label={intl.formatMessage({ id: "label.pan" })}
              placeholder={`${intl.formatMessage({
                id: "label.enter",
              })} ${intl.formatMessage({ id: "label.pan" })}`}
              value={panNumber}
              onChangeText={(val) => {
                setPanNumber(val.trim());
              }}
              customStyle={customStyle}
              isError={!!errors.panNumber}
              errorMessage={errors.panNumber}
              maxLength={PAN_MAX_LENGTH}
            />
          }
          secoundSection={
            <CustomTextInput
              customHandleBlur={() => handleBlur("gstNumber")}
              label={intl.formatMessage({ id: "label.gstin" })}
              placeholder={"Enter GSTIN"}
              value={gstNumber}
              onChangeText={(val) => {
                setGstNumber(val.trim());
              }}
              customStyle={customStyle}
              isError={!!errors.gstNumber}
              errorMessage={errors.gstNumber}
              maxLength={GSTIN_MAX_LENGTH}
            />
          }
          thirdSection={
            <CustomTextInput
              label={intl.formatMessage({ id: "label.po_number" })}
              placeholder={"Enter PO Number"}
              value={PONumber}
              onChangeText={(val) => {
                setPONumber(val.trim());
              }}
              customStyle={customStyle}
              // isError={!!errors.address}
              // errorMessage={errors.address}
            />
          }
          fourthSection={
            <CustomTextInput
              customHandleBlur={() => handleBlur("address")}
              isMultiline
              label={intl.formatMessage({
                id: "label.address_for_hard_copy",
              })}
              maxLength={ADDRESS_MAX_LENGTH}
              onChangeText={(val) => setAddress(val)}
              placeholder={intl.formatMessage({
                id: "label.address_for_hard_copy",
              })}
              value={address}
              isError={!!errors.address}
              errorMessage={errors.address}
            />
          }
        ></FiveColumn>
      </ScrollView>
      <View style={isWebView ? styles.buttonWebStyle : {}}>
        <View style={isWebView ? styles.subContainerStyle : {}}>
          <ActionPairButton
            buttonOneText={intl.formatMessage({ id: "label.cancel" })}
            buttonTwoText={intl.formatMessage({ id: "label.pay" })}
            customStyles={{
              ...isWebProps,
              customContainerStyle: styles.customContainerStyle,
            }}
            isButtonTwoGreen
            onPressButtonOne={() => {
              onPressCancel(false);
            }}
            onPressButtonTwo={handleSave}
            isDisabled={isNextDisabled()}
          />
        </View>
        {!!errorWhilePaymentInitialization && (
          <ToastComponent
            toastMessage={errorWhilePaymentInitialization}
            onDismiss={handleDismissToast}
          />
        )}
      </View>
      {/* <WebView
        source={{uri: ccAvenueUrl}}
        onNavigationStateChange={(ele) => {
          // if (ele.url?.includes(Config.CCAVENUE_CANCEL_REDIRECT_URL)) {
          //   setCcAvenueUrl(null);
          // }
        }}
      /> */}
    </>
  );
};

PaymentInitiateModal.propTypes = {
  onPressCancel: PropTypes.func,
  amount: PropTypes.string,
};

export default PaymentInitiateModal;
