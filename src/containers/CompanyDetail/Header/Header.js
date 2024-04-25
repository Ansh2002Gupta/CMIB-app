import { View, Text, Row, Image } from "@unthinkable/react-core-components";
import { useTheme } from "@unthinkable/react-theme";
import React from "react";
import useIsWebView from "../../../hooks/useIsWebView";
import { useIntl } from "react-intl";
import CommonText from "../../../components/CommonText";
import getStyles from "./styles";

const Header = ({ centreName, comanyLogo = "", companyName }) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const { isWebView } = useIsWebView();
  const intl = useIntl();

  const companyLogo = (
    <View style={styles.companyLogo}>
      <Image
        source={{
          uri: comanyLogo ?? "",
        }}
        style={{
          ...styles.webProfileImageStyle,
        }}
      />
    </View>
  );

  return (
    <Row style={styles.headerContainer}>
      {companyLogo}

      <View>
        <View style={styles.centreView}>
          <CommonText customTextStyle={styles.centreText}>
            {intl.formatMessage({ id: "label.centre" })}:
          </CommonText>
          <CommonText
            customTextStyle={{ ...styles.centreText, ...styles.centreValue }}
          >
            {centreName ?? "-"}
          </CommonText>
        </View>
        <CommonText customTextStyle={styles.companyName}>
          {companyName}
        </CommonText>
      </View>
    </Row>
  );
};

export default Header;
