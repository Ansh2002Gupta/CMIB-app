import React from "react";
import { View } from "@unthinkable/react-core-components";
import CommonText from "../CommonText";
import styles from "./MessageComponent.style";

const MessageComponent = ({ data }) => {
  console.log("kjfksjl", data);
  return (
    <>
      {!!data?.senderMessage && (
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <CommonText customContainerStyle={styles.senderMessageStyle}>
            {data?.senderMessage}
          </CommonText>
        </View>
      )}
      {!!data?.recieverMessage && (
        <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
          <CommonText customContainerStyle={styles.recieverMessageStyle}>
            {data?.recieverMessage}
          </CommonText>
        </View>
      )}
    </>
  );
};

export default MessageComponent;
