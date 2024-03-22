import React, {
  forwardRef,
  useContext,
  useImperativeHandle,
  useState,
} from "react";
import { Platform, View } from "@unthinkable/react-core-components";
import CustomTextInput from "../../../components/CustomTextInput";
import styles from "./PersonalDetails.styles"; // Import the styles
import { useIntl } from "react-intl";
import useGetPostedJobsData from "../../../services/apiServices/hooks/PostedJobs/useGetPostedJobsData";
import { AddJobContext } from "../../../globalContext/addJob/addJobsProvider";

const PersonalDetails = forwardRef(({ isWebView, error }, ref) => {
  const intl = useIntl();
  const { fetchSearch } = useGetPostedJobsData();
  const [addJobs] = useContext(AddJobContext);
  const [jobData, setJobData] = useState({
    minimumExperience: 0,
    maximumExperience: 0,
    nationality: "",
    designation: "",
    jobLocation: [],
    functionalAreas: [],
    genderPreference: {},
    categoryPreference: {},
    essentialQualification: "",
    desiredQualification: "",
  });

  const getPersonalDetails = () => {
    return jobData;
  };

  useImperativeHandle(ref, () => ({
    getPersonalDetails: getPersonalDetails,
  }));

  const handleJobDetailsChange = (field, value) => {
    setJobData((prev) => {
      return {
        ...prev,
        [field]: value,
      };
    });
  };
  const {
    countryData,
    functionalData,
    jobLocationData,
    genderPreferenceData,
    jobCategory,
  } = addJobs;
  const locationsArray = Array.from(
    new Map(
      [...jobData.jobLocation, ...jobLocationData].map((item) => [
        item.id,
        item,
      ])
    ).values()
  );

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
          isError={(error && error.minimumExperience && true) || false}
          errorMessage={(error && error.minimumExperience) || ""}
          isCounterInput
          maxCount={99}
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
          isError={(error && error.maximumExperience && true) || false}
          maxCount={99}
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
          isError={(error && error.nationality && true) || false}
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
          isError={(error && error.designation && true) || false}
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
          isError={(error && error.jobLocation && true) || false}
          onChangeDropDownText={(item) => {
            return handleChange(item);
          }}
          errorMessage={(error && error.jobLocation) || ""}
          selectedItems={jobData.jobLocation}
          onChangeValue={(value) => {
            const arr = jobData.jobLocation;
            const index = arr.findIndex((item) => item.id === value.id);
            if (index > -1) {
              arr.splice(index, 1);
            } else {
              arr.push(value);
            }
            handleJobDetailsChange("jobLocation", arr);
          }}
          isMultiSelect
          labelField={"city"}
          valueField={"city"}
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
          isMultiSelect
          isError={(error && error.functionalAreas && true) || false}
          errorMessage={(error && error.functionalAreas) || ""}
          selectedItems={jobData.functionalAreas}
          customStyle={styles.functionalAreaInputStyle}
          onChangeValue={(value) => {
            const arr = jobData.functionalAreas;
            const index = arr.findIndex((item) => item.id === value.id);
            if (index > -1) {
              arr.splice(index, 1);
            } else {
              arr.push(value);
            }
            handleJobDetailsChange("functionalAreas", arr);
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
          isError={(error && error.categoryPreference && true) || false}
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
});

export default PersonalDetails;
