import React from "react";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";
import { useWindowDimensions } from "@unthinkable/react-theme/src/useWindowDimensions";

import CommonText from "../CommonText";
import CustomImage from "../CustomImage";
import images from "../../images";
import styles from "./MessageComponent.style";

const MessageComponent = ({ data }) => {
  const windowDimensions = useWindowDimensions();
  const width1400orLess = windowDimensions.width <= 1400;
  return (
    <>
      {!!data?.senderMessage && (
        <View style={styles.senderContainer}>
          <View style={styles.senderMessageArea}>
            <CommonText>10:38 AM</CommonText>
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
          <CustomImage source={images.avatar} style={styles.avatar} />
        </View>
      )}
      {!!data?.recieverMessage && (
        <View style={styles.recieverContainer}>
          <CustomImage source={images.avatar} style={styles.avatar} />
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
