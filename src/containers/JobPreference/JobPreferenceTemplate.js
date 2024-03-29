import React from "react";
import { useIntl } from "react-intl";
import { ScrollView, View } from "@unthinkable/react-core-components";

import DetailCard from "../../components/DetailCard";
import useIsWebView from "../../hooks/useIsWebView";
import SaveCancelButton from "../../components/SaveCancelButton";
import UploadPhotoVideoComponent from "./UploadPhotoVideo";
import style from './JobPreference.style';

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
  handleAreasOfInterestSelection,
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
         customCardStyle={style.customCardStyle}
         isColumnVariableWidth
          details={preferences_details}
          headerId={intl.formatMessage({
            id: "label.job_preferences",
          })}
          isEditProfile={isEditable}
          handleChange={onChangeValue(preferences_details)}
          handleBlur={handlePreferencesDetailBlur}
          handleMultiSelect={handleAreasOfInterestSelection}
        />
      </View>
      <UploadPhotoVideoComponent
      isEditable={isEditable}
      >
      </UploadPhotoVideoComponent>
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
