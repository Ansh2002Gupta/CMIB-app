import React from "react";
import { useIntl } from "react-intl";
import { ScrollView, View } from "@unthinkable/react-core-components";

import DetailCard from "../../components/DetailCard";
import useIsWebView from "../../hooks/useIsWebView";
import SaveCancelButton from "../../components/SaveCancelButton";
import UploadPhotoVideo from "./UploadPhotoVideo";
import style from './JobPreference.style';
import Spinner from "../../components/Spinner";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import { STATUS_CODES } from "../../constants/constants";

const JobPreferenceTemplate = ({
  isEditable,
  preferences_details,
  onChangeValue,
  onChangeMultiSelect,
  handlePreferencesDetailBlur,
  isLoading,
  onClickSave,
  onClickCancel,
  isValidAllFields,
  handleMultiSelection,
  isLoadingPage,
  isErrorLoadingPage,
  isPageLoading,
  error,
  errorWhileDeletion,
  errorWhileUpload,
  updatedFileUploadResult,
  uploadImageToServerUtils,
  onDeleteImage,
  handleImageUploadResult
}) => {
  const intl = useIntl();
  const { isWebView } = useIsWebView();

  if (isPageLoading) {
    return (
      <View style={style.loaderStyle}>
        <Spinner />
      </View>
    );
  }

  if (error && error?.code !== STATUS_CODES.UNAUTHORIZED_USER) {
    return <ErrorComponent errorMsg={error.message} />;
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={style.contentContainerStyle}
    >
      <View style={style.innerContainerStyle}>
        <DetailCard
         customCardStyle={style.customCardStyle}
         isColumnVariableWidth
          details={preferences_details}
          headerId={intl.formatMessage({
            id: "label.job_preferences",
          })}
          isEditProfile={isEditable}
          handleChange={onChangeValue(preferences_details)}
          handleBlur={handlePreferencesDetailBlur}
          handleMultiSelect={handleMultiSelection}
        />
      </View>
      <UploadPhotoVideo
      isEditable={isEditable}
      onDeleteImage={onDeleteImage}
      errorWhileUpload={errorWhileUpload}
      hideIconDelete={isEditable}
      uploadImageToServerUtils={uploadImageToServerUtils}
      handleImageUploadResult={handleImageUploadResult}
      >
      </UploadPhotoVideo>
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

export default JobPreferenceTemplate;
