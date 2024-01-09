import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { MediaQueryContext } from "@unthinkable/react-theme";
import { Platform, View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import CustomTextInput from "../CustomTextInput";
import useIsWebView from "../../hooks/useIsWebView";
import { gridStyles } from "../../theme/styles/commonStyles";
import styles, { getRowStyle } from "./DetailComponent.style";

const DetailComponent = ({
  customContainerStyle,
  details,
  headerText,
  isEditable,
  handleChange,
}) => {
  const intl = useIntl();
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const { isWebView } = useIsWebView();

  const columnCount = isWebView && gridStyles[currentBreakpoint];

  console.log(headerText, "headerText");

  const containerStyle = isWebView
    ? styles.containerGridStyle(columnCount)
    : styles.containerStyle;

  const isPlatformWeb = Platform.OS.toLowerCase() === "web";

  const getMobileProps = (detail) => {
    if (!isPlatformWeb && detail.isMultiline) {
      return {
        isMultiline: true,
        height: 84,
      };
    }
    return {};
  };

  console.log({ ...containerStyle, ...customContainerStyle }, "containerStyle");

  return (
    <View>
      {!!headerText && (
        <CommonText customTextStyle={styles.headerText}>
          {headerText}
        </CommonText>
      )}
      <View style={{ ...containerStyle, ...customContainerStyle }}>
        {details?.map((detail, index) => (
          <View
            key={index}
            style={isWebView ? styles.webContainer : getRowStyle(detail)}
          >
            {isEditable ? (
              <CustomTextInput
                errorMessage={detail.error}
                value={detail.value}
                customStyle={styles.inputStyle}
                label={intl.formatMessage({ id: detail.label })}
                isDropdown={detail.isDropdown}
                isCounterInput={detail.isCounterInput}
                isError={!!detail.error}
                isMobileNumber={detail.isMobileNumber}
                isMandatory
                options={detail.options || []}
                placeholder={intl.formatMessage({ id: detail.placeholder })}
                maxLength={detail.maxLength}
                isNumeric={detail.isNumeric}
                valueField={detail.valueField || "label"}
                labelField={detail.labelField || "label"}
                inputKey={detail.inputKey || "value"}
                onChangeValue={(val) => handleChange(detail.label, val)}
                onChangeText={(val) => {
                  handleChange(detail.label, val);
                }}
                {...getMobileProps(detail)}
              />
            ) : (
              <>
                <View style={styles.titleContainer}>
                  <CommonText
                    title={intl.formatMessage({ id: detail.label })}
                    customTextStyle={styles.titleStyle}
                  />
                  <CommonText title="*" customTextStyle={styles.starStyle} />
                </View>
                <CommonText
                  title={detail.value}
                  customTextStyle={[
                    styles.valueStyle,
                    detail.isLink && styles.linkStyle,
                  ]}
                />
              </>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

DetailComponent.defaultProps = {
  customContainerStyle: {},
  details: [],
  handleChange: () => {},
  headerText: "",
  isEditable: false,
};

DetailComponent.propTypes = {
  customContainerStyle: PropTypes.object,
  details: PropTypes.array,
  handleChange: PropTypes.func,
  headerText: PropTypes.string,
  isEditable: PropTypes.bool,
};

export default DetailComponent;
