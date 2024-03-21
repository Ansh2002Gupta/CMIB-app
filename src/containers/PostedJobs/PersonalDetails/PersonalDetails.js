import React, { useContext } from "react";
import { Platform, View } from "@unthinkable/react-core-components";
import CustomTextInput from "../../../components/CustomTextInput";
import styles from "./PersonalDetails.styles"; // Import the styles
import { useIntl } from "react-intl";
import useGetPostedJobsData from "../../../services/apiServices/hooks/PostedJobs/useGetPostedJobsData";
import { AddJobContext } from "../../../globalContext/addJob/addJobsProvider";

const PersonalDetails = ({
  isWebView,
  jobData,
  handleJobDetailsChange,
  error,
}) => {
  const intl = useIntl();
  const { fetchSearch } = useGetPostedJobsData();
  const [addJobs] = useContext(AddJobContext);
  const {
    countryData,
    functionalData,
    jobLocationData,
    genderPreferenceData,
    jobCategory,
  } = addJobs;

  const locationsArray = Array.from(
    new Map(
      jobLocationData
        .concat(
          jobData.jobLocation && jobData.jobLocation.id
            ? [jobData.jobLocation]
            : []
        )
        .filter((location) => location && location.id)
        .map((location) => [location.id, location])
    ).values()
  ).reverse();

  async function handleChange(text) {
    return fetchSearch(text).then((res) => {
      if (Platform.OS.toLowerCase() !== "web") {
        return res;
      }
    });
  }

  return (
    <View>
      <View style={styles.row(isWebView)}>
        <CustomTextInput
          label={intl.formatMessage({
            id: "label.minimum_experience",
          })}
          isMandatory
          isError={(error && error.minimumExperience) || false}
          errorMessage={(error && error.minimumExperience) || ""}
          isCounterInput
          numberText={intl.formatMessage({ id: "label.year" })}
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
          numberText={intl.formatMessage({ id: "label.year" })}
          customStyle={styles.inputStyle(isWebView)}
          isError={(error && error.maximumExperience) || false}
          errorMessage={(error && error.maximumExperience) || ""}
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
          value={jobData.nationality.value}
          isError={(error && error.nationality) || false}
          errorMessage={(error && error.nationality) || ""}
          isDropdown
          customStyle={styles.nationalityInputStyle}
          includeAllKeys={true}
          selectAllField={true}
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
          isError={(error && error.designation) || false}
          errorMessage={(error && error.designation) || ""}
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
          includeAllKeys={true}
          selectAllField={true}
          options={locationsArray || []}
          isError={(error && error.jobLocation) || false}
          onChangeDropDownText={(item) => {
            return handleChange(item);
          }}
          errorMessage={(error && error.jobLocation) || ""}
          value={jobData.jobLocation.value}
          onChangeValue={(value) => {
            handleJobDetailsChange("jobLocation", value);
          }}
          labelField="city"
          valueField="city"
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
          includeAllKeys={true}
          selectAllField={true}
          options={functionalData || []}
          isMandatory
          isError={(error && error.functionalAreas) || false}
          errorMessage={(error && error.functionalAreas) || ""}
          value={jobData.functionalAreas.value}
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
          includeAllKeys={true}
          selectAllField={true}
          options={genderPreferenceData || []}
          value={jobData.genderPreference.value}
          onChangeValue={(value) => {
            handleJobDetailsChange("genderPreference", value);
          }}
          labelField="slug"
          valueField="name"
          customStyle={styles.genderPreferenceInputStyle(isWebView)}
        />
        <CustomTextInput
          label={intl.formatMessage({
            id: "label.category_preference",
          })}
          isDropdown
          includeAllKeys={true}
          selectAllField={true}
          options={jobCategory || []}
          value={jobData.categoryPreference.value}
          isError={(error && error.categoryPreference) || false}
          errorMessage={(error && error.categoryPreference) || ""}
          onChangeValue={(value) => {
            handleJobDetailsChange("categoryPreference", value);
          }}
          labelField="name"
          valueField="slug"
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
