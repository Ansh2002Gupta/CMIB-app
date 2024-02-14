import React, { useContext } from "react";
import { useIntl } from "react-intl";
import { useLocation } from "../../routes";
import { MediaQueryContext } from "@unthinkable/react-theme";

import { TwoColumn, TwoRow } from "../../core/layouts";

import ChatSection from "../../components/ChatSection/ChatSection";
import IconHeader from "../../components/IconHeader/IconHeader";
import PopupMessage from "../../components/PopupMessage/PopupMessage";
import TicketDetails from "../TicketDetails";
import useIsWebView from "../../hooks/useIsWebView";
import useTicketDetails from "./controllers/useTicketDetails";
import images from "../../images";
import styles from "./TicketChatScreen.style";
import LoadingScreen from "../../components/LoadingScreen";

const TicketChatScreen = () => {
  const {
    handleLoadMore,
    handlePopup,
    handleSendButton,
    isDetailsScreen,
    loadingMore,
    isticketViewDetails,
    isChatLoading,
    isFirstPageReceived,
    onGoBack,
    setIsDetailScreen,
    showPopup,
    ticketViewDetails,
    chatRecords,
    userDetails,
  } = useTicketDetails();

  const { isWebView } = useIsWebView();
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
                  userDetails={userDetails}
                  handleSendButton={handleSendButton}
                  data={reversedData}
                  details={ticketViewDetails}
                  handleLoadMore={handleLoadMore}
                  loadingMore={loadingMore}
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
                userDetails={userDetails}
                handleSendButton={handleSendButton}
                data={chatRecords}
                details={ticketViewDetails}
                handleLoadMore={handleLoadMore}
                loadingMore={loadingMore}
              />
            )}
          </>
        )
      }
    />
  );
};

export default TicketChatScreen;
