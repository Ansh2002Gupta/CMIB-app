import React, {useState, useImperativeHandle, useEffect, useCallback} from "react";
import { View } from "@unthinkable/react-core-components";

import CardComponent from "../../../components/CardComponent";
import CommonText from "../../../components/CommonText";
import CustomTextInput from "../../../components/CustomTextInput";
import styles from "./WorkExperienceDetails.style";
import images from "../../../images";
import CustomButton from "../../../components/CustomButton";
import { YEARS } from "../../../constants/constants";
import CustomToggleComponent from "../../../components/CustomToggleComponent";
import CustomLabelView from "../../../components/CustomLabelView";

const workDetailKeys = {
    isWorkExperience: 1, //1 is for false
    orgName: '',
    designation: '',
    location: '',
    from: '',
    to: '',
    empStrength: '',
    grossSalary: '',
    workAreas: '',
}
const WorkExperienceDetailsTemplate = ({intl, isWebView, isViewMode, onValidationChange = () => {}}, ref) => {
  //states
  const [workExperiences, setWorkExperiences] = useState([workDetailKeys]);

  //custom functions
  const onDataChange = (data, localIndex, key) => {
    try {
        let newWorkExperiences = workExperiences.map((item, index) => {
            if(index === localIndex) {
                return {...item, [key]: data}
            } else {
                return item;
            }
        });
        setWorkExperiences([...newWorkExperiences]);

    } catch {
        console.log('getting error')
    }
  }

  const onAddWorkExperience = () => {
    setWorkExperiences([...workExperiences,workDetailKeys ]);
  }

  const onDeleteWorkExperience = (LIndex) => {
    if (workExperiences.length > 1) {
        let newArticles = workExperiences.filter((item, index) => index !== LIndex);
        setWorkExperiences([...newArticles]);
    }
  }

  // Custom function to validate all fields
  const validateFields = useCallback(() => {
    // Define which fields are optional
    const optionalFields = ['otherAreas', 'secondment'];
    const dateFields = ['trainingFrom', 'trainingTo'];
    // Check every article to make sure all required fields are filled
    for (const article of workExperiences) {
      // Check if any of the properties, except the optional ones, is an empty string
      for (const key in article) {
        const value = article[key];
        if (!optionalFields.includes(key)) {
          if (dateFields.includes(key)) {
            // For date fields, check if the value is a valid date
            if (!(value instanceof Date && !isNaN(value))) {
              return false;
            }
          } else {
            // For text fields, trim and check if empty
            if (typeof value === 'string' && value.trim() === '') {
              return false;
            }
          }
        }
      }
    }
    // If we get here, all required fields are filled
    return true;
  }, [workExperiences]);

  useImperativeHandle(ref, () => ({
    getState: () => {
      return {
        workExperiences
      };
    },
  }));

  //Lifecycle
  useEffect(() => {
    const allFieldsValidated = validateFields();
    onValidationChange(allFieldsValidated);
  }, [workExperiences, onValidationChange, validateFields]);

  return (
    <CardComponent customStyle={styles.cardContainer}>
      <View style={styles.articleContainer}>
          <CommonText customTextStyle={styles.articleTrainingTitleText} fontWeight={"600"}>
              {intl.formatMessage({ id: "label.work_experience" })}
          </CommonText>
          {workExperiences.map((item, index) => {
              return (
                  <CardComponent customStyle={styles.cardContainer} key={`${index}`}>
                      {workExperiences.length > 1 && <CustomButton
                          style={styles.deleteButton}
                          iconLeft={{
                          leftIconSource: images.iconDeleteRed,
                          }}
                          onPress={() => {onDeleteWorkExperience(index)}}
                      />}
                      <View style={isWebView ? styles.gridView : styles.gap}>
                          <View style={styles.textInputContainer(isWebView)}>
                            <CustomLabelView
                              label={intl.formatMessage({ id: "label.haveAnyWorkExperience" })}
                              isMandatory={!isViewMode}
                            />
                            <CustomToggleComponent
                              isMandatory={!isViewMode}
                              customToggleStyle={styles.customToggleStyle}
                              value={workExperiences[index]?.isWorkExperience}
                              onValueChange={(txt) => onDataChange(txt, index, 'isWorkExperience')}
                            />
                          </View>
                          {!Boolean(workExperiences[index]?.isWorkExperience) && (
                            <>
                              <CustomTextInput
                                  isViewMode={isViewMode}
                                  viewText={workExperiences[index]?.orgName}
                                  isMandatory={!isViewMode}
                                  customStyle={styles.textInputContainer(isWebView)}
                                  isPaddingNotRequired
                                  label={intl.formatMessage({ id: "label.organizationName" })}
                                  placeholder={intl.formatMessage({ id: "label.organizationName" })}
                                  value={workExperiences[index]?.orgName}
                                  isDropdown
                                  options={YEARS}
                                  onChangeValue={(txt) => onDataChange(txt, index, 'orgName')}
                              />
                              <CustomTextInput
                                  isViewMode={isViewMode}
                                  viewText={workExperiences[index]?.designation}
                                  isMandatory={!isViewMode}
                                  customStyle={styles.textInputContainer(isWebView)}
                                  isPaddingNotRequired
                                  label={intl.formatMessage({ id: "label.designation" })}
                                  placeholder={intl.formatMessage({ id: "label.designation" })}
                                  value={workExperiences[index]?.designation}
                                  isDropdown
                                  options={YEARS}
                                  onChangeValue={(txt) => onDataChange(txt, index, 'designation')}
                              />
                              <CustomTextInput
                                  isViewMode={isViewMode}
                                  viewText={workExperiences[index]?.location}
                                  isMandatory={!isViewMode}
                                  customStyle={styles.textInputContainer(isWebView)}
                                  isPaddingNotRequired
                                  label={intl.formatMessage({ id: "label.location" })}
                                  placeholder={intl.formatMessage({ id: "label.location" })}
                                  value={workExperiences[index]?.location}
                                  isDropdown
                                  options={YEARS}
                                  onChangeValue={(txt) => onDataChange(txt, index, 'location')}
                              />
                              <CustomTextInput
                                  isViewMode={isViewMode}
                                  viewText={workExperiences[index]?.from}
                                  isMandatory={!isViewMode}
                                  customStyle={styles.textInputContainer(isWebView)}
                                  isPaddingNotRequired
                                  label={intl.formatMessage({ id: "label.from" })}
                                  placeholder={intl.formatMessage({ id: "label.from" })}
                                  isCalendar
                                  format={'DD/MM/YYYY'}
                                  value={workExperiences[index]?.from}
                                  onChangeValue={(txt) => onDataChange(txt, index, 'from')}
                              />
                              <CustomTextInput
                                  isViewMode={isViewMode}
                                  viewText={workExperiences[index]?.to}
                                  isMandatory={!isViewMode}
                                  customStyle={styles.textInputContainer(isWebView)}
                                  isPaddingNotRequired
                                  label={intl.formatMessage({ id: "label.to" })}
                                  placeholder={intl.formatMessage({ id: "label.to" })}
                                  isCalendar
                                  format={'DD/MM/YYYY'}
                                  value={workExperiences[index]?.to}
                                  onChangeValue={(txt) => onDataChange(txt, index, 'to')}
                              />
                              <CustomTextInput
                                  isViewMode={isViewMode}
                                  viewText={workExperiences[index]?.empStrength}
                                  isMandatory={!isViewMode}
                                  customStyle={styles.textInputContainer(isWebView)}
                                  isPaddingNotRequired
                                  label={intl.formatMessage({ id: "label.empStrength" })}
                                  placeholder={intl.formatMessage({ id: "label.empStrength" })}
                                  value={workExperiences[index]?.empStrength}
                                  isDropdown
                                  options={YEARS}
                                  onChangeValue={(txt) => onDataChange(txt, index, 'empStrength')}
                              />
                              <CustomTextInput
                                  isViewMode={isViewMode}
                                  viewText={workExperiences[index]?.grossSalary}
                                  isMandatory={!isViewMode}
                                  customStyle={styles.textInputContainer(isWebView)}
                                  isPaddingNotRequired
                                  label={intl.formatMessage({ id: "label.grossSalaryDrawnPa" })}
                                  placeholder={intl.formatMessage({ id: "label.grossSalaryDrawnPa" })}
                                  value={workExperiences[index]?.grossSalary}
                                  isDropdown
                                  options={YEARS}
                                  onChangeValue={(txt) => onDataChange(txt, index, 'grossSalary')}
                              />
                              <CustomTextInput
                                  isViewMode={isViewMode}
                                  viewText={workExperiences[index]?.workAreas}
                                  isMandatory={!isViewMode}
                                  customStyle={styles.textInputContainer(isWebView)}
                                  isPaddingNotRequired
                                  label={intl.formatMessage({ id: "label.areasOfWork" })}
                                  placeholder={intl.formatMessage({ id: "label.areasOfWork" })}
                                  value={workExperiences[index]?.workAreas}
                                  isDropdown
                                  options={YEARS}
                                  onChangeValue={(txt) => onDataChange(txt, index, 'workAreas')}
                              />
                            </>
                          )}
                      </View>
                      </CardComponent>
              );
          })}
          <CustomButton
              onPress={onAddWorkExperience}
              style={styles.buttonStyle}
              iconLeft={{
                leftIconSource: images.iconAdd,
              }}
              customTextStyle={{fontSize: 14}}
              customStyle={{ textFontWeight: "500", customTextStyle: {fontSize: 14} }}
            >
              {intl.formatMessage({ id: "label.addWorkExperience" })}
            </CustomButton>
      </View>
    </CardComponent>
  )
};

export default  React.forwardRef(WorkExperienceDetailsTemplate);