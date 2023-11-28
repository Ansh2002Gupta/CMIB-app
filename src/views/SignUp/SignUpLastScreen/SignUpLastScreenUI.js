import React from "react";
import PropTypes from "prop-types";
import images from "../../../images";
import SignUpHeader from "../../../components/SignUpHeader/SignUpHeader";
import Input from "../../../components/Input/Input";
import { Modal, Image } from "react-native";
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

const SignUpLastScreenUI = (props) => {
  const {
    intl,
    onClickGoToLogin,
    onGoBack,
    options,
    handleToggle,
    handleSuccessModal,
    showSuccessSignUp,
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
        <Input
          label={intl.formatMessage({
            id: "label.facebook",
          })}
          placeholder={intl.formatMessage({
            id: "label.enter_facebook_url",
          })}
        />
        <Input
          label={intl.formatMessage({
            id: "label.linkedin",
          })}
          placeholder={intl.formatMessage({
            id: "label.enter_linkedin_url",
          })}
        />
        <Input
          label={intl.formatMessage({
            id: "label.twitter",
          })}
          placeholder={intl.formatMessage({
            id: "label.enter_twitter_url",
          })}
        />
        <Input
          label={intl.formatMessage({
            id: "label.youtube",
          })}
          placeholder={intl.formatMessage({
            id: "label.enter_youtube_url",
          })}
        />
        <View style={style.seperator} />
        <Text style={style.headerText}>
          {intl.formatMessage({ id: "label.company_details" })}
        </Text>
        <Input
          label={intl.formatMessage({
            id: "label.short_profile_of_the_company",
          })}
          placeholder={intl.formatMessage({
            id: "label.enter_profile_of_company",
          })}
          isMandatory
          isMultiline
          height={84}
        />
        <Input
          label={intl.formatMessage({
            id: "label.website",
          })}
          placeholder={intl.formatMessage({
            id: "label.enter_your_website",
          })}
          isMandatory
        />
        <Input
          label={intl.formatMessage({
            id: "label.nature_of_supplier",
          })}
          placeholder={intl.formatMessage({
            id: "label.select_nature_of_supplier",
          })}
          isMandatory
          isDropdown
        />
        <Input
          label={intl.formatMessage({
            id: "label.company_type",
          })}
          placeholder={intl.formatMessage({
            id: "label.select_company_type",
          })}
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
