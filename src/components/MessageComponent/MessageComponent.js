import React from "react";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import MessageAreaComponent from "../MessageAreaComponent/MessageAreaComponent";
import Image from "../ImagePreview";
import ProfileIcon from "../ProfileIcon/ProfileIcon";
import styles from "./MessageComponent.style";
import { getMessageInfo, getTime } from "../../utils/util";

const MessageComponent = ({ data, index, shouldShowAvatar, userDetails }) => {
  const isSender = getMessageInfo(data, userDetails);

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
        {!!url && <Image source={url} style={styles.imagesSection} preview />}
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
