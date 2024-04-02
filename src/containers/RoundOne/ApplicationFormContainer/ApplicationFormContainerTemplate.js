import React from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { ScrollView } from "@unthinkable/react-core-components";

import { TwoRow } from "../../../core/layouts";

import ApplicationFormStepper from "../ApplicationFormStepper";
import CompanyProfile from "./CompanyProfileForm/CompanyProfileForm";
import JobDetails from "./JobDetails";

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
    <ScrollView style={{ flex: 1 }}>
      <TwoRow
        topSection={
          <ApplicationFormStepper
            headingText={intl.formatMessage({
              id: "label.add_application_form",
            })}
            activeStep={activeStep}
          />
        }
        bottomSection={<ActiveTabComponent tabHandler={onHandleTab} />}
        isBottomFillSpace
      />
    </ScrollView>
  );
};

ApplicationFormContainerTemplate.propTypes = {
  activeStep: PropTypes.number.isRequired,
  onHandleTab: PropTypes.func.isRequired,
};

export default ApplicationFormContainerTemplate;
