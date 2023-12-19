import React, { useContext } from "react";
import { useIntl } from "react-intl";
import {
  Image,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";
import { MediaQueryContext, useTheme } from "@unthinkable/react-theme";

import { TwoRow, FourColumn } from "../../core/layouts";

import ImageAndTextTab from "../../components/ImageAndTextTab/ImageAndTextTab";
import LocaleSwitcher from "../../components/LocaleSwitcher";
import ThemeSwitcher from "../../components/ThemeSwitcher";
import useNavigateScreen from "../../services/hooks/useNavigateScreen";
import { useLocation } from "../../routes";
import { navigations } from "../../constants/routeNames";
import images from "../../images";
import styles from "./bottomBar.style";
import MultiColumn from "../../core/layouts/MultiColumn/MultiColumn";
import MultiRow from "../../core/layouts/MultiRow";

function BottomBar() {
  const icons = useTheme("icons");
  const intl = useIntl();
  const { navigateScreen } = useNavigateScreen();
  const { logo, homeOutline, homeSolid, profileOutline, profileSolid } = icons;
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const { pathname: currrentRoute } = useLocation();

  const navigateTo = (route) => {
    navigateScreen(route);
  };

  const homeIcon =
    currrentRoute === navigations.ROOT ? homeSolid : homeOutline;
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
                    navigateTo(navigations.DASHBOARD);
                  }}
                >
                  <Image source={homeIcon} style={styles.imageStyle} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.sectionViewStyle}
                  onPress={() => {
                    navigateTo(navigations.PROFILE);
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

// Define a function to create a row configuration
function createRowConfig(route, imageActive, imageInactive, messageId, containerStyle = {}) {
  return {
    content: (
      <ImageAndTextTab
        isActive={currrentRoute === route}
        onPress={() => {
          navigateTo(route);
        }}
        containerStyle={containerStyle}
        imageActive={imageActive}
        imageInactive={imageInactive}
        text={intl.formatMessage({ id: messageId })}
      />
    ),
    style: {},
    isFillSpace: true,
  };
}

// Use the function to build the rowConfigs array
const rowConfigs = [
  createRowConfig(navigations.DASHBOARD, images.iconDashboard, images.iconDashboard, "label.dashboard", styles.activeStyleMyaccount),
  createRowConfig(navigations.ROUND_ONE, images.iconActiveRound1, images.iconRound1, "label.round1",styles.activeStyleMyaccount),
  createRowConfig(navigations.ROUND_TWO, images.iconActiveRound2, images.iconRound2, "label.round2",styles.activeStyleMyaccount),
  createRowConfig(navigations.PROFILE, images.iconActiveMyaccount, images.iconMyaccount, "label.my_account", styles.activeStyleMyaccount),
];

  return (
    <View>
        <View style={styles.borderStyle}></View>
        <MultiColumn columns={rowConfigs} />
    </View>
  );
}
export default BottomBar;
