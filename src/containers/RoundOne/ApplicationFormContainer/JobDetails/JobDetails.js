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
    <JobDetailsTemplate
      {...{
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
      }}
    />
  );
};

export default JobDetails;
