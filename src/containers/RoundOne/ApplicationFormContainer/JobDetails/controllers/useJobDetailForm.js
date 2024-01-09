import { useState, useEffect } from "react";
import { useIntl } from "react-intl";

import JobDetails from "../JobDetails";
import { SELECTION_PROCESS } from "../../../../../constants/constants";
import { mapApiDataToUI } from "../MappedData";

const useJobDetailForm = () => {
  const intl = useIntl();
  const [addDesignation, setAddDesignation] = useState(false);
  const [jobDetailData, setJobDetailData] = useState(null);
  const [designationName, setDesignationName] = useState(null);
  const [compensation, setCompensation] = useState(null);
  const [startingSalary, setStartingSalary] = useState(null);
  const [CTCDetail, setCTCDetail] = useState(null);
  const [bondPeriod, setBondPeriod] = useState(null);
  const [exitAmount, setExitAmount] = useState(null);
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

  const handleBondPeriod = (val) => {
    setBondPeriod(val);
  };

  const handleCompensation = (val) => {
    setCompensation(val);
  };

  const handleCTCDetail = (val) => {
    setCTCDetail(val);
  };

  const handleDesignationName = (val) => {
    setDesignationName(val);
  };

  const handleExitAmount = (val) => {
    setExitAmount(val);
  };

  const handleStartingSalary = (val) => {
    setStartingSalary(val);
  };
  return {
    addDesignation,
    bondPeriod,
    compensation,
    CTCDetail,
    designationName,
    exitAmount,
    handleMonthlyData,
    handleYearlyData,
    handleToggle,
    jobDetailData,
    onClickAddDesignation,
    selectionProcess,
    startingSalary,
    handleBondPeriod,
    handleCompensation,
    handleCTCDetail,
    handleDesignationName,
    handleExitAmount,
    handleStartingSalary,
  };
};

export default useJobDetailForm;
