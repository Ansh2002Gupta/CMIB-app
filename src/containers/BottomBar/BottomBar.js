import React, { useContext, useState } from "react";
import { useIntl } from "react-intl";
import { MediaQueryContext, useTheme } from "@unthinkable/react-theme";
import {
  Image,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";

import ImageAndTextTab from "../../components/ImageAndTextTab/ImageAndTextTab";
import LocaleSwitcher from "../../components/LocaleSwitcher";
import ThemeSwitcher from "../../components/ThemeSwitcher";
import useNavigateScreen from "../../services/hooks/useNavigateScreen";
import { TwoRow, FourColumn } from "../../core/layouts";
import { useLocation } from "../../routes";
import { ACCOUNT_TABS } from "../../constants/constants";
import { navigations } from "../../constants/routeNames";
import images from "../../images";
import styles from "./bottomBar.style";

function BottomBar() {
  const icons = useTheme("icons");
  const intl = useIntl();
  const { navigateScreen } = useNavigateScreen();
  const { logo, homeOutline, homeSolid, profileOutline, profileSolid } = icons;
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const { pathname: currrentRoute } = useLocation();
  const [bottomBarActive, setBottomBarActive] = useState(currrentRoute);

  const navigateTo = (active, route) => {
    console.log(route, "activeroute");
    setBottomBarActive(route);
    navigateScreen(route);
  };

  console.log(currrentRoute, "currrentRoute");
  console.log(bottomBarActive, "bottomBarActive");
  const homeIcon =
    currrentRoute === navigations.LOGIN ? homeSolid : homeOutline;
  const profileIcon =
    currrentRoute === navigations.PROFILE ? profileSolid : profileOutline;

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
                    navigateTo(ACCOUNT_TABS.DASHBOARD, navigations.DASHBOARD);
                  }}
                >
                  <Image source={homeIcon} style={styles.imageStyle} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.sectionViewStyle}
                  onPress={() => {
                    navigateTo(ACCOUNT_TABS.PROFILE, navigations.PROFILE);
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
            sectionStyle={styles.sectionStyle}
            firstSection={
              <ImageAndTextTab
                isActive={bottomBarActive === navigations.DASHBOARD}
                onPress={() => {
                  navigateTo(ACCOUNT_TABS.DASHBOARD, navigations.DASHBOARD);
                }}
                containerStyle={styles.activeStyleDashboard}
                imageActive={images.iconDashboard}
                imageInactive={images.iconDashboard}
                text={intl.formatMessage({ id: "label.dashboard" })}
              />
            }
            secoundSection={
              <ImageAndTextTab
                isActive={bottomBarActive === navigations.ROUND_ONE}
                onPress={() => {
                  navigateTo(ACCOUNT_TABS.ROUND_ONE, navigations.ROUND_ONE);
                }}
                imageActive={images.iconActiveRound1}
                imageInactive={images.iconRound1}
                text={intl.formatMessage({ id: "label.round1" })}
              />
            }
            thirdSection={
              <ImageAndTextTab
                isActive={bottomBarActive === navigations.ROUND_TWO}
                onPress={() => {
                  navigateTo(ACCOUNT_TABS.ROUND_TWO, navigations.ROUND_TWO);
                }}
                imageActive={images.iconActiveRound2}
                imageInactive={images.iconRound2}
                text={intl.formatMessage({ id: "label.round2" })}
              />
            }
            fourthSection={
              <ImageAndTextTab
                isActive={bottomBarActive === navigations.PROFILE}
                onPress={() => {
                  navigateTo(ACCOUNT_TABS.PROFILE, navigations.PROFILE);
                }}
                imageActive={images.iconActiveMyaccount}
                imageInactive={images.iconMyaccount}
                text={intl.formatMessage({ id: "label.my_account" })}
                containerStyle={styles.activeStyleMyaccount}
              />
            }
            isLeftFillSpace
          />
        </View>
      </View>
    </View>
  );
}
export default BottomBar;
