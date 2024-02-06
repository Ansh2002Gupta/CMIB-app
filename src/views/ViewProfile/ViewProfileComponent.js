import React, { useContext, useState } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router";

import ViewProfileUI from "./ViewProfileUI";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import { PREVIOUS_SCREEN } from "../../constants/constants";

const ViewProfieComponent = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const [userProfileDetails] = useContext(UserProfileContext);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEditPopup = (val) => {
    setShowEditModal(val);
  };

  const onGoBack = () => {
    navigate(PREVIOUS_SCREEN);
  };

  return (
    <ViewProfileUI
      handleEditPopup={handleEditPopup}
      intl={intl}
      onGoBack={onGoBack}
      showEditModal={showEditModal}
      userProfileDetails={userProfileDetails?.userDetails}
    />
  );
};

export default ViewProfieComponent;
