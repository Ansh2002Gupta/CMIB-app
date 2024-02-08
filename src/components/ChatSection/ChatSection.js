import React, { useContext, useEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import {
  FlatList,
  Keyboard,
  Platform,
} from "@unthinkable/react-core-components";

import { TwoRow } from "../../core/layouts";

import CustomTextInput from "../CustomTextInput";
import FormWrapper from "../FormWrapper";
import MessageComponent from "../MessageComponent";
import MessageInfoComponent from "../MessageInfoComponent/MessageInfoComponent";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import styles from "./ChatSection.style";

const isMob = Platform.OS.toLowerCase() !== "web";

const isMobileProps = isMob ? { inverted: true } : {};

const ChatSection = ({ data, details }) => {
  const intl = useIntl();
  const [userProfileDetails] = useContext(UserProfileContext);
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
        timestamp: new Date().toISOString(),
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
          showsHorizontalScrollIndicator={false}
          {...isMobileProps}
          style={styles.chatSection}
          keyExtractor={(item) => item.senderMessage.toString()}
          renderItem={({ item, index }) => {
            return (
              <>
                {index === 5 && !!details?.assigned_to && (
                  <MessageInfoComponent assigneName={details?.assigned_to} />
                )}
                <MessageComponent
                  data={item}
                  userDetails={userProfileDetails?.userDetails}
                  details={details}
                  index={index}
                  messages={messages}
                />
              </>
            );
          }}
        />
      }
      isTopFillSpace
      topSectionStyle={styles.messageSection}
      bottomSectionStyle={styles.inputSection}
      bottomSection={
        <FormWrapper onSubmit={handleSend}>
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
        </FormWrapper>
      }
    />
  );
};

ChatSection.propTypes = {
  data: PropTypes.array.isRequired,
};

export default ChatSection;
