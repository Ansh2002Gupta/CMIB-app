import React from "react";
import { View } from "@unthinkable/react-core-components";

import JobDetailsTemplate from "./JobDetailsTemplate";
import useJobDetailForm from "./controllers/useJobDetailForm";

const JobDetails = () => {
  const {
    addDesignation,
    bondPeriod,
    compensation,
    CTCDetail,
    designationName,
    exitAmount,
    handleBondPeriod,
    handleCompensation,
    handleCTCDetail,
    handleDesignationName,
    handleExitAmount,
    handleMonthlyData,
    handleStartingSalary,
    handleYearlyData,
    handleToggle,
    jobDetailData,
    onClickAddDesignation,
    selectionProcess,
    startingSalary,
  } = useJobDetailForm();

  return (
    <View>
      <JobDetailsTemplate
        addDesignation={addDesignation}
        bondPeriod={bondPeriod}
        compensation={compensation}
        CTCDetail={CTCDetail}
        designationName={designationName}
        exitAmount={exitAmount}
        handleBondPeriod={handleBondPeriod}
        handleCompensation={handleCompensation}
        handleCTCDetail={handleCTCDetail}
        handleDesignationName={handleDesignationName}
        handleExitAmount={handleExitAmount}
        handleMonthlyData={handleMonthlyData}
        handleStartingSalary={handleStartingSalary}
        handleYearlyData={handleYearlyData}
        handleToggle={handleToggle}
        jobDetailData={jobDetailData}
        onClickAddDesignation={onClickAddDesignation}
        selectionProcess={selectionProcess}
        startingSalary={startingSalary}
      />
    </View>
  );
};

export default JobDetails;
