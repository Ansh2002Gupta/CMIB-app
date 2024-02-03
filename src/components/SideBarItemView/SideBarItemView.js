import React from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { Platform, View } from "@unthinkable/react-core-components";

import { TwoColumn } from "../../core/layouts";

import CommonText from "../CommonText";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import styles from "./SideBarItemView.style";

const SideBarItemView = ({
  content,
  onPressChange,
  showChangeButton,
  title,
}) => {
  const intl = useIntl();

  const platformSpecificProps = Platform.select({
    web: {},
    default: {
      numberOfLines: 1,
      ellipsizeMode: "tail",
    },
  });

  return (
    <>
    <View style={styles.mainContainer}>
      <CommonText customTextStyle={styles.titleText}>{title}</CommonText>
      <TwoColumn
        style={styles.contentTextContainer}
        isLeftFillSpace
        leftSectionStyle={styles.leftSection}
        leftSection={
          <CommonText
            customTextStyle={styles.contentText}
            customTextProps={platformSpecificProps}
          >
            {content}
          </CommonText>
        }
        rightSection={
          showChangeButton && (
            <CustomTouchableOpacity
              onPress={onPressChange}
              style={styles.changeTextContainer}
            >
              <CommonText customTextStyle={styles.changeText}>
                {intl.formatMessage({ id: "label.change" })}
              </CommonText>
            </CustomTouchableOpacity>
          )
        }
      />
      </View>
    </>
  );
};

SideBarItemView.defaultProps = {
  showChangeButton: true,
};

SideBarItemView.propTypes = {
  content: PropTypes.string.isRequired,
  onPressChange: PropTypes.func.isRequired,
  showChangeButton: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

export default SideBarItemView;
