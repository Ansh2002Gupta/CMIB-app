import React from "react";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";
import { useWindowDimensions } from "@unthinkable/react-theme/src/useWindowDimensions";

import CommonText from "../CommonText";
import ProfileIcon from "../ProfileIcon/ProfileIcon";
import styles from "./MessageComponent.style";
import { getTime } from "../../utils/util";

const MessageComponent = ({ data, details, userDetails, index, messages }) => {
  const windowDimensions = useWindowDimensions();
  const width1400orLess = windowDimensions.width <= 1500;

  const shouldShowAvatar = (currentIndex) => {
    if (currentIndex === 0) return true;
    const currentMessage = messages[currentIndex];
    const previousMessage = messages[currentIndex - 1];
    const currentTime = new Date(currentMessage.timestamp);
    const previousTime = new Date(previousMessage.timestamp);
    if (isNaN(currentTime.getTime()) || isNaN(previousTime.getTime())) {
      return true;
    }
    const isSameUser = currentMessage.senderId === previousMessage.senderId;
    const isWithinOneMinute = currentTime - previousTime < 60 * 1000;
    return !(isSameUser && isWithinOneMinute);
  };

  return (
    <>
      {!!data?.senderMessage && (
        <>
          {shouldShowAvatar(index) ? (
            <View style={styles.senderContainer}>
              <View style={styles.senderMessageArea}>
                <CommonText>
                  {getTime(data?.timestamp) || "10:48 AM"}
                </CommonText>
                <CommonText
                  customContainerStyle={
                    width1400orLess
                      ? styles.smSenderMessageStyle
                      : styles.senderMessageStyle
                  }
                  customTextStyle={styles.textSize}
                >
                  {data?.senderMessage}
                </CommonText>
              </View>

              <ProfileIcon
                customTextStyle={styles.textSize}
                customContainerStyle={styles.avatar}
                name={userDetails?.profile_photo || userDetails?.name}
              />
            </View>
          ) : (
            <>
              <View style={styles.shouldShowAvatarSenderMessageArea}>
                <CommonText
                  customContainerStyle={
                    width1400orLess
                      ? styles.smSenderMessageStyle
                      : styles.senderMessageStyle
                  }
                  customTextStyle={styles.textSize}
                >
                  {data?.senderMessage}
                </CommonText>
              </View>
            </>
          )}
        </>
      )}
      {!!data?.recieverMessage && (
        <View style={styles.recieverContainer}>
          <ProfileIcon
            customTextStyle={styles.textSize}
            customContainerStyle={styles.avatar}
            name={details?.assigned_to}
          />
          <View style={styles.reciverMessageArea}>
            <CommonText>10:38 AM</CommonText>
            <CommonText
              customContainerStyle={
                width1400orLess
                  ? styles.smRecieverMessageStyle
                  : styles.recieverMessageStyle
              }
              customTextStyle={styles.textSize}
            >
              {data?.recieverMessage}
            </CommonText>
          </View>
        </View>
      )}
    </>
  );
};

MessageComponent.propTypes = {
  data: PropTypes.object.isRequired,
};

export default MessageComponent;
