import React from "react";
import PropTypes from "prop-types";
import images from "../../../images";
import SignUpHeader from "../../../components/SignUpHeader/SignUpHeader";
import {
  ScrollView,
  View,
  Text,
  FlatList,
} from "@unthinkable/react-core-components";
import style from "./SignUpLastScreen.style";
import SaveCancelButton from "../../../components/SaveCancelButton/SaveCancelButton";
import CheckBox from "../../../components/CheckBox/CheckBox";
import UploadImage from "../../../components/UploadImage/UploadImage";
import CustomModal from "../../../components/CustomModal/CustomModal";
import CustomTextInput from "../../../components/CustomTextInput";
import {
  NATURE_OF_SUPPLIER,
  COMPANY_TYPE_OPTIONS,
} from "../../../constants/constants";

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
    facebookUrl,
    linkedInUrl,
    twitterUrl,
    youtubeUrl,
    companyDetails,
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
    <SignUpHeader
      intl={intl}
      headerText={intl.formatMessage({ id: "label.other_details" })}
      onClickGoToLogin={onClickGoToLogin}
      image={images.iconWalkthroughSignUpLast}
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={style.contentContainerStyle}
      >
        <Text style={style.headerText}>
          {intl.formatMessage({ id: "label.social_media_presence" })}
        </Text>
        <CustomTextInput
          label={intl.formatMessage({
            id: "label.facebook",
          })}
          placeholder={intl.formatMessage({
            id: "label.enter_facebook_url",
          })}
          value={facebookUrl}
          onChangeText={(value) => handleInputChange(value, "facebookUrl")}
        />
        <CustomTextInput
          label={intl.formatMessage({
            id: "label.linkedin",
          })}
          placeholder={intl.formatMessage({
            id: "label.enter_linkedin_url",
          })}
          value={linkedInUrl}
          onChangeText={(value) => handleInputChange(value, "linkedInUrl")}
        />
        <CustomTextInput
          label={intl.formatMessage({
            id: "label.twitter",
          })}
          placeholder={intl.formatMessage({
            id: "label.enter_twitter_url",
          })}
          value={twitterUrl}
          onChangeText={(value) => handleInputChange(value, "twitterUrl")}
        />
        <CustomTextInput
          label={intl.formatMessage({
            id: "label.youtube",
          })}
          placeholder={intl.formatMessage({
            id: "label.enter_youtube_url",
          })}
          value={youtubeUrl}
          onChangeText={(value) => handleInputChange(value, "youtubeUrl")}
        />
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
          options={NATURE_OF_SUPPLIER}
        />
        <CustomTextInput
          label={intl.formatMessage({
            id: "label.company_type",
          })}
          placeholder={intl.formatMessage({
            id: "label.select_company_type",
          })}
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
        onPressDibale={onGoBack}
        onPressActive={() => handleSuccessModal(true)}
        activeButtonText={intl.formatMessage({ id: "label.sign_up" })}
      />
    </SignUpHeader>
  );
};

SignUpLastScreenUI.propTypes = {
  intl: PropTypes.object.isRequired,
  onClickGoToLogin: PropTypes.func.isRequired,
  onGoBack: PropTypes.func.isRequired,
  onClickNext: PropTypes.func.isRequired,
  handleToggle: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  handleSuccessModal: PropTypes.func.isRequired,
  showSuccessSignUp: PropTypes.bool.isRequired,
};

export default SignUpLastScreenUI;
