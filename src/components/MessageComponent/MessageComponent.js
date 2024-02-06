import React from "react";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import CustomImage from "../CustomImage";
import images from "../../images";
import styles from "./MessageComponent.style";

const MessageComponent = ({ data }) => {
  return (
    <>
      {!!data?.senderMessage && (
        <View style={styles.senderContainer}>
          <View style={styles.senderMessageArea}>
            <CommonText>10:38 AM</CommonText>
            <CommonText
              customContainerStyle={styles.senderMessageStyle}
              customTextStyle={styles.textSize}
            >
              {data?.senderMessage}
            </CommonText>
          </View>
          <CustomImage source={images.avatar} style={styles.avatar} />
        </View>
      )}
      {!!data?.recieverMessage && (
        <View style={styles.recieverContainer}>
          <CustomImage source={images.avatar} style={styles.avatar} />
          <View style={styles.reciverMessageArea}>
            <CommonText>10:38 AM</CommonText>
            <CommonText
              customContainerStyle={styles.recieverMessageStyle}
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

export default MessageComponent;
