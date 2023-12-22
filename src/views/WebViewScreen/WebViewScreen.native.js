import React from "react";
import { useLocation, useNavigate } from "react-router";
import { WebView } from "react-native-webview";

import { navigations } from "../../constants/routeNames";
import { EXIT_WEBVIEW } from "../../constants/constants";

const WebViewScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const uri = location.uri;

  const handleWebViewEvent = (key) => {
    const eventData = key.nativeEvent.data;
    console.log('eventData', eventData);
    switch (eventData) {
      case EXIT_WEBVIEW:
        navigate(navigations.LOGIN);
        break;
    }
  };

  return (
    <WebView
      source={{ uri: "http://13.233.17.74:81/jobs" }}
      style={{ flex: 1 }}
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
