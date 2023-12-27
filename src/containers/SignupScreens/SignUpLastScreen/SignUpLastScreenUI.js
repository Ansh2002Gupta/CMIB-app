import React, { useContext } from "react";
import PropTypes from "prop-types";
import { MediaQueryContext } from "@unthinkable/react-theme";
import {
  FlatList,
  Platform,
  ScrollView,
  View,
} from "@unthinkable/react-core-components";

import CheckBox from "../../../components/CheckBox/CheckBox";
import CommonText from "../../../components/CommonText";
import CustomModal from "../../../components/CustomModal/CustomModal";
import CustomTextInput from "../../../components/CustomTextInput";
import HeaderTextWithLabelAndDescription from "../../../components/HeaderTextWithLabelAndDescription";
import LabelWithLinkText from "../../../components/LabelWithLinkText";
import SaveCancelButton from "../../../components/SaveCancelButton/SaveCancelButton";
import ToastComponent from "../../../components/ToastComponent/ToastComponent";
import UploadImage from "../../../components/UploadImage";
import useIsWebView from "../../../hooks/useIsWebView";
import {
  NATURE_OF_SUPPLIER,
  COMPANY_TYPE_OPTIONS,
} from "../../../constants/constants";
import { getResponsiveStyles, style } from "./SignUpLastScreen.style";

const SignUpLastScreenUI = ({
  allFieldsFilled,
  companyDetails,
  companyType,
  errors,
  errorWhileDeletion,
  errorWhileUpload,
  handleBlur,
  handleDismissToast,
  handleInputChange,
  handleSuccessModal,
  handleToggle,
  intl,
  natureOfSupplier,
  onClickGoToLogin,
  onDeleteImage,
  onGoBack,
  onImageUpload,
  options,
  showSuccessSignUp,
  signUpError,
  socialMediaLinks,
  validationError,
  website,
}) => {
  const isWeb = Platform.OS === "web";
  const { isWebView } = useIsWebView();
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const showContentHeader =
    currentBreakpoint !== "xs" && currentBreakpoint !== "sm";

  const errorMessage =
    validationError || errorWhileDeletion || errorWhileUpload || signUpError;

  const renderItem = ({ item, index }) => {
    return (
      <CheckBox
        id={item.id}
        index={index}
        title={item.title}
        isSelected={item.isSelected}
        handleCheckbox={handleToggle}
      />
    );
  };

  const renderFormContent = () => {
    return (
      <View style={style.formContainer}>
        <CommonText
          customTextStyle={style.headerText}
          title={intl.formatMessage({ id: "label.social_media_presence" })}
        />
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
            onChangeText={(value) => handleInputChange(value, key)}
          />
        ))}
        <View style={style.seperator} />
        <CommonText
          customTextStyle={style.headerText}
          title={intl.formatMessage({ id: "label.company_details" })}
        />
        <CustomTextInput
          label={intl.formatMessage({
            id: "label.short_profile_of_the_company",
          })}
          placeholder={intl.formatMessage({
            id: "label.enter_profile_of_company",
          })}
          errorMessage={errors.companyDetails}
          isError={!!errors.companyDetails}
          customHandleBlur={() => handleBlur("companyDetails")}
          value={companyDetails}
          onChangeText={(value) => handleInputChange(value, "companyDetails")}
          isMandatory
          isMultiline
          height={84}
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
        <CommonText
          customTextStyle={style.headerText}
          title={intl.formatMessage({ id: "label.source_of_info" })}
        />
        <FlatList
          contentContainerStyle={style.containerStyle}
          data={options}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        <View style={style.seperator} />
        <CommonText
          customTextStyle={style.headerText}
          title={intl.formatMessage({ id: "label.uplaod_company_logo" })}
        />
        <CommonText
          customTextStyle={style.infoStyle}
          title={intl.formatMessage({
            id: "label.logo_info",
          })}
        />
        <UploadImage
          intl={intl}
          onImageUpload={onImageUpload}
          onDeleteImage={onDeleteImage}
        />
      </View>
    );
  };

  const renderFooterContent = () => {
    return (
      <View style={style.signupFooterContainer}>
        <SaveCancelButton
          buttonOneText={intl.formatMessage({ id: "label.back" })}
          onPressButtonOne={onGoBack}
          onPressButtonTwo={() => handleSuccessModal(true)}
          isNextDisabled={!allFieldsFilled()}
          buttonTwoText={intl.formatMessage({ id: "label.sign_up" })}
          hasIconLeft
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={style.contentContainerStyle}
        >
          {renderFormContent()}
        </ScrollView>
      )}
      {!isWeb && renderFooterContent()}
      {!!errorMessage && (
        <ToastComponent
          toastMessage={validationError || errorWhileDeletion}
          onDismiss={handleDismissToast}
        />
      )}
    </View>
  );
};

SignUpLastScreenUI.defaultProps = {
  errors: {},
  errorWhileDeletion: "",
  errorWhileUpload: "",
  handleDismissToast: () => {},
  onImageUpload: () => {},
  signUpError: "",
  validationError: "",
};

SignUpLastScreenUI.propTypes = {
  allFieldsFilled: PropTypes.func.isRequired,
  companyDetails: PropTypes.string.isRequired,
  companyType: PropTypes.string.isRequired,
  errors: PropTypes.object,
  errorWhileDeletion: PropTypes.string,
  errorWhileUpload: PropTypes.string,
  handleBlur: PropTypes.func.isRequired,
  handleDismissToast: PropTypes.func,
  handleInputChange: PropTypes.func.isRequired,
  handleSuccessModal: PropTypes.func.isRequired,
  handleToggle: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  natureOfSupplier: PropTypes.string.isRequired,
  onClickGoToLogin: PropTypes.func.isRequired,
  onDeleteImage: PropTypes.func.isRequired,
  onGoBack: PropTypes.func.isRequired,
  onImageUpload: PropTypes.func,
  options: PropTypes.array.isRequired,
  showSuccessSignUp: PropTypes.bool.isRequired,
  signUpError: PropTypes.string,
  socialMediaLinks: PropTypes.object.isRequired,
  validationError: PropTypes.string,
  website: PropTypes.string.isRequired,
};

export default SignUpLastScreenUI;
