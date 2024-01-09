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
        bondPeriod={bondPeriod}
        compensation={compensation}
        CTCDetail={CTCDetail}
        designationName={designationName}
        exitAmount={exitAmount}
        onClickAddDesignation={onClickAddDesignation}
        addDesignation={addDesignation}
        jobDetailData={jobDetailData}
        handleMonthlyData={handleMonthlyData}
        handleYearlyData={handleYearlyData}
        selectionProcess={selectionProcess}
        handleToggle={handleToggle}
        startingSalary={startingSalary}
        handleBondPeriod={handleBondPeriod}
        handleCompensation={handleCompensation}
        handleCTCDetail={handleCTCDetail}
        handleDesignationName={handleDesignationName}
        handleExitAmount={handleExitAmount}
        handleStartingSalary={handleStartingSalary}
      />
    </View>
  );
};

export default JobDetails;
