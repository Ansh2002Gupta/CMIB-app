import { View, Text, Row, Image } from "@unthinkable/react-core-components";
import React from "react";
import styles from "./styles";
import useIsWebView from "../../../hooks/useIsWebView";
import { useIntl } from "react-intl";
import CommonText from "../../../components/CommonText";

const Header = ({ logoUrl = "", companyName = "" }) => {
  const { isWebView } = useIsWebView();
  const intl = useIntl();

  const companyLogo = (
    <View style={styles.companyLogo}>
      <Image
        source={{
          uri: logoUrl ?? "",
        }}
        style={{
          ...(isWebView
            ? styles.webProfileImageStyle
            : styles.mobileProfileImageStyle),
        }}
      />
    </View>
  );

  return (
    <Row style={styles.headerContainer}>
      {companyLogo}

      <View>
        <View style={styles.centreView}>
          <CommonText customTextStyle={styles.centreText}>Centre: </CommonText>
          <CommonText
            customTextStyle={{ ...styles.centreText, ...styles.centreValue }}
          ></CommonText>
        </View>
        <CommonText customTextStyle={styles.companyName}>
          {companyName}
        </CommonText>
      </View>
    </Row>
  );
};

export default Header;
