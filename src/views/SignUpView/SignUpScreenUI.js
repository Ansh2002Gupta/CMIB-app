import React, { useContext } from "react";
import PropTypes from "prop-types";
import { MediaQueryContext } from "@unthinkable/react-theme";
import { View } from "@unthinkable/react-core-components";

import SignUpHeader from "../../containers/SignUpHeader/SignUpHeader";
import SignUpWelcomeScreen from "../../containers/SignupScreens/SignUpWelcomeScreen/index";
import SignUpSecondScreen from "../../containers/SignupScreens/SignUpSecondScreen/index";
import SignUpThirdScreen from "../../containers/SignupScreens/SignUpThirdScreen/index";
import SignUpLastScreen from "../../containers/SignupScreens/SignUpLastScreen/index";
import useIsWebView from "../../hooks/useIsWebView";
import images from "../../images";
import { getResponsiveStyles, style } from "./SignUpScreen.style";

const SignUpScreenUI = ({ activeTab, intl, onClickGoToLogin, onHandleTab }) => {
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const { isWebView } = useIsWebView();
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
    <View style={!isWebView ? style.container : style.webContainer}>
      <SignUpHeader
        intl={intl}
        headerText={headerText}
        onClickGoToLogin={onClickGoToLogin}
        image={image}
      />
      {isWebView ? (
        <View style={style.webSubContainer}>
          <View style={getResponsiveStyles({str: "signUpWebContainer", currentBreakpoint})}>
            <ActiveTabComponent
              tabHandler={onHandleTab}
              onClickGoToLogin={onClickGoToLogin}
            />
          </View>
        </View>
      ) : (
        <ActiveTabComponent
          tabHandler={onHandleTab}
          onClickGoToLogin={onClickGoToLogin}
        />
      )}
    </View>
  );
};

SignUpScreenUI.propTypes = {
  activeTab: PropTypes.number.isRequired,
  intl: PropTypes.object.isRequired,
  onClickGoToLogin: PropTypes.func.isRequired,
  onHandleTab: PropTypes.func.isRequired,
};

export default SignUpScreenUI;
