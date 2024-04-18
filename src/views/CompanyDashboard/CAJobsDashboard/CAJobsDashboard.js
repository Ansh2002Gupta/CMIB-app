import React from "react";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";
import { useNavigate } from "../../../routes";

import CommonText from "../../../components/CommonText";
import { navigations } from "../../../constants/routeNames";
import CustomButton from "../../../components/CustomButton";

import styles from "../../Dashboard/dashboard.style";

function CAJobsDashboard() {
  const intl = useIntl();
  const navigate = useNavigate();

  const handleOnPress = () => {
    navigate(`${navigations.MANAGE_SUBSCRIPTION}`);
  };

  return (
    <View>
      <CommonText>Dashboard</CommonText>
      <View style={{ width: 200, marginTop: 24 }}>
        <CustomButton
          style={{ paddingVertical: 12, paddingHorizontal: 16 }}
          onPress={() => {
            handleOnPress();
          }}
        >
          <CommonText customTextStyle={styles.viewOtherText}>
            Manage Subscription
          </CommonText>
        </CustomButton>
      </View>
    </View>
  );
}

export default CAJobsDashboard;
