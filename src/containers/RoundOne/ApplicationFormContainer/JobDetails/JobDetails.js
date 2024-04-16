import React from "react";

import ConfigurableList from "../../../../components/ConfigurableList/ConfigurableList";
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

  const dummyDataItems2 = [
    {
      id: 0,
      name: "Allahabad",
    },
    {
      id: 1,
      name: "Bombay",
    },
    {
      id: 2,
      name: "Chennai",
    },
    {
      id: 3,
      name: "Delhi",
    },
    {
      id: 4,
      name: "Etawah",
    },
    {
      id: 5,
      name: "Gandhinagar",
    },
  ];

  return (
    <>
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
    </>
  );
};

export default JobDetails;
