import React, { useEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import {
  FlatList,
  Keyboard,
  Platform,
} from "@unthinkable/react-core-components";

import { TwoRow } from "../../core/layouts";

import CustomTextInput from "../CustomTextInput";
import MessageComponent from "../MessageComponent";
import styles from "./ChatSection.style";

const isMob = Platform.OS.toLowerCase() !== "web";

const isMobileProps = isMob ? { inverted: true } : {};

const ChatSection = ({ data }) => {
  const intl = useIntl();
  const [messageValue, setMessageValue] = useState("");
  const [messages, setMessages] = useState(data);
  const flatListRef = useRef(null);

  useEffect(() => {
    if (!isMob && flatListRef.current) {
      const element = flatListRef.current;
      element.scrollTop = element.scrollHeight;
    }
  }, [messages]);

  const handleInputChange = (val) => {
    setMessageValue(val);
  };

  const handleSend = () => {
    Keyboard.dismiss();
    if (messageValue.trim()) {
      const newMessage = {
        senderMessage: messageValue,
      };
      setMessages((previousMessages) => [...previousMessages, newMessage]);
      setMessageValue("");
    }
  };

  return (
    <TwoRow
      topSection={
        <FlatList
          ref={flatListRef}
          data={messages}
          {...isMobileProps}
          style={styles.chatSection}
          keyExtractor={(item) => item.senderMessage.toString()}
          renderItem={({ item }) => {
            return <MessageComponent data={item} />;
          }}
        />
      }
      isTopFillSpace
      topSectionStyle={styles.messageSection}
      bottomSectionStyle={styles.inputSection}
      bottomSection={
        <CustomTextInput
          customStyle={styles.cutomTextInput}
          customTextInputOuterContainer={{
            borderRadius: 12,
            paddingRight: 0,
          }}
          isSendButton
          onChangeText={(val) => handleInputChange(val)}
          onClickAttachement={() => {}}
          onClickSend={handleSend}
          placeholder={intl.formatMessage({ id: "label.type_message" })}
          value={messageValue}
        />
      }
    />
  );
};

ChatSection.propTypes = {
  data: PropTypes.array.isRequired,
};

export default ChatSection;
