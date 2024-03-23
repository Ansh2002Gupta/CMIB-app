import { ScrollView, View } from "@unthinkable/react-core-components";
import React, { useState } from "react";
import CustomModal from "../../../components/CustomModal";
import CommonText from "../../../components/CommonText";
import CustomTextInput from "../../../components/CustomTextInput";
import { useIntl } from "react-intl";
import CustomLabelView from "../../../components/CustomLabelView";
import Switch from "../../../components/Switch/Switch";
import CustomButton from "../../../components/CustomButton";
import styles from "./AddNewQuestionModal.styles";
import { getQuestionInitalValue } from "../../../utils/util";
const AddNewQuestionModal = ({
  isWebView,
  isModalVisible,
  optionData,
  setoptionData,
  questionnairelistLength,
  newQuestionnaireData,
  setNewQuestionnaireData,
  questionaireTypeFormatted,
  setIsModalVisible,
  isEdited,
  handleChange,
  editEntireQuestion,
  addNewQuestion,
}) => {
  const intl = useIntl();
  const [error, setErrors] = useState({});

  function validate() {
    const error = {};
    let data = optionData ? optionData : newQuestionnaireData;

    if (!data.question.trim()) {
      error.questionError = intl.formatMessage({ id: "label.mandatory" });
    }
    if (
      data.typeofQuestion !== intl.formatMessage({ id: "label.text_question" })
    ) {
      if (data?.question_options) {
        data.question_options.map((item, index) => {
          if (!item.value.trim()) {
            error[`option${index + 1}`] = intl.formatMessage({
              id: "label.mandatory",
            });
          }
        });
      }
      if (!data?.value && optionData) {
        error.optionValue = intl.formatMessage({ id: "label.mandatory" });
      }
    }
    return error;
  }
  function addOrUpdate() {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      if (isEdited.current) {
        if (!optionData) {
          editEntireQuestion(newQuestionnaireData);
        } else {
          handleChange(
            true,
            "value",
            optionData.value,
            optionData.id,
            optionData.optionId
          );
        }
        isEdited.current = false;
      } else {
        if (optionData) {
          let temp = {
            id: Date.now(),
            value: optionData.value,
          };
          addNewQuestion(true, optionData.id, temp);
          setoptionData(null);
          setNewQuestionnaireData(
            getQuestionInitalValue(intl, questionnairelistLength)
          );
        } else {
          addNewQuestion(false, null, newQuestionnaireData);
          setNewQuestionnaireData(
            getQuestionInitalValue(intl, questionnairelistLength)
          );
        }
      }
      setIsModalVisible(false);

      // Proceed with form submission or further processing
    } else {
      setErrors(validationErrors);
      // Handle the errors, e.g., display them to the user
    }
  }
  function onCancel() {
    setErrors({});
    setIsModalVisible(false);
    setNewQuestionnaireData(
      getQuestionInitalValue(intl, questionnairelistLength)
    );
    if (optionData) {
      setoptionData(null);
    }
  }
  function addOption() {
    let newoptionArray = [
      ...newQuestionnaireData?.question_options,
      {
        id: Date.now(),
        value: "",
      },
    ];

    setNewQuestionnaireData((prev) => {
      return {
        ...prev,
        question_options: newoptionArray,
      };
    });
  }
  function onOptionChange(text, optionElement, index) {
    if (error[`option${index + 1}`]) {
      setErrors((prev) => {
        return {
          ...prev,
          [`option${index + 1}`]: null,
        };
      });
    }

    let temporary = newQuestionnaireData.question_options.map((itemData) => {
      if (itemData.id === optionElement.id) {
        let tempObj = {
          ...itemData,
          value: text,
        };
        return tempObj;
      }
      return itemData;
    });
    setNewQuestionnaireData((prev) => {
      return {
        ...prev,
        question_options: temporary,
      };
    });
  }
  function onChangeQuestionType(value) {
    let tempObj = {
      ...newQuestionnaireData,
      typeofQuestion: value,
    };
    if (
      value !== intl.formatMessage({ id: "label.text_question" }) &&
      !tempObj.question_options
    ) {
      tempObj["question_options"] = [
        {
          id: Date.now(),
          value: "",
        },
        {
          id: Math.ceil(Date.now() * Math.random()),
          value: "",
        },
      ];
    }
    if (value === intl.formatMessage({ id: "label.text_question" })) {
      tempObj.question_options = null;
    }
    setNewQuestionnaireData(tempObj);
  }

  return (
    <View>
      {!isWebView && isModalVisible && (
        <CustomModal>
          <View style={styles.container}>
            <CommonText
              customTextStyle={styles.questionHeading}
              fontWeight={"600"}
              customContainerStyle={styles.marginBottom}
            >
              {optionData && optionData.questionNumber
                ? `${intl.formatMessage({
                    id: "label.question",
                  })} ${optionData.questionNumber}`
                : `${intl.formatMessage({
                    id: "label.question",
                  })} ${questionnairelistLength}`}
            </CommonText>
            <ScrollView
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}
            >
              <View style={styles.flexOne}>
                {!optionData ? (
                  <CustomTextInput
                    isPaddingNotRequired={true}
                    isDropdown
                    value={newQuestionnaireData?.typeofQuestion}
                    placeholder={intl.formatMessage({
                      id: "label.enter_text",
                    })}
                    onChangeValue={(value) => onChangeQuestionType(value)}
                    label={intl.formatMessage({ id: "label.question_type" })}
                    options={questionaireTypeFormatted}
                    customStyle={styles.marginBottom}
                  />
                ) : (
                  <View style={styles.marginBottom}>
                    <CustomLabelView
                      label={intl.formatMessage({ id: "label.question" })}
                      isMandatory={false}
                    >
                      <CommonText customTextStyle={styles.marginTop}>
                        {optionData.question}
                      </CommonText>
                    </CustomLabelView>
                  </View>
                )}

                {!optionData ? (
                  <CustomTextInput
                    isPaddingNotRequired={true}
                    value={newQuestionnaireData?.question}
                    isMultiline
                    placeholder={intl.formatMessage({
                      id: "label.enter_text",
                    })}
                    maxLength={200}
                    onChangeText={(value) => {
                      if (error.questionError) {
                        setErrors((prev) => {
                          return {
                            ...prev,
                            questionError: null,
                          };
                        });
                      }
                      setNewQuestionnaireData((prev) => {
                        return {
                          ...prev,
                          question: value,
                        };
                      });
                    }}
                    isError={(error?.questionError && true) || false}
                    errorMessage={error?.questionError || ""}
                    label={intl.formatMessage({ id: "label.question_type" })}
                  />
                ) : (
                  <CustomTextInput
                    isPaddingNotRequired={true}
                    value={optionData?.value}
                    isMultiline
                    isMandatory={true}
                    placeholder={intl.formatMessage({
                      id: "label.enter_text",
                    })}
                    isError={(error && error?.optionValue && true) || false}
                    errorMessage={(error && error.optionValue) || ""}
                    onChangeText={(data) => {
                      setErrors((prev) => {
                        return {
                          ...prev,
                          optionValue: null,
                        };
                      });
                      setoptionData((prev) => {
                        return {
                          ...prev,
                          value: data,
                        };
                      });
                    }}
                    label={intl.formatMessage({
                      id: "label.option",
                    })}
                    customStyle={styles.marginBottom}
                  />
                )}
                {!optionData &&
                  newQuestionnaireData?.typeofQuestion !=
                    intl.formatMessage({ id: "label.text_question" }) &&
                  newQuestionnaireData?.question_options &&
                  newQuestionnaireData?.question_options?.map(
                    (optionElement, indexofOption) => {
                      return (
                        <View key={optionElement.id}>
                          <CustomTextInput
                            label={`${intl.formatMessage({
                              id: "label.option",
                            })} ${indexofOption + 1}`}
                            isPaddingNotRequired={true}
                            value={optionElement.value}
                            isError={
                              (error &&
                                error[`option${indexofOption + 1}`] &&
                                true) ||
                              false
                            }
                            errorMessage={
                              (error && error[`option${indexofOption + 1}`]) ||
                              ""
                            }
                            onChangeText={(text) =>
                              onOptionChange(text, optionElement, indexofOption)
                            }
                            customStyle={styles.marginBottom}
                          />
                        </View>
                      );
                    }
                  )}
                {!optionData &&
                  newQuestionnaireData.typeofQuestion !=
                    intl.formatMessage({ id: "label.text_question" }) && (
                    <CustomButton
                      style={
                        isWebView
                          ? styles.buttonStyle
                          : styles.mobileButtonStyle
                      }
                      onPress={addOption}
                      customStyle={{
                        customTextStyle: styles.buttonTextStyle(isWebView),
                      }}
                    >
                      {intl.formatMessage({ id: "label.add_options" })}
                    </CustomButton>
                  )}

                {!optionData && (
                  <View style={styles.bottomButtomView}>
                    <Switch
                      isToggled={newQuestionnaireData?.isMandatory}
                      onChange={() => {
                        setNewQuestionnaireData((prev) => {
                          return {
                            ...prev,
                            isMandatory: !newQuestionnaireData?.isMandatory,
                          };
                        });
                      }}
                    />
                    <CommonText
                      customContainerStyle={styles.mandatoryViewStyle}
                      customTextStyle={styles.mandtoryTextStyle}
                    >
                      {intl.formatMessage({
                        id: "label.mandatory",
                      })}
                    </CommonText>
                  </View>
                )}
                <View style={styles.buttonView}>
                  <CustomButton onPress={onCancel} style={styles.flexOne}>
                    {intl.formatMessage({ id: "label.cancel" })}
                  </CustomButton>
                  <CustomButton
                    onPress={addOrUpdate}
                    style={styles.addButtonStyle}
                    withGreenBackground
                  >
                    {intl.formatMessage({ id: "label.add" })}
                  </CustomButton>
                </View>
              </View>
            </ScrollView>
          </View>
        </CustomModal>
      )}
    </View>
  );
};
export default AddNewQuestionModal;
