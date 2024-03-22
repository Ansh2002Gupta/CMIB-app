import React from "react";
import { View, ScrollView } from "@unthinkable/react-core-components";
import { useIntl } from "react-intl";
import style from "../EducationDetails/OtherCourses.style";
import DetailCard from "../../components/DetailCard";
import SaveCancelButton from "../../components/SaveCancelButton/SaveCancelButton";

const ActivitiesUI = ({
  isEditable,
  achievements,
  hobbies,
  handleAchievementsBlur,
  handleHobbiesBlur,
  onChangeValue,
  onClickSave,
  onClickCancel,
  isLoading,
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
          details={achievements}
          headerId={intl.formatMessage({
            id: "label.achievements",
          })}
          isEditProfile={isEditable}
          handleChange={onChangeValue(achievements)}
          handleBlur={handleAchievementsBlur}
        />
        <DetailCard
          details={hobbies}
          headerId={intl.formatMessage({
            id: "label.hobbies",
          })}
          isEditProfile={isEditable}
          handleChange={onChangeValue(hobbies)}
          handleBlur={handleHobbiesBlur}
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

export default ActivitiesUI;
