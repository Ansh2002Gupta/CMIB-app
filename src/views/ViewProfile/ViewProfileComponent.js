import React, { useContext, useEffect, useState } from "react";
import { Platform } from "@unthinkable/react-core-components";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router";

import ViewProfileUI from "./ViewProfileUI";
import { PREVIOUS_SCREEN } from "../../constants/constants";
import { setShowViewProfileDetails } from "../../globalContext/userProfile/userProfileActions";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";

const ViewProfieComponent = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const [, userProfileDispatch] = useContext(UserProfileContext);
  const [showEditModal, setShowEditModal] = useState(false);
  const isWebPlatform = Platform.OS.toLowerCase() === "web";

  useEffect(() => {
    if (isWebPlatform) {
      userProfileDispatch(setShowViewProfileDetails(true));
    }
  }, []);

  const handleEditPopup = (val) => {
    setShowEditModal(val);
  };

  const onGoBack = () => {
    navigate(PREVIOUS_SCREEN);
  };

  return (
    <>
      {!isWebPlatform && (
        <ViewProfileUI
          handleEditPopup={handleEditPopup}
          intl={intl}
          onGoBack={onGoBack}
          showEditModal={showEditModal}
        />
      )}
    </>
  );
};

export default ViewProfieComponent;
