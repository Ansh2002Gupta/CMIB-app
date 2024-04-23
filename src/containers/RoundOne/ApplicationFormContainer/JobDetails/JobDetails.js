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

const JobDetails = ({ tabHandler, isEditable }) => {
  const {
    isButtonLoading,
    deleteDesignationFromList,
    isDisabled,
    desginationItems,
    setRenderJobDetails,
    configurableListQuery,
    setConfigurableListQuery,
    selectedOptions,
    modalDetails,
    setModalDetails,
    handleDelete,
    workExperienceOptions,
    renderJobDetails,
    menuOptions,
    setMenuOptions,
    handlePress,
    handleAdd,
    handleInputChange,
    addDesignation,
    handleBlur,
    handleMonthlyData,
    handleYearlyData,
    currentError,
    setCurrentError,
    handleSaveAndNext,
    onClickAddDesignation,
    isLoading,
    error,
    validateError,
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
          style={styles.twoMainSTyle}
          topSection={
            <JobDetailsTemplate
              {...{
                isEditable,
                validateError,
                renderJobDetails,
                handleInputChange,
                configurableListQuery,
                setConfigurableListQuery,
                menuOptions,
                setMenuOptions,
                handlePress,
                handleAdd,
                workExperienceOptions,
                handleDelete,
                handleBlur,
                selectedOptions,
                desginationItems,
                setRenderJobDetails,
                addDesignation,
                handleMonthlyData,
                handleYearlyData,
                onClickAddDesignation,
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
              {isEditable ? (
                <View style={styles.rightSection}>
                  <CustomButton
                    style={styles.buttonStyle}
                    onPress={() => navigate(-1)}
                  >
                    <CommonText
                      fontWeight={"600"}
                      customTextStyle={styles.backButtonStyle}
                    >
                      {intl.formatMessage({ id: "label.cancel" })}
                    </CommonText>
                  </CustomButton>
                  <ActionPairButton
                    buttonOneText={intl.formatMessage({ id: "label.save" })}
                    buttonTwoText={intl.formatMessage({
                      id: "label.next",
                    })}
                    onPressButtonOne={() => handleSaveAndNext()}
                    onPressButtonTwo={() => {
                      tabHandler("next");
                    }}
                    disableLeftStyle={styles.disabled}
                    isButtonOneDisabled={isDisabled}
                    isDisabled={isDisabled}
                    displayLoaderLeft={isButtonLoading}
                    customStyles={{
                      ...isWebProps,
                      customContainerStyle: commonStyles.customContainerStyle,
                    }}
                    isButtonTwoGreen
                  />
                </View>
              ) : (
                <CustomButton
                  withGreenBackground
                  style={styles.buttonStyle}
                  onPress={() => {
                    tabHandler("next");
                  }}
                >
                  <CommonText
                    fontWeight={"600"}
                    customTextStyle={commonStyles.nextButtonStyle}
                  >
                    {intl.formatMessage({ id: "label.next" })}
                  </CommonText>
                </CustomButton>
              )}
            </View>
          }
        />
      )}
      {!!error && !isLoading && <ErrorComponent errorMsg={error} />}
      {!!currentError && (
        <ToastComponent
          toastMessage={formateErrors(currentError)}
          onDismiss={() => setCurrentError("")}
        />
      )}

      {(modalDetails.isShown ||
        modalDetails.isDeleteModal ||
        modalDetails.isChangeTabModal) && (
        <ConfirmationModal
          severity={"warning"}
          hasSingleButton
          subHeading={modalDetails?.modalMessage}
          buttonOneText={intl.formatMessage({
            id: "label.ok",
          })}
          icon={images.iconWarning}
          onPressButtonOne={() => {
            if (modalDetails.isDeleteModal) {
              deleteDesignationFromList(modalDetails?.deleteDetails);
              setModalDetails((prev) => ({
                ...prev,
                isDeleteModal: false,
                modalMessage: "",
              }));
              return;
            }
            if (modalDetails.isChangeTabModal) {
              setModalDetails((prev) => ({
                ...prev,
                isChangeTabModal: false,
                modalMessage: "",
              }));
              return;
            }
            setModalDetails((prev) => ({
              ...prev,
              isShown: false,
              modalMessage: "",
            }));
            return;
          }}
        />
      )}
    </>
  );
};

export default JobDetails;
