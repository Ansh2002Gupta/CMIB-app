import React from "react";
import { useIntl } from "react-intl";
import { View, Platform } from "@unthinkable/react-core-components";

import { TwoRow } from "../../../../core/layouts";

import JobDetailsTemplate from "./JobDetailsTemplate";
import useJobDetailForm from "./controllers/useJobDetailForm";
import ActionPairButton from "../../../../components/ActionPairButton";
import { useNavigate } from "../../../../routes";
import commonStyles from "../../../../theme/styles/commonStyles";
import styles from "./JobDetails.style";

const JobDetails = ({ tabHandler }) => {
  const {
    addDocumentField,
    addDesignation,
    bondPeriod,
    compensation,
    CTCDetail,
    designationName,
    exitAmount,
    handleBondPeriod,
    handleCompensation,
    handleTextEditorValue,
    handleCTCDetail,
    handleDesignationName,
    handleExitAmount,
    handleMonthlyData,
    handleStartingSalary,
    handleYearlyData,
    handleToggle,
    requiredDocumentDetails,
    setRequiredDocumentDetails,
    requiredPostingPlaceDetail,
    setRequiredPostingPlaceDetail,
    jobDetailData,
    handleSaveAndNext,
    onClickAddDesignation,
    selectionProcess,
    startingSalary,
  } = useJobDetailForm();

  const isWebProps =
    Platform.OS.toLowerCase() === "web"
      ? {
          buttonOneStyle: styles.buttonStyle,
          buttonTwoStyle: styles.buttonStyle,
          buttonOneContainerStyle: styles.buttonStyle,
          buttonTwoContainerStyle: styles.buttonStyle,
        }
      : {};

  const navigate = useNavigate();
  const intl = useIntl();

  return (
    <TwoRow
      topSection={
        <JobDetailsTemplate
          {...{
            addDocumentField,
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
            requiredDocumentDetails,
            handleTextEditorValue,
            setRequiredDocumentDetails,
            requiredPostingPlaceDetail,
            setRequiredPostingPlaceDetail,
            jobDetailData,
            onClickAddDesignation,
            selectionProcess,
            startingSalary,
          }}
        />
      }
      isTopFillSpace
      bottomSection={
        <View style={styles.actionBtnContainer}>
          <ActionPairButton
            buttonOneText={intl.formatMessage({ id: "label.cancel" })}
            buttonTwoText={intl.formatMessage({ id: "label.save" })}
            onPressButtonOne={() => navigate(-1)}
            onPressButtonTwo={() => {
              handleSaveAndNext();
            }}
            displayLoader={false}
            customStyles={{
              ...isWebProps,
              customContainerStyle: commonStyles.customContainerStyle,
            }}
            isButtonTwoGreen
          />
        </View>
      }
    />
  );
};

export default JobDetails;
