import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Image,
  Keyboard,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";

import CardComponent from "../../components/CardComponent";
import CommonText from "../../components/CommonText";
import useIsWebView from "../../hooks/useIsWebView";
import classes from "../../theme/styles/CssClassProvider";
import styles from "./dashboard.style";
import { TwoColumn } from "../../core/layouts";
import CustomTouchableOpacity from "../../components/CustomTouchableOpacity";
import CustomModal from "../../components/CustomModal";
import PaymentInitiateModal from "../../containers/PaymentInitiateModal";
import commonStyles from "../../theme/styles/commonStyles";
import useKeyboardShowHideListener from "../../hooks/useKeyboardShowHideListener";

const MainContainerTemplate = ({ subscriptionListingData }) => {
  const { isWebView } = useIsWebView();
  const isWebPlatform = Platform.OS.toLowerCase() === "web";
  const [showPaymentInitiateModal, setShowPaymentInitiateModal] = useState();
  const [modalData, setModalData] = useState({ amount: 0, subscriptionId: "" });
  const [modalStyle, setModalStyle] = useState({});
  const isIosPlatform = Platform.OS.toLowerCase() === "ios";

  const keyboardDidHideCallback = () => {
    if (isIosPlatform) {
      setModalStyle({ ...styles.modalInnerContainer });
    }
  };

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

  // const cardComponentWebProps = isWebPlatform
  //     ? { className: classes["card-box__outline--green"] }
  //     : {};

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
    <View
      style={{
        ...(!isWebPlatform ? styles.mobContainer : {}),
        ...(isWebView ? styles.webContainerStyle : styles.containerStyle),
      }}
    >
      {subscriptionListingData?.map((container, index) => (
        <View style={styles.buttonStyle}>
          <CardComponent
            customStyle={{
              ...styles.componentStyle,
              ...(isWebView ? styles.webComponentStyle : {}),
            }}
          >
            <View
              style={{
                ...styles.addApplicationView,
                ...(isWebView ? styles.webAddApplicationView : null),
              }}
            >
              <CommonText
                customTextStyle={styles.addApplicationFormText}
                fontWeight={"600"}
              >
                {container?.name}
              </CommonText>
              <CommonText
                customTextStyle={styles.addApplicationFormDescriptionText}
                fontWeight={"500"}
              >
                Validity for {container?.validity} days
              </CommonText>
              <CommonText customTextStyle={styles.descriptionText}>
                {container?.description}
              </CommonText>
            </View>
            <View style={styles.borderStyle} />
            <TwoColumn
              style={styles.subscribeButtonContainer}
              leftSection={
                <CommonText customTextStyle={styles.priceText}>
                  {container?.price}
                </CommonText>
              }
              rightSection={
                <CustomTouchableOpacity
                  style={styles.subscribePackagesButton}
                  onPress={() => {
                    setShowPaymentInitiateModal(true);
                    setModalData({
                      ...modalData,
                      amount: container?.price,
                      subscriptionId: container.id,
                    });
                  }}
                >
                  <CommonText customTextStyle={styles.viewPackageText}>
                    Subscribe
                  </CommonText>
                </CustomTouchableOpacity>
              }
            />
          </CardComponent>
        </View>
      ))}
      {showPaymentInitiateModal && renderPaymentInitiateModal()}
    </View>
  );
};

MainContainerTemplate.propTypes = {
  subscriptionListingData: PropTypes.array.isRequired,
};

export default MainContainerTemplate;
