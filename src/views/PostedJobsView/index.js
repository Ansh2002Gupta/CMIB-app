import React from "react";
import ViewPostedJobDetails from "../ViewPostedJobDetails";
import colors from "../../assets/colors";
import { View } from "@unthinkable/react-core-components";

const PostedJobs = () => {
  // const navigate = useNavigate();
  return (
    <View style={{ backgroundColor: colors.backgroundGrey, flex: 1 }}>
      <ViewPostedJobDetails />
    </View>
  );
};

export default PostedJobs;
