import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "../../routes";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { FlatList, Platform, View } from "@unthinkable/react-core-components";

import { TwoRow } from "../../core/layouts";

import CommonText from "../../components/CommonText";
import Config from "../../components/ReactConfig/index";
import CustomButton from "../../components/CustomButton";
import CustomImage from "../../components/CustomImage";
import CustomTouchableOpacity from "../../components/CustomTouchableOpacity";
import ModuleList from "../../components/ModuleList/ModuleList";
import SessionList from "../../components/SessionList/SessionList";
import SideBarContentEnum from "./sideBarContentEnum";
import SideBarItemView from "../../components/SideBarItemView/SideBarItemView";
import TouchableImage from "../../components/TouchableImage";
import useIsWebView from "../../hooks/useIsWebView";
import useGlobalSessionListApi from "../../services/apiServices/hooks/useGlobalSessionList";
import useNavigateScreen from "../../services/hooks/useNavigateScreen";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import { SideBarContext } from "../../globalContext/sidebar/sidebarProvider";
import { setRoundsData, setSelectedModule } from "../../globalContext/sidebar/sidebarActions";
import { navigations } from "../../constants/routeNames";
import { getIconImages, getAppModules } from "../../constants/sideBarHelpers";
import { CA_JOBS, COMPANY } from "../../constants/constants";
import { getSelectedSubModuleFromRoute } from "../../utils/util";
import images from "../../images";
import styles from "./SideBar.style";
import ToastComponent from "../../components/ToastComponent/ToastComponent";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../constants/errorMessages";

const SideBarContentSection = ({ onClose, showCloseIcon }) => {
  const [sideBarState, sideBarDispatch] = useContext(SideBarContext);
  const [userProfileDetails] = useContext(UserProfileContext);
  const {
    getGlobalSessionList,
    error,
    isError,
    isLoadingSession,
    setErrorGettingGlobalSession,
    setErrorGettingSession,
  } = useGlobalSessionListApi();
  const { selectedModule, selectedSession } = sideBarState;
  const { navigateScreen } = useNavigateScreen();
  const navigate = useNavigate();
  const location = useLocation();
  const { isWebView } = useIsWebView();
  const intl = useIntl();
  const [sideBarContent, setSideBarSubMenu] = useState(SideBarContentEnum.NONE);
  const [activeMenuItem, setActiveMenuItem] = useState(
    getSelectedSubModuleFromRoute({
      pathName: location.pathname,
      selectedModule,
    })
  );

  const isMemberOrCandidate =
    userProfileDetails?.userDetails?.user_type?.toLowerCase() !== COMPANY;

  useEffect(() => {
    if (isWebView && sideBarContent === SideBarContentEnum.SESSION) {
      setSideBarSubMenu(SideBarContentEnum.NONE);
    }
  }, [isWebView, sideBarContent]);

  const handleOnSelectModuleItem = async (item) => {
    setActiveMenuItem(item?.children?.[0]?.key);
    navigateScreen(`/${item.key}/${item?.children?.[0]?.key}`);
    if (item.key !== selectedModule.key) {
      sideBarDispatch(setSelectedModule(item));
      if (item.key !== CA_JOBS) {
        await getGlobalSessionList(item.key);
        sideBarDispatch(setRoundsData({}));
      }
    }
    setSideBarSubMenu(SideBarContentEnum.NONE);
  };

  const handleOnSelectSessionItem = (item) => {
    setSideBarSubMenu(SideBarContentEnum.NONE);
  };

  const handleOnClickMenuItem = ({ key }) => {
    navigateScreen(`/${selectedModule.key}/${key}`);
    setActiveMenuItem(key);
  };

  const handleBackButton = () => {
    setSideBarSubMenu(SideBarContentEnum.NONE);
  };

  const handleBottomViewNavigation = () => {
    const uri = Config.REACT_APP_CMS_URI;
    if (Platform.OS.toLowerCase() === "web") {
      window.location.href = uri;
    } else {
      navigate(navigations.WEB_VIEW, { state: { uri } });
    }
  };

  const renderMenuItems = ({ item }) => {
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
    <View style={styles.container(isMemberOrCandidate)}>
      {showCloseIcon && (
        <TouchableImage
          onPress={onClose}
          source={images.iconClose}
          parentStyle={styles.closeButton}
        />
      )}
      <View style={styles.imageView}>
        <CustomImage source={images.iconCmibDark} style={styles.cmiLogo} />
      </View>
      {(sideBarContent === SideBarContentEnum.NONE ||
        (isWebView && sideBarContent === SideBarContentEnum.MODULE)) && (
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
                <View style={styles.menuSubItems}>
                  <FlatList
                    data={selectedModule?.children || []}
                    renderItem={renderMenuItems}
                  />
                </View>
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
        <>
          {!isWebView && (
            <CustomButton
              customStyle={{
                customTextStyle: styles.btnTextStyles,
              }}
              iconLeft={{
                leftIconSource: images.iconBackArrow,
                leftIconAlt: "Left arrow",
              }}
              onPress={handleBackButton}
              style={styles.backBtnStyles}
            >
              {intl.formatMessage({ id: "label.back" })}
            </CustomButton>
          )}

          <ModuleList
            modules={getAppModules({ isMember: isMemberOrCandidate })}
            onSelectItem={handleOnSelectModuleItem}
            selectedModule={selectedModule}
            isLoadingSession={isLoadingSession}
          />
        </>
      )}
      {!isWebView &&
        !!selectedModule?.label &&
        sideBarContent === SideBarContentEnum.SESSION && (
          <SessionList
            sessionList={selectedModule?.session}
            onSelectItem={handleOnSelectSessionItem}
            onPressBack={handleBackButton}
            selectedSession={selectedSession}
          />
        )}
      <View style={styles.bottomView}>
        {(sideBarContent === SideBarContentEnum.NONE || isWebView) && (
          <CustomImage
            source={images.iconCmibCALogo}
            style={styles.logoStyle}
            alt={"cmib logo"}
          />
        )}
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
      {isError && (
        <ToastComponent
          toastMessage={error?.message || GENERIC_GET_API_FAILED_ERROR_MESSAGE}
          onDismiss={() => {
            setErrorGettingGlobalSession(null);
            setErrorGettingSession(null);
          }}
        />
      )}
    </View>
  );
};

SideBarContentSection.propTypes = {
  onClose: PropTypes.func.isRequired,
  showCloseIcon: PropTypes.bool.isRequired,
};

export default SideBarContentSection;
