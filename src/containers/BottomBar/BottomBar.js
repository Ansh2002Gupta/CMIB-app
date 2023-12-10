import React, { useContext, useState } from "react";
import { useIntl } from "react-intl";
import { MediaQueryContext, useTheme } from "@unthinkable/react-theme";
import {
  Image,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";

import LocaleSwitcher from "../../components/LocaleSwitcher";
import ThemeSwitcher from "../../components/ThemeSwitcher";
import { TwoRow, FourColumn } from "../../core/layouts";
import { useNavigate, useLocation } from "../../routes";
import { ACCOUNT_TABS } from "../../constants/constants";
import { navigations } from "../../constants/routeNames";
import images from "../../images";
import styles from "./bottomBar.style";
import ImageAndTextTab from "../../components/ImageAndTextTab/ImageAndTextTab";

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
              <ImageAndTextTab
                isActive={bottomBarActive === ACCOUNT_TABS.DASHBOARD}
                onPress={() => {
                  navigateTo(ACCOUNT_TABS.DASHBOARD, navigations.Dashboard);
                }}
                containerStyle={styles.activeStyleDashboard}
                imageActive={images.iconDashboard}
                imageInactive={images.iconDashboard}
                text={intl.formatMessage({ id: "label.dashboard" })}
              />
            }
            secoundSection={
              <ImageAndTextTab
                isActive={bottomBarActive === ACCOUNT_TABS.ROUND_ONE}
                onPress={() => {
                  navigateTo(ACCOUNT_TABS.ROUND_ONE, navigations.RoundOne);
                }}
                imageActive={images.iconActiveRound1}
                imageInactive={images.iconRound1}
                text={intl.formatMessage({ id: "label.round1" })}
              />
            }
            thirdSection={
              <ImageAndTextTab
                isActive={bottomBarActive === ACCOUNT_TABS.ROUND_TWO}
                onPress={() => {
                  navigateTo(ACCOUNT_TABS.ROUND_TWO, navigations.RoundTwo);
                }}
                imageActive={images.iconActiveRound2}
                imageInactive={images.iconRound2}
                text={intl.formatMessage({ id: "label.round2" })}
              />
            }
            fourthSection={
              <ImageAndTextTab
                isActive={bottomBarActive === ACCOUNT_TABS.PROFILE}
                onPress={() => {
                  navigateTo(ACCOUNT_TABS.PROFILE, navigations.Profile);
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
