import React, {
  forwardRef,
  useContext,
  useImperativeHandle,
  useState,
} from "react";
import { Platform, Text, View } from "@unthinkable/react-core-components";
import CustomTextInput from "../../../components/CustomTextInput";
import CustomToggleComponent from "../../../components/CustomToggleComponent/CustomToggleComponent";
import styles from "./BottomSection.styles"; // Import the styles
import { useIntl } from "react-intl";

import { AddJobContext } from "../../../globalContext/addJob/addJobsProvider";
import CustomLabelView from "../../../components/CustomLabelView";
import { jobType } from "../../../constants/constants";

const BottomSection = forwardRef(({ isWebView, error }, ref) => {
  const getStyle = (style, styleColumn) => (isWebView ? style : styleColumn);
  const intl = useIntl();
  const [addJobs] = useContext(AddJobContext);
  const { workModeData } = addJobs;
  const isWeb = Platform.OS.toLowerCase() === "web" && !isWebView;
  const [jobData, setJobData] = useState({
    jobOpeningDate: new Date(),
    jobClosingDate: new Date(),
    numberOfVacancies: 0,
    vacanciesCountType: 0,
    modeofWork: {},
    flexiHours: 0,
    fullTime: 0,
    typeOfDisabilty: "",
    disabiltyPercentage: 0,
    salaryNagotiable: 0,
    minimumSalary: 0,
    maximumSalary: 0,
    contractYear: 0,
    contractMonth: 0,
    contractDay: 0,
  });

  const getBottomSectionDetails = () => {
    return jobData;
  };

  useImperativeHandle(ref, () => ({
    getBottomSectionDetails: getBottomSectionDetails,
  }));

  const handleJobDetailsChange = (field, value) => {
    setJobData((prev) => {
      return {
        ...prev,
        [field]: value,
      };
    });
  };

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
          isError={(error && error.jobOpeningDate && true) || false}
          errorMessage={(error && error.jobOpeningDate) || ""}
          onChangeValue={(val) => {
            handleJobDetailsChange("jobOpeningDate", val);
            handleJobDetailsChange("jobClosingDate", val);
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
          isError={(error && error.jobClosingDate && true) || false}
          errorMessage={(error && error.jobClosingDate) || ""}
          minDate={jobData.jobOpeningDate}
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
          isError={(error && error.numberOfVacancies && true) || false}
          errorMessage={(error && error.numberOfVacancies) || ""}
          handleCountChange={(val) =>
            handleJobDetailsChange("numberOfVacancies", val)
          }
          maxCount={99999}
          countValue={jobData.numberOfVacancies}
          customStyle={getStyle(
            styles.textInputStyle,
            styles.textInputStyleColumn
          )}
        />
        <CustomToggleComponent
          label={intl.formatMessage({ id: "label.vacancy_count_type" })}
          toggleTitle1={`"${jobData.numberOfVacancies}"`}
          toggleTitle2={`"${intl.formatMessage({ id: "label.more_than" })} ${
            jobData.numberOfVacancies
          }"`}
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
        style={{
          ...getStyle(styles.flexDirectionRow, styles.flexDirectionColumn),
          ...(!isWeb && styles.spacer),
        }}
      >
        <CustomTextInput
          label={intl.formatMessage({ id: "label.mode_of_work" })}
          options={workModeData || []}
          onChangeValue={(value) => {
            handleJobDetailsChange("modeofWork", value);
          }}
          isMandatory
          value={jobData.modeofWork?.label}
          isError={(error && error.modeofWork && true) || false}
          errorMessage={(error && error.modeofWork) || ""}
          labelField={"name"}
          valueField={"name"}
          isDropdown
          includeAllKeys={true}
          selectAllField={true}
          customStyle={{
            ...getStyle(styles.textInputStyle, styles.textInputStyleColumn),
            ...styles.spacer,
          }}
        />
        <CustomToggleComponent
          label={intl.formatMessage({ id: "label.flexi_hours" })}
          value={jobData.flexiHours}
          onValueChange={(item) => {
            handleJobDetailsChange("flexiHours", item);
          }}
          containerStyle={{
            ...getStyle(
              styles.toggleComponentContainerStyle,
              styles.toggleComponentContainerStyleColumn
            ),
            ...styles.spacer,
          }}
          customToggleStyle={styles.toggleComponentStyle}
          customLabelStyle={styles.labelStyle}
        />
        {isWebView &&
          (jobData.jobType?.label == jobType.CONTRACTUAL ||
            !jobData.jobType?.label) && <View style={styles.spacer} />}

        {(jobData.jobType?.label == jobType.REGULAR ||
          jobData.jobType?.label == jobType.RETIRED) && (
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
        )}
      </View>
      {jobData.jobType?.label === jobType.CONTRACTUAL && (
        <View style={styles.contractualPeriodViewStyle}>
          <View>
            <CustomLabelView
              label={intl.formatMessage({ id: "label.contractual_period" })}
              isMandatory
            />
          </View>

          <View
            style={{
              ...(isWeb ? styles.flexDirectionColumn : styles.flexOneRow),
            }}
          >
            <CustomTextInput
              isMandatory
              numberText={intl.formatMessage({ id: "label.year" })}
              countValue={jobData.contractYear}
              isError={(error && error.contractYear && true) || false}
              errorMessage={(error && error.contractYear) || ""}
              isCounterInput
              handleCountChange={(item) => {
                handleJobDetailsChange("contractYear", item);
              }}
              customStyle={styles.spacer}
            />
            <CustomTextInput
              countValue={jobData.contractMonth}
              isCounterInput
              numberText={intl.formatMessage({ id: "label.month" })}
              isError={(error && error.contractMonth && true) || false}
              errorMessage={(error && error.contractMonth) || ""}
              handleCountChange={(item) => {
                handleJobDetailsChange("contractMonth", item);
              }}
              customStyle={isWeb ? styles.spacer : styles.flex1MarginLeft8}
            />
            <CustomTextInput
              isMandatory
              isCounterInput
              countValue={jobData.contractDay}
              isError={(error && error.contractDay && true) || false}
              errorMessage={(error && error.contractDay) || ""}
              numberText={intl.formatMessage({ id: "label.day" })}
              handleCountChange={(item) => {
                handleJobDetailsChange("contractDay", item);
              }}
              customStyle={
                isWeb ? styles.flex1marginBottom48 : styles.flex1MarginLeft8
              }
            />
          </View>
        </View>
      )}
      {jobData.jobType?.label === jobType.SPECIALLY_ABLE && (
        <View style={styles.row(isWebView)}>
          <CustomTextInput
            label={intl.formatMessage({ id: "label.type_of_disability" })}
            isMandatory
            isError={(error && error.typeOfDisabilty && true) || false}
            errorMessage={(error && error.typeOfDisabilty) || ""}
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
            countValue={jobData.disabiltyPercentage}
            isError={(error && error.disabiltyPercentage && true) || false}
            errorMessage={(error && error.disabiltyPercentage) || ""}
            handleCountChange={(val) => {
              handleJobDetailsChange("disabiltyPercentage", val);
            }}
            customStyle={styles.disablityPreferenceStyle(isWebView)}
          />
          {isWebView && <View style={styles.spacer} />}
        </View>
      )}
      <View
        style={[styles.marginBottom24, !isWebView && styles.bottomContainer]}
      >
        <View
          style={[
            getStyle(styles.flexDirectionRow, styles.flexDirectionColumn),
          ]}
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
            countValue={jobData.minimumSalary}
            handleCountChange={(val) => {
              handleJobDetailsChange("minimumSalary", val);
            }}
            isError={(error && error.minimumSalary && true) || false}
            errorMessage={(error && error.minimumSalary) || ""}
            maxCount={99999999999}
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
            isError={(error && error.maximumSalary && true) || false}
            errorMessage={(error && error.maximumSalary) || ""}
            countValue={jobData.maximumSalary}
            maxCount={99999999999}
            handleCountChange={(val) => {
              handleJobDetailsChange("maximumSalary", val);
            }}
            customStyle={styles.textInputStyleColumn}
          />
        </View>
        <View>
          <Text style={styles.noteTextStyle}>
            {intl.formatMessage({
              id: "label.job_instruction",
            })}
          </Text>
        </View>
      </View>
    </View>
  );
});

export default BottomSection;
