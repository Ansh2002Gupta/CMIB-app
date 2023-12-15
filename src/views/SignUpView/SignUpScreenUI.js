import React from "react";
import PropTypes from "prop-types";

import SignUpHeader from "../../containers/SignUpHeader/SignUpHeader";
import SignUpWelcomeScreen from "../../containers/SignupScreens/SignUpWelcomeScreen/index";
import SignUpSecondScreen from "../../containers/SignupScreens/SignUpSecondScreen/index";
import SignUpThirdScreen from "../../containers/SignupScreens/SignUpThirdScreen/index";
import SignUpLastScreen from "../../containers/SignupScreens/SignUpLastScreen/index";
import images from "../../images";

const SignUpScreenUI = ({ activeTab, intl, onClickGoToLogin, onHandleTab }) => {
  let tabConfig = [
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
      id: "label.contact_personal_details",
      imageKey: "iconWalkthroughSignUpThree",
      component: SignUpThirdScreen,
    },
    {
      id: "label.other_details",
      imageKey: "iconWalkthroughSignUpLast",
      component: SignUpLastScreen,
    },
  ];

  const activeTabIndex = Math.min(activeTab, tabConfig.length - 1);
  const {
    id,
    imageKey,
    component: ActiveTabComponent,
  } = tabConfig[activeTabIndex];
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
  activeTab: PropTypes.number.isRequired,
  intl: PropTypes.object.isRequired,
  onClickGoToLogin: PropTypes.func.isRequired,
  onHandleTab: PropTypes.func.isRequired,
};

export default SignUpScreenUI;
