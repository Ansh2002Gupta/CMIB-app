import React from "react";
import CustomModal from "../../components/CustomModal";
import styles from "./CCAvenuePaymentModal.styles";
import { WebView } from "react-native-webview";

const CCA_FE_REDIRECT_URL = "https://cmib.cloudzmall.com/app/dashboard";

const CCAvenueModal = ({
  setCcAvenueUrl,
  ccAvenueUrl,
  modalStyle,
  setOrderNumber,
}) => {
  const getOrderNumber = (urlString) => {
    const regex = /orderNo=([^&]+)/;
    const match = regex.exec(urlString);
    const orderNo = match ? match[1] : null;
    setOrderNumber(orderNo);
  };

  return (
    <CustomModal
      headerText={""}
      customInnerContainerStyle={{
        ...styles.modalWebViewContainer,
        ...modalStyle,
      }}
      onBackdropPress={() => {
        setCcAvenueUrl(null);
      }}
    >
      <WebView
        source={{ uri: ccAvenueUrl || "" }}
        style={{ flex: 1 }}
        onNavigationStateChange={(ele) => {
          if (ele?.url?.includes(CCA_FE_REDIRECT_URL)) {
            getOrderNumber(ele?.url);
            setCcAvenueUrl("");
            return false;
          }
        }}
        onShouldStartLoadWithRequest={(ele) => {
          if (ele?.url?.includes(CCA_FE_REDIRECT_URL)) {
            getOrderNumber(ele?.url);
            setCcAvenueUrl("");
            return false;
          }
        }}
      />
    </CustomModal>
  );
};

export default CCAvenueModal;
