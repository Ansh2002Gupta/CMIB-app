import React from "react";
import { WebView } from "react-native-webview";
import { useLocation } from "../../routes";

import styles from "../../theme/styles/commonStyles";

const WebViewScreen = () => {
  const location = useLocation();
  const { uri } = location.state || {};

  const handleWebViewEvent = (key) => {
    const eventData = JSON.parse(key.nativeEvent.data);
  };

  return (
    <WebView
      source={{ uri: uri }}
      style={styles.webViewContainer}
      onError={(syntheticEvent) => {
        const { nativeEvent } = syntheticEvent;
        console.error("WebView error: ", nativeEvent);
      }}
      onHttpError={(syntheticEvent) => {
        const { nativeEvent } = syntheticEvent;
        console.error("HTTP error: ", nativeEvent.statusCode);
      }}
      onMessage={() => handleWebViewEvent()}
    />
  );
};

export default WebViewScreen;
