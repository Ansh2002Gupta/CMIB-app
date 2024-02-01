import React, { useContext } from "react";
import { useIntl } from "react-intl";
import { useTheme } from "@unthinkable/react-theme";
import {
  Image,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";
import { MediaQueryContext } from "@unthinkable/react-theme";

import { TwoRow } from "../../core/layouts";

import images from "../../images";
import ImageAndTextTab from "../../components/ImageAndTextTab/ImageAndTextTab";
import LocaleSwitcher from "../../components/LocaleSwitcher";
import MultiColumn from "../../core/layouts/MultiColumn";
import ThemeSwitcher from "../../components/ThemeSwitcher";
import useNavigateScreen from "../../services/hooks/useNavigateScreen";
import { SideBarContext } from "../../globalContext/sidebar/sidebarProvider";
import { useLocation } from "../../routes";
import { navigations } from "../../constants/routeNames";
import { getIconImages } from "../../constants/sideBarHelpers";
import styles from "./bottomBar.style";

function BottomBar() {
  const icons = useTheme("icons");
  const intl = useIntl();
  const { navigateScreen } = useNavigateScreen();
  const [sideBarState] = useContext(SideBarContext);
  const { selectedModule } = sideBarState;
  const { logo, homeOutline, homeSolid, profileOutline, profileSolid } = icons;
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const { pathname: currentRoute } = useLocation();

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
          isActive={currentRoute === route || currentRoute.split("/").slice(-1)[0] === route}
          onPress={() => {
            if(route.includes("/")){
              navigateTo(route);
            } else {
              navigateTo(`/${selectedModule.key}/${route}`);
            }
          }}
          containerStyle={containerStyle}
          imageActive={imageActive}
          imageInactive={imageInactive}
          text={messageId}
        />
      ),
      style: {},
      isFillSpace: true,
    };
  }

 
 
  function preprocessMenu(menuItems) {
    const candidateKeys = new Set([
      navigations.JOB_APPLICANTS,
      navigations.JOB_SEEKERS,
      navigations.SAVED_CANDIDATES,
    ]);
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
    intl.formatMessage({ id: "label.account" }),
    styles.activeStyleMyaccount
  );

  const dynamicConfigs = selectedModule?.children
    ? preprocessMenu(selectedModule.children).map((item) =>
        createRowConfig(
          item.key,
          getIconImages(item.icon).activeImage,
          getIconImages(item.icon).inactiveImage,
          item.label.match(/^(\w+\s+\w+)/)?.[0] || item.label,
          styles.activeStyleMyaccount
        )
      )
    : [];

  const rowConfigs = [...dynamicConfigs, myAccountConfig];
  
  return (
    <View>
      <View style={styles.borderStyle}></View>
      <MultiColumn columns={rowConfigs} />
    </View>
  );
}
export default BottomBar;
