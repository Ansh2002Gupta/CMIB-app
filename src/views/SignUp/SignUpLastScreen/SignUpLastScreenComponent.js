import React, { useState } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "../../../routes";
import SignUpLastScreenUI from "./SignUpLastScreenUI";

const SignUpLastScreenComponent = () => {
  const intl = useIntl();
  const [showSuccessSignUp, setShowSuccessSignUp] = useState(false);
  const [options, setOptions] = useState([
    {
      title: intl.formatMessage({ id: "label.email_from_cpaib" }),
      isSelected: false,
      id: 1,
    },
    {
      title: intl.formatMessage({ id: "label.campus" }),
      isSelected: false,
      id: 2,
    },
    {
      title: intl.formatMessage({ id: "label.programme_brouchers" }),
      isSelected: false,
      id: 3,
    },
    {
      title: intl.formatMessage({ id: "label.based_on_prev_participation" }),
      isSelected: false,
      id: 4,
    },
    {
      title: intl.formatMessage({ id: "label.telephonic_call_from_icai" }),
      isSelected: false,
      id: 5,
    },
    {
      title: intl.formatMessage({ id: "label.advertisement_in_ca_journal" }),
      isSelected: false,
      id: 6,
    },
  ]);

  const navigate = useNavigate();

  const handleSuccessModal = (value) => {
    setShowSuccessSignUp(value);
  };

  const onClickGoToLogin = () => {
    handleSuccessModal(false);
    navigate("/login");
  };

  const onGoBack = () => {
    navigate("/signupThirdScreen");
  };

  const handleToggle = (id) => {
    const updatedItems = options.map((item) => {
      if (item.id === id) {
        return { ...item, isSelected: !item.isSelected };
      }
      return item;
    });
    setOptions(updatedItems);
  };

  const onClickNext = () => {
    // navigate("/signupThirdScreen");
  };

  return (
    <SignUpLastScreenUI
      intl={intl}
      onClickGoToLogin={onClickGoToLogin}
      onGoBack={onGoBack}
      onClickNext={onClickNext}
      options={options}
      handleToggle={handleToggle}
      handleSuccessModal={handleSuccessModal}
      showSuccessSignUp={showSuccessSignUp}
    />
  );
};

export default SignUpLastScreenComponent;
