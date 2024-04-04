import React from "react";
import { useIntl } from "react-intl";
import { ScrollView, View } from "@unthinkable/react-core-components";

import DetailCard from "../../components/DetailCard";
import SaveCancelButton from "../../components/SaveCancelButton";
import CustomButton from "../../components/CustomButton";
import images from "../../images";
import style from './WorkExperience.style';

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
  handleCurrentIndustrySpecialisationSelection
}) => {
  const intl = useIntl();

  // useEffect(() => {
  //   if (workExperiences.length > 0) {
  //     const changeHandler = onChangeValue_workExperiences(workExperiences);
  //     changeHandler("workExperiences", workExperiences);
  //   }
  // }, [workExperiences]);

  const findKeyByLabel = (label, details) => {
    return details.find((item) => {
      return item.label === label;
    });
  };

  function updateValueByKey(workExp, key, value) {
    return workExp.map((item) => {
      if (item.key === key) {
        return { ...item, value: value };
      }
      return item;
    });
  }

  const onChangeWorkExp = (label, value, codeValue,index) => {
     const { key } = findKeyByLabel(label, initailWorkExperience);
     let currentState = [...workExperiences];
     let currentIndexState = currentState[index] || {};
     currentIndexState = updateValueByKey(currentIndexState, key, value);
     currentState[index] = currentIndexState;
     setWorkExperiences(currentState);
  }

  const handleCancelPress = (index) => {
      workExperiences.splice(index, 1);
      setWorkExperiences([...workExperiences]);
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={style.contentContainerStyle}
    >
      <View style={[style.innerContainerStyle]}>
      {workExperiences.map((experience, index) => (
          <DetailCard
        key={index}
        details={experience}
        customCardStyle={style.customCardStyle}
        headerId={intl.formatMessage({
          id: "label.workExperience",
        })}
        isEditProfile={isEditable}
        handleChange={(label, value, codeValue) => {
          onChangeWorkExp(label,value,codeValue,index)
        }}
        handleBlur={handleWorkExperienceDetailBlur}
        isShowCancel={workExperiences.length > 1 ? true : false}
        handleCancel={() => handleCancelPress(index)}
        handleMultiSelect={(updatedSelectedItems) => handleAreasOfInterestSelection(updatedSelectedItems, index)}
      />
      ))}  
      {isEditable &&  <CustomButton
          onPress={() =>{
            setWorkExperiences([...workExperiences, initailWorkExperience]);
          }}
          style={{ ...style.addButtonStyle }}
          iconLeft={{
          leftIconSource: images.iconAdd,
          isLeftIconNotSvg: true,
          }}
          customStyle={{ customTextStyle: style.customTextStyle }}
          >
            {intl.formatMessage({ id: "label.add_more_experience" })}
        </CustomButton> 
        }
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
