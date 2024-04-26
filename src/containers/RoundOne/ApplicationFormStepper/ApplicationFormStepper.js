import React from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { useTheme } from "@unthinkable/react-theme";
import { useLocation } from "../../../routes";
import { View, Platform } from "@unthinkable/react-core-components";

import { TwoColumn } from "../../../core/layouts";

import CommonText from "../../../components/CommonText";
import Stepper from "../../../components/Stepper";
import StepperTabs from "../../../components/StepperTabs";
import useIsWebView from "../../../hooks/useIsWebView";
import { APPLICATION_FORM_STEPPER_OPTIONS } from "../../../constants/constants";
import getStyles from "./ApplicationFormStepper.style";

const isWeb = Platform.OS.toLowerCase() === "web";

const ApplicationFormStepper = ({
  activeStep,
  customMobHeadingText,
  headingText,
  mobActionButton,
  webActionButton,
}) => {
  const intl = useIntl();
  const theme = useTheme();
  const styles = getStyles(theme);
  const location = useLocation();
  const hasRoundTwo = location?.pathname.includes("round-two");

  const steps = APPLICATION_FORM_STEPPER_OPTIONS(hasRoundTwo).map((step) =>
    intl.formatMessage({ id: step.title })
  );

  const { isWebView } = useIsWebView();

  return (
    <>
      {isWeb ? (
        <View style={styles.stepperContainer}>
          <View style={isWebView ? styles.headingContainerWeb : {}}>
            {!!headingText && (
              <TwoColumn
                style={!isWebView ? styles.mainContainerMob : {}}
                leftSection={
                  <CommonText
                    fontWeight={"600"}
                    customTextStyle={{
                      ...(isWebView
                        ? styles.headingtextWeb
                        : styles.headingtextWebMobView),
                      ...customMobHeadingText,
                    }}
                  >
                    {headingText}
                  </CommonText>
                }
                isLeftFillSpace
                rightSection={!!webActionButton && webActionButton}
              />
            )}
          </View>
          <StepperTabs
            {...{
              activeStep,
              steps,
            }}
          />
        </View>
      ) : (
        <View style={styles.container}>
          {!!headingText && (
            <TwoColumn
              style={styles.headingContainer}
              isLeftFillSpace
              leftSection={
                <CommonText
                  fontWeight={"600"}
                  customTextStyle={{
                    ...styles.headingtext,
                    ...customMobHeadingText,
                  }}
                >
                  {headingText}
                </CommonText>
              }
              rightSection={!!mobActionButton && mobActionButton}
            />
          )}
          <Stepper
            {...{
              activeStep: activeStep,
              steps,
            }}
          />
        </View>
      )}
    </>
  );
};

ApplicationFormStepper.propTypes = {
  activeStep: PropTypes.number.isRequired,
};

export default ApplicationFormStepper;
