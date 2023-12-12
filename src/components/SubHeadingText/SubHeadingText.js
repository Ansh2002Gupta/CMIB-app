import React from "react";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import styles from "./SubHeading.style";

const SubHeadingText = ({ text }) => {
  return (
    <View>
      <CommonText customTextStyle={styles.heading} title={text} />
    </View>
  );
};

export default SubHeadingText;
