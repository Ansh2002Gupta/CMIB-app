import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  FlatList,
  Image,
  Platform,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";

import { useIntl } from "react-intl";
import { useNavigate } from "../../routes";
import { navigations } from "../../constants/routeNames";

import { TwoColumn, TwoRow } from "../../core/layouts";

import { modules, items } from "../../constants/sideBarHelpers";
import { SideBarContext } from "../../globalContext/sidebar/sidebarProvider";
import { setSelectedModule } from "../../globalContext/sidebar/sidebarActions";
import Config from "../../components/ReactConfig/index";
import CommonText from "../../components/CommonText";
import ResponsiveTextTruncate from "../../components/ResponsiveTextTruncate/ResponsiveTextTruncate";
import images from "../../images";
import ModuleList from "../../components/ModuleList/ModuleList";
import useIsWebView from "../../hooks/useIsWebView";
import styles from "./SideBar.style";

const SideBarContentSection = ({ onClose, showCloseIcon }) => {
  const [sideBarState, sideBarDispatch] = useContext(SideBarContext);
  const { selectedModule } = sideBarState;

  const navigate = useNavigate();
  const isWeb = useIsWebView();
  const intl = useIntl();

  const [openModuleSelector, setOpenModuleSelector] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState(
    selectedModule.children[0].key
  );

  const handleOnSelectItem = (item) => {
    sideBarDispatch(setSelectedModule(item));
    setOpenModuleSelector(false);
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
      <TouchableOpacity
        style={isActive ? styles.moduleActiveMenuItems : styles.moduleMenuItems}
        onPress={() => handleOnClickMenuItem(item)}
      >
        <Image source={images[item.icon]} style={styles.menuIcons} />
        <CommonText
          customTextStyle={isActive ? styles.menuItemsText : styles.changeText}
          title={item.label}
        />
      </TouchableOpacity>
    );
  };

  const renderSessions = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.moduleListItem}
        onPress={() => {
          // TODO: Add function handling when after getting API
        }}
      >
        <CommonText customTextStyle={styles.changeText} title={item.title} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {showCloseIcon && (
        <TouchableOpacity onPress={onClose} style={styles.leftArrowButton}>
          <Image source={images.iconClose} style={styles.closeButton} />
        </TouchableOpacity>
      )}
      <View
        style={[
          styles.imageView,
          showCloseIcon ? styles.imageViewStyles : styles.imgViewStyle,
        ]}
      >
        <Image source={images.iconCmibLogoWhite} />
      </View>
      {!openModuleSelector && (
        <CommonText
          customTextStyle={styles.sessionText}
          title={intl.formatMessage({ id: "label.module" })}
        />
      )}
      <TwoRow
        isBottomFillSpace={true}
        topSection={
          <TwoColumn
            style={openModuleSelector ? styles.openModule : styles.moduleText}
            leftSection={
              <View
                style={openModuleSelector ? "" : styles.moduleSelectorheading}
              >
                <ResponsiveTextTruncate
                  text={selectedModule.label}
                  maxLength={22}
                  style={styles.changeText}
                  widthPercentage={0.4}
                />
              </View>
            }
            rightSection={
              <TouchableOpacity
                onPress={() => setOpenModuleSelector((prev) => !prev)}
                style={styles.changeTextContainer}
              >
                {openModuleSelector ? (
                  <Image
                    source={images.iconLeftArrow}
                    style={styles.leftArrow}
                  />
                ) : (
                  <CommonText
                    customTextStyle={styles.changeText}
                    title={intl.formatMessage({ id: "label.change" })}
                  />
                )}
              </TouchableOpacity>
            }
          />
        }
        bottomSection={
          openModuleSelector ? (
            <ModuleList modules={modules} onSelectItem={handleOnSelectItem} />
          ) : (
            <>
              {isWeb.isWebView ? (
                <FlatList
                  data={selectedModule.children}
                  renderItem={renderMenuItems}
                />
              ) : (
                <>
                  <CommonText
                    customTextStyle={styles.sessionText}
                    title={intl.formatMessage({ id: "label.session" })}
                  />
                  <FlatList data={items} renderItem={renderSessions} />
                </>
              )}
            </>
          )
        }
      />
      <TouchableOpacity
        style={[
          styles.bottomView,
          Platform.OS !== "web" && styles.mobContainer,
        ]}
        onPress={handleBottomViewNavigation}
      >
        <View style={styles.imageTextView}>
          <Image source={images.iconFooterGlobal} style={styles.globalIcon} />
          <CommonText
            customTextStyle={styles.visitWebsiteText}
            title={intl.formatMessage({ id: "label.visit_website" })}
          />
        </View>
        <Image source={images.iconRightArrow} style={styles.globalIcon} />
      </TouchableOpacity>
    </View>
  );
};

SideBarContentSection.propTypes = {
  onClose: PropTypes.func.isRequired,
  showCloseIcon: PropTypes.bool.isRequired,
};

export default SideBarContentSection;
