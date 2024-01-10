import React, { useState } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router";

import ViewProfileUI from "./ViewProfileUI";
import { navigations } from "../../constants/routeNames";

const ViewProfieComponent = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEditPopup = (val) => {
    setShowEditModal(val);
  };

  const onGoBack = () => {
    navigate(-1);
  };

  return (
    <ViewProfileUI
      handleEditPopup={handleEditPopup}
      intl={intl}
      onGoBack={onGoBack}
      showEditModal={showEditModal}
    />
  );
};

export default ViewProfieComponent;
