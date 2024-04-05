import React from "react";
import PropTypes from "prop-types";

import styles from "./CheckBoxSelection.style";
import { Text, View } from "@unthinkable/react-core-components";
import CheckBox from "../CheckBox/CheckBox";
import TouchableImage from "../TouchableImage";
import useIsWebView from "../../hooks/useIsWebView";
import images from "../../images";
import CommonText from "../CommonText";

const CheckBoxSelection = ({
  isEditable,
  checkBoxOptions,
  customStyle,
  handleAddRemoveRow,
  isActionToAdd,
  handleCheckBoxSelection,
  isSingleSelection,
  value,
}) => {
  const { isWebView } = useIsWebView();
  const iconCheck = isEditable ? (isSingleSelection ? images.iconCheckBoxRound : images.iconCheckbox) : images.iconTickGreen
  const iconUnCheck = isEditable ? (isSingleSelection ? images.iconUnCheckBoxRound : images.iconUnCheckbox) : images.iconCrossRed

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

  const getLevelValueAndColor = (value) => {
    let color;
    let text;
      switch (value.toLowerCase()) { 
        case "high":
          text = "!!!";
          color = "#2CA900";
          break;
        case "medium":
          text = "!!";
          color = "#DDAF39";
          break;
        default:
          text = "!";
          color = "#2FA5CB";
          break;
      }
      return { text, color }; 
  };
  const levelInfo = !isEditable && isSingleSelection ? getLevelValueAndColor(value) : "";  

  return (
    
    <View style={[customStyle, { flexDirection: "row" }]}>
      {isEditable ? (
        <>
          {checkBoxOptions.map((checkBox, index) => (
            <View key={index} style={{ flexDirection: "row", alignItems: 'center', marginTop: 10, paddingRight: 24 }}>
              <CheckBox
                title={checkBox.value}
                isSelected={checkBox.isSelected}
                handleCheckbox={(id) => handleCheckBoxSelection(id)}
                id={checkBox.value}
                iconCheck={iconCheck}
                iconUnCheck={iconUnCheck}
              />
            </View>
          ))}
          {renderAdd_Remove_Button()}
        </>
      ) : (
        isSingleSelection ? (
               <View style={styles.row}>
                 <Text style={styles.levelColor(levelInfo?.color)}>
                 {levelInfo?.text}
                </Text>
               <CommonText>
                {Array.isArray(value) ? value[0]: value}
               </CommonText>
            </View>
        ) : (
          <>
            {checkBoxOptions.map((checkBox, index) => (
              <View key={index} style={{ flexDirection: "row", alignItems: 'center', paddingRight: 24 }}>
                <CheckBox
                  title={checkBox.value}
                  isSelected={checkBox.isSelected}
                  iconCheck={iconCheck}
                  iconUnCheck={iconUnCheck}
                  handleCheckbox={() => {}}
                />
              </View>
            ))}
          </>
        )
      )}
    </View>
  );
};

CheckBoxSelection.defaultProps = {
  checkBoxOptions: [],
  customStyle: {},
  handleAddRemoveRow: () => {},
  isActionToAdd: true,
  isSingleSelection: false,
  value: ""
};

CheckBoxSelection.propTypes = {
  customStyle: PropTypes.object,
  checkBoxOptions: PropTypes.array,
  handleAddRemoveRow: PropTypes.func,
  isActionToAdd: PropTypes.bool,
  isSingleSelection: PropTypes.bool,
  value: PropTypes.string
};

export default CheckBoxSelection;