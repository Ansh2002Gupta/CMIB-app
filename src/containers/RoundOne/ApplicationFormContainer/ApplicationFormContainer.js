import React from "react";

import ApplicationFormContainerTemplate from "./ApplicationFormContainerTemplate";
import useApplicationForm from "./controllers/useApplicationForm";

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
