import React from "react";
import PropTypes from "prop-types";

import styles from "./CheckBoxSelection.style";
import { View } from "@unthinkable/react-core-components";
import CheckBox from "../CheckBox/CheckBox";
import TouchableImage from "../TouchableImage";
import useIsWebView from "../../hooks/useIsWebView";
import images from "../../images";

const CheckBoxSelection = ({
  checkBoxOptions,
  customStyle,
  handleAddRemoveRow,
  isActionToAdd,
  handleCheckBoxSelection,
  isSingleSelection,
}) => {
  const { isWebView } = useIsWebView();
  const iconCheck = isSingleSelection ? images.iconCheckBoxRound : images.iconCheckbox;
  const iconUnCheck = isSingleSelection ? images.iconUnCheckBoxRound : images.iconUnCheckbox;

  const renderAdd_Remove_Button = () => (
    <View style={[{flex: 1}]}>
      <View style={{position: 'absolute', marginTop: 10,}}>
      <TouchableImage
                  isSvg={isWebView}
                  onPress={() => handleAddRemoveRow(isActionToAdd)}
                  source={isActionToAdd ? images.iconAddRoundGreen : images.iconDeleteRoundRed}
                  style={{ height: 24, width: 24}}
                />
      </View>
   </View>
  );

  return (
    <View style={[customStyle, { flexDirection: "row"}]}>
    {checkBoxOptions.map((checkBox, index) => (
        <View style={{flexDirection: "row", alignItems: 'center', marginTop: 10, paddingRight: 24}}>
           <CheckBox
           title={checkBox.value}
           isSelected={checkBox.isSelected}
           handleCheckbox={(id) => handleCheckBoxSelection(id)}
           id={checkBox.name}
           iconCheck={iconCheck}
           iconUnCheck={iconUnCheck}
         />
        </View>
    ))}
     {renderAdd_Remove_Button()}  
    </View>
  )
};

CheckBoxSelection.defaultProps = {
  checkBoxOptions: [],
  customStyle: {},
  handleAddRemoveRow: () => {},
  isActionToAdd: true,
  isSingleSelection: false,
};

CheckBoxSelection.propTypes = {
  customStyle: PropTypes.object,
  checkBoxOptions: PropTypes.array,
  handleAddRemoveRow: PropTypes.func,
  isActionToAdd: PropTypes.bool,
  isSingleSelection: PropTypes.bool,
};

export default CheckBoxSelection;
