import React, { useContext } from "react";

import ApplicationFormContainerTemplate from "./ApplicationFormContainerTemplate";
import AddApplication from "../../CandidateRoundOne/AddApplication/AddApplication";
import useApplicationForm from "./controllers/useApplicationForm";
import { UserProfileContext } from "../../../globalContext/userProfile/userProfileProvider";
import { USER_TYPE_CANDIDATE } from "../../../constants/constants";

const ApplicationFormContainer = () => {
  const { activeStep, onHandleTab } = useApplicationForm();
  const [userProfileDetails] = useContext(UserProfileContext);
 
  return userProfileDetails?.userDetails?.user_type?.toLowerCase() ===
    USER_TYPE_CANDIDATE ? (
    <AddApplication />
  ) : (
    <ApplicationFormContainerTemplate
      activeStep={activeStep}
      onHandleTab={onHandleTab}
    />
  );
};

export default ApplicationFormContainer;
