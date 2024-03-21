import React, { useContext } from "react";
import { View } from "@unthinkable/react-core-components";
import CustomTextInput from "../../../components/CustomTextInput";
import CustomTextEditor from "../../../components/CustomTextEditor/CustomTextEditor";
import CustomToggleComponent from "../../../components/CustomToggleComponent/CustomToggleComponent";
import styles from "./JobDetailsComponent.style";
import { useIntl } from "react-intl";
import { AddJobContext } from "../../../globalContext/addJob/addJobsProvider";

const JobDetailsComponent = ({
  isWebView,
  jobData,
  handleJobDetailsChange,
  error,
}) => {
  const intl = useIntl();
  const [addJobs] = useContext(AddJobContext);
  const { jobType } = addJobs;
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
          value={jobData.jobType.value}
          options={jobType || []}
          isError={(error && error.jobType && true) || false}
          errorMessage={(error && error.jobType) || ""}
          labelField={"name"}
          valueField={"slug"}
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
};

export default JobDetailsComponent;
