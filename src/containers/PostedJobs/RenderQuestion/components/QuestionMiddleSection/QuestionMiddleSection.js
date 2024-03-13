import { View } from "@unthinkable/react-core-components";
import React from "react";
import { useIntl } from "react-intl";
import styles from "../../RenderQuestion.styles";
import CommonText from "../../../../../components/CommonText";
import CustomTextInput from "../../../../../components/CustomTextInput";
import TouchableImage from "../../../../../components/TouchableImage";
import images from "../../../../../images";
import CustomButton from "../../../../../components/CustomButton";
const QuestionMiddleSection = ({
  item,
  handleChange,
  copyItem,
  deleteQuestion,
  addNewQuestion,
}) => {
  const intl = useIntl();
  return (
    <View>
      {item.typeofQuestion !=
        intl.formatMessage({ id: "label.text_question" }) &&
        item?.optionsArray && (
          <View style={styles.paddingBottomStyle}>
            {item?.optionsArray?.map((optionElement, indexofOption) => {
              return (
                <View key={optionElement.id} style={styles.innerContainerStyle}>
                  <View style={styles.questionNumberViewStyle}>
                    <CommonText
                      customTextStyle={styles.questionNumberTextStyle}
                    >{`${indexofOption + 1}`}</CommonText>
                  </View>
                  <CustomTextInput
                    isPaddingNotRequired={true}
                    value={optionElement.value}
                    placeholder={intl.formatMessage({
                      id: "label.enter_option",
                    })}
                    onChangeText={(value) => {
                      handleChange(
                        true,
                        "value",
                        value,
                        item.id,
                        optionElement.id
                      );
                    }}
                    customStyle={styles.optionViewStyle}
                  />
                  <View style={styles.buttonViewStyle}>
                    <TouchableImage
                      source={images.copyIcon}
                      style={styles.copyIconStyle}
                      onPress={() => copyItem(true, optionElement, item.id)}
                    />
                    <TouchableImage
                      source={
                        indexofOption > 1
                          ? images.redCrossIcon
                          : images.iconCross
                      }
                      style={
                        indexofOption > 1
                          ? styles.redCrossStyle
                          : styles.crossStyle
                      }
                      onPress={() => {
                        if (item?.optionsArray.length > 2) {
                          deleteQuestion(true, item.id, optionElement.id);
                        }
                      }}
                    />
                  </View>
                </View>
              );
            })}
            <CustomButton
              onPress={() => {
                addNewQuestion(true, item.id);
              }}
              style={styles.addOptionButtonStyle}
              customStyle={{
                customTextStyle: styles.questionNumberTextStyle,
              }}
            >
              {intl.formatMessage({
                id: "label.add_options",
              })}
            </CustomButton>
          </View>
        )}
    </View>
  );
};
export default QuestionMiddleSection;
