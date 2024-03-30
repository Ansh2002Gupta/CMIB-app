import React, {
  forwardRef,
  useContext,
  useImperativeHandle,
  useState,
} from "react";
import { View } from "@unthinkable/react-core-components";

import CustomTextInput from "../../../components/CustomTextInput";
import CustomTextEditor from "../../../components/CustomTextEditor/CustomTextEditor";
import CustomToggleComponent from "../../../components/CustomToggleComponent/CustomToggleComponent";

import { AddJobContext } from "../../../globalContext/addJob/addJobsProvider";
import { useIntl } from "react-intl";
import styles from "./JobDetailsComponent.style";

const JobDetailsComponent = forwardRef(
  ({ addNewJobData, isWebView, selectedJobType, setSelectedJobType }, ref) => {
    const intl = useIntl();
    const [addJobs] = useContext(AddJobContext);
    const { jobType } = addJobs;
    const [jobData, setJobData] = useState({
      jobSummary: addNewJobData?.jobSummary ?? "",
      jobDetails: addNewJobData?.jobDetails ?? "",
      isUrgentJob: addNewJobData?.isUrgentJob ?? 0,
    });

    const [error, setError] = useState({
      jobSummary: "",
      jobDetails: "",
      jobType: "",
    });

    const getJobDetailsState = () => {
      return { ...jobData, ...{ jobType: selectedJobType } };
    };

    const validateInput = (field) => {
      if (field === "jobType" && Object.keys(selectedJobType).length === 0) {
        setError((prev) => {
          return {
            ...prev,
            [field]: intl.formatMessage({ id: "label.mandatory" }),
          };
        });
        return false;
      } else if (
        field !== "jobType" &&
        (!jobData[field] ||
          (field == "jobDetails" && !jobData[field]) ||
          jobData[field] == "<p><br></p>")
      ) {
        setError((prev) => {
          return {
            ...prev,
            [field]: intl.formatMessage({ id: "label.mandatory" }),
          };
        });

        return false;
      }
      return true;
    };

    const getErrors = () => {
      let hasError = false;
      Object.keys(error).forEach((field) => {
        let isValid = validateInput(field);
        if (!isValid) {
          hasError = true;
        }
      });
      return hasError;
    };

    useImperativeHandle(ref, () => ({
      getJobDetailsState: getJobDetailsState,
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
      if (field == "jobType") {
        setSelectedJobType(value);
      } else {
        setJobData((prev) => {
          return {
            ...prev,
            [field]: value,
          };
        });
      }
    };

    return (
      <View>
        <CustomTextInput
          label={intl.formatMessage({
            id: "label.job_summary",
          })}
          isMandatory
          placeholder={intl.formatMessage({
            id: "label.job_summary_placeHolder",
          })}
          isError={(error && error.jobSummary && true) || false}
          customHandleBlur={() => validateInput("jobSummary")}
          errorMessage={(error && error.jobSummary) || ""}
          value={jobData.jobSummary}
          onChangeText={(val) => {
            handleJobDetailsChange("jobSummary", val);
          }}
        />
        <View style={styles.marginBottom24}>
          <CustomTextEditor
            label={intl.formatMessage({
              id: "label.job_details",
            })}
            isMandatory
            isError={(error && error.jobDetails && true) || false}
            errorMessage={(error && error.jobDetails) || ""}
            customHandleBlur={() => validateInput("jobDetails")}
            onChangeText={(val) => {
              handleJobDetailsChange("jobDetails", val);
            }}
            value={jobData.jobDetails}
          />
        </View>
        <View style={styles.flexDirectionRowColumn(isWebView)}>
          <CustomTextInput
            label={intl.formatMessage({
              id: "label.job_type",
            })}
            isDropdown
            includeAllKeys={true}
            selectAllField={true}
            placeholder={intl.formatMessage({ id: "label.select_job_type" })}
            value={selectedJobType.value}
            options={jobType || []}
            isError={(error && error.jobType && true) || false}
            errorMessage={(error && error.jobType) || ""}
            labelField={"name"}
            valueField={"slug"}
            customHandleBlur={() => validateInput("jobType")}
            onChangeValue={(value) => {
              handleJobDetailsChange("jobType", value);
            }}
            isMandatory
            customStyle={styles.customTextInputStyle}
          />
          <CustomToggleComponent
            label={intl.formatMessage({
              id: "label.urgent",
            })}
            isMandatory
            value={jobData.isUrgentJob}
            onValueChange={(item) => {
              handleJobDetailsChange("isUrgentJob", item);
            }}
            containerStyle={styles.customToggleContainerStyle(isWebView)}
            customToggleStyle={styles.customToggleStyle}
            customLabelStyle={styles.customLabelStyle}
          />
        </View>
      </View>
    );
  }
);

export default JobDetailsComponent;
