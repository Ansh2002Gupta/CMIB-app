import React, { useContext, useRef } from "react";
import { useTheme } from "@unthinkable/react-theme";
import { useIntl } from "react-intl";
import { useNavigate } from "../../../routes";
import { View } from "@unthinkable/react-core-components";

import CheckBox from "../../../components/CheckBox/CheckBox";
import CustomButton from "../../../components/CustomButton";

import { navigations } from "../../../constants/routeNames";
import { SideBarContext } from "../../../globalContext/sidebar/sidebarProvider";
import { DEBOUNCE_TIME } from "../../../constants/constants";
import getStyles from "./FooterComponent.styles";

const FooterComponent = ({
  isWebView,
  isCheckList,
  setIsCheckList,
  onSubmit,
  submitButtonText = "label.post",
  onCancelPress,
  disabled = false,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const navigate = useNavigate();
  const [sideBarState] = useContext(SideBarContext);
  const { selectedModule } = sideBarState;
  const intl = useIntl();
  const debounceTimeout = useRef(null);
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
            style={styles.checkBoxHeight(isWebView)}
          />
        </View>
      </View>

      <View style={styles.getSecondViewStyle(isWebView)}>
        <View style={styles.buttonViewStyle}>
          <CustomButton
            onPress={() => {
              if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
              }
              debounceTimeout.current = setTimeout(() => {
                if (onCancelPress) {
                  onCancelPress(false);
                } else {
                  navigate(
                    `/${selectedModule?.key}/${navigations.POSTED_JOBS}`,
                    {
                      replace: true,
                    }
                  );
                }
              }, DEBOUNCE_TIME);
            }}
            customStyle={{
              textFontWeight: "500",
              customTextStyle: {
                fontSize: 14,
              },
            }}
            style={styles.cancelButtonStyle(isWebView)}
          >
            {intl.formatMessage({ id: "label.cancel" })}
          </CustomButton>
          <CustomButton
            onPress={() => {
              if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
              }
              debounceTimeout.current = setTimeout(() => {
                onSubmit();
              }, DEBOUNCE_TIME);
            }}
            style={styles.postButtonStyle(isWebView)}
            disabled={disabled}
            withGreenBackground
            customStyle={{
              textFontWeight: "500",
              customTextStyle: {
                fontSize: 14,
              },
            }}
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
