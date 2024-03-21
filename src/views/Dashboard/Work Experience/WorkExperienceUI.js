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
  workExperience_detail,
  handleWorkExperienceDetailBlur,
  onChangeValue,
  isLoading,
  onClickSave,
  onClickCancel,
  isValidAllFields,
  onClickAdd,
}) => {
  const intl = useIntl();
  const [workExperiencesState, setWorkExperiencesState] = useState([{}]);

  // useEffect(() => {
  //   if (workExperiencesState.length > 0) {
  //     const changeHandler = onChangeValue(workExperience_detail);
  //     changeHandler("workExperiences", workExperiencesState);
  //   }
  // }, [workExperiencesState]);

  const findKeyByLabel = (label, details) => {
    return details.find((item) => {
      return item.label === label;
    });
  };

  const onChangeWorkExp = (label, value, codeValue,index) => {
    console.log("index---",index, workExperiencesState)
     const { key } = findKeyByLabel(label, workExperience_detail);
     let currentState = [...workExperiencesState];
     let currentIndexState = currentState[index] || {};
     currentIndexState[key] = value;
     currentState[index] = currentIndexState;
     setWorkExperiencesState(currentState);
     const changeHandler = onChangeValue(workExperience_detail);
     changeHandler(label,value);
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={style.contentContainerStyle}
    >
      <View style={[style.innerContainerStyle]}>
      {workExperiencesState.map((experience, index) => (
        <DetailCard
        key={index}
        details={workExperience_detail}
        customCardStyle={style.customCardStyle}
        headerId={intl.formatMessage({
          id: "label.workExperience",
        })}
        isEditProfile={isEditable}
        handleChange={(label, value, codeValue) => {
          onChangeWorkExp(label,value,codeValue,index)
        }}
        // handleChange={(label, value, codeValue) => {

        //   const changeHandler = onChangeValue(workExperience_detail);
        //   changeHandler(label, value, codeValue); 

        //   const { key } = findKeyByLabel(label, workExperience_detail);
        //   let currentState = [...state];
        //   let currentIndexState = currentState[index] || {};
        //   currentIndexState[key] = value;
        //   currentState[index] = currentIndexState;
        //   setState(currentState);
        // }}
        //handleChange={onChangeWorkExp(index)}
       // handleChange={onChangeValue(workExperience_detail)}
        handleBlur={handleWorkExperienceDetailBlur}
      />
      ))}  
        <CustomButton
          onPress={() =>{
            setWorkExperiencesState([...workExperiencesState, {}]);
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
