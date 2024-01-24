import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "../../routes";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import {
  FlatList,
  Platform,
  View,
} from "@unthinkable/react-core-components";

import { TwoRow } from "../../core/layouts";

import Config from "../../components/ReactConfig/index";
import CustomImage from "../../components/CustomImage";
import CommonText from "../../components/CommonText";
import CustomTouchableOpacity from "../../components/CustomTouchableOpacity";
import TouchableImage from "../../components/TouchableImage";
import ModuleList from "../../components/ModuleList/ModuleList";
import SessionList from "../../components/SessionList/SessionList";
import SideBarContentEnum from "./sideBarContentEnum";
import SideBarItemView from "../../components/SideBarItemView/SideBarItemView";
import { SideBarContext } from "../../globalContext/sidebar/sidebarProvider";
import {
  setSelectedModule,
  setSelectedSession,
} from "../../globalContext/sidebar/sidebarActions";
import useIsWebView from "../../hooks/useIsWebView";
import { navigations } from "../../constants/routeNames";
import { modules, getIconImages } from "../../constants/sideBarHelpers";
import images from "../../images";
import styles from "./SideBar.style";

const SideBarContentSection = ({ onClose, showCloseIcon }) => {
  const [sideBarState, sideBarDispatch] = useContext(SideBarContext);
  const { selectedModule, selectedSession } = sideBarState;
  const navigate = useNavigate();
  const { isWebView } = useIsWebView();
  const intl = useIntl();
  const [sideBarContent, setSideBarSubMenu] = useState(SideBarContentEnum.NONE);
  const [activeMenuItem, setActiveMenuItem] = useState(
    selectedModule?.children?.[0]?.key
  );

  useEffect(() => {
    if (isWebView && sideBarContent === SideBarContentEnum.SESSION) {
      setSideBarSubMenu(SideBarContentEnum.NONE);
    }
  }, [isWebView, sideBarContent]);

  const handleOnSelectModuleItem = (item) => {
    if (item.key !== selectedModule.key) {
      sideBarDispatch(setSelectedSession(item?.session?.[0]));
      sideBarDispatch(setSelectedModule(item));
    }
    setSideBarSubMenu(SideBarContentEnum.NONE);
  };

  const handleOnSelectSessionItem = (item) => {
    sideBarDispatch(setSelectedSession(item));
    setSideBarSubMenu(SideBarContentEnum.NONE);
  };

  const handleOnClickMenuItem = ({ key }) => {
    navigate(key);
    setActiveMenuItem(key);
  };

  const handleBottomViewNavigation = () => {
    const uri = Config.REACT_APP_CMS_URI;
    if (Platform.OS.toLowerCase() === "web") {
      window.location.href = uri;
    } else {
      navigate(navigations.WEB_VIEW, { state: { uri } });
    }
  };

  const renderMenuItems = ({ item, index }) => {
    const isActive = activeMenuItem === item.key;
    return (
      <CustomTouchableOpacity
        style={isActive ? styles.moduleActiveMenuItems : styles.moduleMenuItems}
        onPress={() => handleOnClickMenuItem(item)}
      >
        <CustomImage
          source={
            isActive
              ? getIconImages(item.icon).activeImage
              : getIconImages(item.icon).webInactiveImage
          }
          style={styles.menuIcons}
        />
        <CommonText
          customTextStyle={isActive ? styles.menuItemsText : styles.changeText}
        >
          {item.label}
        </CommonText>
      </CustomTouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {showCloseIcon && (
        <TouchableImage
          onPress={onClose}
          source={images.iconClose}
          parentStyle={styles.closeButton}
        />
      )}
      <View style={styles.imageView}>
        <CustomImage source={images.cmibIcon} style={styles.cmiLogo} />
      </View>
      {sideBarContent === SideBarContentEnum.NONE && (
        <TwoRow
          isBottomFillSpace={isWebView}
          topSection={
            <SideBarItemView
              title={intl.formatMessage({ id: "label.module" })}
              content={
                selectedModule?.label ||
                intl.formatMessage({ id: "label.no_module_available" })
              }
              onPressChange={() => setSideBarSubMenu(SideBarContentEnum.MODULE)}
              showChangeButton={!!selectedModule?.label}
            />
          }
          bottomSection={
            <>
              {isWebView ? (
                <FlatList
                  data={selectedModule?.children || []}
                  renderItem={renderMenuItems}
                />
              ) : (
                !!selectedModule?.label && (
                  <SideBarItemView
                    title={intl.formatMessage({ id: "label.session" })}
                    content={selectedSession?.label || ""}
                    onPressChange={() =>
                      setSideBarSubMenu(SideBarContentEnum.SESSION)
                    }
                  />
                )
              )}
            </>
          }
        />
      )}
      {sideBarContent === SideBarContentEnum.MODULE && (
        <ModuleList
          modules={modules}
          onSelectItem={handleOnSelectModuleItem}
          selectedModule={selectedModule}
        />
      )}
      {!isWebView &&
        !!selectedModule?.label &&
        sideBarContent === SideBarContentEnum.SESSION && (
          <SessionList
            sessionList={selectedModule?.session}
            onSelectItem={handleOnSelectSessionItem}
            selectedSession={selectedSession}
          />
        )}
      <View style={styles.bottomView}>
        <CustomImage
          source={images.iconCmibCALogo}
          style={styles.logoStyle}
          alt={"cmib logo"}
        />
        <CustomTouchableOpacity
          style={{
            ...styles.bottomButton,
            ...(Platform.OS !== "web" && styles.mobContainer),
          }}
          onPress={handleBottomViewNavigation}
        >
          <View style={styles.imageTextView}>
            <CustomImage
              source={images.iconFooterGlobal}
              style={styles.globalIcon}
            />
            <CommonText customTextStyle={styles.visitWebsiteText}>
              {intl.formatMessage({ id: "label.visit_website" })}
            </CommonText>
          </View>
          <CustomImage
            source={images.iconRightArrow}
            style={styles.globalIcon}
          />
        </CustomTouchableOpacity>
      </View>
    </View>
  );
};

SideBarContentSection.propTypes = {
  onClose: PropTypes.func.isRequired,
  showCloseIcon: PropTypes.bool.isRequired,
};

export default SideBarContentSection;
