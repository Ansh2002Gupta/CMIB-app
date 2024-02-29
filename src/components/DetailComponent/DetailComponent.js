import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { MediaQueryContext } from "@unthinkable/react-theme";
import { View } from "@unthinkable/react-core-components";

import BadgeLabel from "../BadgeLabel/BadgeLabel";
import CommonText from "../CommonText";
import CustomTextInput from "../CustomTextInput";
import useIsWebView from "../../hooks/useIsWebView";
import { gridStyles } from "../../theme/styles/commonStyles";
import { numericValidator } from "../../utils/validation";
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
                isMandatory={detail.isMandatory}
                options={detail.options || []}
                isMultiline={detail?.isMultiline}
                placeholder={intl.formatMessage({ id: detail.placeholder })}
                maxLength={detail.maxLength}
                isNumeric={detail.isNumeric}
                valueField={detail.valueField || "label"}
                labelField={detail.labelField || "label"}
                inputKey={detail.inputKey || "value"}
                onChangeValue={(val) => handleChange(detail.label, val)}
                onChangeText={(val) => {
                  if (detail?.isNumeric) {
                    if (numericValidator(val)) handleChange(detail.label, val);
                  } else {
                    handleChange(detail.label, val);
                  }
                }}
                isRupee={detail?.isRupee}
              />
            ) : (
              <>
                <View style={styles.titleContainer}>
                  <CommonText customTextStyle={styles.titleStyle}>
                    {intl.formatMessage({ id: detail.label })}
                  </CommonText>
                  {detail?.isMandatory && (
                    <CommonText customTextStyle={styles.starStyle}>
                      {" *"}
                    </CommonText>
                  )}
                </View>
                {detail.showBadgeLabel ? (
                  <BadgeLabel
                    badgeLabels={detail?.value}
                    customTextStyle={styles.badgeContainer}
                  />
                ) : (
                  <CommonText
                    customTextStyle={[
                      styles.valueStyle,
                      detail.isLink && styles.linkStyle,
                    ]}
                  >
                    {detail.value}
                  </CommonText>
                )}
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
