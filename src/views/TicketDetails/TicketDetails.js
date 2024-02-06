import React, { useRef } from "react";
import { useNavigate } from "../../routes";
import { FlatList, View } from "@unthinkable/react-core-components";

import styles from "./TicketDetails.style";
import IconHeader from "../../components/IconHeader/IconHeader";
import { TwoColumn, TwoRow } from "../../core/layouts";
import CommonText from "../../components/CommonText";
import { PREVIOUS_SCREEN } from "../../constants/constants";
import CustomTextInput from "../../components/CustomTextInput";
import MessageComponent from "../../components/MessageComponent";
import useIsWebView from "../../hooks/useIsWebView";

const ticket_replies = [
  {
    senderMessage:
      "   Lorem ipsum dolor sit amet consectetur. Et rhoncus adipiscing utmolestie potenti sit magna in non. Duis id ornare suspendisse mattismaecenas a congue tincidunt.",
    recieverMessage: "Ok",
  },
  {
    senderMessage:
      "   Lorem  dolor sit amet consectetur. Ependisse mattismaecenas a congue tincidunt.",
    recieverMessage: "Ok",
  },
  {
    senderMessage:
      "   Lorem ipsum dolor sit amet copendisse mattismaecenas a congue tincidunt.",
    recieverMessage:
      "Onsectetur. Et rhoncus adipiscing utmolestie potenti sit magna in non. Duis id ornare susk",
  },
  {
    senderMessage:
      "   Lorem ipsum dolor sit amet consectetur. Et rhoncus adipiscing utmolestie potenti sit magna in non. Duis id ornare suspendisse mattismaecenas a congue tincidunt.",
    recieverMessage: "Ok",
  },
  {
    senderMessage:
      "   Lorem ipsum dolor sit amet consectetur. Et rhoncus adipiscing utmolestie potenti sit magna in non. Duis id ornare suspendisse mattismaecenas a congue tincidunt.",
    recieverMessage: "Ok",
  },
  {
    senderMessage:
      "   Lorem  dolor sit amet consectetur. Ependisse mattismaecenas a congue tincidunt.",
    recieverMessage: "Ok",
  },
  {
    senderMessage:
      "   Lorem ipsum dolor sit amet copendisse mattismaecenas a congue tincidunt.",
    recieverMessage:
      "Onsectetur. Et rhoncus adipiscing utmolestie potenti sit magna in non. Duis id ornare susk",
  },
  {
    senderMessage:
      "   Lorem ipsum dolor sit amet consectetur. Et rhoncus adipiscing utmolestie potenti sit magna in non. Duis id ornare suspendisse mattismaecenas a congue tincidunt.",
    recieverMessage: "Ok",
  },
  {
    senderMessage:
      "   Lorem ipsum dolor sit amet consectetur. Et rhoncus adipiscing utmolestie potenti sit magna in non. Duis id ornare suspendisse mattismaecenas a congue tincidunt.",
    recieverMessage: "Ok",
  },
  {
    senderMessage:
      "   Lorem  dolor sit amet consectetur. Ependisse mattismaecenas a congue tincidunt.",
    recieverMessage: "Ok",
  },
  {
    senderMessage:
      "   Lorem ipsum dolor sit amet copendisse mattismaecenas a congue tincidunt.",
    recieverMessage:
      "Onsectetur. Et rhoncus adipiscing utmolestie potenti sit magna in non. Duis id ornare susk",
  },
  {
    senderMessage:
      "   Lorem ipsum dolor sit amet consectetur. Et rhoncus adipiscing utmolestie potenti sit magna in non. Duis id ornare suspendisse mattismaecenas a congue tincidunt.",
    recieverMessage: "Ok",
  },
];

const TicketDetails = () => {
  const navigate = useNavigate();
  const { isWebView } = useIsWebView();

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
      // isTopFillSpace
      isBottomFillSpace
      bottomSection={
        <TwoColumn
          leftSectionStyle={
            isWebView ? styles.chatScreenSectionWeb : styles.chatScreenSection
          }
          rightSectionStyle={styles.ticketDetailsStyles}
          leftSection={
            <TwoRow
              topSection={
                <FlatList
                  data={ticket_replies}
                  style={{ flex: 1 }}
                  inverted={true}
                  renderItem={({ item }) => {
                    return <MessageComponent data={item} />;
                  }}
                />
              }
              isTopFillSpace
              topSectionStyle={styles.messageSection}
              bottomSectionStyle={styles.inputSection}
              bottomSection={
                <CustomTextInput customStyle={{ paddingBottom: 24 }} />
              }
            />
          }
          rightSection={
            isWebView && (
              <View style={styles.ticketDetails}>
                <CommonText>Ticket Details</CommonText>
              </View>
            )
          }
        />
      }
    />
  );
};

export default TicketDetails;
