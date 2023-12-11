import React from "react";
import PropTypes from "prop-types";
import {
  ScrollView,
  View,
  Text,
  FlatList,
} from "@unthinkable/react-core-components";

import CheckBox from "../../../components/CheckBox/CheckBox";
import CustomModal from "../../../components/CustomModal/CustomModal";
import CustomTextInput from "../../../components/CustomTextInput";
import SaveCancelButton from "../../../components/SaveCancelButton/SaveCancelButton";
import UploadImage from "../../../components/UploadImage/UploadImage";
import {
  NATURE_OF_SUPPLIER,
  COMPANY_TYPE_OPTIONS,
} from "../../../constants/constants";
import style from "./SignUpLastScreen.style";

const SignUpLastScreenUI = (props) => {
  const {
    intl,
    onClickGoToLogin,
    onGoBack,
    options,
    handleToggle,
    handleSuccessModal,
    showSuccessSignUp,
    handleInputChange,
    socialMediaLinks,
    companyDetails,
    allFieldsFilled,
    website,
    errors,
  } = props;
  console.log("key", socialMediaLinks);

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
        <Text style={style.headerText}>
          {intl.formatMessage({ id: "label.social_media_presence" })}
        </Text>
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
        <Text style={style.headerText}>
          {intl.formatMessage({ id: "label.company_details" })}
        </Text>
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
          onChangeValue={(value) => handleInputChange(value, "companyType")}
          options={COMPANY_TYPE_OPTIONS}
          isMandatory
          isDropdown
        />
        <View style={style.seperator} />
        <Text style={style.headerText}>
          {intl.formatMessage({ id: "label.source_of_info" })}
        </Text>
        <FlatList
          data={options}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        <View style={style.seperator} />
        <Text style={style.headerText}>
          {intl.formatMessage({ id: "label.uplaod_company_logo" })}
        </Text>
        <Text style={style.infoStyle}>
          {intl.formatMessage({
            id: "label.logo_info",
          })}
        </Text>
        <UploadImage intl={intl} />
      </ScrollView>
      <SaveCancelButton
        disableButtonText={intl.formatMessage({ id: "label.back" })}
        onPressDisable={onGoBack}
        onPressActive={() => handleSuccessModal(true)}
        isNextDisabled={!allFieldsFilled()}
        activeButtonText={intl.formatMessage({ id: "label.sign_up" })}
      />
    </View>
  );
};

SignUpLastScreenUI.propTypes = {
  intl: PropTypes.object.isRequired,
  onClickGoToLogin: PropTypes.func.isRequired,
  onGoBack: PropTypes.func.isRequired,
  handleToggle: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  handleSuccessModal: PropTypes.func.isRequired,
  showSuccessSignUp: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  socialMediaLinks: PropTypes.object.isRequired,
  website: PropTypes.string.isRequired,
  companyDetails: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  allFieldsFilled: PropTypes.func.isRequired,
};

export default SignUpLastScreenUI;
