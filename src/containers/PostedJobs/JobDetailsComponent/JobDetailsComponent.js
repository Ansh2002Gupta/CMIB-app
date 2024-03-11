import React from "react";
import { View } from "@unthinkable/react-core-components";
import CustomTextInput from "../../../components/CustomTextInput";
import CustomTextEditor from "../../../components/CustomTextEditor/CustomTextEditor";
import CustomToggleComponent from "../../../components/CustomToggleComponent/CustomToggleComponent";
import styles from "./JobDetailsComponent.style";
import { useIntl } from "react-intl";

const JobDetailsComponent = ({
  isWebView,
  jobData,
  handleJobDetailsChange,
}) => {
  const intl = useIntl();

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
          onChangeText={(val) => {
            handleJobDetailsChange("jobDetails", val);
          }}
        />
      </View>
      <View style={styles.flexDirectionRowColumn(isWebView)}>
        <CustomTextInput
          label={intl.formatMessage({
            id: "label.job_type",
          })}
          isDropdown
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
