import { ScrollView, View } from "@unthinkable/react-core-components";
import style from './WorkExperience.style';
import DetailCard from "../../../components/DetailCard";
import { useIntl } from "react-intl";
import SaveCancelButton from "../SaveCancelButton";
const WorkExperienceUI = ({
  isEditable = true,
  workExperience_detail,
  handleWorkExperienceDetailBlur,
  onChangeValue,
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
      <View style={[style.innerContainerStyle]}>
        <DetailCard
          details={workExperience_detail}
          headerId={intl.formatMessage({
            id: "label.workExperience",
          })}
          isEditProfile={isEditable}
          handleChange={onChangeValue(workExperience_detail)}
          handleBlur={handleWorkExperienceDetailBlur}
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

export default WorkExperienceUI;
