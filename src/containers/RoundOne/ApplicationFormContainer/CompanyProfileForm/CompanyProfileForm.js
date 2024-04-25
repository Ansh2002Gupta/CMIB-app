import React from "react";
import { useIntl } from "react-intl";
import { Platform, View } from "@unthinkable/react-core-components";

import ActionPairButton from "../../../../components/ActionPairButton";
import CommonText from "../../../../components/CommonText";
import CardComponent from "../../../../components/CardComponent";
import DetailCard from "../../../../components/DetailCard";
import DetailComponent from "../../../../components/DetailComponent";
import ErrorComponent from "../../../../components/ErrorComponent/ErrorComponent";
import RenderSourceOfInfo from "../../../../components/RenderSourceOfInfo/RenderSourceOfInfo";
import LoadingScreen from "../../../../components/LoadingScreen";
import UploadImage from "../../../../components/UploadImage";
import ToastComponent from "../../../../components/ToastComponent/ToastComponent";
import useIsWebView from "../../../../hooks/useIsWebView";
import useCompanyProfile from "./controllers/useCompanyProfileForm";
import { DEFAULT_BALANCE_CREDIT } from "../../../../constants/constants";
import commonStyles from "../../../../theme/styles/commonStyles";
import { useNavigate } from "../../../../routes";
import CustomButton from "../../../../components/CustomButton";
import CustomImage from "../../../../components/CustomImage";
import styles from "./CompanyProfileForm.style";
import images from "../../../../images";

const CompanyProfileForm = ({ tabHandler, isEditable, setIsEditable }) => {
  const {
    columnCount,
    errorWhileUpload,
    errorWhileUpdating,
    setErrorWhileUpdating,
    isProfileUpdating,
    isErrorWhileUpdating,
    formDetails,
    getErrorDetails,
    handleBlur,
    handleInputChange,
    handleSaveAndNext,
    handleContactPersonInfo,
    handleCompanyProfile,
    handleToggle,
    isLoading,
    isEditProfile,
    onDeleteImage,
    options,
    uploadImageToServerUtils,
  } = useCompanyProfile({ isEditable, tabHandler });
  const intl = useIntl();
  const { isWebView } = useIsWebView();
  const navigate = useNavigate();
  const {
    fileUploadResult,
    handleFileUpload,
    isUploadingImageToServer,
    setFileUploadResult,
    uploadPercentage,
  } = uploadImageToServerUtils;

  const hasCompanyLogo = formDetails?.companyLogo;
  const defaultUploadResult = hasCompanyLogo
    ? {
        data: {
          url: formDetails?.companyLogo,
        },
      }
    : null;

  const updatedFileUploadResult = isEditable
    ? fileUploadResult || defaultUploadResult
    : defaultUploadResult;

  const containerStyle = isWebView
    ? styles.containerGridStyle(columnCount)
    : styles.contentStyle;

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
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loading}>
          <LoadingScreen />
        </View>
      )}
      {!isLoading &&
        !getErrorDetails().errorMessage &&
        !!formDetails?.companyDetail.length && (
          <View>
            <DetailCard
              details={formDetails?.companyDetail}
              handleBlur={handleBlur}
              headerId={"label.company_details"}
              handleChange={(fieldName, value) => {
                handleInputChange(fieldName, value);
              }}
              isEditProfile={isEditable}
            />
            {formDetails?.contactPersonInfo.map((details, index) => {
              return (
                <DetailCard
                  key={index}
                  customCardStyle={styles.customCardStyle}
                  customContainerStyle={styles.customContainerStyle}
                  headerId={"label.contact_person_info"}
                  handleChange={(detailKey, value, isCode) =>
                    handleContactPersonInfo(index, detailKey, value, isCode)
                  }
                  handleBlur={handleBlur}
                  index={index}
                  isEditProfile={isEditable}
                  otherDetails={details?.contactInfo}
                />
              );
            })}
            <DetailCard
              handleBlur={handleBlur}
              handleChange={handleCompanyProfile}
              headerId={"label.other_details"}
              isRow
              details={formDetails?.companyProfile}
              otherDetails={formDetails?.otherDetails}
              isEditProfile={isEditable}
            />
            <CardComponent customStyle={styles.cardStyle}>
              <DetailComponent
                headerText={intl.formatMessage({ id: "label.source_of_info" })}
                isMandatory
              />
              <RenderSourceOfInfo
                badgeStyle={styles.badgeContainer}
                isEditProfile={isEditable}
                options={options}
                containerStyle={containerStyle}
                handleToggle={handleToggle}
                profileResult={formDetails?.sourceOfInfo}
              />
            </CardComponent>
            <CardComponent customStyle={styles.cardStyle}>
              <DetailComponent
                headerText={intl.formatMessage({ id: "label.company_logo" })}
                headerTextCustomStyles={styles.headerTextStyle}
              />
              <CommonText customTextStyle={styles.infoStyle}>
                {intl.formatMessage({ id: "label.logo_info" })}
              </CommonText>
              <View style={styles.imageContainer}>
                {isEditable ? (
                  <UploadImage
                    {...{
                      onDeleteImage,
                      errorWhileUpload,
                      fileUploadResult: updatedFileUploadResult,
                      handleFileUpload,
                      isUploadingImageToServer,
                      setFileUploadResult,
                      uploadPercentage,
                      hideIconDelete: false,
                    }}
                  />
                ) : (
                  <CustomImage
                    source={
                      !!formDetails?.companyLogo
                        ? { uri: formDetails?.companyLogo }
                        : images.defaultImage
                    }
                    style={styles.companyLogoStyle}
                  />
                )}
              </View>
            </CardComponent>

            <CardComponent customStyle={styles.cardStyle}>
              <View style={styles.textContainer}>
                <CommonText customTextStyle={styles.headingText}>
                  {intl.formatMessage({ id: "label.balance_credit" })}:
                </CommonText>
                <CommonText
                  customTextStyle={styles.valueStyle}
                  fontWeight="600"
                >{`${intl.formatMessage({
                  id: "label.rupee",
                })} ${
                  formDetails?.balanceCredit || DEFAULT_BALANCE_CREDIT
                }`}</CommonText>
              </View>
            </CardComponent>
            <View style={styles.actionBtnContainer}>
              {isEditable ? (
                <ActionPairButton
                  buttonOneText={intl.formatMessage({ id: "label.cancel" })}
                  buttonTwoText={intl.formatMessage({
                    id: "label.save_and_next",
                  })}
                  onPressButtonOne={() => {
                    isEditable ? setIsEditable(false) : navigate(-1);
                  }}
                  onPressButtonTwo={() => {
                    handleSaveAndNext();
                  }}
                  displayLoader={isProfileUpdating}
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
                    tabHandler("next");
                  }}
                >
                  <CommonText
                    fontWeight={"600"}
                    customTextStyle={styles.nextButtonStyle}
                  >
                    {intl.formatMessage({ id: "label.next" })}
                  </CommonText>
                </CustomButton>
              )}
            </View>
          </View>
        )}
      {!isLoading && !!getErrorDetails().errorMessage && (
        <ErrorComponent
          errorHeading={intl.formatMessage({ id: "label.error" })}
          errorMsg={getErrorDetails().errorMessage}
          onRetry={getErrorDetails().onRetry}
        />
      )}
      {isErrorWhileUpdating && !!errorWhileUpdating && (
        <ToastComponent
          toastMessage={errorWhileUpdating}
          onDismiss={() => {
            setErrorWhileUpdating("");
          }}
        />
      )}
    </View>
  );
};

export default CompanyProfileForm;
