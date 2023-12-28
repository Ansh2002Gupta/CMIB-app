import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";
import { MediaQueryContext } from "@unthinkable/react-theme";

import CommonText from "../CommonText";
import CustomTextInput from "../CustomTextInput";
import useIsWebView from "../../hooks/useIsWebView";
import style from "./DetailComponent.style";

const DetailComponent = ({ details, headerText, isEditable, handleChange }) => {
  const intl = useIntl();
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const { isWebView } = useIsWebView();

  const gridStyles = {
    xl: "1fr 1fr 1fr",
    lg: "1fr 1fr",
    md: "1fr 1fr",
    sm: "1fr 1fr",
  };

  const getRowStyle = (detail) => {
    if (detail.isMajor) {
      return style.rowStyle;
    } else if (detail.isMinor) {
      return style.minorRowStyle;
    }
    return style.innerContainer;
  };

  const columnCount = isWebView && gridStyles[currentBreakpoint];

  const containerStyle = isWebView
    ? style.containerGridStyle(columnCount)
    : style.containerStyle;

  return (
    <View>
      {!!headerText && (
        <CommonText customTextStyle={style.headerText} title={headerText} />
      )}
      <View style={containerStyle}>
        {details?.map((detail, index) => (
          <View
            key={index}
            style={isWebView ? style.webContainer : getRowStyle(detail)}
          >
            {isEditable ? (
              <CustomTextInput
                value={detail.value}
                customStyle={style.inputStyle}
                label={intl.formatMessage({ id: detail.label })}
                isDropdown={detail.isDropdown}
                isCounterInput={detail.isCounterInput}
                options={detail.options || []}
                isMobileNumber={detail.isMobileNumber}
                isMultiline={detail.isMultiline}
                isMandatory
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
                <View style={style.titleContainer}>
                  <CommonText
                    title={intl.formatMessage({ id: detail.label })}
                    customTextStyle={style.titleStyle}
                  />
                  <CommonText title=" *" customTextStyle={style.starStyle} />
                </View>
                <CommonText
                  title={detail.value}
                  customTextStyle={[
                    style.valueStyle,
                    detail.isLink && style.linkStyle,
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
  headerText: "",
  isEditable: false,
};

DetailComponent.propTypes = {
  details: PropTypes.array.isRequired,
  headerText: PropTypes.string,
  isEditable: PropTypes.bool,
};

export default DetailComponent;
