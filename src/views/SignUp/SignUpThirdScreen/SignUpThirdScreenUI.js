import React from "react";
import PropTypes from "prop-types";
import images from "../../../images";
import SignUpHeader from "../../../components/SignUpHeader/SignUpHeader";
import Input from "../../../components/Input/Input";
import { ScrollView, View, Text } from "@unthinkable/react-core-components";
import style from "./SignUpThirdScreen.style";
import SaveCancelButton from "../../../components/SaveCancelButton/SaveCancelButton";

const SignUpThirdScreenUI = (props) => {
  const { intl, onClickGoToLogin, onGoBack, onClickNext } = props;

  return (
    <SignUpHeader
      intl={intl}
      headerText={intl.formatMessage({
        id: "label.contact_personal_details",
      })}
      onClickGoToLogin={onClickGoToLogin}
      image={images.iconWalkthroughSignUpThree}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={style.contentContainerStyle}
      >
        <Text style={style.headerText}>
          {intl.formatMessage({ id: "label.for_new_ca_placement" })}
        </Text>
        <View style={style.inputContainer}>
          <Input
            label={intl.formatMessage({
              id: "label.salutation",
            })}
            dropdownStyle={style.dropdownStyle}
            placeholder={intl.formatMessage({
              id: "label.select",
            })}
            isMandatory
            isDropdown
          />
          <View style={style.secondInput}>
            <Input
              label={intl.formatMessage({
                id: "label.contact_person_name",
              })}
              placeholder={intl.formatMessage({
                id: "label.enter_contact_person_name",
              })}
              isMandatory
            />
          </View>
        </View>
        <Input
          label={intl.formatMessage({
            id: "label.contact_personal_designation",
          })}
          placeholder={intl.formatMessage({
            id: "label.enter_contact_person_designation",
          })}
          isMandatory
        />
        <Input
          label={intl.formatMessage({
            id: "label.mobile_number",
          })}
          placeholder={intl.formatMessage({
            id: "label.enter_contact_person_mobile_no",
          })}
          isMobileNumber
          isMandatory
        />
        <Input
          label={intl.formatMessage({
            id: "label.email_id",
          })}
          placeholder={intl.formatMessage({
            id: "label.enter_contact_person_email_id",
          })}
          isMandatory
          isDropdown
        />
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

SignUpThirdScreenUI.propTypes = {
  intl: PropTypes.object.isRequired,
  onClickGoToLogin: PropTypes.func.isRequired,
  onGoBack: PropTypes.func.isRequired,
  onClickNext: PropTypes.func.isRequired,
};

export default SignUpThirdScreenUI;
