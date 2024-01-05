import React, { useState } from "react";
import { Text, View } from "@unthinkable/react-core-components";

import JobDetailsTemplate from "./JobDetailsTemplate";

const JobDetails = () => {
  const [addDesignation, setAddDesignation] = useState(false);

  const onClickAddDesignation = () => {
    setAddDesignation(true);
  };
  return (
    <View>
      <JobDetailsTemplate
        onClickAddDesignation={onClickAddDesignation}
        addDesignation={addDesignation}
      />
    </View>
  );
};

export default JobDetails;
