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
    let updatedMonthly = jobDetailData.monthly.map((detail) =>
      detail.label === fieldName ? { ...detail, value: value } : detail
    );
    let updatedYearly = [...jobDetailData.yearly];
    if (
      [
        "label.basic",
        "label.hra",
        "label.others",
        "label.fixedPay",
        "label.variablePay",
        "label.semiVariable",
      ].includes(fieldName)
    ) {
      const sumOfGrossSalary = updatedMonthly.reduce((acc, detail) => {
        if (
          [
            "label.basic",
            "label.hra",
            "label.others",
            "label.fixedPay",
            "label.variablePay",
            "label.semiVariable",
          ].includes(detail.label)
        ) {
          return acc + parseFloat(detail.value || 0);
        }
        return acc;
      }, 0);

      updatedMonthly = updatedMonthly.map((detail) =>
        detail.key === "grossSalary"
          ? { ...detail, value: sumOfGrossSalary.toString() }
          : detail
      );

      updatedYearly = updatedYearly.map((detail) =>
        detail.key === "totalGrossSalary"
          ? { ...detail, value: sumOfGrossSalary.toString() }
          : detail
      );
      const oneTimePayment =
        updatedYearly.find((detail) => detail.key === "oneTimePayment").value ||
        "0";
      const newCtc = sumOfGrossSalary + parseFloat(oneTimePayment);
      updatedYearly = updatedYearly.map((detail) =>
        detail.key === "ctc" ? { ...detail, value: newCtc.toString() } : detail
      );
    }

    setJobDetailData({
      ...jobDetailData,
      monthly: updatedMonthly,
      yearly: updatedYearly,
    });
  };

  const handleYearlyData = (fieldName, value) => {
    let updatedYearly = jobDetailData.yearly.map((detail) =>
      detail.label === fieldName ? { ...detail, value: value } : detail
    );
    const monthlyGrossSalary = getMonthlyGrossSalary();
    updatedYearly = updatedYearly.map((detail) =>
      detail.key === "totalGrossSalary"
        ? { ...detail, value: monthlyGrossSalary.toString() }
        : detail
    );
    if (
      fieldName === "label.oneTimePayment" ||
      fieldName === "label.totalGrossSalary"
    ) {
      const oneTimePayment =
        updatedYearly.find((detail) => detail.key === "oneTimePayment").value ||
        "0";
      const ctc = +monthlyGrossSalary + +oneTimePayment;
      updatedYearly = updatedYearly.map((detail) =>
        detail.key === "ctc" ? { ...detail, value: ctc.toString() } : detail
      );
    }
    setJobDetailData({
      ...jobDetailData,
      yearly: updatedYearly,
    });
  };

  function getMonthlyGrossSalary() {
    const monthlyDetail = jobDetailData.monthly.find(
      (detail) => detail.key === "grossSalary"
    );
    return monthlyDetail ? monthlyDetail.value : "0";
  }

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
