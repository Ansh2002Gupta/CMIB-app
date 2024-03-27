import React from "react";
import { View } from "@unthinkable/react-core-components";
import CommonText from "../../../components/CommonText";
import TouchableImage from "../../../components/TouchableImage";
import CustomButton from "../../../components/CustomButton";
import { useIntl } from "react-intl";
import images from "../../../images";
import styles from "./HeaderComponent.styles";

const HeaderComponent = ({
  isExpanded,
  setIsExpanded,
  headerText,
  subText,
  isWebView,
  progressText,
  progressJobData,
  onPress,
  isQuestion,
}) => {
  const ArrowUp = images.iconArrowUp;
  const ArrowDown = images.iconArrowDown;
  const intl = useIntl();
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

          <TouchableImage
            source={isExpanded ? ArrowUp : ArrowDown}
            style={styles.iconStyle}
            onPress={() => {
              setIsExpanded(!isExpanded);
            }}
          />
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
