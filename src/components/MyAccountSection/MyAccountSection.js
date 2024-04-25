import React from "react";
import { useTheme } from "@unthinkable/react-theme";
import { View } from "@unthinkable/react-core-components";

import MyAccountComponent from "../../views/MyAccount";
import getStyles from "./MyAccountSection.style";

const MyAccountSection = ({ setShowAccountSection }) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <View style={styles.container}>
      <MyAccountComponent
        omitArrowIcon
        setShowAccountSection={setShowAccountSection}
      />
    </View>
  );
};

export default MyAccountSection;
