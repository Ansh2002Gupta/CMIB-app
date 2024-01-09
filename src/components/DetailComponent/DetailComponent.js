import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";
import { MediaQueryContext } from "@unthinkable/react-theme";

import CommonText from "../CommonText";
import CustomTextInput from "../CustomTextInput";
import useIsWebView from "../../hooks/useIsWebView";
import { gridStyles } from "../../theme/styles/commonStyles";
import styles, { getRowStyle } from "./DetailComponent.style";

const DetailComponent = ({ details, headerText, isEditable, handleChange }) => {
  const intl = useIntl();
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const { isWebView } = useIsWebView();

  const columnCount = isWebView && gridStyles[currentBreakpoint];

  const containerStyle = isWebView
    ? styles.containerGridStyle(columnCount)
    : styles.containerStyle;

  return (
    <View>
      {!!headerText && (
        <CommonText customTextStyle={styles.headerText} fontWeight="600">
          {headerText}
        </CommonText>
      )}
      <View style={containerStyle}>
        {details?.map((detail, index) => (
          <View
            key={index}
            style={isWebView ? styles.webContainer : getRowStyle(detail)}
          >
            {isEditable ? (
              <CustomTextInput
                value={detail.value}
                customStyle={styles.inputStyle}
                label={intl.formatMessage({ id: detail.label })}
                isDropdown={detail.isDropdown}
                isCounterInput={detail.isCounterInput}
                isMobileNumber={detail.isMobileNumber}
                isMultiline={detail.isMultiline}
                isMandatory
                options={detail.options || []}
                placeholder={detail?.placeholder}
                height={detail.isMultiline && 84}
                valueField={detail.valueField || "label"}
                labelField={detail.labelField || "label"}
                inputKey={detail.inputKey || "value"}
                onChangeValue={(val) => handleChange(detail.label, val)}
                onChangeText={(val) => {
                  handleChange(detail.label, val);
                }}
              />
            ) : (
              <>
                <View style={[styles.titleContainer]}>
                  <CommonText customTextStyle={styles.titleStyle}>
                    {detail.title}
                  </CommonText>
                  <CommonText customTextStyle={styles.starStyle}></CommonText>
                </View>
                <CommonText
                  customTextStyle={[
                    styles.valueStyle,
                    detail.isLink && styles.linkStyle,
                  ]}
                >
                  {detail.value}
                </CommonText>
              </>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

DetailComponent.defaultProps = {
  details: [],
  handleChange: () => {},
  headerText: "",
  isEditable: false,
};

DetailComponent.propTypes = {
  details: PropTypes.array,
  handleChange: PropTypes.func,
  headerText: PropTypes.string,
  isEditable: PropTypes.bool,
};

export default DetailComponent;
