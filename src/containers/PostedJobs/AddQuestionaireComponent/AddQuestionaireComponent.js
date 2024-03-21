import { View, Text, ScrollView } from "@unthinkable/react-core-components";
import React, { useEffect, useMemo, useRef, useState } from "react";
import CardComponent from "../../../components/CardComponent";
import HeaderComponent from "../HeaderComponent";
import { useIntl } from "react-intl";
import CustomButton from "../../../components/CustomButton";
import styles from "./AddQuestionaireComponent.styles";
import RenderQuestion from "../RenderQuestion";
import { questionaireType } from "../../../constants/constants";
import AddNewQuestionModal from "../AddNewQuestionModal";
import { getQuestionInitalValue } from "../../../utils/util";
const AddQuestionaireComponent = ({
  isQuestionaire,
  setIsQuestionaire,
  isWebView,
  setIsQuestionaireList,
  questionnairelist,
  questionError,
  setError,
}) => {
  const intl = useIntl();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [optionData, setoptionData] = useState(null);
  const isEdited = useRef(false);

  useEffect(() => {
    if (optionData) {
      setIsModalVisible(true);
    }
  }, [optionData]);
  const questionaireTypeFormatted = useMemo(() => {
    return questionaireType.map((item) => {
      return {
        label: intl.formatMessage({ id: item.label }),
        value: intl.formatMessage({ id: item.value }),
      };
    });
  }, []);

  const [newQuestionnaireData, setNewQuestionnaireData] = useState(
    getQuestionInitalValue(intl, questionnairelist.length)
  );

  function addNewQuestion(isOption, id, item) {
    if (isOption) {
      const updatedArray = questionnairelist.map((obj) => {
        if (obj.id === id) {
          if (obj.question_options) {
            obj.question_options = [...obj.question_options, item];
          } else {
            obj.question_options = [item];
          }
        }
        return obj;
      });
      setIsQuestionaireList(updatedArray);
    } else {
      // let tempItem = { ...item, question_order: questionnairelist.length + 1 };
      setIsQuestionaireList((oldArray) => [...oldArray, item]);
    }
  }

  function deleteQuestion(isOption, id, optionId) {
    if (isOption) {
      const updatedArray = questionnairelist.map((obj) => {
        if (obj.id === id) {
          if (obj.question_options) {
            let tempObj = obj.question_options.filter(
              (item) => item.id !== optionId
            );
            obj.question_options = tempObj;
          }
        }
        return obj;
      });
      setIsQuestionaireList(updatedArray);
    } else {
      const newQuestionnaireList = questionnairelist.filter(
        (item) => item.id !== id
      );
      setIsQuestionaireList(newQuestionnaireList);
    }
  }

  function handleChange(isOption, key, value, id, optionId) {
    if (isOption) {
      const updatedArray = questionnairelist.map((obj) => {
        if (obj.id === id) {
          let temporary = obj.question_options.map((itemData) => {
            if (itemData.id === optionId) {
              let tempObj = { ...itemData, [key]: value };
              return tempObj;
            }
            return itemData;
          });

          obj["question_options"] = temporary;
        }
        return obj;
      });

      setIsQuestionaireList(updatedArray);
    } else {
      const updatedArray = questionnairelist.map((obj) => {
        if (obj.id === id) {
          let tempObj = { ...obj, [key]: value };
          if (
            key == "typeofQuestion" &&
            value !== intl.formatMessage({ id: "label.text_question" }) &&
            !tempObj.question_options
          ) {
            tempObj.question_options = [
              {
                id: Date.now(),
                value: "",
              },
              {
                id: Date.now() * Math.random(),
                value: "",
              },
            ];
          }
          if (
            value === intl.formatMessage({ id: "label.text_question" }) &&
            tempObj.question_options
          ) {
            tempObj.question_options = null;
          }
          return tempObj;
        }
        return obj;
      });
      setError((prev) => {
        return {
          ...prev,
          questionError: null,
        };
      });

      setIsQuestionaireList(updatedArray);
    }
  }

  function editEntireQuestion(item) {
    // Replace the object with id 1 using map
    const updatedObjectArray = questionnairelist.map((obj) => {
      if (obj.id === item.id) {
        return item; // Return the new object if the id matches
      }
      return obj; // Otherwise, return the original object
    });
    setIsQuestionaireList(updatedObjectArray);
  }

  function copyItem(isOption, item, id) {
    if (isOption) {
      const updatedArray = questionnairelist.map((obj) => {
        if (obj.id === id) {
          if (obj.question_options) {
            let temp = { ...item, id: Date.now() };
            obj.question_options = [...obj.question_options, temp];
          }
        }
        return obj;
      });
      setIsQuestionaireList(updatedArray);
    } else {
      let temp = { ...item, id: Date.now() };
      setIsQuestionaireList((prev) => {
        return [...prev, temp];
      });
    }
  }

  return (
    <CardComponent
      customStyle={styles.questionnaireExtendedViewStyle(isQuestionaire)}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderComponent
          isExpanded={isQuestionaire}
          setIsExpanded={setIsQuestionaire}
          headerText={intl.formatMessage({
            id: "label.questionnaire",
          })}
          subText={intl.formatMessage({
            id: "label.questionaire_subHeading",
          })}
          isWebView={isWebView}
          progressText={questionnairelist.length}
          onPress={() =>
            addNewQuestion(
              false,
              null,
              getQuestionInitalValue(intl, questionnairelist.length)
            )
          }
        />
        {isQuestionaire &&
          questionnairelist?.map((item, index) => {
            return (
              <View key={item.id}>
                <RenderQuestion
                  item={item}
                  copyItem={copyItem}
                  index={index}
                  isWebView={isWebView}
                  deleteQuestion={deleteQuestion}
                  handleChange={handleChange}
                  addNewQuestion={addNewQuestion}
                  questionError={questionError}
                  questionaireTypeFormatted={questionaireTypeFormatted}
                  setoptionData={setoptionData}
                  setIsModalVisible={setIsModalVisible}
                  setNewQuestionnaireData={setNewQuestionnaireData}
                  isEdited={isEdited}
                />
              </View>
            );
          })}
        {isQuestionaire && !isWebView && (
          <CustomButton
            style={isWebView ? styles.buttonStyle : styles.mobileButtonStyle}
            onPress={() => {
              setIsModalVisible(true);
            }}
            customStyle={{
              customTextStyle: styles.buttonTextStyle(isWebView),
            }}
          >
            {intl.formatMessage({ id: "label.add_question" })}
          </CustomButton>
        )}
        <AddNewQuestionModal
          isWebView={isWebView}
          isModalVisible={isModalVisible}
          optionData={optionData}
          setoptionData={setoptionData}
          questionnairelistLength={
            optionData
              ? optionData.questionNumber
              : questionnairelist.length + 1
          }
          newQuestionnaireData={newQuestionnaireData}
          setNewQuestionnaireData={setNewQuestionnaireData}
          questionaireTypeFormatted={questionaireTypeFormatted}
          setIsModalVisible={setIsModalVisible}
          isEdited={isEdited}
          handleChange={handleChange}
          editEntireQuestion={editEntireQuestion}
          addNewQuestion={addNewQuestion}
        />
      </ScrollView>
    </CardComponent>
  );
};
export default AddQuestionaireComponent;
