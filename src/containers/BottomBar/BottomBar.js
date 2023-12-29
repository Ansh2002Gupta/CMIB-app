import React, { useContext } from "react";
import { useIntl } from "react-intl";
import {
  Image,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";
import { MediaQueryContext, useTheme } from "@unthinkable/react-theme";

import images from "../../images";
import ImageAndTextTab from "../../components/ImageAndTextTab/ImageAndTextTab";
import LocaleSwitcher from "../../components/LocaleSwitcher";
import MultiColumn from "../../core/layouts/MultiColumn";
import { navigations } from "../../constants/routeNames";
import { TwoRow } from "../../core/layouts";
import ThemeSwitcher from "../../components/ThemeSwitcher";
import useNavigateScreen from "../../services/hooks/useNavigateScreen";
import { useLocation } from "../../routes";
import styles from "./bottomBar.style";
import { SideBarContext } from "../../globalContext/sidebar/sidebarProvider";

function BottomBar() {
  const icons = useTheme("icons");
  const intl = useIntl();
  const { navigateScreen } = useNavigateScreen();
  const [sideBarState, sideBarDispatch] = useContext(SideBarContext);
  const { SideBarDetails } = sideBarState;
  const { logo, homeOutline, homeSolid, profileOutline, profileSolid } = icons;
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const { pathname: currentRoute } = useLocation();

  // console.log("Bottombar",SideBarDetails.children)
  const navigateTo = (route) => {
    navigateScreen(route);
  };

  const homeIcon = currentRoute === navigations.ROOT ? homeSolid : homeOutline;
  const profileIcon =
    currentRoute === navigations.PROFILE ? profileSolid : profileOutline;

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

  function createRowConfig(
    route,
    imageActive,
    imageInactive,
    messageId,
    containerStyle = {}
  ) {
    return {
      content: (
        <ImageAndTextTab
          isActive={currentRoute === route}
          onPress={() => {
            navigateTo(route);
          }}
          containerStyle={containerStyle}
          imageActive={imageActive}
          imageInactive={imageInactive}
          text={messageId}
          // text={intl.formatMessage({ id: messageId })}
        />
      ),
      style: {},
      isFillSpace: true,
    };
  }

  function getIconImages(iconName) {
    // Define a mapping from iconName to your actual image assets
    const iconMap = {
      iconDashboard: {
        activeImage: images.iconDashboard,
        inactiveImage: images.iconDashboard,
      },
      iconRound1: {
        activeImage: images.iconActiveRound1,
        inactiveImage: images.iconRound1,
      },
      iconRound2: {
        activeImage: images.iconActiveRound2,
        inactiveImage: images.iconRound2,
      },
      iconPostedJobs: {
        activeImage: images.iconActivePostedJobs,
        inactiveImage: images.iconPostedJobs,
      },
      iconCandidates: {
        activeImage: images.iconActiveCandidates,
        inactiveImage: images.iconCandidates,
      },
      // ... other icon mappings
    };
    return iconMap[iconName] || { activeImage: null, inactiveImage: null };
  }

  function preprocessMenu(menuItems) {
    const candidateKeys = new Set([navigations.JOB_APPLICANTS,navigations.JOB_SEEKERS,navigations.SAVED_CANDIDATES]);
    const hasCandidates = menuItems.some((item) => candidateKeys.has(item.key));

    if (!hasCandidates) {
      return menuItems;
    }

    const filteredMenu = menuItems.filter(
      (item) => !candidateKeys.has(item.key)
    );

    // Create and add the "Candidates" tab to the filtered menu
    const candidatesTab = {
      label: "Candidates",
      key: navigations.JOB_APPLICANTS,
      icon: "iconCandidates",
    };
    filteredMenu.push(candidatesTab);

    return filteredMenu;
  }
  // Define the "My Account" configuration
  const myAccountConfig = createRowConfig(
    navigations.PROFILE,
    images.iconActiveMyaccount,
    images.iconMyaccount,
    "My Account",
    styles.activeStyleMyaccount
  );

  const rowConfigs = [myAccountConfig];

  if (SideBarDetails && SideBarDetails.children) {
    // Preprocess the array to combine certain items
    const preprocessedMenu = preprocessMenu(SideBarDetails.children);

    const dynamicConfigs = preprocessedMenu.map((item) => {
      const { activeImage, inactiveImage } = getIconImages(item.icon);
      let displayLabel = item.label.match(/^(\w+\s+\w+)/);
      displayLabel = displayLabel ? displayLabel[0] : item.label;
      return createRowConfig(
        item.key,
        activeImage,
        inactiveImage,
        displayLabel,
        styles.activeStyleMyaccount
      );
    });

    rowConfigs.unshift(...dynamicConfigs);
  } else {
    console.log("SideBarDetails.children is not available.");
  }

  return (
    <View>
      <View style={styles.borderStyle}></View>
      <MultiColumn columns={rowConfigs} />
    </View>
  );
}
export default BottomBar;

// const rowConfigs = [
//   createRowConfig(
//     navigations.DASHBOARD,
//     images.iconDashboard,
//     images.iconDashboard,
//     "label.dashboard",
//     styles.activeStyleMyaccount
//   ),
//   createRowConfig(
//     navigations.ROUND_ONE,
//     images.iconActiveRound1,
//     images.iconRound1,
//     "label.round1",
//     styles.activeStyleMyaccount
//   ),
//   createRowConfig(
//     navigations.ROUND_TWO,
//     images.iconActiveRound2,
//     images.iconRound2,
//     "label.round2",
//     styles.activeStyleMyaccount
//   ),
//   createRowConfig(
//     navigations.PROFILE,
//     images.iconActiveMyaccount,
//     images.iconMyaccount,
//     "label.my_account",
//     styles.activeStyleMyaccount
//   ),
// ];
