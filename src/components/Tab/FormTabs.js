import React, { Fragment, useState } from "react";
import { useIntl } from "react-intl";
import { useTheme } from "@unthinkable/react-theme";
import {
  Row,
  ScrollView,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";
import PropTypes from "prop-types";

import CommonText from "../CommonText";
import ConfirmationModal from "../../containers/ConfirmationModal";
import CustomTouchableOpacity from "../CustomTouchableOpacity/CustomTouchableOpacity.js";
import useIsWebView from "../../hooks/useIsWebView.js";
import images from "../../images";
import CustomImage from "../CustomImage/CustomImage.js";
import getStyles from "./FormTabs.style.js";

export const FormTabs = ({
  isEditButtonVisible,
  onEditClick,
  showWarningOnTabSwitch,
  tabs,
  cleanupFuntion,
}) => {
  const intl = useIntl();
  const theme = useTheme();
  const styles = getStyles(theme);
  const { isWebView } = useIsWebView();
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [alertOnTabSwitch, setAlertOnTabSwitch] = useState({
    showAlert: false,
    tab: {},
    tabIndex: -1,
  });

  const handleTabChange = ({ tab, index }) => {
    if (index !== activeTabIndex) {
      if (showWarningOnTabSwitch) {
        setAlertOnTabSwitch({
          showAlert: true,
          tab,
          tabIndex: index,
        });
        return;
      }
      cleanupFuntion && cleanupFuntion(index);
      setActiveTabIndex(index);
    }
  };

  const closeAlertHandler = () => {
    setAlertOnTabSwitch({
      showAlert: false,
      tab: {},
      tabIndex: -1,
    });
  };
  const CustomScroll = isWebView ? ScrollView : Fragment;

  return (
    <>
      <View style={styles.innerContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollViewContainer}>
          <Row gap={12} style={styles.tabContainer}>
            {tabs.map((tab, index) => {
              const { label } = tab;
              return (
                <TouchableOpacity
                  onPress={() => {
                    handleTabChange({ tab, index });
                  }}
                  key={index}
                  style={{
                    ...styles.itemContainer,
                    ...(index === activeTabIndex
                      ? styles.activeItemContainer
                      : {}),
                  }}
                >
                  <CommonText
                    fontWeight={"500"}
                    customTextStyle={{
                      ...styles.itemText,
                      ...(index === activeTabIndex
                        ? styles.activeItemText
                        : {}),
                    }}
                  >
                    {label}
                  </CommonText>
                </TouchableOpacity>
              );
            })}
          </Row>
        </ScrollView>
        {isEditButtonVisible && (
          <CustomTouchableOpacity
            style={styles.editButtonViewStyle}
            onPress={onEditClick}
          >
            <CustomImage
              source={images.iconEdit}
              style={styles.editIconStyle}
            />
            <CommonText customContainerStyle={styles.marginLeft8}>
              {intl.formatMessage({ id: "label.edit" })}
            </CommonText>
          </CustomTouchableOpacity>
        )}
      </View>
      <CustomScroll>{tabs[activeTabIndex].component}</CustomScroll>
      {alertOnTabSwitch?.showAlert && (
        <ConfirmationModal
          headingText={intl.formatMessage({
            id: "label.dirtyFormAlertHeading",
          })}
          subHeading={intl.formatMessage({
            id: "label.dirtyFormAlertSubHeading",
          })}
          severity={"warning"}
          buttonOneText={intl.formatMessage({ id: "label.close" })}
          buttonTwoText={intl.formatMessage({ id: "label.continue" })}
          onPressButtonOne={closeAlertHandler}
          onPressButtonTwo={() => {
            setActiveTabIndex(alertOnTabSwitch?.tabIndex);
            closeAlertHandler();
          }}
        />
      )}
    </>
  );
};

FormTabs.propTypes = {
  cleanupFuntion: PropTypes.func,
  showWarningOnTabSwitch: PropTypes.bool,
  isEditButtonVisible: PropTypes.bool,
  onEditClick: PropTypes.func,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      component: PropTypes.element.isRequired,
    })
  ).isRequired,
};
