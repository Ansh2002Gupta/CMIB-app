import React from "react";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";
import { useWindowDimensions } from "@unthinkable/react-theme/src/useWindowDimensions";

import CommonText from "../CommonText";
import CustomImage from "../CustomImage";
import ProfileIcon from "../ProfileIcon/ProfileIcon";
import styles from "./MessageComponent.style";
import { getTime } from "../../utils/util";

const MessageComponent = ({
  data,
  details,
  index,
  isSender,
  shouldShowAvatar,
  userDetails,
}) => {
  const windowDimensions = useWindowDimensions();
  const width1400orLess = windowDimensions.width <= 1500;

  if (isSender) {
    return (
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
              {!!data?.file && (
                <CustomImage source={data?.file} style={styles.imagesSection} />
              )}
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
    );
  } else {
    return (
      <>
        {shouldShowAvatar(index) ? (
          <View style={styles.recieverContainer}>
            <ProfileIcon
              customTextStyle={styles.textSize}
              customContainerStyle={styles.avatar}
              name={details?.assigned_to}
            />
            <View style={styles.reciverMessageArea}>
              <CommonText>{getTime(data?.created_at)}</CommonText>
              <CommonText
                customContainerStyle={
                  width1400orLess
                    ? styles.smRecieverMessageStyle
                    : styles.recieverMessageStyle
                }
                customTextStyle={styles.textSize}
              >
                {data?.message}
              </CommonText>
            </View>
          </View>
        ) : (
          <>
            <View style={styles.shouldShowAvatarRecieverMessageArea}>
              <CommonText
                customContainerStyle={
                  width1400orLess
                    ? styles.smRecieverMessageStyle
                    : styles.recieverMessageStyle
                }
                customTextStyle={styles.textSize}
              >
                {data?.message}
              </CommonText>
            </View>
          </>
        )}
      </>
    );
  }
};

MessageComponent.propTypes = {
  data: PropTypes.object.isRequired,
};

export default MessageComponent;
