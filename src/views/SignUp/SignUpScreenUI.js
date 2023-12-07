import React from "react";
import PropTypes from "prop-types";
import images from "../../images";
import SignUpHeader from "../../components/SignUpHeader/SignUpHeader";
import SignUpWelcomeScreen from "./SignUpWelcomeScreen/index";
import SignUpSecondScreen from "./SignUpSecondScreen/index";
import SignUpThirdScreen from "./SignUpThirdScreen";
import SignUpLastScreen from "./SignUpLastScreen";

const tabConfig = [
  {
    id: "label.welcome_to_sign_up",
    imageKey: "iconWalkthroughSignUpOne",
    component: SignUpWelcomeScreen,
  },
  {
    id: "label.basic_details",
    imageKey: "iconWalkthroughSignUpTwo",
    component: SignUpSecondScreen,
  },
  {
    id: "label.for_new_ca_placement",
    imageKey: "iconWalkthroughSignUpThree",
    component: SignUpThirdScreen,
  },
  {
    id: "label.other_details",
    imageKey: "iconWalkthroughSignUpLast",
    component: SignUpLastScreen,
  },
];

const SignUpScreenUI = ({ intl, onClickGoToLogin, activeTab, onHandleTab }) => {
  const {
    id,
    imageKey,
    component: ActiveTabComponent,
  } = tabConfig[activeTab] || tabConfig[0];
  const headerText = intl.formatMessage({ id });
  const image = images[imageKey];

  return (
    <>
      <SignUpHeader
        intl={intl}
        headerText={headerText}
        onClickGoToLogin={onClickGoToLogin}
        image={image}
      />
      <ActiveTabComponent tabHandler={onHandleTab} />
    </>
  );
};

SignUpScreenUI.propTypes = {
  intl: PropTypes.object.isRequired,
  onClickGoToLogin: PropTypes.func.isRequired,
  onHandleTab: PropTypes.func.isRequired,
  activeTab: PropTypes.number.isRequired,
};

export default SignUpScreenUI;
