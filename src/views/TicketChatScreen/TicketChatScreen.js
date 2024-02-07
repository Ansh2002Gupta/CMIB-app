import React, { useContext } from "react";
import { useNavigate } from "../../routes";
import { FlatList, View, Platform } from "@unthinkable/react-core-components";
import { MediaQueryContext } from "@unthinkable/react-theme";

import { TwoColumn, TwoRow } from "../../core/layouts";

import CommonText from "../../components/CommonText";
import CustomTextInput from "../../components/CustomTextInput";
import IconHeader from "../../components/IconHeader/IconHeader";
import MessageComponent from "../../components/MessageComponent";
import useIsWebView from "../../hooks/useIsWebView";
import { ticket_replies } from "./ticketsRepliesConstant";
import { PREVIOUS_SCREEN } from "../../constants/constants";
import styles from "./TicketChatScreen.style";

const isMobileProps =
  Platform.OS.toLowerCase() !== "web" ? { inverted: true } : {};

const TicketChatScreen = () => {
  const navigate = useNavigate();
  const { isWebView } = useIsWebView();
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const midOrSmall = currentBreakpoint === "md" || currentBreakpoint === "sm";

  const onGoBack = () => {
    navigate(PREVIOUS_SCREEN);
  };

  return (
    <TwoRow
      style={styles.mainContainer}
      topSection={
        <IconHeader
          headerText={"T0123456"}
          subHeading={"Pending"}
          onPressLeftIcon={onGoBack}
          hasIconBar
        />
      }
      isBottomFillSpace
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
              isWebView && (
                <View style={styles.ticketDetails}>
                  <CommonText>Ticket Details</CommonText>
                </View>
              )
            }
          />
        ) : (
          <ChatSection data={ticket_replies} />
        )
      }
    />
  );
};

export default TicketChatScreen;

const ChatSection = ({ data }) => {
  return (
    <TwoRow
      topSection={
        <FlatList
          data={data}
          style={styles.chatSection}
          renderItem={({ item }) => {
            return <MessageComponent data={item} />;
          }}
          {...isMobileProps}
        />
      }
      isTopFillSpace
      topSectionStyle={styles.messageSection}
      bottomSectionStyle={styles.inputSection}
      bottomSection={<CustomTextInput customStyle={styles.cutomTextInput} />}
    />
  );
};
