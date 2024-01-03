import React from "react";

import ApplicationFormContainerTemplate from "./ApplicationFormContainerTemplate";
import useApplicationForm from "./controller/useApplicationForm";

const ApplicationFormContainer = () => {
  const { activeStep, onHandleTab } = useApplicationForm();

  return (
    <ApplicationFormContainerTemplate
      activeStep={activeStep}
      onHandleTab={onHandleTab}
    />
  );
};

export default ApplicationFormContainer;
