import React from "react";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";
import { useWindowDimensions } from "@unthinkable/react-theme/src/useWindowDimensions";

import CommonText from "../CommonText";
import CustomImage from "../CustomImage";
import ProfileIcon from "../ProfileIcon/ProfileIcon";
import styles from "./MessageComponent.style";
import { getMessageInfo, getTime } from "../../utils/util";

const MessageComponent = ({ data, index, shouldShowAvatar, userDetails }) => {
  const windowDimensions = useWindowDimensions();
  const width1200orLess = windowDimensions.width <= 1200;

  const isSender = getMessageInfo(data, userDetails);

  const MessageAreaComponent = ({ message, sender }) => {
    const senderStyle = sender
      ? width1200orLess
        ? styles.smSenderMessageStyle
        : styles.senderMessageStyle
      : width1200orLess
      ? styles.smRecieverMessageStyle
      : styles.recieverMessageStyle;
    return (
      <CommonText
        customContainerStyle={senderStyle}
        customTextStyle={styles.textSize}
      >
        {message}
      </CommonText>
    );
  };

  const renderAvatarComponent = ({ profile_photo, name }) => (
    <ProfileIcon
      customTextStyle={styles.textSize}
      customOuterContainer={styles.avatarOuterContainer}
      customImageStyle={styles.avatar}
      customContainerStyle={
        !!profile_photo
          ? styles.avatarContainer
          : styles.avatarContainerWithName
      }
      profileImage={profile_photo}
      name={name}
    />
  );

  const renderImage = (url) => {
    return (
      <>
        {!!url && (
          <CustomImage source={{ uri: url }} style={styles.imagesSection} />
        )}
      </>
    );
  };

  switch (isSender) {
    case "sender":
      return (
        <>
          {shouldShowAvatar(index) ? (
            <View style={styles.senderContainer}>
              <View style={styles.senderMessageArea}>
                <CommonText>{getTime(data?.created_at)}</CommonText>
                <MessageAreaComponent message={data?.message} sender />
                {renderImage(data?.file)}
              </View>
              {renderAvatarComponent({
                profile_photo: userDetails?.profile_photo,
                name: userDetails?.name,
              })}
            </View>
          ) : (
            <>
              <View style={styles.shouldShowAvatarSenderMessageArea}>
                <MessageAreaComponent message={data?.message} sender />
                {renderImage(data?.file)}
              </View>
            </>
          )}
        </>
      );
    case "receiver":
      return (
        <>
          {shouldShowAvatar(index) ? (
            <View style={styles.recieverContainer}>
              {renderAvatarComponent({
                profile_photo: data?.author?.profile_photo,
                name: data?.author?.name,
              })}
              <View style={styles.reciverMessageArea}>
                <CommonText>{getTime(data?.created_at)}</CommonText>
                <MessageAreaComponent message={data?.message} sender={false} />
                {renderImage(data?.file)}
              </View>
            </View>
          ) : (
            <>
              <View style={styles.shouldShowAvatarRecieverMessageArea}>
                <MessageAreaComponent message={data?.message} sender={false} />
                {renderImage(data?.file)}
              </View>
            </>
          )}
        </>
      );
    default:
      return <></>;
  }
};

MessageComponent.propTypes = {
  data: PropTypes.object,
  index: PropTypes.number,
  shouldShowAvatar: PropTypes.func,
  userDetails: PropTypes.object,
};

MessageComponent.defaultProps = {
  data: {},
  index: 0,
  userDetails: {},
  shouldShowAvatar: () => {},
};

export default MessageComponent;
