import { View, Text } from "@unthinkable/react-core-components";
import React, { useMemo } from "react";
import CommonText from "../../../components/CommonText";
import colors from "../../../assets/colors";
import CustomTextInput from "../../../components/CustomTextInput";
import CustomButton from "../../../components/CustomButton";
import images from "../../../images";
import Switch from "../../../components/Switch/Switch";
import TouchableImage from "../../../components/TouchableImage";
import CustomImage from "../../../components/CustomImage";
import { questionaireType } from "../../../constants/constants";
import { useIntl } from "react-intl";
import styles from "./RenderQuestion.styles";
import QuestionHeader from "./components/QuestionHeader";
import QuestionMiddleSection from "./components/QuestionMiddleSection";
import QuestionFooter from "./components/QuestionFooter";
const RenderQuestion = ({
  item,
  copyItem,
  index,
  deleteQuestion,
  handleChange,
  addNewQuestion,
}) => {
  const intl = useIntl();
  const questionaireTypeFormatted = useMemo(() => {
    return questionaireType.map((item) => {
      return {
        label: intl.formatMessage({ id: item.label }),
        value: intl.formatMessage({ id: item.value }),
      };
    });
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.questionViewStyle}>
        <CustomImage
          source={images.questionIcon}
          style={styles.questionIconStyle}
        />
      </View>
      <QuestionHeader
        item={item}
        handleChange={handleChange}
        index={index}
        questionaireTypeFormatted={questionaireTypeFormatted}
      />
      <QuestionMiddleSection
        item={item}
        handleChange={handleChange}
        copyItem={copyItem}
        deleteQuestion={deleteQuestion}
        addNewQuestion={addNewQuestion}
      />
      <QuestionFooter
        copyItem={copyItem}
        deleteQuestion={deleteQuestion}
        item={item}
        handleChange={handleChange}
      />
    </View>
  );
};
export default RenderQuestion;
