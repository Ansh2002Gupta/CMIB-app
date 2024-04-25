import React from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { useTheme } from "@unthinkable/react-theme";
import { Platform, View } from "@unthinkable/react-core-components";

import CardComponent from "../../components/CardComponent/CardComponent";
import CommonText from "../CommonText";
import DetailComponent from "../../components/DetailComponent";
import useIsWebView from "../../hooks/useIsWebView";
import getStyles from "./DetailCard.style";

const isWeb = Platform.OS.toLowerCase() === "web";

const DetailCard = ({
  customCardStyle,
  customContainerStyle,
  customWebContainerStyle,
  cols,
  details,
  handleBlur,
  handleChange,
  handleSwitchChange,
  handleMultiSelect,
  hasActionButton,
  headerId,
  index,
  isActive,
  isColumnVariableWidth,
  isEditProfile,
  isRow,
  isShowSwitch,
  onPressActionButton,
  otherDetails,
  onAdd,
  onDelete,
  isShowCancel,
  footerId,
  tableHeaderList,
  handleCancel,
  handleAddRemoveRow,
  handleCheckBoxSelection,
  datePickerContainer,
  checkBoxTextStyle,
  customErrorViewStyle,
}) => {
  const { isWebView } = useIsWebView();
  const intl = useIntl();

  const theme = useTheme();
  const style = getStyles(theme);

  const headerTextValue = !!headerId
    ? intl.formatMessage({ id: headerId })
    : "";

  return (
    <CardComponent customStyle={{ ...style.cardStyle, ...customCardStyle }}>
      <DetailComponent
        customContainerStyle={{
          ...(isRow
            ? style.customStyle
            : isWeb && isWebView
            ? {
                ...customWebContainerStyle,
              }
            : {}),
          ...customContainerStyle,
        }}
        hasActionButton={isWebView && hasActionButton}
        headerText={headerTextValue}
        index={index}
        isEditable={isEditProfile}
        onAdd={onAdd}
        onDelete={onDelete}
        tableHeaderList={tableHeaderList}
        isInputDisable={isShowSwitch && !isActive}
        onPressActionButton={onPressActionButton}
        {...{
          details,
          handleBlur,
          handleChange,
          handleMultiSelect,
          handleSwitchChange,
          isActive,
          isColumnVariableWidth,
          isShowSwitch,
          isShowCancel,
          handleCancel,
          handleAddRemoveRow,
          handleCheckBoxSelection,
          datePickerContainer,
          checkBoxTextStyle,
          customErrorViewStyle,
        }}
      />
      {!!otherDetails && (
        <DetailComponent
          details={otherDetails}
          handleBlur={handleBlur}
          handleChange={handleChange}
          handleAddRemoveRow={handleAddRemoveRow}
          handleCheckBoxSelection={handleCheckBoxSelection}
          hasActionButton={!isWebView && hasActionButton}
          index={index}
          isEditable={isEditProfile}
          isInputDisable={isShowSwitch && !isActive}
          onPressActionButton={onPressActionButton}
          {...{ isColumnVariableWidth }}
        />
      )}
      {!!footerId && (
        <View style={style.footerContainer}>
          <CommonText> {intl.formatMessage({ id: footerId })}</CommonText>
        </View>
      )}
    </CardComponent>
  );
};

DetailCard.defaultProps = {
  cols: 1,
  customCardStyle: {},
  customContainerStyle: {},
  details: [],
  handleBlur: () => {},
  footerId: "",
  handleChange: () => {},
  handleSwitchChange: () => {},
  hasActionButton: false,
  headerId: "",
  isActive: false,
  isEditProfile: false,
  isRow: false,
  isShowSwitch: false,
  customWebContainerStyle: {},
  onPressActionButton: () => {},
  otherDetails: [],
  isShowCancel: false,
  handleCancel: () => {},
  handleAddRemoveRow: () => {},
  handleCheckBoxSelection: () => {},
  tableHeaderList: [],
};

DetailCard.propTypes = {
  cols: PropTypes.number,
  customCardStyle: PropTypes.object,
  customContainerStyle: PropTypes.object,
  customWebContainerStyle: PropTypes.object,
  details: PropTypes.array,
  handleBlur: PropTypes.func,
  footerId: PropTypes.string,
  handleChange: PropTypes.func,
  handleSwitchChange: PropTypes.func,
  hasActionButton: PropTypes.bool,
  headerId: PropTypes.string,
  index: PropTypes.number,
  isActive: PropTypes.bool,
  isColumnVariableWidth: PropTypes.bool,
  isEditProfile: PropTypes.bool,
  isRow: PropTypes.bool,
  isShowSwitch: PropTypes.bool,
  onAdd: PropTypes.func,
  onDelete: PropTypes.func,
  onPressActionButton: PropTypes.func,
  otherDetails: PropTypes.array,
  isShowCancel: PropTypes.bool,
  handleCancel: PropTypes.func,
  handleAddRemoveRow: PropTypes.func,
  handleCheckBoxSelection: PropTypes.func,
  tableHeaderList: PropTypes.array,
};

export default DetailCard;
