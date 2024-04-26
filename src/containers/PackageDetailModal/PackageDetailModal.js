import React, { useState } from "react";
import { useTheme } from "@unthinkable/react-theme";
import PropTypes from "prop-types";
import {
  Keyboard,
  Platform,
  ScrollView,
  View,
} from "@unthinkable/react-core-components";

import CommonText from "../../components/CommonText";
import useIsWebView from "../../hooks/useIsWebView";
import styles from "./PackageDetailModal.style";
import { TwoColumn } from "../../core/layouts";
import CustomTouchableOpacity from "../../components/CustomTouchableOpacity";
import CustomModal from "../../components/CustomModal";
import PaymentInitiateModal from "../PaymentInitiateModal";
import commonStyles from "../../theme/styles/commonStyles";
import useKeyboardShowHideListener from "../../hooks/useKeyboardShowHideListener";
import { useIntl } from "react-intl";
import getStyles from "./PackageDetailModal.style";

const PackageDetailModal = ({
  packageDetailData,
  isSubscribe,
  handleSubscribeFromDetailmodal,
}) => {
  const { isWebView } = useIsWebView();
  const theme = useTheme();
  const styles = getStyles(theme);
  const intl = useIntl();
  const [showPaymentInitiateModal, setShowPaymentInitiateModal] = useState();
  const [modalData, setModalData] = useState({ amount: 0, subscriptionId: "" });
  const [modalStyle, setModalStyle] = useState({});
  const isIosPlatform = Platform.OS.toLowerCase() === "ios";

  const keyboardDidHideCallback = () => {
    if (isIosPlatform) {
      setModalStyle({ ...styles.modalInnerContainer });
    }
  };

  const isMobileProps =
    Platform.OS.toLowerCase() !== "web"
      ? { automaticallyAdjustKeyboardInsets: false }
      : {};

  const keyboardDidShowCallback = (e) => {
    const keyboardHeight = e?.endCoordinates?.height;
    if (isIosPlatform) {
      setModalStyle(commonStyles.largeModalContainer(keyboardHeight));
    }
  };

  useKeyboardShowHideListener({
    keyboardDidHideCallback,
    keyboardDidShowCallback,
  });

  const renderPaymentInitiateModal = () => {
    return (
      <CustomModal
        headerText={"Pay Amount"}
        customInnerContainerStyle={{
          ...styles.modalInnerContainer,
          ...modalStyle,
        }}
        headerTextStyle={styles.headerTextStyle}
        onBackdropPress={() => {
          setShowPaymentInitiateModal(false);
        }}
      >
        <PaymentInitiateModal
          onPressCancel={() => {
            Keyboard.dismiss();
            setShowPaymentInitiateModal(false);
          }}
          amount={modalData?.amount}
          subscriptionId={modalData?.subscriptionId}
        />
      </CustomModal>
    );
  };

  return (
    <View style={styles.buttonStyle}>
      <ScrollView
        contentContainerStyle={{
          ...styles.contentContainerStyle,
          ...(isWebView ? styles.webContentContainerStyle : {}),
        }}
        keyboardShouldPersistTaps="handled"
        {...isMobileProps}
      >
        <View
          style={{
            ...styles.addApplicationView,
            ...(isWebView ? styles.webAddApplicationView : null),
          }}
        >
          {/* <CommonText
            customTextStyle={styles.addApplicationFormText}
            customTextProps={{ numberOfLines: 1 }}
            fontWeight={"600"}
          >
            {packageDetailData?.name}
          </CommonText> */}
          <CommonText
            customTextStyle={styles.addApplicationFormDescriptionText}
            fontWeight={"500"}
          >
            {`${intl.formatMessage({ id: "label.validityFor" })} ${
              packageDetailData?.validity
            } days`}
          </CommonText>
          <CommonText
            customTextStyle={styles.descriptionText}
            // customTextProps={{ numberOfLines: 3 }}
          >
            {packageDetailData?.description}
          </CommonText>
        </View>
        <View style={styles.borderStyle} />
        <TwoColumn
          style={styles.subscribeButtonContainer}
          leftSection={
            <CommonText customTextStyle={styles.priceText}>
              {packageDetailData?.price}
            </CommonText>
          }
          rightSection={
            <>
              {isSubscribe ? (
                <CustomTouchableOpacity
                  style={styles.subscribePackagesButton}
                  onPress={() => {
                    handleSubscribeFromDetailmodal(
                      packageDetailData?.price,
                      packageDetailData?.id
                    );
                    // setShowPaymentInitiateModal(true);
                    // setModalData({
                    //   ...modalData,
                    //   amount: packageDetailData?.price,
                    //   subscriptionId: packageDetailData?.id,
                    // });
                  }}
                >
                  <CommonText customTextStyle={styles.viewPackageText}>
                    {intl.formatMessage({ id: "label.subscribe" })}
                  </CommonText>
                </CustomTouchableOpacity>
              ) : null}
            </>
          }
        />
      </ScrollView>
      {showPaymentInitiateModal && renderPaymentInitiateModal()}
    </View>
  );
};

PackageDetailModal.defaultProps = {
  isSubscribe: false,
};

PackageDetailModal.propTypes = {
  isSubscribe: PropTypes.bool,
};

export default PackageDetailModal;
