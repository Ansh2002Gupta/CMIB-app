import React, { useContext, useEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { FlatList, Platform, View } from "@unthinkable/react-core-components";
import { TwoRow } from "../../core/layouts";

import CustomTextInput from "../CustomTextInput";
import FormWrapper from "../FormWrapper";
import MessageComponent from "../MessageComponent";
import MessageInfoComponent from "../MessageInfoComponent/MessageInfoComponent";
import Spinner from "../Spinner";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import useHandleInfiniteScroll from "../../hooks/useHandleInfiniteScroll";
import { getTime } from "../../utils/util";
import { MESSAGE_MAX_LENGTH } from "../../constants/constants";
import styles from "./ChatSection.style";

const isMob = Platform.OS.toLowerCase() !== "web";

const ChatSection = ({
  handleSendButton,
  data,
  details,
  handleLoadMore,
  loadingMore,
  userDetails,
}) => {
  const intl = useIntl();
  const [userProfileDetails] = useContext(UserProfileContext);
  const [messageValue, setMessageValue] = useState("");
  const flatListRef = useRef(null);

  const isMobileProps = isMob
    ? {
        inverted: true,
        onEndReached: handleLoadMore,
        onEndReachedThreshold: 0.1,
      }
    : {};

  useHandleInfiniteScroll(handleLoadMore, flatListRef);

  useEffect(() => {
    if (!isMob && flatListRef.current) {
      const element = flatListRef.current;
      element.scrollTop = element.scrollHeight;
    }
  }, [data]);

  const handleInputChange = (val) => {
    setMessageValue(val);
  };

  const handleSend = async () => {
    await handleSendButton(messageValue);
    setMessageValue("");
  };

  const shouldShowAvatar = (currentIndex) => {
    if (currentIndex === 0) {
      return true;
    }
    const currentMessage = data[currentIndex];
    const previous = data[currentIndex - 1];

    const currentTime = getTime(currentMessage?.created_at);
    const previousTime = getTime(previous?.created_at);

    if (currentTime !== previousTime) {
      return true;
    }
    return false;
  };

  const webProps = !isMob ? { size: "xs" } : {};

  const getMessageInfo = (chatData, userDetails) => {
    if (
      chatData.type_id === userDetails?.id &&
      chatData.user_type.toLowerCase() === userDetails?.user_type.toLowerCase()
    ) {
      return true;
    }
    return false;
  };

  const renderMessagesSection = ({ item, index }) => {
    const issender = getMessageInfo(item, userDetails);
    return (
      <>
        {!!details?.system && (
          <MessageInfoComponent assigneName={details?.system} />
        )}
        <MessageComponent
          isSender={issender}
          data={item}
          userDetails={userProfileDetails?.userDetails}
          details={details}
          index={index}
          shouldShowAvatar={shouldShowAvatar}
        />
      </>
    );
  };

  return (
    <TwoRow
      topSection={
        <FlatList
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => {
            if (loadingMore && !isMob) {
              return (
                <View style={styles.loadingStyle}>
                  <Spinner thickness={2} {...webProps} />
                </View>
              );
            }
            return null;
          }}
          ref={flatListRef}
          {...isMobileProps}
          data={data}
          style={styles.chatSection}
          renderItem={renderMessagesSection}
        />
      }
      isTopFillSpace
      topSectionStyle={styles.messageSection}
      bottomSectionStyle={styles.inputSection}
      bottomSection={
        <>
          {!!details?.assigned_to ||
            (true && (
              <FormWrapper onSubmit={handleSend}>
                <CustomTextInput
                  customStyle={styles.cutomTextInput}
                  customTextInputOuterContainer={{
                    borderRadius: 12,
                    paddingRight: 0,
                  }}
                  isSendButton
                  maxLength={MESSAGE_MAX_LENGTH}
                  onChangeText={(val) => handleInputChange(val)}
                  onClickAttachement={() => {}}
                  onClickSend={handleSend}
                  placeholder={intl.formatMessage({ id: "label.type_message" })}
                  value={messageValue}
                />
              </FormWrapper>
            ))}
        </>
      }
    />
  );
};

ChatSection.defaultProps = {
  details: {},
};

ChatSection.propTypes = {
  data: PropTypes.array.isRequired,
  details: PropTypes.object,
  handleLoadMore: PropTypes.func.isRequired,
  loadingMore: PropTypes.bool.isRequired,
};

export default ChatSection;
