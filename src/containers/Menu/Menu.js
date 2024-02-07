import React, {useContext} from 'react';
import {
  Image,
  TouchableOpacity,
  View,
} from '@unthinkable/react-core-components';
import {
  MediaQueryContext,
  useTheme,
} from '@unthinkable/react-theme';

import {TwoColumn, TwoRow} from '../../core/layouts';

import {useNavigate, useLocation} from '../../routes';

import ThemeSwitcher from '../../components/ThemeSwitcher';
import LocaleSwitcher from '../../components/LocaleSwitcher';

import Styles from './menu.style';

function useMenu() {
  const navigate = useNavigate();
  const {pathname: currrentRoute} = useLocation();

  const navigateToHome = () => navigate('/');
  const navigateToProfile = () => navigate('/profile');

  return {
    navigateToHome,
    navigateToProfile,
    currrentRoute,
  };
}

function MenuContainer() {
  const {navigateToHome, navigateToProfile, currrentRoute} = useMenu();
  const icons = useTheme('icons');
  const {logo, homeOutline, homeSolid, profileOutline, profileSolid} = icons;
  const {current: currentBreakpoint} = useContext(MediaQueryContext);

  const homeIcon = currrentRoute === '/' ? homeSolid : homeOutline;
  const profileIcon =
    currrentRoute === '/profile' ? profileSolid : profileOutline;

  if (currentBreakpoint === 'md') {
    return (
      <TwoRow
        style={Styles.menuContainer}
        topSection={
          <View style={{width: 48, height: 48, padding: 15}}>
            <Image source={logo} style={{width: '100%', height: '100%'}} />
          </View>
        }
        bottomSection={
          <TwoRow
            topSection={
              <>
                <TouchableOpacity
                  style={{width: 48, height: 48, padding: 15}}
                  onPress={navigateToHome}>
                  <Image
                    source={homeIcon}
                    style={{width: '100%', height: '100%'}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{width: 48, height: 48, padding: 15}}
                  onPress={navigateToProfile}>
                  <Image
                    source={profileIcon}
                    style={{width: '100%', height: '100%'}}
                  />
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
    <TwoColumn
      leftSection={
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            style={{width: 48, height: 48, padding: 15}}
            onPress={navigateToHome}>
            <Image source={homeIcon} style={{width: '100%', height: '100%'}} />
          </TouchableOpacity>
        </View>
      }
      rightSection={
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            style={{width: 48, height: 48, padding: 15}}
            onPress={navigateToProfile}>
            <Image
              source={profileIcon}
              style={{width: '100%', height: '100%'}}
            />
          </TouchableOpacity>
        </View>
      }
      isLeftFillSpace={true}
      isRightFillSpace={true}
    />
  );
}
export default MenuContainer;
