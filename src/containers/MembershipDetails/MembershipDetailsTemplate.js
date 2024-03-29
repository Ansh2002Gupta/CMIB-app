import React from "react";
import { useIntl } from "react-intl";
import { ScrollView, View } from "@unthinkable/react-core-components";

import DetailCard from "../../components/DetailCard";
import useIsWebView from "../../hooks/useIsWebView";
import SaveCancelButton from "../../components/SaveCancelButton";
import style from './MembershipDetails.style';

const MembershipDetailsTemplate = ({
  isEditable = true,
  membership_detail,
  fellow_member_detail,
  practice_detail,
  onChangeValue,
  handleMembershipDetailBlur,
  handleFellowMemberDetailBlur,
  handlePracticeDetailBlur,
  isLoading,
  onClickSave,
  onClickCancel,
  isValidAllFields,
}) => {
  const intl = useIntl();
  const { isWebView } = useIsWebView();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={style.contentContainerStyle}
    >
      <View style={style.innerContainerStyle}>
        <DetailCard
          details={membership_detail}
          headerId={intl.formatMessage({
            id: "label.membershipDetail",
          })}
          isEditProfile={isEditable}
          handleChange={onChangeValue(membership_detail)}
          handleBlur={handleMembershipDetailBlur}
        />
        <DetailCard
          details={fellow_member_detail}
          isEditProfile={isEditable}
          handleChange={onChangeValue(fellow_member_detail)}
          handleBlur={handleFellowMemberDetailBlur}
        />
         <DetailCard
          details={practice_detail}
          isEditProfile={isEditable}
          handleChange={onChangeValue(practice_detail)}
          handleBlur={handlePracticeDetailBlur}
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

export default MembershipDetailsTemplate;
