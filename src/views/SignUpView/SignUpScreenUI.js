import React, { useContext } from "react";
import PropTypes from "prop-types";
import { MediaQueryContext } from "@unthinkable/react-theme";
import { View, ScrollView } from "@unthinkable/react-core-components";

import SignUpHeader from "../../containers/SignUpHeader/index";
import SignUpWelcomeScreen from "../../containers/SignupScreens/SignUpWelcomeScreen/index";
import SignUpSecondScreen from "../../containers/SignupScreens/SignUpSecondScreen/index";
import SignUpThirdScreen from "../../containers/SignupScreens/SignUpThirdScreen/index";
import SignUpLastScreen from "../../containers/SignupScreens/SignUpLastScreen/index";
import useIsWebView from "../../hooks/useIsWebView";
import { getResponsiveStyles, style } from "./SignUpScreen.style";

const SignUpScreenUI = ({
  activeTab,
  intl,
  onClickGoToLogin,
  onHandleTab,
  scrollRef,
}) => {
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const { isWebView } = useIsWebView();
  const displayRowHeader =
    currentBreakpoint !== "xs" && currentBreakpoint !== "sm";

  let tabConfig = [
    {
      component: SignUpWelcomeScreen,
    },
    {
      component: SignUpSecondScreen,
    },
    {
      component: SignUpThirdScreen,
    },
    {
      component: SignUpLastScreen,
    },
  ];

  const activeTabIndex = Math.min(activeTab, tabConfig.length - 1);
  const { component: ActiveTabComponent } = tabConfig[activeTabIndex];

  return (
    <View style={!displayRowHeader ? style.container : style.webContainer}>
      <SignUpHeader
        intl={intl}
        onClickGoToLogin={onClickGoToLogin}
        activeTab={activeTab}
      />
      {isWebView ? (
        <View style={displayRowHeader && style.webSubContainer} ref={scrollRef}>
          <View
            style={getResponsiveStyles({
              str: "signUpWebContainer",
              currentBreakpoint,
            })}
          >
            <ActiveTabComponent
              tabHandler={onHandleTab}
              onClickGoToLogin={onClickGoToLogin}
            />
          </View>
        </View>
      ) : (
        <ScrollView ref={scrollRef} contentContainerStyle={style.contentContainerStyle}>
          <ActiveTabComponent
            tabHandler={onHandleTab}
            onClickGoToLogin={onClickGoToLogin}
          />
        </ScrollView>
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
