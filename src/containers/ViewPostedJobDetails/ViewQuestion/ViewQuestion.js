import { ScrollView, View } from "@unthinkable/react-core-components";
import React from "react";
import RenderViewQuestion from "../RenderViewQuestion/RenderViewQuestion/RenderViewQuestion";
import styles from "./ViewQuestion.styles";
import CommonText from "../../../components/CommonText";
import { useIntl } from "react-intl";
import CardComponent from "../../../components/CardComponent";
const ViewQuestion = ({ questionnaireData }) => {
  const intl = useIntl();
  return (
    <View style={styles.container}>
      <ScrollView style={styles.flex1}>
        {Array.isArray(questionnaireData) && questionnaireData.length > 0 ? (
          questionnaireData?.map((item, index) => {
            return <RenderViewQuestion item={item} index={index} key={index} />;
          })
        ) : (
          <View style={styles.noDataContainer}>
            <CardComponent customStyle={styles.cardStyle}>
              <CommonText fontWeight="500" customTextStyle={styles.fontSize16}>
                {intl.formatMessage({ id: "label.no_question_available" })}
              </CommonText>
            </CardComponent>
          </View>
        )}
      </ScrollView>
    </View>
  );
};
export default ViewQuestion;
