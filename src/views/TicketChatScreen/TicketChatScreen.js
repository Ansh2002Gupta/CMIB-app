import React, { useContext } from "react";
import { useIntl } from "react-intl";
import { useLocation } from "../../routes";
import { MediaQueryContext } from "@unthinkable/react-theme";
import { Platform } from "@unthinkable/react-core-components";

import { TwoColumn, TwoRow } from "../../core/layouts";

import ChatSection from "../../components/ChatSection/ChatSection";
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
    ticketViewDetails,
    userDetails,
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

  return (
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
              message={intl.formatMessage({ id: "label.view_ticket_details" })}
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
            leftSection={
              isChatLoading && isFirstPageReceived ? (
                <LoadingScreen />
              ) : (
                <ChatSection
                  isFirstPageReceived={isFirstPageReceived}
                  allDataLoaded={allDataLoaded}
                  userDetails={userDetails}
                  handleSendButton={handleSendButton}
                  data={reversedData}
                  details={ticketViewDetails}
                  handleLoadMore={handleLoadMore}
                  loadingMore={loadingMore}
                  initiateFileUpload={initiateFileUpload}
                  handleFileUpload={handleFileUpload}
                  fileUploadResult={fileUploadResult}
                  fileUploadError={fileUploadError}
                />
              )
            }
            rightSection={
              isticketViewDetails ? (
                <LoadingScreen />
              ) : (
                <TicketDetails details={ticketViewDetails} />
              )
            }
          />
        ) : (
          <>
            {isDetailsScreen ? (
              isticketViewDetails ? (
                <LoadingScreen />
              ) : (
                <TicketDetails details={ticketViewDetails} />
              )
            ) : isChatLoading && isFirstPageReceived ? (
              <LoadingScreen />
            ) : (
              <ChatSection
                allDataLoaded={allDataLoaded}
                userDetails={userDetails}
                handleSendButton={handleSendButton}
                data={isMob ? chatRecords : reversedData}
                details={ticketViewDetails}
                handleLoadMore={handleLoadMore}
                loadingMore={loadingMore}
                initiateFileUpload={initiateFileUpload}
                handleFileUpload={handleFileUpload}
                fileUploadResult={fileUploadResult}
                fileUploadError={fileUploadError}
              />
            )}
          </>
        )
      }
    />
  );
};

export default TicketChatScreen;
