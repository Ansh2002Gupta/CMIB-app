import { useState, useEffect } from "react";
import { useIntl } from "react-intl";

import { mapApiDataToUI } from "../MappedData";
import { SELECTION_PROCESS } from "../../../../../constants/constants";

const useJobDetailForm = () => {
  const intl = useIntl();
  const [addDesignation, setAddDesignation] = useState(false);
  const [bondPeriod, setBondPeriod] = useState(null);
  const [compensation, setCompensation] = useState(null);
  const [CTCDetail, setCTCDetail] = useState(null);
  const [designationName, setDesignationName] = useState(null);
  const [exitAmount, setExitAmount] = useState(null);
  const [jobDetailData, setJobDetailData] = useState(null);
  const [selectionProcess, setSelectionProcess] = useState(
    SELECTION_PROCESS.map((option) => ({
      ...option,
      title: intl.formatMessage({ id: option.messageId }),
    }))
  );
  const [startingSalary, setStartingSalary] = useState(null);

  useEffect(() => {
    setJobDetailData(mapApiDataToUI);
  }, []);

  const onClickAddDesignation = () => {
    setAddDesignation(true);
  };

  const handleMonthlyData = (fieldName, value) => {
    setJobDetailData({
      ...jobDetailData,
      monthly: jobDetailData.monthly.map((detail) =>
        detail.label === fieldName ? { ...detail, value: value } : detail
      ),
    });
  };

  const handleYearlyData = (fieldName, value) => {
    setJobDetailData({
      ...jobDetailData,
      yearly: jobDetailData.yearly.map((detail) =>
        detail.label === fieldName ? { ...detail, value: value } : detail
      ),
    });
  };

  const handleToggle = (id) => {
    const updatedItems = selectionProcess.map((item) => {
      if (item.id === id) {
        return { ...item, isSelected: !item.isSelected };
      }
      return item;
    });
    setSelectionProcess(updatedItems);
  };

  // TODO
  // I have created function for single line code we have to add code later

  const handleDesignationName = (val) => {
    setDesignationName(val);
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
