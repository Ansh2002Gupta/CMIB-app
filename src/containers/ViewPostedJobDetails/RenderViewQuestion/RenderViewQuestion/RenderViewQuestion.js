import React from "react";
import { View } from "@unthinkable/react-core-components";

import CardComponent from "../../../../components/CardComponent";
import CommonText from "../../../../components/CommonText";
import styles from "./RenderViewQuestion.styles";

const RenderViewQuestion = ({ item, index }) => {
  return (
    <View style={styles.container}>
      <CardComponent>
        <View style={styles.flexDirectionRow}>
          <CommonText customTextStyle={styles.questionTextStyles}>{`Question ${
            index + 1
          }`}</CommonText>
          <CommonText
            customContainerStyle={styles.marginLeft4}
            customTextStyle={styles.questionTypeStyle}
          >
            {item?.typeofQuestion || item?.type}
          </CommonText>
          {item.mandatory == 1 && (
            <CommonText
              customContainerStyle={styles.marginLeft4}
              customTextStyle={styles.mandatory}
            >{`*`}</CommonText>
          )}
        </View>
        <View style={styles.marginTop8}>
          <CommonText customTextStyle={styles.optionStyle}>
            {item.question}
          </CommonText>
        </View>
        <View style={styles.optionViewStyle}>
          {Array.isArray(item.question_options) &&
            item?.question_options?.map((items, index) => {
              return (
                <View style={styles.innerOptionView}>
                  <CommonText customTextStyle={styles.optionStyle}>{` ${
                    index + 1
                  }. ${items.value}`}</CommonText>
                </View>
              );
            })}
        </View>
      </CardComponent>
    </View>
  );
};
export default RenderViewQuestion;
