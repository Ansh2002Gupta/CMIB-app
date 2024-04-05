import React from "react";
import { useNavigate } from "../../../routes";
import { View } from "@unthinkable/react-core-components";

import CheckBox from "../../../components/CheckBox/CheckBox";
import CustomButton from "../../../components/CustomButton";

import { useIntl } from "react-intl";
import styles from "./FooterComponent.styles";

const FooterComponent = ({
  isWebView,
  isCheckList,
  setIsCheckList,
  onSubmit,
  submitButtonText = "label.post",
}) => {
  const navigate = useNavigate();
  const intl = useIntl();
  return (
    <View style={styles.containerStyle(isWebView)}>
      <View style={styles.firstViewStyles}>
        <View style={styles.checkBoxViewStyle}>
          <CheckBox
            title={intl.formatMessage({ id: "label.do_not_send_email" })}
            handleCheckbox={(vale) => {
              setIsCheckList((prev) => !prev);
            }}
            id={`isCheckList${isCheckList}`}
            isSelected={isCheckList}
          />
        </View>
      </View>

      <View style={styles.getSecondViewStyle(isWebView)}>
        <View style={styles.buttonViewStyle}>
          <CustomButton
            onPress={() => {
              navigate(-1);
            }}
            style={styles.cancelButtonStyle(isWebView)}
          >
            {intl.formatMessage({ id: "label.cancel" })}
          </CustomButton>
          <CustomButton
            onPress={() => onSubmit()}
            style={styles.postButtonStyle(isWebView)}
            withGreenBackground
            disabledContainerStyle={{ opacity: 0.5 }}
          >
            {intl.formatMessage({ id: submitButtonText })}
          </CustomButton>
        </View>
      </View>
    </View>
  );
};
export default FooterComponent;