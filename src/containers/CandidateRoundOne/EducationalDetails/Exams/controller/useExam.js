import { useState } from "react";

import { capitalize } from "../../../../../utils/util";

const useExam = () => {
  const [foundationMark, setFoundationMark] = useState("");
  const [foundationMonth, setFoundationMonth] = useState("");
  const [foundationRank, setFoundationRank] = useState("");
  const [foundationYear, setFoundationYear] = useState("");
  const [foundationAttempt, setFoundationAttempt] = useState("");
  const [foundationAttemptCount, setFoundationAttemptCount] = useState("");
  const [interGroup1Attempt, setInterGroup1Attempt] = useState("");
  const [interGroup1Count, setInterGroup1Count] = useState("");
  const [interGroup2Attempt, setInterGroup2Attempt] = useState("");
  const [interGroup2Count, setInterGroup2Count] = useState("");
  const [interGroup1Month, setInterGroup1Month] = useState("");
  const [interGroup1Year, setInterGroup1Year] = useState("");
  const [interGroup2Month, setInterGroup2Month] = useState("");
  const [interGroup2Year, setInterGroup2Year] = useState("");
  const [interMonth, setInterMonth] = useState("");
  const [interYear, setInterYear] = useState("");
  const [interMark, setInterMark] = useState("");
  const [interRank, setInterRank] = useState("");
  const [finalGroup1Attempt, setFinalGroup1Attempt] = useState("");
  const [finalGroup1Count, setFinalGroup1Count] = useState("");
  const [finalGroup2Attempt, setFinalGroup2Attempt] = useState("");
  const [finalGroup2Count, setFinalGroup2Count] = useState("");
  const [finalGroup1Month, setFinalGroup1Month] = useState("");
  const [finalGroup1Year, setFinalGroup1Year] = useState("");
  const [finalGroup2Month, setFinalGroup2Month] = useState("");
  const [finalGroup2Year, setFinalGroup2Year] = useState("");
  const [finalMonth, setFinalMonth] = useState("");
  const [finalYear, setFinalYear] = useState("");
  const [finalMark, setFinalMark] = useState("");
  const [finalRank, setFinalRank] = useState("");

  const onChangeFinalGroup1Attempt = (val) => {
    setFinalGroup1Attempt(val);
  };

  const onChangeFinalGroup1Count = (val) => {
    setFinalGroup1Count(val);
  };

  const onChangeFinalGroup2Attempt = (val) => {
    setFinalGroup2Attempt(val);
  };

  const onChangeFinalGroup2Count = (val) => {
    setFinalGroup2Count(val);
  };

  const onChangeFinalGroup1Month = (val) => {
    setFinalGroup1Month(val);
  };

  const onChangeFinalGroup1Year = (val) => {
    setFinalGroup1Year(val);
  };

  const onChangeFinalGroup2Month = (val) => {
    setFinalGroup2Month(val);
  };

  const onChangeFinalGroup2Year = (val) => {
    setFinalGroup2Year(val);
  };

  const onChangeFinalMark = (val) => {
    setFinalMark(val);
  };

  const onChangeFinalMonth = (val) => {
    setFinalMonth(val);
  };

  const onChangeFinalRank = (val) => {
    setFinalRank(val);
  };

  const onChangeFinalYear = (val) => {
    setFinalYear(val);
  };

  const onChangeFoundationMark = (val) => {
    setFoundationMark(val);
  };

  const onChangeFoundationMonth = (val) => {
    setFoundationMonth(val);
  };

  const onChangeFoundationRank = (val) => {
    setFoundationRank(val);
  };

  const onChangeFoundationYear = (val) => {
    setFoundationYear(val);
  };

  const onChangeFoundationAttempt = (val) => {
    setFoundationAttempt(val);
  };

  const onChangeFoundationAttemptCount = (val) => {
    setFoundationAttemptCount(val);
  };

  const onChangeInterGroup1Attempt = (val) => {
    setInterGroup1Attempt(val);
  };

  const onChangeInterGroup1Count = (val) => {
    setInterGroup1Count(val);
  };

  const onChangeInterGroup2Attempt = (val) => {
    setInterGroup2Attempt(val);
  };

  const onChangeInterGroup2Count = (val) => {
    setInterGroup2Count(val);
  };

  const onChangeInterGroup1Month = (val) => {
    setInterGroup1Month(val);
  };

  const onChangeInterGroup1Year = (val) => {
    setInterGroup1Year(val);
  };

  const onChangeInterGroup2Month = (val) => {
    setInterGroup2Month(val);
  };

  const onChangeInterGroup2Year = (val) => {
    setInterGroup2Year(val);
  };

  const onChangeInterMark = (val) => {
    setInterMark(val);
  };

  const onChangeInterMonth = (val) => {
    setInterMonth(val);
  };

  const onChangeInterRank = (val) => {
    setInterRank(val);
  };

  const onChangeInterYear = (val) => {
    setInterYear(val);
  };

  const updateExamDetails = (examDetails) => {
    console.log(examDetails);
    setFinalGroup1Attempt(examDetails?.final_group1_attempt || 1);
    setFinalGroup1Month(
      capitalize(examDetails?.final_group1_passing_month?.toLowerCase() || "")
    );
    setFinalGroup1Year(examDetails?.final_group1_passing_year || "");
    setFinalGroup2Attempt(examDetails?.final_group2_attempt || 1);
    setFinalGroup2Month(
      capitalize(examDetails?.final_group2_passing_month?.toLowerCase() || "")
    );
    setFinalGroup2Year(examDetails?.final_group2_passing_year || "");
    setFinalMark(getFinalMarks(examDetails));
    setFinalYear(getFinalYear(examDetails));
  };

  function getFinalMarks(examDetails) {
    const group1Mark = examDetails?.final_group1_txt_percentage || "0";
    const group2Mark = examDetails?.final_group2_percentage || "0";
    return ((Number(group1Mark) + Number(group2Mark)) / 2).toFixed(2);
  }

  function getFinalYear(examDetails) {
    const group1Year = examDetails?.final_group1_passing_year || "0";
    const group2Year = examDetails?.final_group2_passing_year || "0";
    const year = Math.max(Number(group1Year), Number(group2Year));
    setFinalMonth(
      year === Number(group2Year)
        ? capitalize(examDetails?.final_group2_passing_month?.toLowerCase())
        : capitalize(examDetails?.final_group1_passing_month?.toLowerCase())
    );
    return year;
  }

  return {
    finalGroup1Attempt,
    finalGroup1Count,
    finalGroup1Month,
    finalGroup1Year,
    finalGroup2Attempt,
    finalGroup2Count,
    finalGroup2Month,
    finalGroup2Year,
    finalMark,
    finalMonth,
    finalYear,
    finalRank,
    foundationAttempt,
    foundationAttemptCount,
    foundationMark,
    foundationMonth,
    foundationRank,
    foundationYear,
    interGroup1Attempt,
    interGroup1Count,
    interGroup1Month,
    interGroup1Year,
    interGroup2Attempt,
    interGroup2Count,
    interGroup2Month,
    interGroup2Year,
    interMark,
    interMonth,
    interRank,
    interYear,
    onChangeFinalGroup1Attempt,
    onChangeFinalGroup1Count,
    onChangeFinalGroup1Month,
    onChangeFinalGroup1Year,
    onChangeFinalGroup2Attempt,
    onChangeFinalGroup2Count,
    onChangeFinalGroup2Month,
    onChangeFinalGroup2Year,
    onChangeFinalMark,
    onChangeFinalMonth,
    onChangeFinalRank,
    onChangeFinalYear,
    onChangeFoundationAttempt,
    onChangeFoundationAttemptCount,
    onChangeFoundationMark,
    onChangeFoundationMonth,
    onChangeFoundationRank,
    onChangeFoundationYear,
    onChangeInterGroup1Attempt,
    onChangeInterGroup1Count,
    onChangeInterGroup1Month,
    onChangeInterGroup1Year,
    onChangeInterGroup2Attempt,
    onChangeInterGroup2Count,
    onChangeInterGroup2Month,
    onChangeInterGroup2Year,
    onChangeInterMark,
    onChangeInterMonth,
    onChangeInterRank,
    onChangeInterYear,
    updateExamDetails,
  };
};

export default useExam;
