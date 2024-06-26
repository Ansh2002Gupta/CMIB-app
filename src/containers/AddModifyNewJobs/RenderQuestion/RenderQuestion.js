import React from "react";
import { useTheme } from "@unthinkable/react-theme";
import { View } from "@unthinkable/react-core-components";
import CustomImage from "../../../components/CustomImage";
import QuestionHeader from "./components/QuestionHeader";
import QuestionMiddleSection from "./components/QuestionMiddleSection";
import QuestionFooter from "./components/QuestionFooter/index";
import images from "../../../images";
import getStyles from "./RenderQuestion.styles";

const RenderQuestion = ({
  addNewQuestion,
  copyItem,
  deleteQuestion,
  handleChange,
  index,
  isEdited,
  isWebView,
  item,
  questionError,
  questionaireTypeFormatted,
  setNewQuestionnaireData,
  setIsModalVisible,
  setoptionData,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <View>
        {isWebView && (
          <View style={styles.questionViewStyle}>
            <CustomImage
              source={images.questionIcon}
              style={styles.questionIconStyle}
            />
          </View>
        )}
        <QuestionHeader
          item={item}
          handleChange={handleChange}
          index={index}
          isWebView={isWebView}
          questionError={questionError && questionError[item.id]?.questionError}
          questionaireTypeFormatted={questionaireTypeFormatted}
        />
        <QuestionMiddleSection
          item={item}
          handleChange={handleChange}
          copyItem={copyItem}
          deleteQuestion={deleteQuestion}
          addNewQuestion={addNewQuestion}
          isWebView={isWebView}
          index={index}
          questionError={questionError && questionError[item.id]?.optionError}
          setoptionData={setoptionData}
          setNewQuestionnaireData={setNewQuestionnaireData}
          isEdited={isEdited}
        />
        <QuestionFooter
          copyItem={copyItem}
          deleteQuestion={deleteQuestion}
          item={item}
          handleChange={handleChange}
          isWebView={isWebView}
          setIsModalVisible={setIsModalVisible}
          setNewQuestionnaireData={setNewQuestionnaireData}
          isEdited={isEdited}
        />
      </View>
    </View>
  );
};
export default RenderQuestion;
