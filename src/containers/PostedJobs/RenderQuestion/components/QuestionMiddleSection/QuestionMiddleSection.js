import { View } from "@unthinkable/react-core-components";
import React from "react";
import { useIntl } from "react-intl";
import styles from "../../RenderQuestion.styles";
import CommonText from "../../../../../components/CommonText";
import CustomTextInput from "../../../../../components/CustomTextInput";
import TouchableImage from "../../../../../components/TouchableImage";
import images from "../../../../../images";
import CustomButton from "../../../../../components/CustomButton";
import colors from "../../../../../assets/colors";
import stylesForMobile from "./QuestionMiddleSection.styles";
const QuestionMiddleSection = ({
  item,
  handleChange,
  copyItem,
  deleteQuestion,
  addNewQuestion,
  isWebView,
  index,
  setoptionData,
  setNewQuestionnaireData,
  isEdited,
  questionError,
}) => {
  const intl = useIntl();
  function onAddPress() {
    if (isWebView) {
      addNewQuestion(true, item.id, {
        id: Date.now(),
        value: "",
      });
    } else {
      setNewQuestionnaireData(item);
      setoptionData({
        question: item.question,
        value: "",
        id: item.id,
        questionNumber: index + 1,
      });
    }
  }
  return (
    <View>
      {item.typeofQuestion !=
        intl.formatMessage({ id: "label.text_question" }) &&
        item?.question_options && (
          <View style={styles.paddingBottomStyle}>
            {item?.question_options?.map((optionElement, indexofOption) => {
              return (
                <View key={optionElement.id}>
                  {isWebView ? (
                    <View
                      key={optionElement.id}
                      style={styles.innerContainerStyle}
                    >
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
                        isError={
                          (questionError &&
                            questionError[indexofOption + 1] &&
                            true) ||
                          false
                        }
                        errorMessage={
                          (questionError &&
                            questionError[indexofOption + 1] &&
                            questionError[indexofOption + 1]) ||
                          false ||
                          ""
                        }
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
                            item?.question_options.length > 2
                              ? images.redCrossIcon
                              : images.iconCross
                          }
                          style={
                            item?.question_options.length > 2
                              ? styles.redCrossStyle
                              : styles.crossStyle
                          }
                          onPress={() => {
                            if (item?.question_options.length > 2) {
                              deleteQuestion(true, item.id, optionElement.id);
                            }
                          }}
                        />
                      </View>
                    </View>
                  ) : (
                    <View style={stylesForMobile.mobileViewContainer}>
                      <View style={stylesForMobile.innerContainer}>
                        <CommonText
                          customTextStyle={stylesForMobile.fonstSize14}
                        >{`${indexofOption + 1}.`}</CommonText>

                        <CommonText
                          customContainerStyle={stylesForMobile.marginLeft4}
                          customTextStyle={stylesForMobile.fonstSize14}
                        >
                          {optionElement.value}
                        </CommonText>
                      </View>
                      <View style={stylesForMobile.secondaryContainer}>
                        <TouchableImage
                          source={images.copyIcon}
                          isSvg={false}
                          style={styles.copyIconStyle}
                          onPress={() => copyItem(true, optionElement, item.id)}
                        />
                        <TouchableImage
                          source={images.editIcon}
                          style={stylesForMobile.editIconStyle}
                          isSvg={false}
                          onPress={() => {
                            isEdited.current = true;
                            setoptionData({
                              question: item.question,
                              value: optionElement.value,
                              id: item.id,
                              questionNumber: index + 1,
                              optionId: optionElement.id,
                            });
                          }}
                        />
                        <TouchableImage
                          source={
                            item?.question_options.length > 2
                              ? images.redCrossIcon
                              : images.iconCross
                          }
                          style={
                            item?.question_options.length > 2
                              ? stylesForMobile.redCrossIconStyle
                              : stylesForMobile.crossIconStyle
                          }
                          isSvg={false}
                          onPress={() => {
                            if (item?.question_options.length > 2) {
                              deleteQuestion(true, item.id, optionElement.id);
                            }
                          }}
                        />
                      </View>
                    </View>
                  )}
                </View>
              );
            })}
            <CustomButton
              onPress={onAddPress}
              style={stylesForMobile.addOptionStyle}
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
