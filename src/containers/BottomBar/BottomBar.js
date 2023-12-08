import React, { useContext, useState } from "react";
import { useIntl } from "react-intl";
import { MediaQueryContext, useTheme } from "@unthinkable/react-theme";
import {
  Image,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";

import CommonText from "../../components/CommonText";
import LocaleSwitcher from "../../components/LocaleSwitcher";
import ThemeSwitcher from "../../components/ThemeSwitcher";
import { TwoRow, FourColumn } from "../../core/layouts";
import { useNavigate, useLocation } from "../../routes";
import { ACCOUNT_TABS } from "../../constants/constants";
import { navigations } from "../../constants/routeNames";
import images from "../../images";
import styles from "./bottomBar.style";

function BottomBar() {
  const icons = useTheme("icons");
  const intl = useIntl();
  const { logo, homeOutline, homeSolid, profileOutline, profileSolid } = icons;
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const navigate = useNavigate();
  const { pathname: currrentRoute } = useLocation();
  const [bottomBarActive, setBottomBarActive] = useState(
    ACCOUNT_TABS.DASHBOARD
  );

  const navigateTo = (active, route) => {
    setBottomBarActive(active);
    navigate(route);
  };
  const homeIcon =
    currrentRoute === navigations.Login ? homeSolid : homeOutline;
  const profileIcon =
    currrentRoute === navigations.Profile ? profileSolid : profileOutline;

  if (currentBreakpoint === "md") {
    return (
      <TwoRow
        style={styles.menuContainer}
        topSection={
          <View style={styles.sectionViewStyle}>
            <Image source={logo} style={styles.imageStyle} />
          </View>
        }
        bottomSection={
          <TwoRow
            topSection={
              <>
                <TouchableOpacity
                  style={styles.sectionViewStyle}
                  onPress={() => {
                    navigateTo(ACCOUNT_TABS.DASHBOARD, navigations.Dashboard);
                  }}
                >
                  <Image source={homeIcon} style={styles.imageStyle} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.sectionViewStyle}
                  onPress={() => {
                    navigateTo(ACCOUNT_TABS.PROFILE, navigations.Profile);
                  }}
                >
                  <Image source={profileIcon} style={styles.imageStyle} />
                </TouchableOpacity>
              </>
            }
            bottomSection={
              <>
                <ThemeSwitcher />
                <LocaleSwitcher />
              </>
            }
            isTopFillSpace
          />
        }
        isBottomFillSpace
      />
    );
  }

  return (
    <View>
      <View style={styles.bottomBarView}>
        <View style={styles.borderStyle}></View>
        <View>
          <FourColumn
            firstSection={
              <>
                <View
                  style={
                    bottomBarActive === ACCOUNT_TABS.DASHBOARD
                      ? styles.activeStyleDashboard
                      : styles.inActiveStyle
                  }
                />
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={() => {
                    navigateTo(ACCOUNT_TABS.DASHBOARD, navigations.Dashboard);
                  }}
                >
                  {bottomBarActive === ACCOUNT_TABS.DASHBOARD ? (
                    <Image source={images.iconDashboard} />
                  ) : (
                    <Image source={images.iconDashboard} />
                  )}
                  <CommonText
                    title={intl.formatMessage({ id: "label.dashboard" })}
                    customTextStyle={
                      bottomBarActive === ACCOUNT_TABS.DASHBOARD
                        ? styles.activeTextStyle
                        : styles.inActiveTextStyle
                    }
                  />
                </TouchableOpacity>
              </>
            }
            secoundSection={
              <>
                <View
                  style={
                    bottomBarActive === ACCOUNT_TABS.ROUND_ONE
                      ? styles.activeStyle
                      : styles.inActiveStyle
                  }
                />
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={() => {
                    navigateTo(ACCOUNT_TABS.ROUND_ONE, navigations.RoundOne);
                  }}
                >
                  {bottomBarActive === ACCOUNT_TABS.ROUND_ONE ? (
                    <Image source={images.iconActiveRound1} />
                  ) : (
                    <Image source={images.iconRound1} />
                  )}
                  <CommonText
                    title={intl.formatMessage({ id: "label.round1" })}
                    customTextStyle={
                      bottomBarActive === ACCOUNT_TABS.ROUND_ONE
                        ? styles.activeTextStyle
                        : styles.inActiveTextStyle
                    }
                  />
                </TouchableOpacity>
              </>
            }
            thirdSection={
              <>
                <View
                  style={
                    bottomBarActive === ACCOUNT_TABS.ROUND_TWO
                      ? styles.activeStyle
                      : styles.inActiveStyle
                  }
                />
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={() => {
                    navigateTo(ACCOUNT_TABS.ROUND_TWO, navigations.RoundTwo);
                  }}
                >
                  {bottomBarActive === ACCOUNT_TABS.ROUND_TWO ? (
                    <Image source={images.iconActiveRound2} />
                  ) : (
                    <Image source={images.iconRound2} />
                  )}
                  <CommonText
                    title={intl.formatMessage({ id: "label.round2" })}
                    customTextStyle={
                      bottomBarActive === ACCOUNT_TABS.ROUND_TWO
                        ? styles.activeTextStyle
                        : styles.inActiveTextStyle
                    }
                  />
                </TouchableOpacity>
              </>
            }
            fourthSection={
              <>
                <View
                  style={
                    bottomBarActive === ACCOUNT_TABS.PROFILE
                      ? styles.activeStyleMyaccount
                      : styles.inActiveStyle
                  }
                />
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={() => {
                    navigateTo(ACCOUNT_TABS.PROFILE, navigations.Profile);
                  }}
                >
                  {bottomBarActive === ACCOUNT_TABS.PROFILE ? (
                    <Image source={images.iconActiveMyaccount} />
                  ) : (
                    <Image source={images.iconMyaccount} />
                  )}
                  <CommonText
                    title={intl.formatMessage({ id: "label.my_account" })}
                    customTextStyle={
                      bottomBarActive === ACCOUNT_TABS.PROFILE
                        ? styles.activeTextStyle
                        : styles.inActiveTextStyle
                    }
                  />
                </TouchableOpacity>
              </>
            }
            isLeftFillSpace
          />
        </View>
      </View>
    </View>
  );
}
export default BottomBar;
