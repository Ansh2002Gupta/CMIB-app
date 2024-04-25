import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@unthinkable/react-theme";
import { Image, View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText/CommonText";
import images from "../../images";
import { STEPPER_STATE } from "../../constants/constants";
import { getAppropriateStyle, getStyles } from "./Stepper.style";

const Stepper = ({
  activeStep,
  customStyle,
  orientation,
  showActiveLabelOnly,
  steps,
}) => {
  const { containerStyle, stepperCircle, stepperHeroLabelText, stepperLabel } =
    customStyle;

  const theme = useTheme();
  const styles = getStyles(theme);

  const getStepStatus = (step) => {
    if (activeStep === step) return STEPPER_STATE.ACTIVE;
    if (activeStep > step) return STEPPER_STATE.DONE;
    return STEPPER_STATE.INACTIVE;
  };

  return (
    <React.Fragment>
      <View
        style={{
          ...styles.stepsContainer,
          ...(orientation === "vertical" ? styles.stepperVertical : {}),
          ...containerStyle,
        }}
      >
        {steps?.map((label, index) => (
          <View key={index} style={styles.step}>
            <View style={styles.circleLabel}>
              <View
                style={{
                  ...styles.circle,
                  ...getAppropriateStyle({
                    fieldName: "circle",
                    stepValue: index,
                    getStepStatus,
                    theme,
                  }),
                  ...(getStepStatus(index) !== STEPPER_STATE.DONE
                    ? styles.activeOrPendingCircle
                    : {}),
                  ...stepperCircle,
                }}
              >
                {getStepStatus(index) === STEPPER_STATE.DONE ? (
                  <Image source={images.iconStepperDone} alt="Done" />
                ) : (
                  <CommonText
                    customTextStyle={{
                      ...styles.circleText,
                      ...getAppropriateStyle({
                        fieldName: "circleText",
                        stepValue: index,
                        getStepStatus,
                        theme,
                      }),
                    }}
                    fontWeight="600"
                  >{`${index + 1}`}</CommonText>
                )}
              </View>
              {!showActiveLabelOnly && (
                <View
                  style={{
                    ...(orientation === "vertical" ? styles.verticalLabel : {}),
                    ...(orientation !== "vertical" && !showActiveLabelOnly
                      ? styles.horizontalLabel
                      : {}),
                  }}
                >
                  <CommonText
                    customTextStyle={{
                      ...styles.label,
                      ...getAppropriateStyle({
                        fieldName: "label",
                        stepValue: index,
                        getStepStatus,
                        theme,
                      }),
                      ...stepperLabel,
                    }}
                  >
                    {label}
                  </CommonText>
                </View>
              )}
            </View>
            {index < steps.length - 1 && (
              <View
                style={{
                  ...styles.line,
                  ...(orientation !== "vertical" ? styles.horizontalLine : {}),
                  ...(orientation !== "vertical" && !showActiveLabelOnly
                    ? styles.horizontalLineTop
                    : {}),
                  ...(orientation === "vertical" ? styles.verticalLine : {}),
                  ...getAppropriateStyle({
                    fieldName: "line",
                    stepValue: index,
                    getStepStatus,
                    theme,
                  }),
                }}
              ></View>
            )}
          </View>
        ))}
      </View>
      {showActiveLabelOnly && (
        <View style={styles.onlyActiveLabelBox}>
          <CommonText
            customTextStyle={{
              ...styles.onlyActiveLabel,
              ...stepperHeroLabelText,
            }}
            fontWeight="600"
          >
            {steps.find((label, idx) => idx === activeStep)}
          </CommonText>
        </View>
      )}
    </React.Fragment>
  );
};

Stepper.defaultProps = {
  customStyle: {},
  orientation: "horizontal",
  showActiveLabelOnly: true,
};

Stepper.propTypes = {
  activeStep: PropTypes.number.isRequired,
  customStyle: PropTypes.object,
  orientation: PropTypes.string,
  showActiveLabelOnly: PropTypes.bool,
  steps: PropTypes.array.isRequired,
};

export default Stepper;
