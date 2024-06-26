import React, { useEffect, useState } from "react";
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
import getStyles from "./CustomTabs.style.js";

export const CustomTabs = ({
  containerStyle,
  cleanupFuntion,
  renderHeader,
  renderFooter,
  showWarningOnTabSwitch,
  setSelectedTab,
  tabs,
  intialActiveTab = 0,
  container
}) => {
  const intl = useIntl();
  const theme = useTheme();
  const styles = getStyles(theme);

  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [alertOnTabSwitch, setAlertOnTabSwitch] = useState({
    showAlert: false,
    tab: {},
    tabIndex: -1,
  });
  useEffect(() => {
    setActiveTabIndex(intialActiveTab);
  }, [intialActiveTab]);
  useEffect(() => {
    setSelectedTab && setSelectedTab(activeTabIndex);
  }, [activeTabIndex]);
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

  return (
    <>
      <View style={{ ...styles.container, ...(container ?? {}) }}>
        <View style={{ ...styles.headerContainer, ...containerStyle }}>
          {renderHeader && renderHeader()}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Row gap={24} style={styles.tabsContainer}>
              {tabs.map((tab, index) => {
                const { label } = tab;
                let isActive = index === activeTabIndex;
                return (
                  <TouchableOpacity
                    onPress={() => {
                      handleTabChange({ tab, index });
                    }}
                    key={index}
                    style={{
                      ...styles.itemContainer,
                      ...(isActive ? styles.activeItemContainer : {}),
                    }}
                  >
                    <CommonText
                      fontWeight={isActive ? "600" : "500"}
                      customTextStyle={{
                        ...styles.itemText,
                        ...(isActive ? styles.activeItemText : {}),
                      }}
                    >
                      {label}
                    </CommonText>
                  </TouchableOpacity>
                );
              })}
            </Row>
          </ScrollView>
        </View>
        {tabs[activeTabIndex]?.component}
      </View>
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
      {!!renderFooter && renderFooter()}
    </>
  );
};

CustomTabs.propTypes = {
  containerStyle: PropTypes.object,
  renderHeader: PropTypes.func,
  renderFooter: PropTypes.func,
  showWarningOnTabSwitch: PropTypes.bool,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      component: PropTypes.element.isRequired,
    })
  ).isRequired,
  setSelectedTab: PropTypes.func,
  cleanupFuntion: PropTypes.func,
  renderHeader: PropTypes.func,
  intialActiveTab: PropTypes.number,
};
