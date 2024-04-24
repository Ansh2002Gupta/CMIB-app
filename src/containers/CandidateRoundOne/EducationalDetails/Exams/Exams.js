import React, { useEffect, useImperativeHandle } from "react";

import ExamsTemplate from "./ExamsTemplate";
import useExam from "./controller/useExam";
import useExamDetailsAPI from "../../../../services/apiServices/hooks/CandidateRoundeOne/useExamDetailsAPI";

const Exams = ({ intl, isWebView }, ref) => {
    const { handleExamDetails} = useExamDetailsAPI();

    useEffect(() => {
        handleExamDetails ({
          successCallback: (examDetails) => {
            updateExamDetails(examDetails);
          },
          errorCallback: () => {},
        });
      }, []);

  const {
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
    getAllState
  } = useExam();

  useImperativeHandle(ref, () => ({
    getState: () => {
      return getAllState()
    }
  }));

  return (
    <ExamsTemplate
      {...{
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
        intl,
        isWebView,
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
      }}
    />
  );
};

export default React.forwardRef(Exams);
