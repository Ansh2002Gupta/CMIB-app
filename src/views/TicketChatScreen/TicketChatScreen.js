import React, { useContext, useState } from "react";
import { useIntl } from "react-intl";
import { useNavigate, useLocation } from "../../routes";
import { MediaQueryContext } from "@unthinkable/react-theme";

import { TwoColumn, TwoRow } from "../../core/layouts";

import ChatSection from "../../components/ChatSection/ChatSection";
import IconHeader from "../../components/IconHeader/IconHeader";
import PopupMessage from "../../components/PopupMessage/PopupMessage";
import TicketDetails from "../TicketDetails";
import useIsWebView from "../../hooks/useIsWebView";
import { ticket_replies } from "./ticketsRepliesConstant";
import { PREVIOUS_SCREEN } from "../../constants/constants";
import images from "../../images";
import styles from "./TicketChatScreen.style";

const TicketChatScreen = () => {
  const navigate = useNavigate();
  const { isWebView } = useIsWebView();
  const intl = useIntl();
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const [isDetailsScreen, setIsDetailScreen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const location = useLocation();

  const { id, status } = location.state;

  const midOrSmall = currentBreakpoint === "md" || currentBreakpoint === "sm";

  const onGoBack = () => {
    if (isDetailsScreen) {
      setIsDetailScreen(false);
    } else {
      navigate(PREVIOUS_SCREEN);
    }
  };

  const handlePopup = () => {
    setShowPopup((prev) => !prev);
  };

  return (
    <TwoRow
      style={styles.mainContainer}
      topSection={
        <>
          <IconHeader
            headerText={isDetailsScreen ? "Tickets Details" : id}
            subHeading={status}
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
            leftSection={<ChatSection data={ticket_replies} />}
            rightSection={
              isWebView && <TicketDetails details={location.state} />
            }
          />
        ) : (
          <>
            {isDetailsScreen ? (
              <TicketDetails details={location.state} />
            ) : (
              <ChatSection data={ticket_replies} />
            )}
          </>
        )
      }
    />
  );
};

export default TicketChatScreen;
