import React from "react";
import { useLocation, useNavigate } from "react-router";
import { WebView } from "react-native-webview";
import styles from "./WebViewScreen.style";
const WebViewScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const uri = location?.state?.uri;
  const handleWebViewEvent = (key) => {
    const eventData = key.nativeEvent.data;
    const parsedEventData = JSON.parse(eventData);
    if (parsedEventData?.path) {
      navigate(parsedEventData.path, {
        state: {
          redirectPath: parsedEventData?.redirectPath,
          data: parsedEventData?.data,
        },
      });
    }
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
      onMessage={(key) => handleWebViewEvent(key)}
    />
  );
};
export default WebViewScreen;
