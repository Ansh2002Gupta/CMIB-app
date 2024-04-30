import React from "react";
import { useIntl } from "react-intl";
import { useTheme } from "@unthinkable/react-theme";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../../../../../components/CommonText";
import CustomTextInput from "../../../../../components/CustomTextInput";
import getStyles from "../../RenderQuestion.styles";
import getStylesForMobile from "./QuestionHeader.styles";

const QuestionHeader = (props) => {
  const {
    handleChange,
    index,
    isWebView,
    item,
    questionError,
    questionaireTypeFormatted,
  } = props;
  const intl = useIntl();
  const theme = useTheme();
  const styles = getStyles(theme);
  const stylesForMobile = getStylesForMobile(theme);

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
