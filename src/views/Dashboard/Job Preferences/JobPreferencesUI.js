import { ScrollView, View } from "@unthinkable/react-core-components";
import style from './JobPreferences.style';
import DetailCard from "../../../components/DetailCard";
import { useIntl } from "react-intl";
import useIsWebView from "../../../hooks/useIsWebView";
import SaveCancelButton from "../SaveCancelButton";
import CustomTextInput from "../../../components/CustomTextInput";
import { KIND_OF_INDUSTRY } from "../../../constants/constants";
import DragAndDropCard from "../../../components/DragAndDropCard/DragAndDropCard";
import UploadCVPhotoUI from "./UploadCVPhotoUI";
import CommonText from "../../../components/CommonText";
import UploadPhotoVideoComponent from "./UploadPhotoVideoComponent";
const JobPreferencesUI = ({
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

export default JobPreferencesUI;
