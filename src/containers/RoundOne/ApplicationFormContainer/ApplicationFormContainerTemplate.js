import React from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";

import ApplicationFormStepper from "../ApplicationFormStepper";
import CustomButton from "../../../components/CustomButton";
import JobDetails from "./JobDetails";
import styles from "./ApplicationFormContainer.style";
import CompanyProfile from "./CompanyProfileForm/CompanyProfile";
import { ThreeRow, TwoRow } from "../../../core/layouts";
import IconHeader from "../../../components/IconHeader/IconHeader";

const ApplicationFormContainerTemplate = ({ activeStep, onHandleTab }) => {
  const intl = useIntl();

  let tabConfig = [
    {
      component: CompanyProfile,
    },
    {
      component: JobDetails,
    },
  ];

  const activeTabIndex = Math.min(activeStep, tabConfig.length - 1);
  const { component: ActiveTabComponent } = tabConfig[activeTabIndex];

  return (
    <ThreeRow
      topSection={
        <ApplicationFormStepper
          headingText={intl.formatMessage({ id: "label.add_application_form" })}
          activeStep={activeStep}
        />
      }
      middleSection={
        <ActiveTabComponent
          tabHandler={onHandleTab}
          // onClickGoToLogin={onClickGoToLogin}
        />
      }
      isMiddleFillSpace
      bottomSection={
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
      }
    />
  );
};

ApplicationFormContainerTemplate.propTypes = {
  activeStep: PropTypes.number.isRequired,
  onHandleTab: PropTypes.func.isRequired,
};

export default ApplicationFormContainerTemplate;
