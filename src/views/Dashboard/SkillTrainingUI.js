import React from "react";
import { View, ScrollView } from "@unthinkable/react-core-components";
import { useIntl } from "react-intl";
import style from "./OtherCourses.style";
import DetailCard from "../../components/DetailCard";
import SaveCancelButton from "./SaveCancelButton";

const SkillTrainingUI = ({
  isEditable,
  languagesKnown,
  handleValueUpdate,
  ITSkills,
  softSkills,
  otherSkills,
  handleLanguagesKnownBlur,
  handleITSkillsBlur,
  handleSoftSkillsBlur,
  handleOtherSkillsBlur,
  onChangeValue,
  onClickSave,
  onClickCancel,
  isLoading,
  isValidAllFields,
  handleAddRemoveRow,
  handleCheckBoxSelection,
}) => {
  const intl = useIntl();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={style.contentContainerStyle}
    >
      <View style={style.innerContainerStyle}>
        <DetailCard
          details={languagesKnown}
          headerId={intl.formatMessage({
            id: "label.languages_known",
          })}
          isEditProfile={isEditable}
          handleChange={(label, value, index, type) => {
            handleValueUpdate(label,value,index, type);
          }}
          handleBlur={handleLanguagesKnownBlur}
          isColumnVariableWidth
          handleAddRemoveRow={handleAddRemoveRow}
          handleCheckBoxSelection={handleCheckBoxSelection}
        />
        <DetailCard
          details={ITSkills}
          headerId={intl.formatMessage({
            id: "label.it_skills",
          })}
          isEditProfile={isEditable}
          handleChange={(label, value, index, type) => {
            handleValueUpdate(label,value,index, type);
          }}
          handleBlur={handleLanguagesKnownBlur}
          isColumnVariableWidth
          handleAddRemoveRow={handleAddRemoveRow}
          handleCheckBoxSelection={handleCheckBoxSelection}
        />
        <DetailCard
          details={softSkills}
          headerId={intl.formatMessage({
            id: "label.soft_skills",
          })}
          isEditProfile={isEditable}
          handleChange={(label, value, index, type) => {
            handleValueUpdate(label,value,index, type);
          }}
          handleBlur={handleLanguagesKnownBlur}
          isColumnVariableWidth
          handleAddRemoveRow={handleAddRemoveRow}
          handleCheckBoxSelection={handleCheckBoxSelection}
        />
        <DetailCard
          details={otherSkills}
          isColumnVariableWidth
          headerId={intl.formatMessage({
            id: "label.other_skills",
          })}
          isEditProfile={isEditable}
          handleChange={onChangeValue(otherSkills)}
          handleBlur={handleOtherSkillsBlur}
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

export default SkillTrainingUI;
