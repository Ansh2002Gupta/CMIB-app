import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { FlatList, Platform, View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import CustomImage from "../CustomImage";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import Dialog from "../Dialog";
import images from "../../images";
import useIsWebView from "../../hooks/useIsWebView";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import { getAccessibleModulesList } from "../../constants/sideBarHelpers";
import classes from "../../theme/styles/CssClassProvider/CssClassProvider";
import styles from "./ModuleList.style";

const ModuleList = ({ modules, onSelectItem, selectedModule }) => {
  const { isWebView } = useIsWebView();
  const intl = useIntl();

  const containerStyle = isWebView
    ? styles.containerGridStyle
    : styles.containerStyle;

  const [userProfileState] = useContext(UserProfileContext);
  const renderrableModules = getAccessibleModulesList({
    allModules: modules,
    accessibleModules: Object.keys(
      userProfileState.userDetails?.menu_items || {}
    ),
  });
  const platformSpecificProps = Platform.select({
    web: {},
    default: {
      numberOfLines: 1,
      ellipsizeMode: "tail",
    },
  });

  const renderItem = ({ item: module }) => (
    <>
      {module.visible && (
        <CustomTouchableOpacity
          style={
            module.sectionHeading
              ? styles.moduleListWithoutCursor
              : styles.moduleListItem(module.key === selectedModule.key)
          }
          key={module.key}
          onPress={() =>
            !module.sectionHeading ? onSelectItem(module) : () => {}
          }
        >
          <CommonText
            customTextProps={platformSpecificProps}
            customTextStyle={[
              styles.text,
              module.sectionHeading ? styles.disabled : {},
            ]}
          >
            {module.label}
          </CommonText>
        </CustomTouchableOpacity>
      )}
    </>
  );

  return (
    <>
      {isWebView ? (
        <Dialog
          heading={intl.formatMessage({ id: "label.selectModule" })}
          modalContainerStyle={styles.modalContainerStyle}
          customHeadingStyle={styles.modalHeadingStyle}
          onClose={() =>
            !module.sectionHeading ? onSelectItem(selectedModule) : () => {}
          }
        >
          <View style={styles.borderStyle}></View>
          <View style={{ ...styles.mainViewStyle, ...containerStyle }}>
            {renderrableModules.map((item) => {
              if (item.label !== "Experienced Members" && item.visible) {
                return (
                  <CustomTouchableOpacity
                    onPress={() =>
                      !module.sectionHeading ? onSelectItem(item) : () => {}
                    }
                    style={{
                      ...styles.moduleTabStyle,
                      ...(item?.key === selectedModule.key
                        ? styles.activeTabStyle
                        : {}),
                    }}
                    className={classes["module-box_outlin--darkBlue"]}
                  >
                    <CustomImage
                      source={item.image}
                      style={styles.moduleImageStyle}
                    />
                    <View style={styles.containerTextStyle}>
                      <CommonText
                        customTextStyle={styles.moduleTextStyle}
                        fontWeight="600"
                      >
                        {item.label}
                      </CommonText>
                      <CommonText
                        customTextStyle={styles.experienceMemberTextStyle}
                      >
                        {intl.formatMessage({ id: "label.experiencedMember" })}
                      </CommonText>
                    </View>

                    <View style={styles.textView}>
                      {item?.key === selectedModule.key && (
                        <CustomImage
                          source={images.iconTickBlue}
                          style={styles.tickImageStyle}
                        />
                      )}
                    </View>
                  </CustomTouchableOpacity>
                );
              }
            })}
          </View>
        </Dialog>
      ) : (
        <FlatList
          data={renderrableModules}
          keyExtractor={(module) => module.key}
          renderItem={renderItem}
        />
      )}
    </>
  );
};

ModuleList.propTypes = {
  modules: PropTypes.array.isRequired,
  onSelectItem: PropTypes.func.isRequired,
  selectedModule: PropTypes.object.isRequired,
};

export default ModuleList;
