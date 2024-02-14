import React from "react";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";
import { useWindowDimensions } from "@unthinkable/react-theme/src/useWindowDimensions";

import CommonText from "../CommonText";
import ProfileIcon from "../ProfileIcon/ProfileIcon";
import styles from "./MessageComponent.style";
import { getTime } from "../../utils/util";

const MessageComponent = ({
  data,
  details,
  userDetails,
  index,
  shouldShowAvatar,
}) => {
  const windowDimensions = useWindowDimensions();
  const width1400orLess = windowDimensions.width <= 1500;

  console.log("data", data);

  return (
    <>
      {data?.type === "1st-person" && (
        <>
          {shouldShowAvatar(index) ? (
            <View style={styles.senderContainer}>
              <View style={styles.senderMessageArea}>
                <CommonText>{getTime(data?.created_at)}</CommonText>
                <CommonText
                  customContainerStyle={
                    width1400orLess
                      ? styles.smSenderMessageStyle
                      : styles.senderMessageStyle
                  }
                  customTextStyle={styles.textSize}
                >
                  {data?.message}
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
                  {data?.message}
                </CommonText>
              </View>
            </>
          )}
        </>
      )}
      {data?.type === "2nd-person" && (
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
