import React, { useContext } from "react";
import { View, Image } from "@unthinkable/react-core-components";
import { MediaQueryContext } from "@unthinkable/react-theme";
import { TwoColumn } from "../../core/layouts";

import { AuthContext } from "../../globalContext/auth/authProvider";
import { clearAuthAndLogout } from "./../../globalContext/auth/authActions";

import Styles from "./header.style";
import { useTheme } from "@unthinkable/react-theme";

function useHeader() {
  const [, authDispatch] = useContext(AuthContext);

  const onLogout = () => {
    authDispatch(clearAuthAndLogout());
  };

  return {
    onLogout,
  };
}

function HeaderContainer() {
  const { onLogout } = useHeader();
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const icons = useTheme("icons");
  const { cmibIcon, azadiMohatsav, g20Icon, gloPac } = icons;

  return (
    // <TwoColumn
    //   style={Styles.headerContainer}
    //   leftSection={<HeaderName />}
    //   rightSection={
    //     <View
    //       style={{
    //         flexDirection: 'row',
    //         alignItems: 'center',
    //       }}>
    //       {currentBreakpoint !== 'md' ? (
    //         <>
    //           <ThemeSwitcher />
    //           <LocaleSwitcher />
    //         </>
    //       ) : null}
    //       <View
    //         style={{
    //           cursor: 'pointer',
    //           height: 48,
    //           padding: 15,
    //           flexDirection: 'row',
    //           alignItems: 'center',
    //         }}
    //         onPress={onLogout}>
    //         <Text>Logout</Text>
    //       </View>
    //     </View>
    //   }
    //   isLeftFillSpace={true}
    //   isRightFillSpace={false}
    // />
    <TwoColumn
      style={Styles.headerContainer}
      leftSection={
        <Image source={cmibIcon} style={{ height: 70, width: 70 }}></Image>
      }
      rightSection={
        <View style={{ flexDirection: "row" }}>
          <Image source={gloPac} style={{ height: 40, width: 80 }}></Image>
          <Image source={g20Icon} style={{ height: 40, width: 80 }}></Image>
          <Image
            source={azadiMohatsav}
            style={{ height: 40, width: 80 }}
          ></Image>
        </View>
      }
    />
  );
}
export default HeaderContainer;
