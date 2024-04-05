import { ScrollView, View } from "@unthinkable/react-core-components";
import React from "react";
import CardComponent from "../../../components/CardComponent";
import DetailComponent from "../../../components/DetailComponent";
import styles from "./ViewJobs.styles";
const ViewJobs = ({ details }) => {
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
