import React, { useContext } from "react";
import PropTypes from "prop-types";
import { MediaQueryContext, useTheme } from "@unthinkable/react-theme";
import { Platform, View } from "@unthinkable/react-core-components";

import CommonText from "../../components/CommonText";
import CustomTouchableOpacity from "../../components/CustomTouchableOpacity";
import Stepper from "../../components/Stepper";
import { SIGN_UP_STEPPER_OPTION } from "../../constants/constants";
import { getResponsiveStyles, getStyles } from "./SignUpHeader.style";

const SignUpHeader = (props) => {
  const { intl, onClickGoToLogin, activeTab } = props;
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const isWebView = currentBreakpoint !== "xs" && currentBreakpoint !== "sm";
  const isWeb = Platform.OS === "web";

  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <>
      {!isWebView && currentBreakpoint !== "sm" ? (
        <CustomTouchableOpacity
          onPress={() => {
            onClickGoToLogin();
          }}
          style={styles.headerContainerStyle}
        >
          <CommonText customTextStyle={styles.headerTextStyle} fontWeight="600">
            {intl.formatMessage({ id: "label.go_back_to_login" })}
          </CommonText>
        </CustomTouchableOpacity>
      ) : null}
      <View
        style={
          isWeb &&
          getResponsiveStyles({ str: "steperContainer", currentBreakpoint })
        }
      >
        <Stepper
          {...{
            activeStep: activeTab,
            steps: SIGN_UP_STEPPER_OPTION.map((step) =>
              intl.formatMessage({ id: step.title })
            ),
            orientation: isWebView ? "vertical" : "horizontal",
            showActiveLabelOnly: !isWebView,
            customStyle: {
              stepperHeroLabelText: { ...styles.formHeaderStyle },
              containerStyle:
                currentBreakpoint === "sm"
                  ? { ...styles.stepperParentContainer }
                  : { ...styles.resetStepperParentContainer },
            },
          }}
        />
      </View>
      {!isWebView && <View style={styles.borderStyle} />}
    </>
  );
};

SignUpHeader.propTypes = {
  activeTab: PropTypes.number.isRequired,
  intl: PropTypes.object.isRequired,
  onClickGoToLogin: PropTypes.func.isRequired,
};

export default SignUpHeader;
