import React, { useContext, useState } from "react";
import { MediaQueryContext, useTheme } from "@unthinkable/react-theme";
import { useIntl } from "react-intl";
import {
  Image,
  TouchableOpacity,
  View,
  Text,
} from "@unthinkable/react-core-components";

import { TwoRow, FourColumn } from "../../core/layouts";
import { useNavigate, useLocation } from "../../routes";
import ThemeSwitcher from "../../components/ThemeSwitcher";
import LocaleSwitcher from "../../components/LocaleSwitcher";
import images from "../../images";

import Styles from "./bottomBar.style";

function useMenu() {
  const navigate = useNavigate();
  const { pathname: currrentRoute } = useLocation();
  const [bottomBarActive, setBottomBarActive] = useState(1);

  const navigateTo = (active, route) => {
    setBottomBarActive(active);
    navigate(route);
  };
  return {
    currrentRoute,
    bottomBarActive,
    navigateTo,
  };
}

function BottomBar() {
  const { currrentRoute, bottomBarActive, navigateTo } = useMenu();
  const icons = useTheme("icons");
  const intl = useIntl();
  const { logo, homeOutline, homeSolid, profileOutline, profileSolid } = icons;
  const { current: currentBreakpoint } = useContext(MediaQueryContext);

  const homeIcon = currrentRoute === "/" ? homeSolid : homeOutline;
  const profileIcon =
    currrentRoute === "/profile" ? profileSolid : profileOutline;

  if (currentBreakpoint === "md") {
    return (
      <TwoRow
        style={Styles.menuContainer}
        topSection={
          <View style={Styles.sectionViewStyle}>
            <Image source={logo} style={Styles.imageStyle} />
          </View>
        }
        bottomSection={
          <TwoRow
            topSection={
              <>
                <TouchableOpacity
                  style={Styles.sectionViewStyle}
                  onPress={() => {
                    navigateTo(1, "/Dashboard");
                  }}
                >
                  <Image source={homeIcon} style={Styles.imageStyle} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={Styles.sectionViewStyle}
                  onPress={() => {
                    navigateTo(4, "/profile");
                  }}
                >
                  <Image source={profileIcon} style={Styles.imageStyle} />
                </TouchableOpacity>
              </>
            }
            bottomSection={
              <>
                <ThemeSwitcher />
                <LocaleSwitcher />
              </>
            }
            isTopFillSpace={true}
            isBottomFillSpace={false}
          />
        }
        isTopFillSpace={false}
        isBottomFillSpace={true}
      />
    );
  }

  return (
    <View>
      <View style={Styles.bottomBarView}>
        <View style={Styles.borderStyle}></View>
        <View>
          <FourColumn
            firstSection={
              <>
                <View
                  style={
                    bottomBarActive === 1
                      ? Styles.activeStyleDashboard
                      : Styles.inActiveStyle
                  }
                />
                <TouchableOpacity
                  style={Styles.buttonStyle}
                  onPress={() => {
                    navigateTo(1, "/Dashboard");
                  }}
                >
                  {bottomBarActive === 1 ? (
                    <Image source={images.iconDashboard} />
                  ) : (
                    <Image source={images.iconDashboard} />
                  )}
                  <Text
                    style={
                      bottomBarActive === 1
                        ? Styles.activeTextStyle
                        : Styles.inActiveTextStyle
                    }
                  >
                    {intl.formatMessage({ id: "label.dashboard" })}
                  </Text>
                </TouchableOpacity>
              </>
            }
            secoundSection={
              <>
                <View
                  style={
                    bottomBarActive === 2
                      ? Styles.activeStyle
                      : Styles.inActiveStyle
                  }
                />
                <TouchableOpacity
                  style={Styles.buttonStyle}
                  onPress={() => {
                    navigateTo(2, "/Round1");
                  }}
                >
                  {bottomBarActive === 2 ? (
                    <Image source={images.iconActiveRound1} />
                  ) : (
                    <Image source={images.iconRound1} />
                  )}
                  <Text
                    style={
                      bottomBarActive === 2
                        ? Styles.activeTextStyle
                        : Styles.inActiveTextStyle
                    }
                  >
                    {intl.formatMessage({ id: "label.round1" })}
                  </Text>
                </TouchableOpacity>
              </>
            }
            thirdSection={
              <>
                <View
                  style={
                    bottomBarActive === 3
                      ? Styles.activeStyle
                      : Styles.inActiveStyle
                  }
                />
                <TouchableOpacity
                  style={Styles.buttonStyle}
                  onPress={() => {
                    navigateTo(3, "/Round2");
                  }}
                >
                  {bottomBarActive === 3 ? (
                    <Image source={images.iconActiveRound2} />
                  ) : (
                    <Image source={images.iconRound2} />
                  )}
                  <Text
                    style={
                      bottomBarActive === 3
                        ? Styles.activeTextStyle
                        : Styles.inActiveTextStyle
                    }
                  >
                    {intl.formatMessage({ id: "label.round2" })}
                  </Text>
                </TouchableOpacity>
              </>
            }
            fourthSection={
              <>
                <View
                  style={
                    bottomBarActive === 4
                      ? Styles.activeStyleMyaccount
                      : Styles.inActiveStyle
                  }
                />
                <TouchableOpacity
                  style={Styles.buttonStyle}
                  onPress={() => {
                    navigateTo(4, "/profile");
                  }}
                >
                  {bottomBarActive === 4 ? (
                    <Image source={images.iconActiveMyaccount} />
                  ) : (
                    <Image source={images.iconMyaccount} />
                  )}
                  <Text
                    style={
                      bottomBarActive === 4
                        ? Styles.activeTextStyle
                        : Styles.inActiveTextStyle
                    }
                  >
                    {intl.formatMessage({ id: "label.my_account" })}
                  </Text>
                </TouchableOpacity>
              </>
            }
            isLeftFillSpace={true}
            isRightFillSpace={true}
          />
        </View>
      </View>
    </View>
  );
}
export default BottomBar;
