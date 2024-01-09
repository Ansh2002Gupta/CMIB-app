import React, { useState, useEffect } from "react";
import { Text, View } from "@unthinkable/react-core-components";

import JobDetailsTemplate from "./JobDetailsTemplate";
import { mapApiDataToUI } from "./MappedData";

const JobDetails = () => {
  const [addDesignation, setAddDesignation] = useState(false);
  const [jobDetailData, setJobDetailData] = useState(null);

  const onClickAddDesignation = () => {
    setAddDesignation(true);
  };

  useEffect(() => {
    setJobDetailData(mapApiDataToUI);
  }, []);

  const handleMonthlyData = (fieldName, value) => {
    setJobDetailData({
      ...jobDetailData,
      Monthly: jobDetailData.Monthly.map((detail) =>
        detail.label === fieldName ? { ...detail, value: value } : detail
      ),
    });
  };

  const handleYearlyData = (fieldName, value) => {
    setJobDetailData({
      ...jobDetailData,
      Yearly: jobDetailData.Yearly.map((detail) =>
        detail.label === fieldName ? { ...detail, value: value } : detail
      ),
    });
  };

  const options = [
    { messageId: "label.email_from_cpaib", isSelected: false, id: 1 },
    { messageId: "label.campus", isSelected: false, id: 2 },
    { messageId: "label.programme_brouchers", isSelected: false, id: 3 },
  ];

  return (
    <View>
      <JobDetailsTemplate
        onClickAddDesignation={onClickAddDesignation}
        addDesignation={addDesignation}
        jobDetailData={jobDetailData}
        handleMonthlyData={handleMonthlyData}
        handleYearlyData={handleYearlyData}
        options={options}
      />
    </View>
  );
};

export default JobDetails;
