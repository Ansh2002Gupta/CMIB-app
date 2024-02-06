import React from "react";
import { useNavigate } from "../../routes";
import { FlatList, View } from "@unthinkable/react-core-components";

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
