import React from "react";
import { useTheme } from "@unthinkable/react-theme";
import { useIntl } from "react-intl";
import { ScrollView, View } from "@unthinkable/react-core-components";

import DetailCard from "../../components/DetailCard";
import SaveCancelButton from "../../components/SaveCancelButton";
import CustomButton from "../../components/CustomButton";
import images from "../../images";
import style from "./WorkExperience.style";
import { yesNoToBoolean } from "../../utils/util";
import Spinner from "../../components/Spinner";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import { STATUS_CODES } from "../../constants/constants";
import getStyles from "./WorkExperience.style";

const WorkExperienceTemplate = ({
  isEditable = true,
  workExperiences,
  setWorkExperiences,
  current_status,
  handleWorkExperienceDetailBlur,
  handleCurrentStatusDetailBlur,
  onChangeValue_workExperiences,
  onChangeValue_currentStatus,
  isLoading,
  onClickSave,
  onClickCancel,
  isValidAllFields,
  onClickAdd,
  initailWorkExperience,
  handleAreasOfInterestSelection,
  handleCurrentSpecialisationSelection,
  handleCurrentIndustrySpecialisationSelection,
  addMoreWorkExperience,
  handleCancelPress,
  isPageLoading,
  error,
}) => {
  const intl = useIntl();
  const theme = useTheme();
  const style = getStyles(theme);

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
      <View style={[style.innerContainerStyle]}>
        {workExperiences.map((experience, index) => {
          return (
            <DetailCard
              key={index}
              details={experience}
              customCardStyle={style.customCardStyle}
              headerId={intl.formatMessage({
                id: "label.workExperience",
              })}
              isEditProfile={isEditable}
              handleChange={onChangeValue_workExperiences(
                workExperiences,
                index
              )}
              handleBlur={handleWorkExperienceDetailBlur(index)}
              isShowCancel={
                workExperiences.length > 1 && index > 0 ? true : false
              }
              datePickerContainer={style.datePickerContainer}
              handleCancel={() => handleCancelPress(index)}
              handleMultiSelect={handleAreasOfInterestSelection(index)}
            />
          );
        })}
        {isEditable &&
          yesNoToBoolean(workExperiences?.[0]?.[0]?.value ?? false) && (
            <CustomButton
              onPress={addMoreWorkExperience}
              style={{ ...style.addButtonStyle }}
              iconLeft={{
                leftIconSource: images.iconAdd,
                isLeftIconNotSvg: true,
              }}
              customStyle={{ customTextStyle: style.customTextStyle }}
            >
              {intl.formatMessage({ id: "label.add_more_experience" })}
            </CustomButton>
          )}
      </View>
      <DetailCard
        details={current_status}
        isColumnVariableWidth={true}
        headerId={intl.formatMessage({
          id: "label.current_status",
        })}
        isEditProfile={isEditable}
        handleChange={onChangeValue_currentStatus(current_status)}
        handleBlur={handleCurrentStatusDetailBlur}
        handleMultiSelect={handleCurrentSpecialisationSelection}
      />
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

export default WorkExperienceTemplate;
