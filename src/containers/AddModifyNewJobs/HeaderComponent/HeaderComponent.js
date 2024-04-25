import React from "react";
import { useIntl } from "react-intl";
import { useTheme } from "@unthinkable/react-theme";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../../../components/CommonText";
import TouchableImage from "../../../components/TouchableImage";
import CustomButton from "../../../components/CustomButton";

import images from "../../../images";
import getStyles from "./HeaderComponent.styles";

const HeaderComponent = ({
  headerText,
  isExpanded,
  isQuestion,
  isWebView,
  isMinimisedVisible,
  onPress,
  progressJobData,
  progressText,
  setIsExpanded,
  subText,
}) => {
  const ArrowUp = images.iconArrowUp;
  const ArrowDown = images.iconArrowDown;
  const intl = useIntl();
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View>
      <View style={styles.containerStyle}>
        <View style={styles.textViewStyle}>
          <CommonText customTextStyle={styles.textStyle} fontWeight={"600"}>
            {headerText}
          </CommonText>
        </View>
        <View style={styles.innerContainer}>
          {isWebView && isExpanded && (
            <View>
              <CustomButton
                style={styles.webAddButtonStyle}
                withGreenBackground
                onPress={onPress}
              >
                {intl.formatMessage({ id: "label.add_question" })}
              </CustomButton>
            </View>
          )}
          {!isExpanded && progressText && progressText > 0 && isQuestion ? (
            <View style={styles.progressViewStyle}>
              <CommonText customTextStyle={styles.progressTextStyle}>
                {progressText}
              </CommonText>
            </View>
          ) : null}
          {!isExpanded && !isQuestion ? (
            <View
              style={{
                ...{ backgroundColor: progressJobData.backgroundColor },
                ...styles.jobDataProgressView,
              }}
            >
              <CommonText
                customTextStyle={{
                  ...styles.fontSize12,
                  ...{ color: progressJobData.textColor },
                }}
              >
                {progressJobData.text}
              </CommonText>
            </View>
          ) : null}

          {isMinimisedVisible && (
            <TouchableImage
              source={isExpanded ? ArrowUp : ArrowDown}
              style={styles.iconStyle}
              onPress={() => {
                setIsExpanded(!isExpanded);
              }}
            />
          )}
        </View>
      </View>
      {subText && isExpanded && (
        <CommonText
          customTextStyle={styles.subTextStyle}
          fontWeight={"500"}
          customContainerStyle={styles.subTextViewStyle}
        >
          {subText}
        </CommonText>
      )}
    </View>
  );
};

export default HeaderComponent;
