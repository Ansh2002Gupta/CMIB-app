import React from "react";
import { useTheme } from "@unthinkable/react-theme";
import { useIntl } from "react-intl";
import { ScrollView, View } from "@unthinkable/react-core-components";

import DetailCard from "../../components/DetailCard";
import SaveCancelButton from "../../components/SaveCancelButton";
import getStyles from "./PersonalDetails.style";

const PersonalDetailsUI = ({
  isEditable,
  accessibility_information,
  correspondence_address,
  permanent_address,
  personal_detail,
  onChangeValue,
  handleAccessibilityInformationBlur,
  handlePersonalDetailBlur,
  handleCorrespondenceAddressBlur,
  handlePermanentAddressBlur,
  isLoading,
  onClickSave,
  onClickCancel,
  isValidAllFields,
}) => {
  const intl = useIntl();
  const theme = useTheme();
  const style = getStyles(theme);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={style.contentContainerStyle}
    >
      <View style={style.innerContainerStyle}>
        <DetailCard
          details={personal_detail}
          headerId={intl.formatMessage({
            id: "label.personal_details",
          })}
          datePickerContainer={style.datePickerContainer}
          isEditProfile={isEditable}
          handleChange={onChangeValue(personal_detail)}
          handleBlur={handlePersonalDetailBlur}
        />
        <DetailCard
          details={correspondence_address}
          headerId={intl.formatMessage({
            id: "label.correspondence_address",
          })}
          isEditProfile={isEditable}
          handleChange={onChangeValue(correspondence_address)}
          handleBlur={handleCorrespondenceAddressBlur}
        />
        <DetailCard
          isEditProfile={isEditable}
          headerId={intl.formatMessage({
            id: "label.permanent_address",
          })}
          details={permanent_address}
          handleChange={onChangeValue(permanent_address)}
          handleBlur={handlePermanentAddressBlur}
        />
        <DetailCard
          isEditProfile={isEditable}
          headerId={intl.formatMessage({
            id: "label.accessibility_information",
          })}
          details={accessibility_information}
          handleChange={onChangeValue(accessibility_information)}
          handleBlur={handleAccessibilityInformationBlur}
        />
      </View>
      <SaveCancelButton
        isEditable={isEditable}
        isLoading={isLoading}
        onClickSave={onClickSave}
        onClickCancel={onClickCancel}
        isValidAllFields={isValidAllFields}
      />
    </ScrollView>
  );
};

export default PersonalDetailsUI;
