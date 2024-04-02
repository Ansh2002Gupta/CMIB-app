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
import useIsWebView from "../../../../hooks/useIsWebView";
import useCompanyProfile from "./controllers/useCompanyProfileForm";
import { DEFAULT_BALANCE_CREDIT } from "../../../../constants/constants";
import commonStyles from "../../../../theme/styles/commonStyles";
import styles from "./CompanyProfileForm.style";

const CompanyProfileForm = ({ tabHandler }) => {
  const {
    columnCount,
    countryCodes,
    errorWhileUpload,
    formDetails,
    getErrorDetails,
    handleBlur,
    handleInputChange,
    handleContactPersonInfo,
    handleCompanyProfile,
    handleToggle,
    industryOptions,
    isLoading,
    isEditProfile,
    onDeleteImage,
    options,
    uploadImageToServerUtils,
  } = useCompanyProfile();
  const intl = useIntl();
  const { isWebView } = useIsWebView();

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

  const updatedFileUploadResult = isEditProfile
    ? fileUploadResult || defaultUploadResult
    : defaultUploadResult;

  const containerStyle = isWebView
    ? styles.containerGridStyle(columnCount)
    : styles.contentStyle;

  const isWebProps =
    Platform.OS.toLowerCase() === "web"
      ? {
          buttonOneStyle: styles.buttonStyle,
          buttonTwoStyle: styles.buttonStyle,
          buttonOneContainerStyle: styles.buttonStyle,
          buttonTwoContainerStyle: styles.buttonStyle,
        }
      : {};

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loading}>
          <LoadingScreen />
        </View>
      )}
      {!isLoading && !getErrorDetails().errorMessage && (
        <View>
          <DetailCard
            details={formDetails?.companyDetail}
            handleBlur={handleBlur}
            headerId={intl.formatMessage({
              id: "label.company_details",
            })}
            handleChange={(fieldName, value) => {
              handleInputChange(fieldName, value);
            }}
            isEditProfile={isEditProfile}
          />
          {formDetails?.contactPersonInfo.map((details, index) => {
            return (
              <DetailCard
                key={index}
                customCardStyle={styles.customCardStyle}
                customContainerStyle={styles.customContainerStyle}
                headerId={intl.formatMessage({
                  id: "label.contact_person_info",
                })}
                handleChange={(detailKey, value, isCode) =>
                  handleContactPersonInfo(index, detailKey, value, isCode)
                }
                handleBlur={handleBlur}
                index={index}
                isEditProfile={isEditProfile}
                otherDetails={details?.contactInfo}
              />
            );
          })}
          <DetailCard
            handleBlur={handleBlur}
            handleChange={handleCompanyProfile}
            headerId={intl.formatMessage({
              id: "label.other_details",
            })}
            isRow
            details={formDetails?.companyProfile}
            otherDetails={formDetails?.otherDetails}
            isEditProfile={isEditProfile}
          />
          <CardComponent customStyle={styles.cardStyle}>
            <DetailComponent
              headerText={intl.formatMessage({
                id: "label.source_of_info",
              })}
              isMandatory
            />
            <RenderSourceOfInfo
              badgeStyle={styles.badgeContainer}
              isEditProfile
              options={options}
              containerStyle={containerStyle}
              handleToggle={handleToggle}
              profileResult={formDetails?.sourceOfInfo}
            />
          </CardComponent>

          <CardComponent customStyle={styles.cardStyle}>
            <DetailComponent
              headerText={intl.formatMessage({
                id: "label.company_logo",
              })}
              headerTextCustomStyles={styles.headerTextStyle}
            />
            <CommonText customTextStyle={styles.infoStyle}>
              {intl.formatMessage({
                id: "label.logo_info",
              })}
            </CommonText>
            <View style={styles.imageContainer}>
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
            <ActionPairButton
              buttonOneText={intl.formatMessage({ id: "label.cancel" })}
              buttonTwoText={intl.formatMessage({ id: "label.save" })}
              onPressButtonOne={() => tabHandler("prev")}
              onPressButtonTwo={() => {
                tabHandler("next");
              }}
              customStyles={{
                ...isWebProps,
                customContainerStyle: commonStyles.customContainerStyle,
              }}
              isButtonTwoGreen
            />
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
    </View>
  );
};

export default CompanyProfileForm;