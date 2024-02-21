import React, { useContext } from "react";
import { useIntl } from "react-intl";
import { useLocation } from "../../routes";
import { MediaQueryContext } from "@unthinkable/react-theme";
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
import styles from "./TicketChatScreen.style";

const TicketChatScreen = () => {
  const location = useLocation();

  const {
    allDataLoaded,
    chatRecords,
    fileUploadError,
    fileUploadResult,
    erroticketViewDetails,
    isErrorticketViewDetails,
    handleFileUpload,
    handleLoadMore,
    handlePopup,
    handleSendButton,
    initiateFileUpload,
    isChatLoading,
    isDetailsScreen,
    isFirstPageReceived,
    isticketViewDetails,
    loadingMore,
    onGoBack,
    setIsDetailScreen,
    showPopup,
    setFileUploadResult,
    ticketViewDetails,
    userDetails,
    ErrorChatData,
    isErrorChatData,
    isMessageSending,
    isErrorWhileSending,
    errorWhileSendingMessage,
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
        allDataLoaded={allDataLoaded}
        data={isMob ? chatRecords : reversedData}
        details={ticketViewDetails}
        handleSendButton={handleSendButton}
        handleLoadMore={handleLoadMore}
        handleFileUpload={handleFileUpload}
        fileUploadResult={fileUploadResult}
        fileUploadError={fileUploadError}
        isFirstPageReceived={isFirstPageReceived}
        initiateFileUpload={initiateFileUpload}
        setFileUploadResult={setFileUploadResult}
        loadingMore={loadingMore}
        userDetails={userDetails}
        {...{
          isMessageSending,
          isErrorWhileSending,
          errorWhileSendingMessage,
        }}
      />
    );
  };

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
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
      )}
      {isErrorChatData && (
        <ErrorComponent errorMsg={ErrorChatData?.data?.message} />
      )}
    </>
  );
};

export default TicketChatScreen;
