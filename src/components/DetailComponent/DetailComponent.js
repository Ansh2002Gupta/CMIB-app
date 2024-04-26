import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { MediaQueryContext, useTheme } from "@unthinkable/react-theme";
import { Linking, View } from "@unthinkable/react-core-components";

import BadgeLabel from "../BadgeLabel/BadgeLabel";
import CommonText from "../CommonText";
import CustomTextInput from "../CustomTextInput";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import MobileNumberInput from "../MobileNumberInput";
import Switch from "../Switch";
import TouchableImage from "../TouchableImage";
import useIsWebView from "../../hooks/useIsWebView";
import { getValidUrl } from "../../utils/util";
import { numericValidator } from "../../utils/validation";
import images from "../../images";
import { gridStyles } from "../../theme/styles/commonStyles";
import getStyles, {
  getContainerStyles,
  getRowStyle,
} from "./DetailComponent.style";
import CheckBoxSelection from "../CheckBoxSelection/CheckBoxSelection";
import CustomChipCard from "../CustomChipCard/CustomChipCard";
import CustomTextEditor from "../CustomTextEditor";

const DetailComponent = ({
  customContainerStyle,
  details,
  footerText,
  handleBlur,
  handleChange,
  onAdd,
  onDelete,
  tableHeaderList,
  handleSwitchChange,
  handleMultiSelect,
  hasActionButton,
  headerText,
  headerTextCustomStyles,
  index,
  isActive,
  isColumnVariableWidth,
  isEditable,
  isInputDisable,
  isMandatory,
  isShowSwitch,
  onPressActionButton,
  isShowCancel,
  handleCancel,
  handleAddRemoveRow,
  handleCheckBoxSelection,
  datePickerContainer,
  customErrorViewStyle,
}) => {
  const intl = useIntl();
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const { isWebView } = useIsWebView();
  const theme = useTheme();
  const styles = getStyles(theme);

  const columnCount = isWebView && gridStyles[currentBreakpoint];

  const containerStyle = getContainerStyles({
    columnCount,
    isColumnVariableWidth,
    isWebView,
    theme,
  });

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

  const renderCancelButton = () => (
    <View style={[{ flex: 1 }]}>
      <View style={styles.cancelButton}>
        <TouchableImage
          isSvg={isWebView}
          onPress={handleCancel}
          source={isWebView ? images.iconCloseDark : images.iconCross}
          style={{ height: 24, width: 24 }}
        />
      </View>
    </View>
  );

  const renderWebActionButton = () => (
    <View style={styles.switchContainer}>
      <TouchableImage
        onPress={() => onPressActionButton(index)}
        resizeMode="contain"
        source={images.iconDeleteRed}
        parentStyle={styles.iconStyle}
      />
    </View>
  );

  const renderMobActionButton = () => (
    <CustomTouchableOpacity
      style={styles.buttonContainer}
      onPress={() => onPressActionButton(index)}
    >
      <TouchableImage
        resizeMode="contain"
        source={images.iconDeleteRed}
        parentStyle={styles.iconStyle}
      />
      <CommonText customTextStyle={styles.removeTextStyle} fontWeight="600">
        {intl.formatMessage({ id: "label.remove" })}
      </CommonText>
    </CustomTouchableOpacity>
  );

  const renderDetailContent = (detail) => {
    if (detail?.isEmptyField) return <></>;

    if (detail.showBadgeLabel) {
      return (
        <BadgeLabel
          badgeLabels={detail?.customValue || detail?.value}
          customTextContainerStyle={styles.badgeContainer}
        />
      );
    }
    if (detail.ShouldRenderOwnComponent) {
      return detail.ShouldRenderOwnComponent();
    }

    if (detail.isLink) {
      return (
        <CustomTouchableOpacity
          onPress={() => {
            Linking.openURL(getValidUrl(detail.value), "_blank");
          }}
        >
          <CommonText
            customTextStyle={{
              ...styles.valueStyle,
              ...(detail.isLink && styles.linkStyle),
            }}
          >
            {detail.value}
          </CommonText>
        </CustomTouchableOpacity>
      );
    }

    if (detail.isTextInputWithChip) {
      return (
        <View
          style={{
            ...styles.valueStyle,
            ...styles.chipDataContainer,
          }}
        >
          {typeof detail?.value !== "string" ? (
            detail?.value?.map((value, index) => (
              <CustomChipCard
                key={index}
                message={value}
                isEditable={isEditable}
              />
            ))
          ) : (
            <CommonText>{detail.value}</CommonText>
          )}
        </View>
      );
    }

    if (detail.isCheckBoxSelection && detail?.value !== "--") {
      return (
        <CheckBoxSelection
          isEditable={isEditable}
          checkBoxOptions={detail?.checkBoxOptions}
          customStyle={styles.CheckBoxSelection}
          isSingleSelection={detail?.isSingleSelection}
          value={detail?.value}
          checkBoxTextStyle={detail?.checkBoxTextStyle}
        />
      );
    }
    if (detail?.isHtmlDescription) {
      return (
        <CustomTextEditor
          value={detail?.value}
          disabled
          quilStyle={styles.quilStyle}
          removePadding={detail?.removePadding}
          quillContainerStyle={styles.quillContainerStyle}
        />
      );
    }

    return (
      <CommonText
        customTextStyle={{
          ...styles.valueStyle,
          ...(detail.isCapitalize && styles.capitalizeValue),
        }}
        customContainerStyle={{ ...detail.style }}
      >
        {detail?.defaultValue || detail?.value}
      </CommonText>
    );
  };

  const renderEditableContent = (detail, index) => {
    if (detail?.isEmptyField) return <></>;

    if (detail?.isMobileNumber) {
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
          isMandatory={detail?.isMandatory}
        />
      );
    }
    if (detail?.isButton) {
      return (
        <TouchableImage
          onPress={() =>
            detail.isAdd ? onAdd(detail.cellID) : onDelete(detail.cellID)
          }
          source={
            detail.isAdd ? images.iconAddRoundGreen : images.iconDeleteRoundRed
          }
        />
      );
    }

    return (
      <>
        <CustomTextInput
          errorMessage={detail.error}
          value={detail.value}
          customHandleBlur={() => handleBlur(detail.key, index)}
          customStyle={{
            ...styles.inputStyle,
            ...styles.getFieldWidth(
              detail.width,
              !isWebView,
              detail?.customWidthValue
            ),
          }}
          datePickerContainer={datePickerContainer}
          label={detail?.label && intl.formatMessage({ id: detail.label })}
          showLabel={detail.showLabel}
          isDropdown={detail.isDropdown}
          isEditable={detail.isEditable}
          isCounterInput={detail.isCounterInput}
          isError={!!detail.error}
          isMandatory={detail.isMandatory}
          selectedItems={detail.defaultValues}
          indexNumber={index}
          isSelected="isSelected"
          indexField="selectedIndex"
          isEmptyField={detail?.isEmptyField ?? false}
          options={detail.options || []}
          isMultiline={detail?.isMultiline}
          isCheckBoxSelection={detail?.isCheckBoxSelection}
          checkBoxOptions={detail?.checkBoxOptions}
          handleAddRemoveRow={(isActionToAdd) =>
            handleAddRemoveRow(isActionToAdd, index, detail?.key)
          }
          handleCheckBoxSelection={(id) =>
            handleCheckBoxSelection(id, index, detail?.key)
          }
          isActionToAdd={detail?.isActionToAdd}
          isSingleSelection={detail?.isSingleSelection}
          placeholder={
            detail?.placeholder &&
            intl.formatMessage({ id: detail.placeholder })
          }
          maxLength={detail.maxLength}
          isNumeric={detail.isNumeric}
          isToggle={detail.isToggle}
          useExactToggleValue={detail.useExactToggleValue}
          isTextInputWithChip={detail?.isTextInputWithChip}
          onChipUpdate={(chipData) =>
            handleChange(detail.label, chipData, index, detail)
          }
          valueField={detail.valueField || "label"}
          labelField={detail.labelField || "label"}
          inputKey={detail.inputKey || "value"}
          onChangeValue={(val) =>
            detail.isMultiSelect
              ? handleMultiSelect(val, detail, index)
              : handleChange(
                  detail.label,
                  val,
                  index,
                  detail?.key,
                  detail?.cellID
                )
          }
          isMultiSelect={detail.isMultiSelect}
          onChangeText={(val) => {
            if (detail?.isNumeric) {
              if (numericValidator(val))
                handleChange(
                  detail.label,
                  val,
                  index,
                  detail.id,
                  detail?.cellID
                );
            } else {
              handleChange(detail.label, val, index, detail.id, detail?.cellID);
            }
          }}
          isRupee={detail?.isRupee}
          isCalendar={detail?.isCalendar}
          minDate={detail?.minDate}
          maxDate={detail?.maxDate}
          format={detail?.format}
          isSingleMutliSelect={detail.isSingleMutliSelect}
          showMonthYearPicker={detail?.showMonthYearPicker}
          checkBoxTextStyle={detail?.checkBoxTextStyle}
          customErrorViewStyle={customErrorViewStyle}
        />
        {!!footerText && (
          <CommonText customTextStyle={styles.footerText} fontWeight="500">
            {footerText}
          </CommonText>
        )}
      </>
    );
  };

  return (
    <View>
      {!!headerText && (
        <View style={styles.titleContainer}>
          <CommonText
            customTextStyle={{
              ...styles.headerText,
              ...headerTextCustomStyles,
            }}
            fontWeight="600"
          >
            {headerText}
          </CommonText>
          {isMandatory && (
            <CommonText customTextStyle={styles.starStyle}>{" *"}</CommonText>
          )}
          {isShowCancel && isEditable && renderCancelButton()}
        </View>
      )}
      <View
        style={{
          ...containerStyle,
          ...customContainerStyle,
        }}
      >
        {!!tableHeaderList?.length &&
          tableHeaderList.map((headerObj) => (
            <CommonText
              customTextStyle={{
                ...styles.containerStyle,
                color: theme.colors.darkGrey,
                fontSize: 12,
              }}
              fontWeight={500}
            >
              {!!headerObj.headerLabel &&
                intl.formatMessage({ id: headerObj.headerLabel })}
            </CommonText>
          ))}
        {isShowSwitch && isEditable && !isWebView && renderSwitch()}
        {details?.map((detail, idx) => {
          if (isEditable && detail?.viewOnlyField) {
            return null;
          }
          if (isColumnVariableWidth) {
            return (
              <View
                style={{
                  ...(isWebView
                    ? styles.getVariableContainerStyles(detail)
                    : styles.containerStyle),
                }}
              >
                {Array.isArray(detail) &&
                  detail?.map((columns, index) => {
                    return isEditable ? (
                      <View
                        style={{
                          ...(columns.width === 3 ? styles.oneThirdWidth : {}),
                          ...(isWebView
                            ? styles.webContainer
                            : getRowStyle(detail, theme)),
                        }}
                      >
                        {renderEditableContent(columns, idx)}
                      </View>
                    ) : (
                      <View
                        style={{
                          ...(isWebView
                            ? styles.webContainer
                            : getRowStyle(detail, theme)),
                        }}
                      >
                        <View style={styles.titleContainer}>
                          {columns.label ? (
                            <CommonText customTextStyle={styles.titleStyle}>
                              {intl.formatMessage({ id: columns.label })}
                            </CommonText>
                          ) : (
                            void 0
                          )}
                          {columns?.isMandatory && (
                            <CommonText customTextStyle={styles.starStyle}>
                              {" *"}
                            </CommonText>
                          )}
                        </View>
                        {renderDetailContent(columns)}
                      </View>
                    );
                  })}
              </View>
            );
          }

          return (
            <View
              key={idx}
              style={
                isWebView ? styles.webContainer : getRowStyle(detail, theme)
              }
            >
              {isEditable ? (
                renderEditableContent(detail, idx)
              ) : (
                <>
                  <View style={styles.titleContainer}>
                    {detail.label ? (
                      <CommonText customTextStyle={styles.titleStyle}>
                        {intl.formatMessage({ id: detail.label })}
                      </CommonText>
                    ) : (
                      void 0
                    )}
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
  headerTextCustomStyles: {},
  isActive: false,
  isEditable: false,
  isInputDisable: false,
  isShowSwitch: false,
  onPressActionButton: () => {},
  isShowCancel: false,
  handleCancel: () => {},
  handleAddRemoveRow: () => {},
  handleCheckBoxSelection: () => {},
};

DetailComponent.propTypes = {
  customContainerStyle: PropTypes.object,
  details: PropTypes.array,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  handleSwitchChange: PropTypes.func,
  hasActionButton: PropTypes.bool,
  headerText: PropTypes.string,
  headerTextCustomStyles: PropTypes.object,
  index: PropTypes.number,
  isActive: PropTypes.bool,
  isColumnVariableWidth: PropTypes.bool,
  isEditable: PropTypes.bool,
  isInputDisable: PropTypes.bool,
  isMandatory: PropTypes.bool,
  isShowSwitch: PropTypes.bool,
  onPressActionButton: PropTypes.func,
  isShowCancel: PropTypes.bool,
  handleCancel: PropTypes.func,
  handleAddRemoveRow: PropTypes.func,
  handleCheckBoxSelection: PropTypes.func,
};

export default DetailComponent;
