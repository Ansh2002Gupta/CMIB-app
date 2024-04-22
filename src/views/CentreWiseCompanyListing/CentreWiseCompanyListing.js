import React from "react";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../../components/CommonText";
import CustomButton from "../../components/CustomButton";
import useNavigateScreen from "../../services/hooks/useNavigateScreen";
import { navigations } from "../../constants/routeNames";
import styles from "./CentreWiseCompanyListing.styles";

const CentreWiseCompanyListing = () => {
  const { navigateScreen } = useNavigateScreen();
  const intl = useIntl();

  const gotoDetailPage = () => {
    navigateScreen(navigations.COMPANY_DETAILS);
  };
  return (
    <View>
      <CommonText>CentreWiseCompanyListing</CommonText>
      <CustomButton
        style={styles.customStyle}
        children={intl.formatMessage({ id: "label.viewCompanyDetails" })}
        onPress={gotoDetailPage}
      />
    </View>
  );
};

export default CentreWiseCompanyListing;
