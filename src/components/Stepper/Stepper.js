import React from "react";
import PropTypes from "prop-types";
import { Image, View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText/CommonText";
import images from "../../images";
import { getAppropriateStyle, styles } from "./Stepper.style";

const Stepper = ({
  activeStep,
  customStyle,
  orientation,
  showActiveLabelOnly,
  steps,
}) => {
  const { containerStyle, stepperCircle, stepperHeroLabelText, stepperLabel } =
    customStyle;

  const getStepStatus = (step) => {
    if (activeStep === step) return "active";
    if (activeStep > step) return "done";
    return "inActive";
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
                  }),
                  ...stepperCircle,
                }}
              >
                {getStepStatus(index) === "done" ? (
                  <Image source={images.iconStepperDone} alt="Done" />
                ) : (
                  index + 1
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
                    title={label}
                    customTextStyle={{
                      ...styles.label,
                      ...getAppropriateStyle({
                        fieldName: "label",
                        stepValue: index,
                        getStepStatus,
                      }),
                      ...stepperLabel,
                    }}
                  />
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
            title={steps.find((label, idx) => idx === activeStep)}
            customTextStyle={{
              ...styles.onlyActiveLabel,
              ...stepperHeroLabelText,
            }}
          />
        </View>
      )}
    </React.Fragment>
  );
};

Stepper.defaultProps = {
  activeStep: 0,
  customStyle: {},
  orientation: "horizontal",
  showActiveLabelOnly: true,
  steps: [],
};

Stepper.propTypes = {
  activeStep: PropTypes.number.isRequired,
  customStyle: PropTypes.object,
  orientation: PropTypes.string,
  showActiveLabelOnly: PropTypes.bool,
  steps: PropTypes.array.isRequired,
};

export default Stepper;
