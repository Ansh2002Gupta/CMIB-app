import React from "react";
import PropTypes from "prop-types";
import { FlatList, ScrollView, View } from "@unthinkable/react-core-components";

import CommonText from "../../../components/CommonText";
import CheckBox from "../../../components/CheckBox/CheckBox";
import CustomModal from "../../../components/CustomModal/CustomModal";
import CustomTextInput from "../../../components/CustomTextInput";
import SaveCancelButton from "../../../components/SaveCancelButton/SaveCancelButton";
import ToastComponent from "../../../components/ToastComponent/ToastComponent";
import UploadImage from "../../../components/UploadImage/UploadImage";
import {
  NATURE_OF_SUPPLIER,
  COMPANY_TYPE_OPTIONS,
} from "../../../constants/constants";
import style from "./SignUpLastScreen.style";

const SignUpLastScreenUI = (props) => {
  const {
    allFieldsFilled,
    companyDetails,
    companyType,
    errors,
    errorWhileDeletion,
    errorWhileUpload,
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
    socialMediaLinks,
    validationError,
    website,
  } = props;

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

  return (
    <View style={style.mainContainerStyle}>
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={style.contentContainerStyle}
      >
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
      </ScrollView>
      <SaveCancelButton
        buttonOneText={intl.formatMessage({ id: "label.back" })}
        onPressButtonOne={onGoBack}
        onPressButtonTwo={() => handleSuccessModal(true)}
        isNextDisabled={!allFieldsFilled()}
        buttonTwoText={intl.formatMessage({ id: "label.sign_up" })}
      />
      {!!(validationError || errorWhileDeletion || errorWhileUpload) && (
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
  handleDismissToast: () => {},
  onDeleteImage: () => {},
  onImageUpload: () => {},
  validationError: "",
};

SignUpLastScreenUI.propTypes = {
  allFieldsFilled: PropTypes.func.isRequired,
  companyDetails: PropTypes.string.isRequired,
  companyType: PropTypes.string.isRequired,
  errors: PropTypes.object,
  errorWhileDeletion: PropTypes.string,
  errorWhileUpload: PropTypes.string,
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
  socialMediaLinks: PropTypes.object.isRequired,
  validationError: PropTypes.string,
  website: PropTypes.string.isRequired,
};

export default SignUpLastScreenUI;
