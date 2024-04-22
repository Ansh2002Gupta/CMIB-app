import { View, Text, Row } from "@unthinkable/react-core-components";
import React from "react";
import styles from "./styles";
import useIsWebView from "../../../hooks/useIsWebView";
import { useIntl } from "react-intl";
import CommonText from "../../../components/CommonText";

const Header = () => {
  const { isWebView } = useIsWebView();
  const intl = useIntl();

  return (
    <Row style={styles.headerContainer}>
      <CommonText
        fontWeight={isWebView ? "500" : "600"}
        customTextStyle={{
          ...(isWebView ? styles.titleText : styles.titleTextMobile),
        }}
      >
        {intl.formatMessage({ id: "label.job_profile" })}
      </CommonText>
    </Row>
  );
};

export default Header;
