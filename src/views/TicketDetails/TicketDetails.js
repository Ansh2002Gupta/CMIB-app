import React, { useContext } from "react";
import { useNavigate } from "../../routes";
import { FlatList, View } from "@unthinkable/react-core-components";
import { MediaQueryContext } from "@unthinkable/react-theme";

import { TwoColumn, TwoRow } from "../../core/layouts";

import CommonText from "../../components/CommonText";
import CustomTextInput from "../../components/CustomTextInput";
import IconHeader from "../../components/IconHeader/IconHeader";
import MessageComponent from "../../components/MessageComponent";
import useIsWebView from "../../hooks/useIsWebView";
import { ticket_replies } from "./ticketsRepliesConstant";
import { PREVIOUS_SCREEN } from "../../constants/constants";
import styles from "./TicketDetails.style";

const TicketDetails = () => {
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

export default TicketDetails;

const ChatSection = ({ data }) => {
  return (
    <TwoRow
      topSection={
        <FlatList
          data={data}
          style={styles.chatSection}
          inverted={true}
          renderItem={({ item }) => {
            return <MessageComponent data={item} />;
          }}
        />
      }
      isTopFillSpace
      topSectionStyle={styles.messageSection}
      bottomSectionStyle={styles.inputSection}
      bottomSection={<CustomTextInput customStyle={styles.cutomTextInput} />}
    />
  );
};
