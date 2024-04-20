import React, {useState, useImperativeHandle, useEffect, useCallback} from "react";
import { View } from "@unthinkable/react-core-components";

import CardComponent from "../../../components/CardComponent";
import CommonText from "../../../components/CommonText";
import CustomTextInput from "../../../components/CustomTextInput";
import styles from "./TrainingDetails.style";
import images from "../../../images";
import CustomButton from "../../../components/CustomButton";
import { YEARS } from "../../../constants/constants";

const articleShipKeys = {
    orgName: '',
    location: '',
    trainingFrom: '',
    trainingTo: '',
    comapanyName: '',
    industryName: '',
    natureOfWork: '',
    natureOfWorkInArticle: ''
}
const IndustrialTraining = ({intl, isWebView, isViewMode, onValidationChange = () => {}}, ref) => {
  //states
  const [industrialTrainings, setIndustrialTrainings] = useState([articleShipKeys]);

  //custom functions
  const onDataChange = (data, localIndex, key) => {
    try {
        let newArticles = industrialTrainings.map((item, index) => {
            if(index === localIndex) {
                return {...item, [key]: data}
            } else {
                return item;
            }
        });
        setIndustrialTrainings([...newArticles]);

    } catch {
        console.log('getting error')
    }
  }

  const onAddArticle = () => {
    setIndustrialTrainings([...industrialTrainings,articleShipKeys ]);
  }

  const onDeleteArticle = (LIndex) => {
    if (industrialTrainings.length > 1) {
        let newArticles = industrialTrainings.filter((item, index) => index !== LIndex);
        setIndustrialTrainings([...newArticles]);
    }
  }

  // Custom function to validate all fields
  const validateFields = useCallback(() => {
    // Define which fields are optional
    const optionalFields = [];
    const dateFields = ['trainingFrom', 'trainingTo'];
    // Check every article to make sure all required fields are filled
    for (const article of industrialTrainings) {
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
  }, [industrialTrainings]);

  useImperativeHandle(ref, () => ({
    getState: () => {
      return {
        industrialTrainings
      };
    },
  }));

  //Lifecycle
  useEffect(() => {
    const allFieldsValidated = validateFields();
    onValidationChange(allFieldsValidated);
  }, [industrialTrainings, onValidationChange, validateFields]);

  return (
    <View style={styles.industrialContainer}>
        <CommonText customTextStyle={styles.articleTrainingTitleText} fontWeight={"600"}>
            {intl.formatMessage({ id: "label.industrialTraining" })}
        </CommonText>
        {industrialTrainings.map((item, index) => {
            return (
                <CardComponent customStyle={styles.cardContainer} key={`${index}`}>
                    {industrialTrainings.length > 1 && <CustomButton
                        style={styles.deleteButton}
                        iconLeft={{
                        leftIconSource: images.iconDeleteRed,
                        }}
                        onPress={() => {onDeleteArticle(index)}}
                    />}
                    <View style={isWebView ? styles.gridView : styles.gap}>
                        <CustomTextInput
                            isViewMode={isViewMode}
                            viewText={industrialTrainings[index]?.orgName}
                            isMandatory={!isViewMode}
                            customStyle={styles.textInputContainer(isWebView)}
                            isPaddingNotRequired
                            label={intl.formatMessage({ id: "label.nameOfOrg" })}
                            placeholder={intl.formatMessage({ id: "label.nameOfOrg" })}
                            value={industrialTrainings[index]?.orgName}
                            onChangeText={(txt) => onDataChange(txt, index, 'orgName')}
                        />
                        <CustomTextInput
                            isViewMode={isViewMode}
                            viewText={industrialTrainings[index]?.location}
                            isMandatory={!isViewMode}
                            customStyle={styles.textInputContainer(isWebView)}
                            isPaddingNotRequired
                            label={intl.formatMessage({ id: "label.location" })}
                            placeholder={intl.formatMessage({ id: "label.location" })}
                            value={industrialTrainings[index]?.location}
                            onChangeText={(txt) => onDataChange(txt, index, 'location')}
                        />
                        <CustomTextInput
                            isViewMode={isViewMode}
                            viewText={industrialTrainings[index]?.trainingFrom}
                            isMandatory={!isViewMode}
                            customStyle={styles.textInputContainer(isWebView)}
                            isPaddingNotRequired
                            label={intl.formatMessage({ id: "label.trainingFrom" })}
                            placeholder={intl.formatMessage({ id: "label.trainingFrom" })}
                            isCalendar
                            format={'DD/MM/YYYY'}
                            value={industrialTrainings[index]?.trainingFrom}
                            onChangeValue={(txt) => onDataChange(txt, index, 'trainingFrom')}
                        />
                        <CustomTextInput
                            isViewMode={isViewMode}
                            viewText={industrialTrainings[index]?.trainingTo}
                            isMandatory={!isViewMode}
                            customStyle={styles.textInputContainer(isWebView)}
                            isPaddingNotRequired
                            label={intl.formatMessage({ id: "label.trainingTo" })}
                            placeholder={intl.formatMessage({ id: "label.trainingTo" })}
                            isCalendar
                            format={'DD/MM/YYYY'}
                            value={industrialTrainings[index]?.trainingTo}
                            onChangeValue={(txt) => onDataChange(txt, index, 'trainingTo')}
                        />
                        <CustomTextInput
                            isViewMode={isViewMode}
                            viewText={industrialTrainings[index]?.comapanyName}
                            isMandatory={!isViewMode}
                            customStyle={styles.textInputContainer(isWebView)}
                            customLabelStyle={{fontSize: 11}}
                            isPaddingNotRequired
                            label={intl.formatMessage({ id: "label.provideCompanyName" })}
                            placeholder={intl.formatMessage({ id: "label.provideCompanyName" })}
                            value={industrialTrainings[index]?.comapanyName}
                            onChangeText={(txt) => onDataChange(txt, index, 'comapanyName')}
                        />
                        <CustomTextInput
                            isViewMode={isViewMode}
                            viewText={industrialTrainings[index]?.industryName}
                            isMandatory={!isViewMode}
                            customStyle={styles.textInputContainer(isWebView)}
                            isPaddingNotRequired
                            customLabelStyle={{fontSize: 11}}
                            label={intl.formatMessage({ id: "label.provideIndustryName" })}
                            placeholder={intl.formatMessage({ id: "label.provideIndustryName" })}
                            value={industrialTrainings[index]?.industryName}
                            onChangeText={(txt) => onDataChange(txt, index, 'industryName')}
                        />
                        <CustomTextInput
                            isViewMode={isViewMode}
                            viewText={industrialTrainings[index]?.natureOfWork}
                            isMandatory={!isViewMode}
                            customStyle={styles.textInputContainer(isWebView)}
                            isPaddingNotRequired
                            label={intl.formatMessage({ id: "label.natureOfWorkdoneIndustrial" })}
                            placeholder={intl.formatMessage({ id: "label.natureOfWorkdoneIndustrial" })}
                            value={industrialTrainings[index]?.natureOfWork}
                            isDropdown
                            options={YEARS}
                            onChangeValue={(txt) => onDataChange(txt, index, 'natureOfWork')}
                        />
                        <CustomTextInput
                            isViewMode={isViewMode}
                            viewText={industrialTrainings[index]?.natureOfWorkInArticle}
                            isMandatory={!isViewMode}
                            customStyle={styles.textInputContainer(isWebView)}
                            isPaddingNotRequired
                            label={intl.formatMessage({ id: "label.natureOfWorkdoneIndustrialArticles" })}
                            placeholder={intl.formatMessage({ id: "label.natureOfWorkdoneIndustrialArticles" })}
                            value={industrialTrainings[index]?.natureOfWorkInArticle}
                            isDropdown
                            options={YEARS}
                            onChangeValue={(txt) => onDataChange(txt, index, 'natureOfWorkInArticle')}
                        />
                    </View>
                    </CardComponent>
            );
        })}
        <CustomButton
            onPress={onAddArticle}
            style={styles.buttonStyle}
            iconLeft={{
              leftIconSource: images.iconAdd,
            }}
            customTextStyle={{fontSize: 14}}
            customStyle={{ textFontWeight: "500", customTextStyle: {fontSize: 14} }}
          >
            {intl.formatMessage({ id: "label.addIndustrialTraining" })}
          </CustomButton>
    </View>
  )
};

export default  React.forwardRef(IndustrialTraining);