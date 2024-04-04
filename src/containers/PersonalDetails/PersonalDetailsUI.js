import React from "react";
import { useIntl } from "react-intl";
import { ScrollView, View } from "@unthinkable/react-core-components";

import DetailCard from "../../components/DetailCard";
import SaveCancelButton from "../../components/SaveCancelButton";
import style from "./PersonalDetails.style";

const PersonalDetailsUI = ({
  isEditable,
  correspondence_address,
  permanent_address,
  personal_detail,
  onChangeValue,
  handlePersonalDetailBlur,
  handleCorrespondenceAddressBlur,
  handlePermanentAddressBlur,
  isLoading,
  onClickSave,
  onClickCancel,
  isValidAllFields,
}) => {
  const intl = useIntl();

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
