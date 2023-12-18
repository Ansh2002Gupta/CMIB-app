import React, { useContext } from "react";
import PropTypes from "prop-types";
import { MediaQueryContext } from "@unthinkable/react-theme";
import {
  FlatList,
  Platform,
  ScrollView,
  View,
} from "@unthinkable/react-core-components";

import CommonText from "../../../components/CommonText";
import CheckBox from "../../../components/CheckBox/CheckBox";
import CustomModal from "../../../components/CustomModal/CustomModal";
import CustomTextInput from "../../../components/CustomTextInput";
import HeaderTextWithLabelAndDescription from "../../../components/HeaderTextWithLabelAndDescription/HeaderTextWithLabelAndDescription";
import LabelWithLinkText from "../../../components/LabelWithLinkText/LabelWithLinkText";
import SaveCancelButton from "../../../components/SaveCancelButton/SaveCancelButton";
import UploadImage from "../../../components/UploadImage/UploadImage";
import useIsWebView from "../../../hooks/useIsWebView";
import {
  NATURE_OF_SUPPLIER,
  COMPANY_TYPE_OPTIONS,
} from "../../../constants/constants";
import style from "./SignUpLastScreen.style";

const SignUpLastScreenUI = ({
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
}) => {
  const isWeb = Platform.OS === "web";
  const { isWebView } = useIsWebView();
  const { current: currentBreakpoint } = useContext(MediaQueryContext);

  const getResponsiveStyles = (str) => {
    switch (str) {
      case "signupContainer": {
        if (
          currentBreakpoint === "sm" ||
          currentBreakpoint === "xs" ||
          currentBreakpoint === "md"
        ) {
          return {
            ...style.signupContainer,
            ...style.smSignupContainer,
          };
        }
        return {
          ...style.signupContainer,
        };
      }
      default:
        return;
    }
  };

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
        <CommonText
          customTextStyle={style.headerText}
          title={intl.formatMessage({ id: "label.source_of_info" })}
        />
        <FlatList
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
        <UploadImage intl={intl} />
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
        />
        {isWebView && (
          <LabelWithLinkText
            label={intl.formatMessage({ id: "label.already_account" })}
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
          ? getResponsiveStyles("signupContainer")
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
            headerText={intl.formatMessage({
              id: "label.other_details",
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
  errors: PropTypes.object,
  socialMediaLinks: PropTypes.object.isRequired,
  website: PropTypes.string.isRequired,
  companyDetails: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  allFieldsFilled: PropTypes.func.isRequired,
};

export default SignUpLastScreenUI;
