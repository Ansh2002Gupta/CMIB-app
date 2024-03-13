import { View, Text, ScrollView } from "@unthinkable/react-core-components";
import React from "react";
import CardComponent from "../../../components/CardComponent";
import HeaderComponent from "../HeaderComponent";
import { useIntl } from "react-intl";
import CustomButton from "../../../components/CustomButton";
import styles from "./AddQuestionaireComponent.styles";
import RenderQuestion from "../RenderQuestion";
import colors from "../../../assets/colors";
const AddQuestionaireComponent = ({
  isQuestionaire,
  setIsQuestionaire,
  isWebView,
  setIsQuestionaireList,
  questionnairelist,
}) => {
  const intl = useIntl();

  function addNewQuestion(isOption, id) {
    if (isOption) {
      let temp = {
        id: Date.now(),
        value: "",
      };
      const updatedArray = questionnairelist.map((obj) => {
        if (obj.id === id) {
          if (obj.hasOwnProperty("optionsArray")) {
            obj.optionsArray = [...obj.optionsArray, temp];
          }
        }
        return obj;
      });
      setIsQuestionaireList(updatedArray);
    } else {
      setIsQuestionaireList((oldArray) => [
        ...oldArray,
        {
          typeofQuestion: intl.formatMessage({ id: "label.text_question" }),
          question: "",
          id: Date.now(),
          isMandatory: false,
        },
      ]);
    }
  }

  function deleteQuestion(isOption, id, optionId) {
    if (isOption) {
      const updatedArray = questionnairelist.map((obj) => {
        if (obj.id === id) {
          if (obj.hasOwnProperty("optionsArray")) {
            let tempObj = obj.optionsArray.filter(
              (item) => item.id !== optionId
            );
            obj.optionsArray = tempObj;
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
          let temporary = obj.optionsArray.map((itemData) => {
            if (itemData.id === optionId) {
              let tempObj = { ...itemData, [key]: value };
              return tempObj;
            }
            return itemData;
          });

          obj["optionsArray"] = temporary;
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
            !tempObj.hasOwnProperty("optionsArray")
          ) {
            tempObj["optionsArray"] = [
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
            tempObj.hasOwnProperty("optionsArray")
          ) {
            delete tempObj.optionsArray;
          }
          return tempObj;
        }
        return obj;
      });

      setIsQuestionaireList(updatedArray);
    }
  }

  function copyItem(isOption, item, id) {
    if (isOption) {
      const updatedArray = questionnairelist.map((obj) => {
        if (obj.id === id) {
          if (obj.hasOwnProperty("optionsArray")) {
            let temp = { ...item, id: Date.now() };
            obj.optionsArray = [...obj.optionsArray, temp];
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
          onPress={() => addNewQuestion(false)}
        />
        {isQuestionaire && !isWebView && (
          <CustomButton
            style={isWebView ? styles.buttonStyle : styles.mobileButtonStyle}
            onPress={() => addNewQuestion(false)}
            customStyle={{
              customTextStyle: styles.buttonTextStyle(isWebView),
            }}
          >
            {intl.formatMessage({ id: "label.add_question" })}
          </CustomButton>
        )}
        {isQuestionaire &&
          questionnairelist?.map((item, index) => {
            return (
              <View key={item.id}>
                <RenderQuestion
                  item={item}
                  copyItem={copyItem}
                  index={index}
                  deleteQuestion={deleteQuestion}
                  handleChange={handleChange}
                  addNewQuestion={addNewQuestion}
                />
              </View>
            );
          })}
      </ScrollView>
    </CardComponent>
  );
};
export default AddQuestionaireComponent;
