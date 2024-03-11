import React from "react";
import { Text, View } from "@unthinkable/react-core-components";
import CustomTextInput from "../../../components/CustomTextInput";
import CustomToggleComponent from "../../../components/CustomToggleComponent/CustomToggleComponent";
import styles from "./BottomSection.styles"; // Import the styles
import { useIntl } from "react-intl";

const BottomSection = ({ isWebView, jobData, handleJobDetailsChange }) => {
  // Helper function to switch styles based on the isWebView prop
  const getStyle = (style, styleColumn) => (isWebView ? style : styleColumn);
  const intl = useIntl();

  return (
    <View>
      <View
        style={getStyle(styles.flexDirectionRow, styles.flexDirectionColumn)}
      >
        <CustomTextInput
          label={intl.formatMessage({ id: "label.job_opening_date" })}
          isCalendar
          isMandatory
          value={jobData.jobOpeningDate}
          onChangeValue={(val) => {
            handleJobDetailsChange("jobOpeningDate", val);
          }}
          customStyle={getStyle(
            styles.textInputStyle,
            styles.textInputStyleColumn
          )}
        />
        <CustomTextInput
          label={intl.formatMessage({ id: "label.job_closing_date" })}
          isCalendar
          isMandatory
          value={jobData.jobClosingDate}
          onChangeValue={(val) => {
            handleJobDetailsChange("jobClosingDate", val);
          }}
          customStyle={getStyle(
            styles.textInputStyle,
            styles.textInputStyleColumn
          )}
        />
        {isWebView && <View style={styles.spacer} />}
      </View>

      <View
        style={getStyle(styles.flexDirectionRow, styles.flexDirectionColumn)}
      >
        <CustomTextInput
          label={intl.formatMessage({ id: "label.number_of_vacancies" })}
          isCounterInput
          isMandatory
          value={jobData.numberOfVacancies}
          handleCountChange={(val) =>
            handleJobDetailsChange("numberOfVacancies", val)
          }
          countValue={jobData.numberOfVacancies}
          customStyle={getStyle(
            styles.textInputStyle,
            styles.textInputStyleColumn
          )}
        />
        <CustomToggleComponent
          label={intl.formatMessage({ id: "label.vacancy_count_type" })}
          toggleTitle1={"label.20"}
          toggleTitle2={"label.more_than_20"}
          isMandatory
          value={jobData.vacanciesCountType}
          onValueChange={(item) => {
            handleJobDetailsChange("vacanciesCountType", item);
          }}
          containerStyle={getStyle(
            styles.toggleComponentContainerStyle,
            styles.toggleComponentContainerStyleColumn
          )}
          customToggleStyle={styles.toggleComponentStyle}
          customLabelStyle={styles.labelStyle}
        />
        {isWebView && <View style={styles.spacer} />}
      </View>
      <View
        style={getStyle(styles.flexDirectionRow, styles.flexDirectionColumn)}
      >
        <CustomTextInput
          label={intl.formatMessage({ id: "label.mode_of_work" })}
          isDropdown
          customStyle={getStyle(
            styles.textInputStyle,
            styles.textInputStyleColumn
          )}
        />
        <CustomToggleComponent
          label={intl.formatMessage({ id: "label.flexi_hours" })}
          value={jobData.flexiHours}
          onValueChange={(item) => {
            handleJobDetailsChange("flexiHours", item);
          }}
          containerStyle={getStyle(
            styles.toggleComponentContainerStyle,
            styles.toggleComponentContainerStyleColumn
          )}
          customToggleStyle={styles.toggleComponentStyle}
          customLabelStyle={styles.labelStyle}
        />

        <CustomToggleComponent
          label={intl.formatMessage({ id: "label.fullorPartTime" })}
          isMandatory
          value={jobData.fullTime}
          onValueChange={(item) => {
            handleJobDetailsChange("fullTime", item);
          }}
          containerStyle={styles.toggleComponentContainerStyleColumn}
          customToggleStyle={styles.toggleComponentStyle}
          customLabelStyle={styles.labelStyle}
        />
      </View>

      {
        //For Disable Personal only
        <View style={styles.row(isWebView)}>
          <CustomTextInput
            label={intl.formatMessage({ id: "label.type_of_disability" })}
            isMandatory
            value={jobData.typeOfDisabilty}
            onChangeText={(val) => {
              handleJobDetailsChange("typeOfDisabilty", val);
            }}
            customStyle={styles.disablityPreferenceStyle(isWebView)}
          />
          <CustomTextInput
            label={intl.formatMessage({
              id: "label.disability_percentage",
            })}
            isCounterInput
            isMandatory
            value={jobData.disabiltyPercentage}
            handleCountChange={(val) => {
              handleJobDetailsChange("disabiltyPercentage", val);
            }}
            customStyle={styles.disablityPreferenceStyle(isWebView)}
          />
          {isWebView && <View style={styles.spacer} />}
        </View>
      }
      <View
        style={getStyle(styles.flexDirectionRow, styles.flexDirectionColumn)}
      >
        <CustomToggleComponent
          label={intl.formatMessage({
            id: "label.salary_negotiable",
          })}
          containerStyle={getStyle(
            styles.toggleComponentContainerStyle,
            styles.toggleComponentContainerStyleColumn
          )}
          value={jobData.salaryNagotiable}
          onValueChange={(item) => {
            handleJobDetailsChange("salaryNagotiable", item);
          }}
          customToggleStyle={styles.toggleComponentStyle}
          customLabelStyle={styles.labelStyle}
        />
        <CustomTextInput
          label={intl.formatMessage({
            id: "label.minimum_salary",
          })}
          isCounterInput
          value={jobData.minimumSalary}
          handleCountChange={(val) => {
            handleJobDetailsChange("minimumSalary", val);
          }}
          customStyle={getStyle(
            styles.textInputStyle,
            styles.textInputStyleColumn
          )}
        />
        <CustomTextInput
          label={intl.formatMessage({
            id: "label.maximum_salary",
          })}
          isCounterInput
          value={jobData.minimumSalary}
          handleCountChange={(val) => {
            handleJobDetailsChange("minimumSalary", val);
          }}
          customStyle={styles.textInputStyleColumn}
        />
      </View>
      <View style={styles.marginBottom24}>
        <Text style={styles.noteTextStyle}>
          {intl.formatMessage({
            id: "label.job_instruction",
          })}
        </Text>
      </View>
    </View>
  );
};

export default BottomSection;
