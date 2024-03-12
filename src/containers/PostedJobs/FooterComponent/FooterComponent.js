import { View } from "@unthinkable/react-core-components";
import React from "react";
import CheckBox from "../../../components/CheckBox/CheckBox";
import CommonText from "../../../components/CommonText";
import CustomButton from "../../../components/CustomButton";
import styles from "./FooterComponent.styles";
import { useIntl } from "react-intl";
const FooterComponent = ({ isWebView }) => {
  const intl = useIntl();
  return (
    <View style={styles.containerStyle(isWebView)}>
      <View style={styles.firstViewStyles}>
        <View style={styles.checkBoxViewStyle}>
          <CheckBox />
        </View>
        <CommonText customTextStyle={styles.emailDisableTextStyle}>
          {intl.formatMessage({ id: "label.do_not_send_email" })}
        </CommonText>
      </View>
      <View style={styles.getSecondViewStyle(isWebView)}>
        <View style={styles.buttonViewStyle}>
          <CustomButton
            onPress={{}}
            style={styles.cancelButtonStyle(isWebView)}
          >
            {intl.formatMessage({ id: "label.cancel" })}
          </CustomButton>
          <CustomButton
            onPress={{}}
            style={styles.postButtonStyle(isWebView)}
            withGreenBackground
            disabledContainerStyle={{ opacity: 0.5 }}
          >
            {intl.formatMessage({ id: "label.post" })}
          </CustomButton>
        </View>
      </View>
    </View>
  );
};
export default FooterComponent;
