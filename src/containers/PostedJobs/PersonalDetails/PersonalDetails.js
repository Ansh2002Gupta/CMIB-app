import React from "react";
import { View } from "@unthinkable/react-core-components";
import CustomTextInput from "../../../components/CustomTextInput";
import styles from "./PersonalDetails.styles"; // Import the styles
import { useIntl } from "react-intl";

const PersonalDetails = ({
  isWebView,
  jobData,
  handleJobDetailsChange,
  countryData,
  functionalData,
}) => {
  const intl = useIntl();
  return (
    <View>
      <View style={styles.row(isWebView)}>
        <CustomTextInput
          label={intl.formatMessage({
            id: "label.minimum_experience",
          })}
          isMandatory
          isCounterInput
          isYear={true}
          handleCountChange={(val) =>
            handleJobDetailsChange("minimumExperience", val)
          }
          countValue={jobData.minimumExperience}
          customStyle={styles.inputStyle(isWebView)}
        />
        <CustomTextInput
          label={intl.formatMessage({
            id: "label.maximum_experience",
          })}
          isCounterInput
          isYear={true}
          customStyle={styles.inputStyle(isWebView)}
          handleCountChange={(val) =>
            handleJobDetailsChange("maximumExperience", val)
          }
          countValue={jobData.maximumExperience}
        />
        <CustomTextInput
          label={intl.formatMessage({
            id: "label.nationality",
          })}
          options={countryData || []}
          value={jobData.nationality}
          isDropdown
          customStyle={styles.nationalityInputStyle}
          labelField="name"
          valueField="name"
          urlField="flag"
          onChangeValue={(value) => {
            handleJobDetailsChange("nationality", value);
          }}
        />
      </View>
      <View style={styles.row(isWebView)}>
        <CustomTextInput
          label={intl.formatMessage({
            id: "label.designation",
          })}
          placeholder={intl.formatMessage({
            id: "label.designation_placeholder",
          })}
          isMandatory
          customStyle={styles.inputStyle(isWebView)}
          value={jobData.designation}
          onChangeText={(val) => {
            handleJobDetailsChange("designation", val);
          }}
        />
        <CustomTextInput
          label={intl.formatMessage({
            id: "label.job_location",
          })}
          isDropdown
          isMandatory
          customStyle={styles.jobLocationInputStyle}
        />
      </View>
      <View>
        <CustomTextInput
          label={intl.formatMessage({
            id: "label.functional_areas",
          })}
          isDropdown
          labelField="name"
          valueField="slug"
          options={functionalData || []}
          isMandatory
          value={jobData.functionalAreas}
          customStyle={styles.functionalAreaInputStyle}
          onChangeValue={(value) => {
            handleJobDetailsChange("functionalAreas", value);
          }}
        />
      </View>
      <View style={styles.row(isWebView)}>
        <CustomTextInput
          label={intl.formatMessage({
            id: "label.gender_preference",
          })}
          isDropdown
          customStyle={styles.genderPreferenceInputStyle(isWebView)}
        />
        <CustomTextInput
          label={intl.formatMessage({
            id: "label.category_preference",
          })}
          isDropdown
          isMandatory
          customStyle={styles.categoryPreferenceInputStyle(isWebView)}
        />
        {isWebView && <View style={styles.emptyViewStyle} />}
      </View>
      <View>
        <CustomTextInput
          label={intl.formatMessage({
            id: "label.essential_qualification",
          })}
          placeholder={intl.formatMessage({
            id: "label.essential_qualification_placeholder",
          })}
          value={jobData.essentialQualification}
          onChangeText={(val) => {
            handleJobDetailsChange("essentialQualification", val);
          }}
        />
      </View>
      <View>
        <CustomTextInput
          label={intl.formatMessage({
            id: "label.desired_qualification",
          })}
          placeholder={intl.formatMessage({
            id: "label.desired_qualification_placeholder",
          })}
          value={jobData.desiredQualification}
          onChangeText={(val) => {
            handleJobDetailsChange("desiredQualification", val);
          }}
        />
      </View>
    </View>
  );
};

export default PersonalDetails;
