import React from "react";
import { View } from "@unthinkable/react-core-components";
import CommonText from "../../../../../components/CommonText";
import CustomTextInput from "../../../../../components/CustomTextInput";
import { useIntl } from "react-intl";
import stylesForMobile from "./QuestionHeader.styles";
import styles from "../../RenderQuestion.styles";
const QuestionHeader = (props) => {
  const {
    item,
    handleChange,
    index,
    questionaireTypeFormatted,
    isWebView,
    questionError,
  } = props;
  const intl = useIntl();
  return (
    <View>
      {isWebView ? (
        <View style={styles.innerContainerStyle}>
          <View style={styles.questionNumberViewStyle}>
            <CommonText customTextStyle={styles.questionNumberTextStyle}>{`Q${
              index + 1
            }`}</CommonText>
          </View>
          <CustomTextInput
            isPaddingNotRequired={true}
            value={item.question}
            placeholder={intl.formatMessage({ id: "label.enter_question" })}
            isError={(questionError && questionError[0] && true) || false}
            errorMessage={(questionError && questionError) || ""}
            onChangeText={(value) => {
              handleChange(false, "question", value, item.id);
            }}
            customStyle={styles.questionInputStyle}
          />
          <CustomTextInput
            isPaddingNotRequired={true}
            isDropdown
            value={item.typeofQuestion}
            placeholder={intl.formatMessage({ id: "label.enter_text" })}
            onChangeValue={(value) => {
              handleChange(false, "typeofQuestion", value, item.id);
            }}
            options={questionaireTypeFormatted}
            customStyle={styles.questionTypeStyle}
          />
        </View>
      ) : (
        <View>
          <View style={stylesForMobile.container}>
            <CommonText
              customTextStyle={stylesForMobile.headerTextStyle}
              fontWeight={"600"}
            >
              {`Q${index + 1}`}
            </CommonText>
            <CommonText
              customTextStyle={stylesForMobile.headerTextStyle}
              fontWeight={"600"}
              customContainerStyle={stylesForMobile.marginLeft4}
            >
              {item?.typeofQuestion}
            </CommonText>
          </View>
          <View style={stylesForMobile.questionViewStyle}>
            <CommonText customTextStyle={stylesForMobile.questionTextStyle}>
              {item?.question}
            </CommonText>
          </View>
        </View>
      )}
    </View>
  );
};
export default QuestionHeader;
