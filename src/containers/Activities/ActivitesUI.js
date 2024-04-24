import React from "react";
import { View, ScrollView } from "@unthinkable/react-core-components";
import { useIntl } from "react-intl";
import style from "../EducationDetails/OtherCourses.style";
import DetailCard from "../../components/DetailCard";
import SaveCancelButton from "../../components/SaveCancelButton/SaveCancelButton";
import ToastComponent from "../../components/ToastComponent/ToastComponent";
import Spinner from "../../components/Spinner";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import { STATUS_CODES } from "../../constants/constants";
import KeyboardAwareScrollView from "../../components/KeyboardAwareScrollView";

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
  error,
  setError,
  isPageLoading,
  fetchDataError,
}) => {
  const intl = useIntl();

  if (isPageLoading) {
    return (
      <View style={style.loaderStyle}>
        <Spinner />
      </View>
    );
  }

  if (
    fetchDataError &&
    fetchDataError?.code !== STATUS_CODES.UNAUTHORIZED_USER
  ) {
    return <ErrorComponent errorMsg={fetchDataError.message} />;
  }

  return (
    <>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={style.contentContainerStyle}
      >
        <View style={style.innerContainerStyle}>
          <DetailCard
            details={achievements}
            headerId={"label.achievements"}
            isEditProfile={isEditable}
            handleChange={onChangeValue(achievements)}
            handleBlur={handleAchievementsBlur}
          />
          <DetailCard
            details={hobbies}
            headerId={"label.hobbies"}
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
      </KeyboardAwareScrollView>
      {!!error && (
        <ToastComponent toastMessage={error} onDismiss={() => setError("")} />
      )}
    </>
  );
};

export default ActivitiesUI;
