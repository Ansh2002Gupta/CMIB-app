import { ScrollView, View } from "@unthinkable/react-core-components";
import React from "react";
import RenderViewQuestion from "../RenderViewQuestion/RenderViewQuestion/RenderViewQuestion";
import styles from "./ViewQuestion.styles";
const ViewQuestion = ({ questionnaireData }) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        {Array.isArray(questionnaireData) &&
          questionnaireData?.map((item, index) => {
            return <RenderViewQuestion item={item} index={index} key={index} />;
          })}
      </ScrollView>
    </View>
  );
};
export default ViewQuestion;
