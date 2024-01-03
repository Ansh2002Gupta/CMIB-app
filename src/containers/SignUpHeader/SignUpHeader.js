import React, { useContext } from "react";
import PropTypes from "prop-types";
import { MediaQueryContext } from "@unthinkable/react-theme";
import { Platform, View } from "@unthinkable/react-core-components";

import CommonText from "../../components/CommonText";
import CustomTouchableOpacity from "../../components/CustomTouchableOpacity";
import Stepper from "../../components/Stepper";
import { SIGN_UP_STEPPER_OPTION } from "../../constants/constants";
import { getResponsiveStyles, styles } from "./SignUpHeader.style";

const SignUpHeader = (props) => {
  const { intl, onClickGoToLogin, activeTab } = props;
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const isWebView = currentBreakpoint !== "xs" && currentBreakpoint !== "sm";
  const isWeb = Platform.OS === "web";

  return (
    <>
      {!isWebView && currentBreakpoint !== "sm" && (
        <CustomTouchableOpacity
          onPress={() => {
            onClickGoToLogin();
          }}
          style={styles.headerContainerStyle}
        >
          <CommonText
            customTextStyle={styles.headerTextStyle}
            title={intl.formatMessage({ id: "label.go_back_to_login" })}
          />
        </CustomTouchableOpacity>
      )}
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
            showActiveLabelOnly: isWebView ? false : true,
            customStyle: {
              stepperHeroLabelText: { ...styles.formHeaderStyle },
              containerStyle:
                currentBreakpoint === "sm"
                  ? { ...styles.stepperParentContainer }
                  : {},
            },
          }}
        />
      </View>
      {!isWebView && <View style={styles.borderStyle} />}
    </>
  );
};

SignUpHeader.propTypes = {
  intl: PropTypes.object.isRequired,
  onClickGoToLogin: PropTypes.func.isRequired,
};

export default SignUpHeader;
