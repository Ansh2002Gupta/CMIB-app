import { ScrollView, View } from "@unthinkable/react-core-components";
import style from './WorkExperience.style';
import DetailCard from "../../../components/DetailCard";
import { useIntl } from "react-intl";
import SaveCancelButton from "../SaveCancelButton";
import CustomButton from "../../../components/CustomButton";
import images from "../../../images";
import { useEffect, useState } from "react";
const WorkExperienceUI = ({
  isEditable = true,
  workExperiences,
  handleWorkExperienceDetailBlur,
  onChangeValue,
  isLoading,
  onClickSave,
  onClickCancel,
  isValidAllFields,
  onClickAdd,
  initailWorkExperience
}) => {
  const intl = useIntl();
  const [workExperiencesState, setWorkExperiencesState] = useState([initailWorkExperience]);

  useEffect(() => {
    if (workExperiencesState.length > 0) {
      const changeHandler = onChangeValue(workExperiences);
      changeHandler("workExperiences", workExperiencesState);
    }
  }, [workExperiencesState]);

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
     let currentState = [...workExperiencesState];
     let currentIndexState = currentState[index] || {};
     currentIndexState = updateValueByKey(currentIndexState, key, value);
     currentState[index] = currentIndexState;
     setWorkExperiencesState(currentState);
  }
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={style.contentContainerStyle}
    >
      <View style={[style.innerContainerStyle]}>
      {workExperiences.map((experience, index) => (
        <View>
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
      />
        </View>
      ))}  
      {isEditable &&  <CustomButton
          onPress={() =>{
            setWorkExperiencesState([...workExperiencesState, initailWorkExperience]);
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
