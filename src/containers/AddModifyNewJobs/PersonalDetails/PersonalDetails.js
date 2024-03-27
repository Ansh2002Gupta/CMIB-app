import React, {
  forwardRef,
  useContext,
  useImperativeHandle,
  useState,
} from "react";
import { Platform, View } from "@unthinkable/react-core-components";
import CustomTextInput from "../../../components/CustomTextInput";
import useGetAddNewJobData from "../../../services/apiServices/hooks/AddNewJobs/useGetAddNewJobData";
import { AddJobContext } from "../../../globalContext/addJob/addJobsProvider";
import { useIntl } from "react-intl";
import styles from "./PersonalDetails.styles";

const PersonalDetails = forwardRef(({ isWebView }, ref) => {
  const intl = useIntl();
  const { fetchSearch } = useGetAddNewJobData();
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
  const [error, setError] = useState({
    minimumExperience: "",
    maximumExperience: "",
    designation: "",
    jobLocation: "",
    functionalAreas: "",
    categoryPreference: "",
  });

  const validateField = (name) => {
    switch (name) {
      case "maximumExperience":
        if (jobData.minimumExperience >= jobData.maximumExperience) {
          setError((prev) => {
            return {
              ...prev,
              [name]:
                "Maximum experience must be more than Minimum experience.",
            };
          });
          return false;
        }
        if (jobData.minimumExperience == jobData.maximumExperience) {
          setError((prev) => {
            return {
              ...prev,
              [name]: "Maximum Experience is not Valid",
            };
          });
          return false;
        }
        break;
      case "designation":
        if (!jobData.designation.trim()) {
          setError((prev) => {
            return {
              ...prev,
              [name]: intl.formatMessage({ id: "label.mandatory" }),
            };
          });
          return false;
        }
        break;
      case "jobLocation":
        if (!jobData.jobLocation.length) {
          setError((prev) => {
            return {
              ...prev,
              [name]: intl.formatMessage({ id: "label.mandatory" }),
            };
          });
          return false;
        }
        break;
      case "functionalAreas":
        if (!jobData.functionalAreas.length) {
          setError((prev) => {
            return {
              ...prev,
              [name]: intl.formatMessage({ id: "label.mandatory" }),
            };
          });
          return false;
        }
        break;
      case "categoryPreference":
        if (Object.keys(jobData.categoryPreference).length === 0) {
          setError((prev) => {
            return {
              ...prev,
              [name]: intl.formatMessage({ id: "label.mandatory" }),
            };
          });
          return false;
        }
        break;
      default:
        break;
    }
    return true;
  };
  const getErrors = () => {
    let hasError = false;

    Object.keys(error).forEach((field) => {
      let isValid = validateField(field);
      if (!isValid) {
        hasError = true;
      }
    });
    return hasError;
  };

  const getPersonalDetails = () => {
    return jobData;
  };

  useImperativeHandle(ref, () => ({
    getPersonalDetails: getPersonalDetails,
    getErrors: getErrors,
  }));

  const handleJobDetailsChange = (field, value) => {
    if (error[field]) {
      setError((prev) => {
        return {
          ...prev,
          [field]: "",
        };
      });
    }
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
          customHandleBlur={() => {
            validateField("minimumExperience");
          }}
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
          customHandleBlur={() => {
            validateField("maximumExperience");
          }}
          isCounterInput
          numberText={intl.formatMessage({ id: "label.year" })}
          customStyle={styles.inputStyle(isWebView)}
          maxCount={99}
          isError={(error && error.maximumExperience && true) || false}
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
          value={jobData.nationality?.value}
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
          customHandleBlur={() => {
            validateField("designation");
          }}
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
          errorMessage={(error && error.jobLocation) || ""}
          onChangeDropDownText={(item) => {
            return handleChange(item);
          }}
          customHandleBlur={() => {
            validateField("jobLocation");
          }}
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
          customHandleBlur={() => {
            validateField("functionalAreas");
          }}
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
          customHandleBlur={() => {
            validateField("categoryPreference");
          }}
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
