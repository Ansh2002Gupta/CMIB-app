import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Keyboard,
  Platform,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";

import CardComponent from "../../components/CardComponent";
import CommonText from "../../components/CommonText";
import useIsWebView from "../../hooks/useIsWebView";
import styles from "./CaJobsPackagesListing.style";
import { TwoColumn } from "../../core/layouts";
import CustomTouchableOpacity from "../../components/CustomTouchableOpacity";
import CustomModal from "../../components/CustomModal";
import PaymentInitiateModal from "../PaymentInitiateModal";
import commonStyles from "../../theme/styles/commonStyles";
import useKeyboardShowHideListener from "../../hooks/useKeyboardShowHideListener";
import { useIntl } from "react-intl";
import PackageDetailModal from "../PackageDetailModal";

const CaJobsPackagesListing = ({ subscriptionListingData, isSubscribe }) => {
  const { isWebView } = useIsWebView();
  const intl = useIntl();
  const isWebPlatform = Platform.OS.toLowerCase() === "web";
  const [showPaymentInitiateModal, setShowPaymentInitiateModal] = useState();
  const [viewPackageDetailModal, setViewPackageDetailModal] = useState();
  const [detailModalData, setDetailModalData] = useState({});
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

  const renderViewPackageDetailModal = () => {
    return (
      <CustomModal
        headerText={detailModalData?.name}
        isIconCross={true}
        onPressIconCross={()=> setViewPackageDetailModal(false)}
        customInnerContainerStyle={{
          ...styles.modalInnerContainer,
          ...modalStyle,
        }}
        headerTextStyle={styles.addApplicationFormText}
        onBackdropPress={() => {
          setViewPackageDetailModal(false);
        }}
      >
        <PackageDetailModal
          packageDetailData={detailModalData}
          isSubscribe={isSubscribe}
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
              ...(isWebView ? styles.webComponentStyle : {flexDirection: 'column', padding: 16}),
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
                customTextProps={{ numberOfLines: 1 }}
                fontWeight={"600"}
              >
                {container?.name}
              </CommonText>
              <CommonText
                customTextStyle={styles.addApplicationFormDescriptionText}
                fontWeight={"500"}
              >
                {`${intl.formatMessage({ id: "label.validityFor" })} ${
                  container?.validity
                } days`}
              </CommonText>
              <CommonText
                customTextStyle={styles.descriptionText}
              >
                {container?.description?.length > 80
                  ? container?.description?.substr(0, 80).trim() + "..."
                  : container?.description}
                {container?.description?.length > 80 ? (
                  <TouchableOpacity
                    onPress={() => {
                      setViewPackageDetailModal(true);
                      setDetailModalData(container)
                    }}
                    style={{ justifyContent: "flex-end" }}
                  >
                    <CommonText customTextStyle={styles.customButtonTextStyle}>
                      View more
                    </CommonText>
                  </TouchableOpacity>
                ) : null}
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
                <>
                  {isSubscribe ? (
                    <CustomTouchableOpacity
                      style={isWebView ? styles.subscribePackagesButton: styles.subscribePackagesButtonMob}
                      onPress={() => {
                        setShowPaymentInitiateModal(true);
                        setModalData({
                          ...modalData,
                          amount: container?.price,
                          subscriptionId: container.id,
                        });
                      }}
                    >
                      <CommonText customTextStyle={isWebView ? styles.viewPackageText : styles.viewPackageTextMob} fontWeight={"600"}>
                        {intl.formatMessage({ id: "label.subscribe" })}
                      </CommonText>
                    </CustomTouchableOpacity>
                  ) : null}
                </>
              }
            />
          </CardComponent>
        </View>
      ))}
      {showPaymentInitiateModal && renderPaymentInitiateModal()}
      {viewPackageDetailModal && renderViewPackageDetailModal()}
    </View>
  );
};

CaJobsPackagesListing.defaultProps = {
  isSubscribe: false,
};

CaJobsPackagesListing.propTypes = {
  subscriptionListingData: PropTypes.array.isRequired,
  isSubscribe: PropTypes.bool,
};

export default CaJobsPackagesListing;
