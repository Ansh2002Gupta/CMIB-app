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

const TicketChatScreen = () => {
  const {
    handleLoadMore,
    handlePopup,
    isDetailsScreen,
    loadingMore,
    onGoBack,
    setIsDetailScreen,
    showPopup,
    ticketData,
    ticketViewDetails,
  } = useTicketDetails();

  const { isWebView } = useIsWebView();
  const intl = useIntl();
  const { current: currentBreakpoint } = useContext(MediaQueryContext);

  const location = useLocation();

  const midOrSmall = currentBreakpoint === "md" || currentBreakpoint === "sm";

  const reversedData = [...ticketData].reverse();

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
              <ChatSection
                data={ticketData}
                details={location.state}
                handleLoadMore={handleLoadMore}
                loadingMore={loadingMore}
              />
            }
            rightSection={
              isWebView && <TicketDetails details={ticketViewDetails} />
            }
          />
        ) : (
          <>
            {isDetailsScreen ? (
              <TicketDetails details={ticketViewDetails} />
            ) : (
              <ChatSection
                data={reversedData}
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
