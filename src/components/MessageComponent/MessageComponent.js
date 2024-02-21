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
  isQueryMessage,
  shouldShowAvatar,
  userDetails,
}) => {
  const windowDimensions = useWindowDimensions();
  const width1200orLess = windowDimensions.width <= 1200;

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

  if (isQueryMessage) {
    return (
      <View style={styles.senderContainer}>
        <View style={styles.senderMessageArea}>
          <CommonText>{getTime(details?.created_at)}</CommonText>
          <MessageAreaComponent message={details?.query} sender={true} />
        </View>
        {renderAvatarComponent({
          profile_photo: userDetails?.profile_photo,
          name: userDetails?.name,
        })}
      </View>
    );
  }
  if (isSender === null) {
    return <></>;
  }
  if (isSender) {
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
  } else {
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
  }
};

MessageComponent.propTypes = {
  data: PropTypes.object,
  details: PropTypes.object,
  index: PropTypes.number,
  isSender: PropTypes.bool,
  isQueryMessage: PropTypes.bool,
  shouldShowAvatar: PropTypes.func,
  userDetails: PropTypes.object,
};

MessageComponent.defaultProps = {
  data: {},
  details: {},
  index: 0,
  isSender: false,
  isQueryMessage: false,
  userDetails: {},
  shouldShowAvatar: () => {},
};

export default MessageComponent;
