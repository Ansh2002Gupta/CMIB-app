import React from "react";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import styles from "./MessageInfoComponent.style";

const MessageInfoComponent = ({ assigneName }) => {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <CommonText fontWeight={"600"} customTextStyle={styles.textSize}>
          {assigneName}&nbsp;
        </CommonText>
        <CommonText customTextStyle={styles.textSize}>
          has been assigned to the ticket
        </CommonText>
      </View>
    </View>
  );
};

MessageInfoComponent.propTypes = {
  assigneName: PropTypes.object.isRequired,
};

export default MessageInfoComponent;
