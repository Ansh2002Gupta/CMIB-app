import React from "react";
import { View, Text } from "@unthinkable/react-core-components";
import CustomButton from "../../components/CustomButton";
import CommonText from "../../components/CommonText";
import { useNavigate } from "../../routes";
import { navigations } from "../../constants/routeNames";

const PostedJobs = () => {
  const navigate = useNavigate();
  return (
    <View>
      <Text>PostedJobs</Text>
      <CustomButton
        onPress={() => {
          navigate(navigations.ADD_NEW_JOBS);
        }}
      >
        <CommonText>New Jobs</CommonText>
      </CustomButton>
    </View>
  );
};

export default PostedJobs;
