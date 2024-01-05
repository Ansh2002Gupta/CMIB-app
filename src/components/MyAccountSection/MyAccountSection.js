import React from "react";
import { View } from "@unthinkable/react-core-components";

import MyAccountComponent from "../../views/MyAccount";
import styles from "./MyAccountSection.style";

const MyAccountSection = ({ setShowAccountSection, accountRef }) => {
  return (
    <View style={styles.container} ref={accountRef}>
      <MyAccountComponent
        omitArrowIcon={true}
        setShowAccountSection={setShowAccountSection}
      />
    </View>
  );
};

export default MyAccountSection;
