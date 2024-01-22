import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import {
  FlatList,
  Platform,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";
import { useIntl } from "react-intl";
import { useNavigate } from "../../routes";

import { TwoColumn, TwoRow } from "../../core/layouts";

import Config from "../../components/ReactConfig/index";
import CustomImage from "../../components/CustomImage";
import CommonText from "../../components/CommonText";
import ResponsiveTextTruncate from "../../components/ResponsiveTextTruncate/ResponsiveTextTruncate";
import TouchableImage from "../../components/TouchableImage";
import ModuleList from "../../components/ModuleList/ModuleList";
import useIsWebView from "../../hooks/useIsWebView";
import { setSelectedModule } from "../../globalContext/sidebar/sidebarActions";
import { SideBarContext } from "../../globalContext/sidebar/sidebarProvider";
import { navigations } from "../../constants/routeNames";
import { modules, items, getIconImages } from "../../constants/sideBarHelpers";
import images from "../../images";
import styles from "./SideBar.style";

const SideBarContentSection = ({ onClose, showCloseIcon }) => {
  const [sideBarState, sideBarDispatch] = useContext(SideBarContext);
  const { selectedModule } = sideBarState;

  const navigate = useNavigate();
  const isWeb = useIsWebView();
  const intl = useIntl();

  const [openModuleSelector, setOpenModuleSelector] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState(
    selectedModule?.children?.[0]?.key
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
        <CommonText customTextStyle={styles.changeText}>
          {item.label}
        </CommonText>
      </TouchableOpacity>
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
      <View
        style={[
          styles.imageView,
          showCloseIcon ? styles.imageViewStyles : styles.imgViewStyle,
        ]}
      >
        <CustomImage source={images.cmibIcon} style={styles.cmiLogo} />
      </View>
      {!openModuleSelector && (
        <CommonText customTextStyle={styles.sessionText}>
          {intl.formatMessage({ id: "label.module" })}
        </CommonText>
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
                  text={selectedModule?.label || ""}
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
                  <CustomImage
                    source={images.iconLeftArrow}
                    style={styles.leftArrow}
                  />
                ) : (
                  <CommonText customTextStyle={styles.changeText}>
                    {intl.formatMessage({ id: "label.change" })}
                  </CommonText>
                )}
              </TouchableOpacity>
            }
          />
        }
        bottomSectionStyle={styles.bottomSection}
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
                  <CommonText customTextStyle={styles.sessionText}>
                    {intl.formatMessage({ id: "label.session" })}
                  </CommonText>
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
          <CustomImage
            source={images.iconFooterGlobal}
            style={styles.globalIcon}
          />
          <CommonText customTextStyle={styles.visitWebsiteText}>
            {intl.formatMessage({ id: "label.visit_website" })}
          </CommonText>
        </View>
        <CustomImage source={images.iconRightArrow} style={styles.globalIcon} />
      </TouchableOpacity>
    </View>
  );
};

SideBarContentSection.propTypes = {
  onClose: PropTypes.func.isRequired,
  showCloseIcon: PropTypes.bool.isRequired,
};

export default SideBarContentSection;
