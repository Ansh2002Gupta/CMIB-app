import React from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "../../../../routes";
import { View, Platform } from "@unthinkable/react-core-components";

import CommonText from "../../../../components/CommonText";
import CustomTouchableOpacity from "../../../../components/CustomTouchableOpacity";
import CustomImage from "../../../../components/CustomImage";
import CardComponent from "../../../../components/CardComponent";
import CustomButton from "../../../../components/CustomButton";
import CustomScrollView from "../../../../components/CustomScrollView";
import CustomTable from "../../../../components/CustomTable";
import DetailCard from "../../../../components/DetailCard";
import LoadingScreen from "../../../../components/LoadingScreen";
import ErrorComponent from "../../../../components/ErrorComponent/ErrorComponent";
import usePaymentForm from "./controllers/usePaymentForm";
import images from "../../../../images";
import styles from "./PaymentForm.style";

import { TRANSACTION_LIST_HEADING_FOR_NQCA } from "../../../../constants/constants";
import { TwoRow } from "../../../../core/layouts";
import ActionPairButton from "../../../../components/ActionPairButton";
import commonStyles from "../../../../theme/styles/commonStyles";
import ToastComponent from "../../../../components/ToastComponent/ToastComponent";
import { formateErrors } from "../../../../utils/util";

const PaymentForm = ({ isEditable, tabHandler, setIsEditable }) => {
  const {
    currentModule,
    errorWhilePaymentInit,
    errorWhileSubmitting,
    setErrorWhilePayment,
    setErrorWhileSubmiting,
    paymentDetails,
    handleBlur,
    handlePay,
    handleInputChange,
    isDisabled,
    paymentList,
    isEditProfile,
    handleDownload,
    getStatusStyle,
    getColoumConfigs,
    getErrorDetails,
    isSubmitting,
    isLoading,
    isLoadingPaymentInit,
    handleSaveAndNext,
  } = usePaymentForm({ isEditable });

  const intl = useIntl();
  const navigate = useNavigate();
  const isWebProps =
    Platform.OS.toLowerCase() === "web"
      ? {
          buttonOneStyle: styles.buttonStyle,
          buttonTwoStyle: styles.buttonTwoStyle,
          buttonOneContainerStyle: styles.buttonStyle,
          buttonTwoContainerStyle: styles.buttonTwoStyle,
        }
      : {};

  return (
    <CustomScrollView style={styles.mainContainer}>
      {isLoading && <LoadingScreen />}
      {!isLoading && !getErrorDetails().errorMessage && (
        <TwoRow
          topSection={
            <>
              <CardComponent>
                <View style={styles.headerContainer}>
                  <CommonText
                    customTextStyle={styles.headerText}
                    fontWeight={"600"}
                  >
                    {intl.formatMessage({
                      id: "label.fill_the_payment_form_slots",
                    })}
                  </CommonText>
                  <CustomTouchableOpacity
                    style={styles.downloadButtonContainer}
                    onPress={handleDownload}
                  >
                    <CustomImage
                      source={images.iconDownloading}
                      style={styles.downloadIcon}
                    />
                    <CommonText customTextStyle={styles.downloadText}>
                      {intl.formatMessage({
                        id: "label.downloadPerformaInvoice",
                      })}
                    </CommonText>
                  </CustomTouchableOpacity>
                </View>
                <DetailCard
                  customCardStyle={styles.customCardStyle}
                  details={paymentDetails}
                  handleBlur={handleBlur}
                  handleChange={(fieldName, value) => {
                    handleInputChange(fieldName, value);
                  }}
                  isEditProfile={isEditable}
                  datePickerContainer={styles.datePickerContainerStyle}
                />
                <CustomButton
                  withGreenBackground
                  iconRight={{
                    rightIconSource: images.iconArrowRightWhite,
                  }}
                  style={styles.buttonstyle}
                  onPress={handlePay}
                  isLoading={isLoadingPaymentInit}
                  disabled={isDisabled}
                >
                  <CommonText customTextStyle={styles.buttonText}>
                    {intl.formatMessage({ id: "label.pay_amount" })}
                  </CommonText>
                </CustomButton>
              </CardComponent>

              <CardComponent customStyle={styles.tableCard}>
                <View style={styles.headerContainer}>
                  <CommonText
                    customTextStyle={styles.headerText}
                    fontWeight={"600"}
                  >
                    {intl.formatMessage({
                      id: "label.paymentHistory",
                    })}
                  </CommonText>
                </View>
                <CustomTable
                  {...{
                    customTableStyle: styles.customTableStyle,
                    showSearchBar: false,
                    currentRecords: paymentList,
                    data: paymentList,
                    getColoumConfigs,
                    getStatusStyle,
                    isShowPagination: false,
                    isHeading: true,
                    tableHeading: TRANSACTION_LIST_HEADING_FOR_NQCA(),
                  }}
                />
              </CardComponent>
            </>
          }
          isTopFillSpace
          bottomSection={
            <View style={styles.actionBtnContainer}>
              <View
                style={{
                  ...(!isEditable && { flex: 1 }),
                }}
              >
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
              </View>
              {isEditable ? (
                <ActionPairButton
                  buttonOneText={intl.formatMessage({ id: "label.cancel" })}
                  buttonTwoText={intl.formatMessage({
                    id: "label.submit",
                  })}
                  displayLoader={isSubmitting}
                  onPressButtonOne={() => {
                    isEditable ? setIsEditable(false) : navigate(-1);
                  }}
                  onPressButtonTwo={() => {
                    handleSaveAndNext();
                  }}
                  customStyles={{
                    ...isWebProps,
                    customContainerStyle: commonStyles.customContainerStyle,
                  }}
                  isButtonTwoGreen
                />
              ) : (
                <CustomButton
                  withGreenBackground
                  style={styles.buttonStyle}
                  onPress={() => {
                    navigate(-1);
                  }}
                >
                  <CommonText
                    fontWeight={"600"}
                    customTextStyle={styles.doneButtonStyle}
                  >
                    {intl.formatMessage({ id: "label.done" })}
                  </CommonText>
                </CustomButton>
              )}
            </View>
          }
        />
      )}
      {!isLoading && !!getErrorDetails().errorMessage && (
        <ErrorComponent
          errorMsg={getErrorDetails().errorMessage}
          onRetry={() => getErrorDetails().onRetry()}
        />
      )}
      {errorWhilePaymentInit ||
        (errorWhileSubmitting && (
          <ToastComponent
            customToastStyle={styles.toastMessageStyle}
            toastMessage={formateErrors(
              errorWhilePaymentInit || errorWhileSubmitting
            )}
            onDismiss={() => {
              setErrorWhilePayment("");
              setErrorWhileSubmiting("");
            }}
          />
        ))}
    </CustomScrollView>
  );
};

export default PaymentForm;
