import { View, Text } from "@unthinkable/react-core-components";
import React from "react";
import ViewPostedJobDetails from "../ViewPostedJobDetails";
import colors from "../../assets/colors";

const PostedJobs = () => {
  return (
    <View style={{ backgroundColor: colors.backgroundGrey, flex: 1 }}>
      <ViewPostedJobDetails />
    </View>
  );
};

export default PostedJobs;
