import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";

import { SELECTION_PROCESS } from "../../../../constants/constants";
import JobDetailsTemplate from "./JobDetailsTemplate";
import { mapApiDataToUI } from "./MappedData";

const JobDetails = () => {
  const intl = useIntl();
  const [addDesignation, setAddDesignation] = useState(false);
  const [jobDetailData, setJobDetailData] = useState(null);
  const [selectionProcess, setSelectionProcess] = useState(
    SELECTION_PROCESS.map((option) => ({
      ...option,
      title: intl.formatMessage({ id: option.messageId }),
    }))
  );

  const onClickAddDesignation = () => {
    setAddDesignation(true);
  };

  useEffect(() => {
    setJobDetailData(mapApiDataToUI);
  }, []);

  const handleMonthlyData = (fieldName, value) => {
    console.log(value, "value");
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

  const handleToggle = (id) => {
    const updatedItems = selectionProcess.map((item) => {
      if (item.id === id) {
        console.log(item, "item");
        return { ...item, isSelected: !item.isSelected };
      }
      return item;
    });
    setSelectionProcess(updatedItems);
  };

  return (
    <View>
      <JobDetailsTemplate
        onClickAddDesignation={onClickAddDesignation}
        addDesignation={addDesignation}
        jobDetailData={jobDetailData}
        handleMonthlyData={handleMonthlyData}
        handleYearlyData={handleYearlyData}
        selectionProcess={selectionProcess}
        handleToggle={handleToggle}
      />
    </View>
  );
};

export default JobDetails;
