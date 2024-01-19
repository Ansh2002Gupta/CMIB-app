import React from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";

import { TwoColumn } from "../../core/layouts";

import CommonText from "../CommonText";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import ResponsiveTextTruncate from "../ResponsiveTextTruncate/ResponsiveTextTruncate";
import styles from "./SideBarItemView.style";

const SideBarItemView = ({
  content,
  onPressChange,
  showChangeButton,
  title,
}) => {
  const intl = useIntl();

  return (
    <>
      <CommonText customTextStyle={styles.titleText}>{title}</CommonText>
      <TwoColumn
        style={styles.contentText}
        leftSection={
          <ResponsiveTextTruncate
            text={content}
            maxLength={25}
            style={styles.changeText}
            widthPercentage={0.4}
          />
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
