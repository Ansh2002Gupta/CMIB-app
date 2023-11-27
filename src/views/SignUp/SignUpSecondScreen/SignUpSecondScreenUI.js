import React from "react";
import PropTypes from "prop-types";
import images from "../../../images";
import SignUpHeader from "../../../components/SignUpHeader/SignUpHeader";
import Input from "../../../components/Input/Input";
import { ScrollView, View } from "@unthinkable/react-core-components";
import style from "./SignUpSecondScreen.style";
import SaveCancelButton from "../../../components/SaveCancelButton/SaveCancelButton";

const SignUpSecondScreenUI = (props) => {
  const { intl, onClickGoToLogin, onGoBack, onClickNext } = props;

  return (
    <SignUpHeader
      intl={intl}
      headerText={intl.formatMessage({ id: "label.basic_details" })}
      onClickGoToLogin={onClickGoToLogin}
      image={images.iconWalkthroughSignUpTwo}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={style.contentContainerStyle}
      >
        <Input
          label={intl.formatMessage({ id: "label.company_name" })}
          isMandatory
          placeholder={intl.formatMessage({
            id: "label.company_name_placeholder",
          })}
        />
        <Input
          label={intl.formatMessage({ id: "label.entity" })}
          isMandatory
          isDropdown
          placeholder={intl.formatMessage({
            id: "label.select_entity_placeholder",
          })}
        />
        <View style={style.inputContainer}>
          <View style={style.registrationInput}>
            <Input
              label={intl.formatMessage({
                id: "label.firm_registration_no",
              })}
              placeholder={intl.formatMessage({
                id: "label.enter_firm_no",
              })}
              isMandatory
            />
          </View>
          <View style={style.partnerInput}>
            <Input
              label={intl.formatMessage({
                id: "label.no_of_partners",
              })}
              placeholder={intl.formatMessage({
                id: "label.enter_no",
              })}
              isMandatory
            />
          </View>
        </View>
        <Input
          label={intl.formatMessage({ id: "label.current_industry" })}
          isMandatory
          isDropdown
          placeholder={intl.formatMessage({
            id: "label.select_current_indusrty_placeholder",
          })}
        />
        <Input
          label={intl.formatMessage({
            id: "label.address_for_correspondence",
          })}
          isMandatory
          isMultiline
          height={84}
          placeholder={intl.formatMessage({
            id: "label.address_for_correspondance_placeholder",
          })}
        />
        <Input
          label={intl.formatMessage({ id: "label.state" })}
          isMandatory
          isDropdown
          placeholder={intl.formatMessage({
            id: "label.select_state",
          })}
        />
        <Input
          label={intl.formatMessage({ id: "label.email_id" })}
          isMandatory
          placeholder={intl.formatMessage({
            id: "label.email_id_placeholder",
          })}
        />
        <View style={style.inputContainer}>
          <View>
            <Input
              label={intl.formatMessage({
                id: "label.isd_std_code",
              })}
              placeholder={intl.formatMessage({
                id: "label.enter_code",
              })}
              isMandatory
            />
          </View>
          <View style={style.noInput}>
            <Input
              label={intl.formatMessage({
                id: "label.telephone_no",
              })}
              placeholder={intl.formatMessage({
                id: "label.enter_telephone_no",
              })}
              isMandatory
            />
          </View>
        </View>
      </ScrollView>
      <SaveCancelButton
        disableButtonText={intl.formatMessage({ id: "label.back" })}
        onPressDibale={onGoBack}
        onPressActive={onClickNext}
        hasIconRight
        activeButtonText={intl.formatMessage({ id: "label.next" })}
      />
    </SignUpHeader>
  );
};

SignUpSecondScreenUI.propTypes = {
  intl: PropTypes.object.isRequired,
  onClickGoToLogin: PropTypes.func.isRequired,
  onGoBack: PropTypes.func.isRequired,
  onClickNext: PropTypes.func.isRequired,
};

export default SignUpSecondScreenUI;
