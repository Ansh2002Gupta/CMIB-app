import React, { useEffect } from "react";
import { useIntl } from "react-intl";
import { useTheme } from "@unthinkable/react-theme";
import { ScrollView, View } from "@unthinkable/react-core-components";

import RenderViewQuestion from "../RenderViewQuestion/RenderViewQuestion/RenderViewQuestion";
import CommonText from "../../../components/CommonText";
import CardComponent from "../../../components/CardComponent";
import ErrorComponent from "../../../components/ErrorComponent/ErrorComponent";
import LoadingScreen from "../../../components/LoadingScreen";
import useFetch from "../../../hooks/useFetch";
import getStyles from "./ViewQuestion.styles";

const ViewQuestion = ({ questionnaireData, url = "" }) => {
  const intl = useIntl();
  const theme = useTheme();
  const styles = getStyles(theme);

  const { data, isLoading, fetchData, isError, error } = useFetch({
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
      {isLoading && !isError && <LoadingScreen />}
      {!isLoading && !isError && (
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
                  fontWeight="500"
                  customTextStyle={styles.fontSize16}
                >
                  {intl.formatMessage({ id: "label.no_question_available" })}
                </CommonText>
              </CardComponent>
            </View>
          )}
        </ScrollView>
      )}
      {isError && !!error && (
        <ErrorComponent
          errorMsg={error?.data?.message}
          onRetry={() => {
            fetchData();
          }}
        />
      )}
    </View>
  );
};
export default ViewQuestion;
