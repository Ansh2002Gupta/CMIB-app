import React from "react";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../../components/CommonText/CommonText";
import styles from "./profile.style";

function ProfileView(props) {
  const intl = useIntl();

  return (
    <View style={styles.container}>
      <CommonText customTextStyle={styles.header}>
        {intl.formatMessage({ id: "label.my_account" })}
      </CommonText>
    </View>
  );
}

export default ProfileView;
