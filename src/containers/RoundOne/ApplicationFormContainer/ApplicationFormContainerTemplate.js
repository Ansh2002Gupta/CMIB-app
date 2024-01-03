import React from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";

import ApplicationFormStepper from "../ApplicationFormStepper";
import CustomButton from "../../../components/CustomButton";

import styles from "./ApplicationFormContainer.style";

const ApplicationFormContainerTemplate = ({ activeStep, onHandleTab }) => {
  const intl = useIntl();

  return (
    <View>
      <ApplicationFormStepper activeStep={activeStep} intl={intl} />
      <View style={styles.actionBtnContainer}>
        <CustomButton
          onPress={() => {
            onHandleTab("prev");
          }}
        >
          {intl.formatMessage({ id: "label.cancel" })}
        </CustomButton>
        <CustomButton
          onPress={() => {
            onHandleTab("next");
          }}
          withGreenBackground
        >
          {intl.formatMessage({ id: "label.save" })}
        </CustomButton>
      </View>
    </View>
  );
};

ApplicationFormContainerTemplate.propTypes = {
  activeStep: PropTypes.number.isRequired,
  onHandleTab: PropTypes.func.isRequired,
};

export default ApplicationFormContainerTemplate;
