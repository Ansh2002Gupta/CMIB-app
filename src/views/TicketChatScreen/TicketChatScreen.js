import React, { useContext } from "react";
import { useIntl } from "react-intl";
import { useLocation } from "../../routes";
import { MediaQueryContext, useTheme } from "@unthinkable/react-theme";
import { Platform } from "@unthinkable/react-core-components";

import { TwoColumn, TwoRow } from "../../core/layouts";

import ChatSection from "../../components/ChatSection/ChatSection";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import IconHeader from "../../components/IconHeader/IconHeader";
import PopupMessage from "../../components/PopupMessage/PopupMessage";
import TicketDetails from "../TicketDetails";
import LoadingScreen from "../../components/LoadingScreen";
import useIsWebView from "../../hooks/useIsWebView";
import useTicketDetails from "./controllers/useTicketDetails";
import images from "../../images";
import getStyles from "./TicketChatScreen.style";

const TicketChatScreen = () => {
  const location = useLocation();
  const theme = useTheme();
  const styles = getStyles(theme);

  const {
    allDataLoaded,
    chatRecords,
    fileUploadError,
    ErrorChatData,
    erroticketViewDetails,
    errorWhileSendingMessage,
    fetchChatData,
    handleFileUpload,
    handleLoadMore,
    handlePopup,
    handleSendButton,
    initiateFileUpload,
    isChatLoading,
    isErrorChatData,
    isSending,
    isErrorWhileSending,
    isErrorticketViewDetails,
    isDetailsScreen,
    isFirstPageReceived,
    isticketViewDetails,
    loadingMore,
    onGoBack,
    setFileUploadResult,
    setIsDetailScreen,
    setErrorWhileSendingMessages,
    showPopup,
    ticketViewDetails,
  } = useTicketDetails(location.state);

  const { isWebView } = useIsWebView();
  const isMob = Platform.OS.toLowerCase() !== "web";
  const intl = useIntl();
  const { current: currentBreakpoint } = useContext(MediaQueryContext);

  const midOrSmall = currentBreakpoint === "md" || currentBreakpoint === "sm";

  let reversedData = [];

  if (chatRecords.length > 0) {
    reversedData = [...chatRecords].reverse();
  }

  const isLoading = isChatLoading && isFirstPageReceived && isticketViewDetails;

  const renderChatSection = () => {
    return (
      <ChatSection
        data={isMob ? chatRecords : reversedData}
        details={ticketViewDetails}
        {...{
          allDataLoaded,
          errorWhileSendingMessage,
          fileUploadError,
          handleSendButton,
          handleLoadMore,
          handleFileUpload,
          isSending,
          initiateFileUpload,
          isFirstPageReceived,
          isErrorWhileSending,
          loadingMore,
          setFileUploadResult,
          setErrorWhileSendingMessages,
        }}
      />
    );
  };

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        !isErrorChatData && (
          <TwoRow
            style={styles.mainContainer}
            topSection={
              <>
                <IconHeader
                  headerText={
                    isDetailsScreen
                      ? intl.formatMessage({ id: "label.view_ticket_details" })
                      : ticketViewDetails?.readable_id
                  }
                  subHeading={ticketViewDetails?.status}
                  onPressLeftIcon={onGoBack}
                  hasIconBar
                  mobActionButton={images.iconMore}
                  handleButtonClick={() => {
                    handlePopup();
                  }}
                />
                {showPopup && !isDetailsScreen && (
                  <PopupMessage
                    message={intl.formatMessage({
                      id: "label.view_ticket_details",
                    })}
                    customStyle={styles.PopupMessageStyle}
                    onPopupClick={() => {
                      setIsDetailScreen(true);
                      handlePopup();
                    }}
                  />
                )}
              </>
            }
            isBottomFillSpace
            topSectionStyle={styles.topSectionStyle}
            bottomSectionStyle={styles.bottomSectionStyle}
            bottomSection={
              isWebView ? (
                <TwoColumn
                  leftSectionStyle={
                    isWebView
                      ? styles.chatScreenSectionWeb(midOrSmall)
                      : styles.chatScreenSection
                  }
                  rightSectionStyle={styles.ticketDetailsStyles(midOrSmall)}
                  leftSection={!!chatRecords.length && renderChatSection()}
                  rightSection={
                    <>
                      {!isErrorticketViewDetails && (
                        <TicketDetails details={ticketViewDetails} />
                      )}
                      {isErrorticketViewDetails && (
                        <ErrorComponent
                          errorMsg={erroticketViewDetails?.data?.message}
                        />
                      )}
                    </>
                  }
                />
              ) : (
                <>
                  {isDetailsScreen ? (
                    <TicketDetails details={ticketViewDetails} />
                  ) : (
                    !!chatRecords.length && renderChatSection()
                  )}
                </>
              )
            }
          />
        )
      )}
      {isErrorChatData && (
        <ErrorComponent
          errorMsg={ErrorChatData?.data?.message}
          onRetry={() => fetchChatData({})}
        />
      )}
    </>
  );
};

export default TicketChatScreen;
