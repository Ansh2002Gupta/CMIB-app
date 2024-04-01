import React from "react";
import { useIntl } from "react-intl";
import { View, Platform } from "@unthinkable/react-core-components";

import ActionPairButton from "../../../../components/ActionPairButton";
import CommonText from "../../../../components/CommonText";
import CardComponent from "../../../../components/CardComponent";
import DetailCard from "../../../../components/DetailCard";
import DetailComponent from "../../../../components/DetailComponent";
import RenderSourceOfInfo from "../../../../components/RenderSourceOfInfo/RenderSourceOfInfo";
import UploadImage from "../../../../components/UploadImage";
import useIsWebView from "../../../../hooks/useIsWebView";
import useCompanyProfile from "./controllers/useCompanyProfile";
import { DEFAULT_BALANCE_CREDIT } from "../../../../constants/constants";
import commonStyles from "../../../../theme/styles/commonStyles";
import styles from "./CompanyProfileForm.style";

const CompanyProfile = ({ tabHandler }) => {
  const {
    columnCount,
    countryCodes,
    formDetails,
    handleBlur,
    handleInputChange,
    handleContactPersonInfo,
    handleCompanyProfile,
    handleToggle,
    industryOptions,
    isEditProfile,
    options,
  } = useCompanyProfile();
  const intl = useIntl();
  const { isWebView } = useIsWebView();

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
      {(formDetails?.companyLogo || isEditProfile) && (
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
              onDeleteImage={() => {}}
              errorWhileUpload={() => {}}
              // fileUploadResult: updatedFileUploadResult
              fileUploadResult={() => {}}
              handleFileUpload={() => {}}
              isUploadingImageToServer={false}
              setFileUploadResult={() => {}}
              uploadPercentage={() => {}}
            />
          </View>
        </CardComponent>
      )}
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
  );
};

export default CompanyProfile;
