import React from "react";
import { ScrollView, View } from "@unthinkable/react-core-components";
import { useTheme } from "@unthinkable/react-theme";
import CardComponent from "../../../components/CardComponent";
import DetailComponent from "../../../components/DetailComponent";
import getStyles from "./ViewJobs.styles";

const ViewJobs = ({ details }) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <View style={styles.container}>
      <ScrollView
        style={{
          overflow: "hidden",
        }}
      >
        <CardComponent
          customStyle={{
            margin: 16,
            padding: 16,
          }}
        >
          <DetailComponent
            details={details}
            isColumnVariableWidth
            customContainerStyle={{ marginTop: 0 }}
          />
        </CardComponent>
      </ScrollView>
    </View>
  );
};
export default ViewJobs;
