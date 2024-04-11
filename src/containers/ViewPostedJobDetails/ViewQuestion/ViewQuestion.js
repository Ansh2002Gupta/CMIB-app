import React, { useEffect } from "react";
import { useIntl } from "react-intl";
import { ScrollView, View } from "@unthinkable/react-core-components";

import RenderViewQuestion from "../RenderViewQuestion/RenderViewQuestion/RenderViewQuestion";
import CommonText from "../../../components/CommonText";
import CardComponent from "../../../components/CardComponent";
import useFetch from "../../../hooks/useFetch";
import styles from "./ViewQuestion.styles";
import LoadingScreen from "../../../components/LoadingScreen";

const ViewQuestion = ({ questionnaireData, url = "" }) => {
  const intl = useIntl();

  const { data, isLoading, fetchData } = useFetch({
    url: url,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  useEffect(() => {
    if (!questionnaireData) {
      fetchData();
    }
  }, []);

  const questionsData = !!questionnaireData ? questionnaireData : data;

  return (
    <View style={styles.container}>
      {questionsData || !isLoading ? (
        <ScrollView style={styles.flex1}>
          {Array.isArray(questionsData) && questionsData.length > 0 ? (
            questionsData?.map((item, index) => {
              return (
                <RenderViewQuestion item={item} index={index} key={index} />
              );
            })
          ) : (
            <View style={styles.noDataContainer}>
              <CardComponent customStyle={styles.cardStyle}>
                <CommonText
                  fontWeight="600"
                  customTextStyle={styles.fontSize16}
                >
                  {intl.formatMessage({ id: "label.no_question_available" })}
                </CommonText>
              </CardComponent>
            </View>
          )}
        </ScrollView>
      ) : (
        <LoadingScreen />
      )}
    </View>
  );
};
export default ViewQuestion;
