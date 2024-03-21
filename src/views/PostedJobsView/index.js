import { View, Text } from "@unthinkable/react-core-components";
import React, { useState } from "react";
import CustomTextInput from "../../components/CustomTextInput";

const PostedJobs = () => {
  const [value, setValue] = useState("");
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <CustomTextInput value={value} onChangeValue={setValue} isCalendar />
      <Text>PostedJobs</Text>
    </View>
  );
};

export default PostedJobs;
