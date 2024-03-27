import React from "react";
import styles from "../../RenderQuestion.styles";
import TouchableImage from "../../../../../components/TouchableImage";
import images from "../../../../../images";
import Switch from "../../../../../components/Switch/Switch";
import CommonText from "../../../../../components/CommonText";
import { View } from "@unthinkable/react-core-components";
import { useIntl } from "react-intl";
const QuestionFooter = ({
  copyItem,
  deleteQuestion,
  item,
  handleChange,
  isWebView,
  setNewQuestionnaireData,
  setIsModalVisible,
  isEdited,
}) => {
  const intl = useIntl();
  return (
    <View style={styles.thirdContainerStyle}>
      <TouchableImage
        source={images.copyIcon}
        isSvg={false}
        onPress={() => copyItem(false, item)}
      />
      {!isWebView && (
        <TouchableImage
          onPress={() => {
            isEdited.current = true;
            setNewQuestionnaireData(item);
            setIsModalVisible(true);
          }}
          source={images.editIcon}
          isSvg={false}
          style={styles.editIconStyle}
        />
      )}
      <TouchableImage
        source={images.iconDeleteRed}
        isSvg={false}
        onPress={() => {
          deleteQuestion(false, item.id);
        }}
        style={styles.deleteQuestionStyle}
      />
      {isWebView && (
        <View style={styles.switchViewStyle}>
          <Switch
            isToggled={item.isMandatory}
            onChange={() => {
              handleChange(false, "isMandatory", !item.isMandatory, item.id);
            }}
          />
          <CommonText customContainerStyle={styles.marginLeftStyle}>
            {intl.formatMessage({
              id: "label.mandatory",
            })}
          </CommonText>
        </View>
      )}
    </View>
  );
};
export default QuestionFooter;
