import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { MediaQueryContext } from "@unthinkable/react-theme";
import { Linking, View } from "@unthinkable/react-core-components";

import BadgeLabel from "../BadgeLabel/BadgeLabel";
import CommonText from "../CommonText";
import CustomTextInput from "../CustomTextInput";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import MobileNumberInput from "../MobileNumberInput";
import Switch from "../Switch";
import TouchableImage from "../TouchableImage";
import useIsWebView from "../../hooks/useIsWebView";
import { gridStyles } from "../../theme/styles/commonStyles";
import { numericValidator } from "../../utils/validation";
import images from "../../images";
import styles, { getRowStyle } from "./DetailComponent.style";
import { getValidUrl } from "../../utils/util";

const DetailComponent = ({
  customContainerStyle,
  details,
  handleBlur,
  handleChange,
  handleSwitchChange,
  handleMultiSelect,
  hasActionButton,
  headerText,
  index,
  isActive,
  isEditable,
  isInputDisable,
  isMandatory,
  isShowSwitch,
  onPressActionButton,
}) => {
  const intl = useIntl();
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const { isWebView } = useIsWebView();

  const columnCount = isWebView && gridStyles[currentBreakpoint];

  const containerStyle = isWebView
    ? styles.containerGridStyle(columnCount)
    : styles.containerStyle;

  const renderSwitch = () => (
    <View style={styles.switchContainer}>
      <Switch
        isToggled={isActive}
        onChange={() => {
          handleSwitchChange(index);
        }}
      />
      <CommonText customTextStyle={styles.labelStyle}>
        {intl.formatMessage({ id: "label.mark_as_active" })}
      </CommonText>
    </View>
  );

  const renderWebActionButton = () => (
    <View style={styles.switchContainer}>
      <TouchableImage
        onPress={() => onPressActionButton(index)}
        resizeMode="contain"
        source={images.iconTrash}
        parentStyle={styles.iconStyle}
      />
    </View>
  );

  const renderMobActionButton = () => (
    <CustomTouchableOpacity style={styles.buttonContainer}>
      <TouchableImage
        onPress={() => onPressActionButton(index)}
        resizeMode="contain"
        source={images.iconTrash}
        parentStyle={styles.iconStyle}
      />
      <CommonText>{intl.formatMessage({ id: "label.remove" })}</CommonText>
    </CustomTouchableOpacity>
  );

  const renderDetailContent = (detail) => {
    if (detail.showBadgeLabel) {
      return (
        <BadgeLabel
          badgeLabels={detail?.customValue || detail?.value}
          customTextStyle={styles.badgeContainer}
        />
      );
    }

    if (detail.isLink) {
      return (
        <CustomTouchableOpacity
          onPress={() => {
            Linking.openURL(getValidUrl(detail.value), "_blank");
          }}
        >
          <CommonText
            customTextStyle={[
              styles.valueStyle,
              detail.isLink && styles.linkStyle,
            ]}
          >
            {detail.value}
          </CommonText>
        </CustomTouchableOpacity>
      );
    }

    return (
      <CommonText customTextStyle={styles.valueStyle}>
        {detail.value}
      </CommonText>
    );
  };

  const renderEditableContent = (detail) => {
    if (detail.isMobileNumber) {
      return (
        <MobileNumberInput
          mobNumberValue={detail.value}
          options={detail.options}
          codeValue={detail.codeValue}
          customHandleBlur={() => handleBlur(detail.key, index)}
          isEditable={isInputDisable ? !isInputDisable : true}
          onChangeCode={(val) => handleChange(detail.label, val, true)}
          onChangeMobNumber={(val) => handleChange(detail.label, val)}
          mobNumberError={detail.error}
        />
      );
    }
    return (
      <CustomTextInput
        errorMessage={detail.error}
        value={detail.value}
        customHandleBlur={() => handleBlur(detail.key, index)}
        customStyle={styles.inputStyle}
        label={intl.formatMessage({ id: detail.label })}
        isDropdown={detail.isDropdown}
        isEditable={isInputDisable ? !isInputDisable : true}
        isCounterInput={detail.isCounterInput}
        isError={!!detail.error}
        isMandatory={detail.isMandatory}
        selectedItems={detail.defaultValues}
        indexNumber={index}
        isSelected="isSelected"
        indexField="selectedIndex"
        options={detail.options || []}
        isMultiline={detail?.isMultiline}
        placeholder={intl.formatMessage({ id: detail.placeholder })}
        maxLength={detail.maxLength}
        isNumeric={detail.isNumeric}
        valueField={detail.valueField || "label"}
        labelField={detail.labelField || "label"}
        inputKey={detail.inputKey || "value"}
        onChangeValue={(val) =>
          detail.isMultiSelect
            ? handleMultiSelect(val)
            : handleChange(detail.label, val)
        }
        isMultiSelect={detail.isMultiSelect}
        onChangeText={(val) => {
          if (detail?.isNumeric) {
            if (numericValidator(val)) handleChange(detail.label, val);
          } else {
            handleChange(detail.label, val);
          }
        }}
        isRupee={detail?.isRupee}
      />
    );
  };

  return (
    <View>
      {!!headerText && (
        <View style={styles.titleContainer}>
          <CommonText customTextStyle={styles.headerText} fontWeight="600">
            {headerText}
          </CommonText>
          {isMandatory && (
            <CommonText customTextStyle={styles.starStyle}>{" *"}</CommonText>
          )}
        </View>
      )}
      <View style={{ ...containerStyle, ...customContainerStyle }}>
        {isShowSwitch && isEditable && !isWebView && renderSwitch()}
        {details?.map((detail, idx) => {
          if (isEditable && detail.viewOnlyField) {
            return null;
          }

          return (
            <View
              key={idx}
              style={isWebView ? styles.webContainer : getRowStyle(detail)}
            >
              {isEditable ? (
                renderEditableContent(detail)
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
                  {renderDetailContent(detail)}
                </>
              )}
            </View>
          );
        })}
        {isShowSwitch && isWebView && isEditable && renderSwitch()}
        {hasActionButton && isEditable && isWebView && renderWebActionButton()}
        {hasActionButton && isEditable && !isWebView && renderMobActionButton()}
      </View>
    </View>
  );
};

DetailComponent.defaultProps = {
  customContainerStyle: {},
  details: [],
  handleBlur: () => {},
  handleChange: () => {},
  handleSwitchChange: () => {},
  headerText: "",
  isActive: false,
  isEditable: false,
  isInputDisable: false,
  isShowSwitch: false,
  onPressActionButton: () => {},
};

DetailComponent.propTypes = {
  customContainerStyle: PropTypes.object,
  details: PropTypes.array,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  handleSwitchChange: PropTypes.func,
  hasActionButton: PropTypes.bool,
  headerText: PropTypes.string,
  index: PropTypes.number,
  isActive: PropTypes.bool,
  isEditable: PropTypes.bool,
  isInputDisable: PropTypes.bool,
  isMandatory: PropTypes.bool,
  isShowSwitch: PropTypes.bool,
  onPressActionButton: PropTypes.func,
};

export default DetailComponent;
