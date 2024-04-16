import React from "react";
import { View, ScrollView } from "@unthinkable/react-core-components";
import style from "./EducationDetails.style";
import SaveCancelButton from "../../components/SaveCancelButton";
import DetailCard from "../../components/DetailCard";
import { useIntl } from "react-intl";
const EducationDetailsUI = ({
  education_detail,
  higher_secondary_detail,
  graduation_detail,
  post_graduation_detail,
  onChangeValue,
  handleEducationDetailBlur,
  handleHigherSecondaryDetailBlur,
  handleGraduationDetailBlur,
  handlePostGraduationDetailBlur,
  isValidAllFields,
  isLoading,
  isEditable,
  onClickSave,
  onClickCancel,
}) => {
  const intl = useIntl();

  return (
    <View
      showsVerticalScrollIndicator={false}
      style={style.contentContainerStyle}
    >
      <View style={style.innerContainerStyle}>
        <DetailCard
          details={education_detail}
          customCardStyle={style.customCardStyle}
          headerId={intl.formatMessage({
            id: "label.education_details",
          })}
          isEditProfile={isEditable}
          handleChange={onChangeValue(education_detail)}
          handleBlur={handleEducationDetailBlur}
        />
        <View style={style.separatorStyle} />
        <DetailCard
          details={higher_secondary_detail}
          customCardStyle={style.customCardStyle}
          isEditProfile={isEditable}
          handleChange={onChangeValue(higher_secondary_detail)}
          handleBlur={handleHigherSecondaryDetailBlur}
        />
        <View style={style.separatorStyle} />

        <DetailCard
          details={graduation_detail}
          customCardStyle={style.customCardStyle}
          isEditProfile={isEditable}
          handleChange={onChangeValue(graduation_detail)}
          handleBlur={handleGraduationDetailBlur}
        />
        <View style={style.separatorStyle} />

        <DetailCard
          details={post_graduation_detail}
          customCardStyle={style.customCardStyle}
          isEditProfile={isEditable}
          handleChange={onChangeValue(post_graduation_detail)}
          handleBlur={handlePostGraduationDetailBlur}
        />
      </View>
      <SaveCancelButton
        isEditable={isEditable}
        isLoading={isLoading}
        onClickSave={onClickSave}
        onClickCancel={onClickCancel}
        isValidAllFields={isValidAllFields}
      />
    </View>
  );
};

export default EducationDetailsUI;
