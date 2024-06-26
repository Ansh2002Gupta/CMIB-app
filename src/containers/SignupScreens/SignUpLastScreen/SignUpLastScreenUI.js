import React, { useContext } from "react";
import PropTypes from "prop-types";
import { MediaQueryContext, useTheme } from "@unthinkable/react-theme";
import { Platform, View } from "@unthinkable/react-core-components";

import ActionPairButton from "../../../components/ActionPairButton";
import CheckBox from "../../../components/CheckBox/CheckBox";
import CommonText from "../../../components/CommonText";
import CustomModal from "../../../components/CustomModal/CustomModal";
import CustomTextInput from "../../../components/CustomTextInput";
import FormWrapper from "../../../components/FormWrapper";
import HeaderTextWithLabelAndDescription from "../../../components/HeaderTextWithLabelAndDescription";
import KeyboardAwareScrollView from "../../../components/KeyboardAwareScrollView";
import LabelWithLinkText from "../../../components/LabelWithLinkText";
import ToastComponent from "../../../components/ToastComponent/ToastComponent";
import UploadImage from "../../../components/UploadImage";
import useIsWebView from "../../../hooks/useIsWebView";
import images from "../../../images";
import {
  COMPANY_DETAIL_MAX_LENGTH,
  COMPANY_TYPE_OPTIONS,
  NATURE_OF_SUPPLIER,
} from "../../../constants/constants";
import commonStyles from "../../../theme/styles/commonStyles";
import { getResponsiveStyles, getStyles } from "./SignUpLastScreen.style";

const SignUpLastScreenUI = ({
  allFieldsFilled,
  companyDetails,
  companyDetailsRef,
  companyType,
  errors,
  errorWhileDeletion,
  errorWhileUpload,
  getSocialMediaRef,
  handleBlur,
  handleDismissToast,
  handleInputChange,
  handleSuccessModal,
  handleToggle,
  intl,
  isLoading,
  natureOfSupplier,
  onClickGoToLogin,
  onDeleteImage,
  onGoBack,
  options,
  showSuccessSignUp,
  signUpError,
  socialMediaLinks,
  uploadImageToServerUtils,
  validationError,
  website,
  websiteRef,
}) => {
  const { isWebView } = useIsWebView();
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const theme = useTheme();
  const style = getStyles(theme);

  const showContentHeader =
    currentBreakpoint !== "xs" && currentBreakpoint !== "sm";

  const isWeb = Platform.OS.toLowerCase() === "web";

  const errorMessage =
    validationError || errorWhileDeletion || errorWhileUpload || signUpError;

  const {
    fileUploadResult,
    handleFileUpload,
    isUploadingImageToServer,
    setFileUploadResult,
    uploadPercentage,
  } = uploadImageToServerUtils;

  const renderFormContent = () => {
    return (
      <View style={style.formContainer}>
        <CommonText customTextStyle={style.headerText} fontWeight="600">
          {intl.formatMessage({ id: "label.social_media_presence" })}
        </CommonText>
        {Object.keys(socialMediaLinks).map((key) => (
          <CustomTextInput
            key={key}
            label={intl.formatMessage({
              id: `label.${key}`,
            })}
            placeholder={intl.formatMessage({
              id: `label.enter_${key}_url`,
            })}
            errorMessage={errors.socialMediaLinks[key]}
            isError={!!errors.socialMediaLinks[key]}
            customHandleBlur={() => handleBlur(key)}
            value={socialMediaLinks[key]}
            fieldRef={getSocialMediaRef(key)}
            onChangeText={(value) => handleInputChange(value, key)}
          />
        ))}
        <View style={style.seperator} />
        <CommonText customTextStyle={style.headerText} fontWeight="600">
          {intl.formatMessage({ id: "label.company_details" })}
        </CommonText>
        <CustomTextInput
          label={intl.formatMessage({
            id: "label.short_profile_of_the_company",
          })}
          placeholder={intl.formatMessage({
            id: "label.enter_profile_of_company",
          })}
          maxLength={COMPANY_DETAIL_MAX_LENGTH}
          errorMessage={errors.companyDetails}
          isError={!!errors.companyDetails}
          customHandleBlur={() => handleBlur("companyDetails")}
          value={companyDetails}
          onChangeText={(value) => handleInputChange(value, "companyDetails")}
          isMandatory
          isMultiline
          fieldRef={companyDetailsRef}
        />
        <CustomTextInput
          label={intl.formatMessage({
            id: "label.website",
          })}
          placeholder={intl.formatMessage({
            id: "label.enter_your_website",
          })}
          customHandleBlur={() => handleBlur("website")}
          value={website}
          errorMessage={errors.website}
          isError={!!errors.website}
          onChangeText={(value) => handleInputChange(value, "website")}
          isMandatory
          fieldRef={websiteRef}
        />
        <CustomTextInput
          label={intl.formatMessage({
            id: "label.nature_of_supplier",
          })}
          placeholder={intl.formatMessage({
            id: "label.select_nature_of_supplier",
          })}
          value={natureOfSupplier}
          isMandatory
          isDropdown
          onChangeValue={(value) =>
            handleInputChange(value, "natureOfSupplier")
          }
          options={NATURE_OF_SUPPLIER}
        />
        <CustomTextInput
          label={intl.formatMessage({
            id: "label.company_type",
          })}
          placeholder={intl.formatMessage({
            id: "label.select_company_type",
          })}
          value={companyType}
          onChangeValue={(value) => handleInputChange(value, "companyType")}
          options={COMPANY_TYPE_OPTIONS}
          isMandatory
          isDropdown
        />
        <View style={style.seperator} />
        <CommonText customTextStyle={style.headerText} fontWeight="600">
          {intl.formatMessage({ id: "label.source_of_info" })}
          <CommonText
            customContainerStyle={style.labelBox}
            customTextStyle={style.labelStar}
          >
            {"*"}
          </CommonText>
        </CommonText>
        <View style={style.containerStyle}>
          {options.map((item, index) => (
            <CheckBox
              key={item.id}
              id={item.id}
              index={index}
              title={item.title}
              isSelected={item.isSelected}
              handleCheckbox={handleToggle}
            />
          ))}
        </View>
        <View style={style.seperator} />
        <CommonText customTextStyle={style.headerText} fontWeight="600">
          {intl.formatMessage({ id: "label.uplaod_company_logo" })}
        </CommonText>
        <CommonText customTextStyle={style.infoStyle}>
          {intl.formatMessage({
            id: "label.logo_info",
          })}
        </CommonText>
        <UploadImage
          {...{
            onDeleteImage,
            errorWhileUpload,
            fileUploadResult,
            handleFileUpload,
            isUploadingImageToServer,
            setFileUploadResult,
            uploadPercentage,
          }}
        />
      </View>
    );
  };

  const renderFooterContent = () => {
    return (
      <View style={style.signupFooterContainer}>
        <ActionPairButton
          buttonOneText={intl.formatMessage({ id: "label.back" })}
          buttonTwoText={intl.formatMessage({ id: "label.sign_up" })}
          displayLoader={isLoading}
          iconLeft={{
            leftIconAlt: "left-arrow",
            leftIconSource: images.iconArrowLeft,
          }}
          isDisabled={!allFieldsFilled()}
          isButtonTwoGreen
          onPressButtonOne={onGoBack}
          onPressButtonTwo={() => handleSuccessModal(true)}
          customStyles={{
            customContainerStyle: !isWebView && style.customContainerStyle,
          }}
        />
        {isWebView && (
          <LabelWithLinkText
            labelText={intl.formatMessage({ id: "label.already_account" })}
            linkText={intl.formatMessage({ id: "label.login_here" })}
            onLinkClick={onClickGoToLogin}
          />
        )}
      </View>
    );
  };

  return (
    <FormWrapper
      onSubmit={() => handleSuccessModal(true)}
      customFormStyle={commonStyles.mainView}
    >
      <View
        style={
          isWebView
            ? getResponsiveStyles({ str: "signupContainer", currentBreakpoint })
            : style.mainContainerStyle
        }
      >
        {showSuccessSignUp && (
          <CustomModal
            headerText={intl.formatMessage({
              id: "label.signup_success",
            })}
            secondaryText={intl.formatMessage({
              id: "label.signup_info",
            })}
            buttonTitle={intl.formatMessage({
              id: "label.go_back_to_login",
            })}
            onPress={onClickGoToLogin}
            isSuccess
            maxWidth={"xs"}
          />
        )}
        {isWebView && (
          <View>
            <HeaderTextWithLabelAndDescription
              label={intl.formatMessage({ id: "label.step_four" })}
              {...(showContentHeader && {
                headerText: intl.formatMessage({
                  id: "label.other_details",
                }),
              })}
            />
          </View>
        )}
        {isWeb ? (
          <View
            style={
              !isWebView
                ? [style.contentContainerStyle, style.extraSmallContainer]
                : style.webContentContainer
            }
          >
            {renderFormContent()}
            {renderFooterContent()}
          </View>
        ) : (
          <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            extraScrollHeight={-50}
            showsVerticalScrollIndicator={false}
            style={style.contentContainerStyle}
          >
            {renderFormContent()}
          </KeyboardAwareScrollView>
        )}
        {!isWeb && renderFooterContent()}
        {!!errorMessage && (
          <ToastComponent
            toastMessage={errorMessage}
            onDismiss={handleDismissToast}
          />
        )}
      </View>
    </FormWrapper>
  );
};

SignUpLastScreenUI.defaultProps = {
  errors: {},
  errorWhileDeletion: "",
  errorWhileUpload: "",
  getSocialMediaRef: () => {},
  handleDismissToast: () => {},
  onDeleteImage: () => {},
  signUpError: "",
  validationError: "",
};

SignUpLastScreenUI.propTypes = {
  allFieldsFilled: PropTypes.func.isRequired,
  companyDetails: PropTypes.string.isRequired,
  companyDetailsRef: PropTypes.any,
  companyType: PropTypes.string.isRequired,
  errors: PropTypes.object,
  errorWhileDeletion: PropTypes.string,
  errorWhileUpload: PropTypes.string,
  getSocialMediaRef: PropTypes.func,
  handleBlur: PropTypes.func.isRequired,
  handleDismissToast: PropTypes.func,
  handleInputChange: PropTypes.func.isRequired,
  handleSuccessModal: PropTypes.func.isRequired,
  handleToggle: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  natureOfSupplier: PropTypes.string.isRequired,
  onClickGoToLogin: PropTypes.func.isRequired,
  onDeleteImage: PropTypes.func,
  onGoBack: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  showSuccessSignUp: PropTypes.bool.isRequired,
  signUpError: PropTypes.string,
  socialMediaLinks: PropTypes.object.isRequired,
  validationError: PropTypes.string,
  website: PropTypes.string.isRequired,
  websiteRef: PropTypes.any,
};

export default SignUpLastScreenUI;
