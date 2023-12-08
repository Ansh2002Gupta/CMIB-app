import React from "react";
import PropTypes from "prop-types";
import { ScrollView, View } from "@unthinkable/react-core-components";

import CustomTextInput from "../../../components/CustomTextInput";
import SaveCancelButton from "../../../components/SaveCancelButton/SaveCancelButton";
import {
  ENTITY_OPTIONS,
  CURRENT_INDUSTRY_OPTIONS,
} from "../../../constants/constants";
import style from "./SignUpSecondScreen.style";

const SignUpSecondScreenUI = (props) => {
  const {
    intl,
    onGoBack,
    onClickNext,
    companyName,
    registrationNo,
    noOfPartners,
    address,
    emailId,
    telephoneNo,
    code,
    handleInputChange,
    errors,
    allFieldsFilled,
    entity,
    currentIndustry,
  } = props;

  return (
    <View style={style.innerContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={style.contentContainerStyle}
      >
        <CustomTextInput
          label={intl.formatMessage({ id: "label.company_name" })}
          isMandatory
          placeholder={intl.formatMessage({
            id: "label.company_name_placeholder",
          })}
          value={companyName}
          errorMessage={errors.companyName}
          isError={!!errors.companyName}
          onChangeText={(val) => handleInputChange(val, "companyName")}
        />
        <CustomTextInput
          label={intl.formatMessage({ id: "label.entity" })}
          isMandatory
          isDropdown
          placeholder={intl.formatMessage({
            id: "label.select_entity_placeholder",
          })}
          value={entity}
          errorMessage={errors.entity}
          isError={!!errors.entity}
          onChangeValue={(val) => handleInputChange(val, "entity")}
          options={ENTITY_OPTIONS}
        />
        <View style={style.inputContainer}>
          <View style={style.registrationInput}>
            <CustomTextInput
              label={intl.formatMessage({
                id: "label.firm_registration_no",
              })}
              placeholder={intl.formatMessage({
                id: "label.enter_firm_no",
              })}
              isMandatory
              errorMessage={errors.registrationNo}
              isError={!!errors.registrationNo}
              value={registrationNo}
              onChangeText={(val) => handleInputChange(val, "registrationNo")}
            />
          </View>
          <View style={style.partnerInput}>
            <CustomTextInput
              label={intl.formatMessage({
                id: "label.no_of_partners",
              })}
              placeholder={intl.formatMessage({
                id: "label.enter_no",
              })}
              isMandatory
              keyboardType="numeric"
              value={noOfPartners}
              errorMessage={errors.noOfPartners}
              isError={!!errors.noOfPartners}
              onChangeText={(val) => handleInputChange(val, "noOfPartners")}
            />
          </View>
        </View>
        <CustomTextInput
          label={intl.formatMessage({ id: "label.current_industry" })}
          isMandatory
          isDropdown
          placeholder={intl.formatMessage({
            id: "label.select_current_indusrty_placeholder",
          })}
          value={currentIndustry}
          options={CURRENT_INDUSTRY_OPTIONS}
          onChangeValue={(val) => handleInputChange(val, "currentIndustry")}
        />
        <CustomTextInput
          label={intl.formatMessage({
            id: "label.address_for_correspondence",
          })}
          isMandatory
          isMultiline
          height={84}
          value={address}
          errorMessage={errors.address}
          isError={!!errors.address}
          onChangeText={(val) => handleInputChange(val, "address")}
          placeholder={intl.formatMessage({
            id: "label.address_for_correspondance_placeholder",
          })}
        />
        <CustomTextInput
          label={intl.formatMessage({ id: "label.state" })}
          isMandatory
          isDropdown
          placeholder={intl.formatMessage({
            id: "label.select_state",
          })}
          options={[]}
        />
        <CustomTextInput
          label={intl.formatMessage({ id: "label.email_id" })}
          isMandatory
          placeholder={intl.formatMessage({
            id: "label.email_id_placeholder",
          })}
          value={emailId}
          errorMessage={errors.emailId}
          isError={!!errors.emailId}
          onChangeText={(val) => handleInputChange(val, "email")}
        />
        <View style={style.inputContainer}>
          <View style={style.codeInput}>
            <CustomTextInput
              label={intl.formatMessage({
                id: "label.isd_std_code",
              })}
              placeholder={intl.formatMessage({
                id: "label.enter_code",
              })}
              value={code}
              errorMessage={errors.code}
              isError={!!errors.code}
              onChangeText={(val) => handleInputChange(val, "code")}
              isMandatory
            />
          </View>
          <View style={style.noInput}>
            <CustomTextInput
              label={intl.formatMessage({
                id: "label.telephone_no",
              })}
              placeholder={intl.formatMessage({
                id: "label.enter_telephone_no",
              })}
              errorMessage={errors.telephoneNo}
              isError={!!errors.telephoneNo}
              isMandatory
              value={telephoneNo}
              onChangeText={(val) => handleInputChange(val, "telephoneNo")}
            />
          </View>
        </View>
      </ScrollView>
      <SaveCancelButton
        disableButtonText={intl.formatMessage({ id: "label.back" })}
        onPressDisable={onGoBack}
        onPressActive={onClickNext}
        hasIconRight
        isNextDisabled={!allFieldsFilled()}
        activeButtonText={intl.formatMessage({ id: "label.next" })}
      />
    </View>
  );
};

SignUpSecondScreenUI.propTypes = {
  intl: PropTypes.object.isRequired,
  onGoBack: PropTypes.func.isRequired,
  onClickNext: PropTypes.func.isRequired,
  companyName: PropTypes.string.isRequired,
  registrationNo: PropTypes.string.isRequired,
  noOfPartners: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  emailId: PropTypes.string.isRequired,
  telephoneNo: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  entity: PropTypes.string.isRequired,
  currentIndustry: PropTypes.string.isRequired,
  allFieldsFilled: PropTypes.func.isRequired,
};

export default SignUpSecondScreenUI;
