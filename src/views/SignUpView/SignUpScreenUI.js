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
import commonStyles from "../../theme/styles/commonStyles";
import style from "./SignUpScreen.style";

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
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const { isWebView } = useIsWebView();

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

  const getResponsiveStyles = (str) => {
    switch (str) {
      case "signUpWebContainer": {
        if (currentBreakpoint === "lg") {
          return {
            ...commonStyles.commonWebContainer,
            ...style.signUpWebContainer,
            ...style.largeScreenContainer,
          };
        }
        if (currentBreakpoint === "md") {
          return {
            ...commonStyles.commonWebContainer,
            ...style.signUpWebContainer,
            ...style.width900pxOrLessContainer,
          };
        }
        if (currentBreakpoint === "sm") {
          return {
            ...commonStyles.commonWebContainer,
            ...style.signUpWebContainer,
            ...style.smScreenContainer,
          };
        }
        if (currentBreakpoint === "xs") {
          return {
            ...commonStyles.commonWebContainer,
            ...style.signUpWebContainer,
            ...style.extraSmallScreenContainer,
          };
        }
        return {
          ...commonStyles.commonWebContainer,
          ...style.signUpWebContainer,
        };
      }
      default:
        return;
    }
  };

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
          <View style={getResponsiveStyles("signUpWebContainer")}>
            <ActiveTabComponent
              tabHandler={onHandleTab}
              module={module}
              index={index}
              onClickGoToLogin={onClickGoToLogin}
            />
          </View>
        </View>
      ) : (
        <ActiveTabComponent
          tabHandler={onHandleTab}
          module={module}
          index={index}
        />
      )}
    </View>
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
