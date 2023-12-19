import React, { useState } from "react";
import { WebView } from "react-native-webview";
import { useLocation } from "../../routes";

const WebViewScreen = ({ route }) => {
  const [showWebView, setShowWebView] = useState(false);
  const location = useLocation();
  const { uri } = location.state || {};

  const handleWebViewEvent = (key) => {
    const eventData = JSON.parse(key.nativeEvent.data);
    setShowWebView(false);
  };

  return (
    <WebView
      source={{ uri: uri }}
      style={{ flex: 1 }}
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
