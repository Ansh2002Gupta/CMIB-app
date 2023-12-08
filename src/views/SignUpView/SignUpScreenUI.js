import React from "react";
import PropTypes from "prop-types";

import SignUpHeader from "../../containers/SignUpHeader/SignUpHeader";
import SignUpWelcomeScreen from "../../containers/SignupScreens/SignUpWelcomeScreen/index";
import SignUpSecondScreen from "../../containers/SignupScreens/SignUpSecondScreen/index";
import SignUpThirdScreen from "../../containers/SignupScreens/SignUpThirdScreen/index";
import SignUpLastScreen from "../../containers/SignupScreens/SignUpLastScreen/index";
import images from "../../images";

const SignUpScreenUI = ({
  intl,
  onClickGoToLogin,
  activeTab,
  onHandleTab,
  selectedContactDetails,
}) => {
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
  ];

  selectedContactDetails.forEach((contactDetail, index) => {
    tabConfig.push({
      id: "label.contact_personal_details",
      imageKey: "iconWalkthroughSignUpThree",
      component: SignUpThirdScreen,
      module: contactDetail.module,
      index: index,
    });
  });

  tabConfig.push({
    id: "label.other_details",
    imageKey: "iconWalkthroughSignUpLast",
    component: SignUpLastScreen,
  });

  const activeTabIndex = Math.min(activeTab, tabConfig.length - 1);
  const {
    id,
    imageKey,
    component: ActiveTabComponent,
    module,
    index,
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
      <ActiveTabComponent
        tabHandler={onHandleTab}
        module={module}
        index={index}
      />
    </>
  );
};

SignUpScreenUI.propTypes = {
  intl: PropTypes.object.isRequired,
  onClickGoToLogin: PropTypes.func.isRequired,
  onHandleTab: PropTypes.func.isRequired,
  activeTab: PropTypes.number.isRequired,
  selectedContactDetails: PropTypes.array.isRequired,
};

export default SignUpScreenUI;
