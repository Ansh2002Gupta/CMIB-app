import React from "react";
import PropTypes from "prop-types";
import { FlatList, Platform } from "@unthinkable/react-core-components";

import { TwoRow } from "../../core/layouts";

import CustomTextInput from "../CustomTextInput";
import MessageComponent from "../MessageComponent";
import styles from "./ChatSection.style";

const isMobileProps =
  Platform.OS.toLowerCase() !== "web" ? { inverted: true } : {};

const ChatSection = ({ data }) => {
  return (
    <TwoRow
      topSection={
        <FlatList
          data={data}
          style={styles.chatSection}
          {...isMobileProps}
          renderItem={({ item }) => {
            return <MessageComponent data={item} />;
          }}
        />
      }
      isTopFillSpace
      topSectionStyle={styles.messageSection}
      bottomSectionStyle={styles.inputSection}
      bottomSection={<CustomTextInput customStyle={styles.cutomTextInput} />}
    />
  );
};

ChatSection.propTypes = {
  data: PropTypes.array.isRequired,
};

export default ChatSection;
