import { View } from "@unthinkable/react-core-components";
import React from "react";
import { TwoColumn } from "../../core/layouts";
import CommonText from "../CommonText";

const JobCardMobile = ({
  jobName,
  jobPostion,
  jobDescription,
  jobLocation,
}) => {
  return (
    <View>
      <CommonText>{jobName}</CommonText>
      <CommonText>{jobPostion}</CommonText>
      <View></View>
      <TwoColumn rightSection={<CommonText>{jobLocation}</CommonText>} />
      <View></View>
    </View>
  );
};

export default JobCardMobile;
