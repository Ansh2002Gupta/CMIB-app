import React from "react";
import { useIntl } from "react-intl";
import { View, Platform } from "@unthinkable/react-core-components";

import { TwoRow } from "../../../../core/layouts";

import JobDetailsTemplate from "./JobDetailsTemplate";
import useJobDetailForm from "./controllers/useJobDetailForm";
import ActionPairButton from "../../../../components/ActionPairButton";
import CustomButton from "../../../../components/CustomButton";
import CommonText from "../../../../components/CommonText";
import { useNavigate } from "../../../../routes";
import commonStyles from "../../../../theme/styles/commonStyles";
import styles from "./JobDetails.style";
import images from "../../../../images";
import ConfirmationModal from "../../../ConfirmationModal";
import LoadingScreen from "../../../../components/LoadingScreen";
import ErrorComponent from "../../../../components/ErrorComponent/ErrorComponent";
import ToastComponent from "../../../../components/ToastComponent/ToastComponent";
import { formateErrors } from "../../../../utils/util";

const JobDetails = ({ tabHandler }) => {
  const {
    desginationItems,
    setRenderJobDetails,
    configurableListQuery,
    setConfigurableListQuery,
    selectedOptions,
    setSelectedOptions,
    modalDetails,
    setModalDetails,
    handleDelete,
    renderJobDetails,
    menuOptions,
    setMenuOptions,
    handlePress,
    handleAdd,
    handleInputChange,
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
    handleBlur,
    handleCTCDetail,
    handleDesignationName,
    handleExitAmount,
    handleMonthlyData,
    handleStartingSalary,
    handleYearlyData,
    currentError,
    setCurrentError,
    jobDetailData,
    handleSaveAndNext,
    onClickAddDesignation,
    isLoading,
    error,
    selectionProcess,
    startingSalary,
  } = useJobDetailForm({ tabHandler });

  const isWebProps =
    Platform.OS.toLowerCase() === "web"
      ? {
          buttonOneStyle: styles.buttonStyle,
          buttonTwoStyle: styles.buttonTwoStyle,
          buttonOneContainerStyle: styles.buttonStyle,
          buttonTwoContainerStyle: styles.buttonTwoStyle,
        }
      : {};

  const navigate = useNavigate();
  const intl = useIntl();

  return (
    <>
      {isLoading && <LoadingScreen />}
      {!isLoading && !error && (
        <TwoRow
          topSection={
            <JobDetailsTemplate
              {...{
                desginationItems,
                menuOptions,
                setMenuOptions,
                handlePress,
                handleAdd,
                selectedOptions,
                setSelectedOptions,
                handleDelete,
                configurableListQuery,
                setConfigurableListQuery,
                setRenderJobDetails,
                renderJobDetails,
                handleInputChange,
                addDocumentField,
                addDesignation,
                bondPeriod,
                compensation,
                CTCDetail,
                handleBlur,
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
                handleTextEditorValue,
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
              <CustomButton
                style={styles.buttonStyle}
                iconLeft={{
                  leftIconSource: images.iconArrowLeft,
                }}
                onPress={() => {
                  tabHandler("prev");
                }}
              >
                <CommonText
                  fontWeight={"600"}
                  customTextStyle={styles.backButtonStyle}
                >
                  {intl.formatMessage({ id: "label.back" })}
                </CommonText>
              </CustomButton>
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
      )}
      {!!error && !isLoading && <ErrorComponent errorMsg={error} />}
      {!!currentError && (
        <ToastComponent
          toastMessage={currentError || formateErrors(currentError?.errors)}
          onDismiss={() => setCurrentError("")}
        />
      )}

      {modalDetails.isShown && (
        <ConfirmationModal
          severity={"warning"}
          hasSingleButton
          subHeading={modalDetails?.modalMessage}
          buttonOneText={intl.formatMessage({
            id: "label.ok",
          })}
          icon={images.iconWarning}
          onPressButtonOne={() =>
            setModalDetails({
              isShown: false,
              modalMessage: "",
            })
          }
        />
      )}
    </>
  );
};

export default JobDetails;
