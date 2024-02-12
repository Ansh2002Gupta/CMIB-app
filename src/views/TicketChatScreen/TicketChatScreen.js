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
import useTicketDetails from "./controllers/useTicketDetails";
import { ticket_replies } from "./ticketsRepliesConstant";
import { PREVIOUS_SCREEN } from "../../constants/constants";
import images from "../../images";
import styles from "./TicketChatScreen.style";
import LoadingScreen from "../../components/LoadingScreen";

const TicketChatScreen = () => {
  const navigate = useNavigate();
  const { isWebView } = useIsWebView();
  const intl = useIntl();
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const [isDetailsScreen, setIsDetailScreen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const location = useLocation();
  const { id } = location.state;
  const midOrSmall = currentBreakpoint === "md" || currentBreakpoint === "sm";
  const { ticketViewData, isTicketViewData } = useTicketDetails(id);
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

  console.log(JSON.stringify(ticketViewData), "ticketViewData@");
  console.log(JSON.stringify(location.state), "location@");
  return (
    <TwoRow
      style={styles.mainContainer}
      topSection={
        <>
          <IconHeader
            headerText={
              isDetailsScreen
                ? intl.formatMessage({ id: "label.view_ticket_details" })
                : ticketViewData?.readable_id
            }
            subHeading={ticketViewData?.status}
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
        isTicketViewData ? (
          <LoadingScreen />
        ) : isWebView ? (
          <TwoColumn
            leftSectionStyle={
              isWebView
                ? styles.chatScreenSectionWeb(midOrSmall)
                : styles.chatScreenSection
            }
            rightSectionStyle={styles.ticketDetailsStyles(midOrSmall)}
            leftSection={
              <ChatSection data={ticket_replies} details={ticketViewData} />
            }
            rightSection={
              isWebView && <TicketDetails details={ticketViewData} />
            }
          />
        ) : (
          <>
            {isDetailsScreen ? (
              <TicketDetails details={ticketViewData} />
            ) : (
              <ChatSection data={ticket_replies} details={ticketViewData} />
            )}
          </>
        )
      }
    />
  );
};

export default TicketChatScreen;
