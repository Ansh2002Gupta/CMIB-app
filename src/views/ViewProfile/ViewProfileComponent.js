import React, { useState } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "../../routes";
import ViewProfileUI from "./ViewProfileUI";

const ViewProfieComponent = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEditPopup = (val) => {
    setShowEditModal(val);
  };

  const onGoBack = () => {
    navigate("/");
  };

  return (
    <ViewProfileUI
      intl={intl}
      onGoBack={onGoBack}
      showEditModal={showEditModal}
      handleEditPopup={handleEditPopup}
    />
  );
};

export default ViewProfieComponent;
