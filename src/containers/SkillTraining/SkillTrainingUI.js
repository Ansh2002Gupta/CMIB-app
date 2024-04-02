import React from "react";
import { View, ScrollView } from "@unthinkable/react-core-components";
import { useIntl } from "react-intl";
import style from "./SkillTraining.style";
import DetailCard from "../../components/DetailCard";
import SaveCancelButton from "../../components/SaveCancelButton/SaveCancelButton";
import ToastComponent from "../../components/ToastComponent/ToastComponent";
import KeyboardAwareScrollView from "../../components/KeyboardAwareScrollView";
import Spinner from "../../components/Spinner";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import { STATUS_CODES } from "../../constants/constants";

const SkillTrainingUI = ({
  isEditable,
  languagesKnown,
  handleValueUpdate,
  ITSkills,
  softSkills,
  otherSkills,
  handleLanguagesKnownBlur,
  onClickSave,
  onClickCancel,
  isLoading,
  isValidAllFields,
  handleAddRemoveRow,
  handleCheckBoxSelection,
  handleOtherSkillsUpdate,
  error,
  setError,
  isLoadingPage,
  isErrorLoadingPage
}) => {
  const intl = useIntl();

  if (
    isLoadingPage) {
    return (
      <View style={style.loaderStyle}>
        <Spinner />
      </View>
    );
  }

  if (isErrorLoadingPage && isErrorLoadingPage?.code !== STATUS_CODES.UNAUTHORIZED_USER) {
    return <ErrorComponent errorMsg={isErrorLoadingPage.message} />;
  }

  return (
    <>
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={style.contentContainerStyle}
    >
      <KeyboardAwareScrollView
                  keyboardShouldPersistTaps="handled"
                  extraScrollHeight={-50}
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
          handleChange={(label, chips) => handleOtherSkillsUpdate(chips)}
        />
      </View>
      <SaveCancelButton
        isEditable={isEditable}
        isLoading={isLoading}
        onClickSave={onClickSave}
        onClickCancel={onClickCancel}
        isValidAllFields={isValidAllFields}
      />
       </KeyboardAwareScrollView>
    </ScrollView>
    {!!error && (
      <ToastComponent toastMessage={error} onDismiss={() => setError("")} />
    )}
    </>
  );
};

export default SkillTrainingUI;
