import React, {
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import dayjs from "dayjs";
import { Platform, Text, View } from "@unthinkable/react-core-components";

import CustomTextInput from "../../../components/CustomTextInput";
import CustomToggleComponent from "../../../components/CustomToggleComponent/CustomToggleComponent";
import { AddJobContext } from "../../../globalContext/addJob/addJobsProvider";
import CustomLabelView from "../../../components/CustomLabelView";

import { jobType } from "../../../constants/constants";
import { useIntl } from "react-intl";
import styles from "./BottomSection.styles";

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const BottomSection = forwardRef(
  ({ addNewJobData, isWebView, selectedJobType }, ref) => {
    const getStyle = (style, styleColumn) => (isWebView ? style : styleColumn);
    const intl = useIntl();
    const [addJobs] = useContext(AddJobContext);
    const { workModeData } = addJobs;
    const minDate = useRef(tomorrow);
    const isWeb = Platform.OS.toLowerCase() === "web" && !isWebView;
    const [jobData, setJobData] = useState({
      jobOpeningDate: addNewJobData?.jobOpeningDate ?? today,
      jobClosingDate: addNewJobData?.jobClosingDate ?? tomorrow,
      numberOfVacancies: addNewJobData?.numberOfVacancies ?? 0,
      vacanciesCountType: addNewJobData?.vacanciesCountType ?? 0,
      modeofWork: addNewJobData?.modeofWork ?? {},
      flexiHours: addNewJobData?.flexiHours ?? 0,
      fullTime: addNewJobData?.fullTime ?? 0,
      typeOfDisabilty: addNewJobData?.typeOfDisabilty ?? "",
      disabiltyPercentage: addNewJobData?.disabiltyPercentage ?? 0,
      salaryNagotiable: addNewJobData?.salaryNagotiable ?? 0,
      minimumSalary: addNewJobData?.minimumSalary ?? 0,
      maximumSalary: addNewJobData?.maximumSalary ?? 0,
      contractYear: addNewJobData?.contractYear ?? 0,
      contractMonth: addNewJobData?.contractMonth ?? 0,
      contractDay: addNewJobData?.contractDay ?? 0,
    });
    const [error, setError] = useState({
      jobOpeningDate: "",
      jobClosingDate: "",
      numberOfVacancies: "",
      modeofWork: "",
      typeOfDisabilty: "",
      disabiltyPercentage: "",
      minimumSalary: "",
      maximumSalary: "",
      contractYear: "",
      contractMonth: "",
      contractDay: "",
    });

    const validateInput = (field) => {
      let hasError = false;
      const addError = (field, message) => {
        setError((prev) => ({ ...prev, [field]: message }));
        hasError = true;
      };
      switch (field) {
        case "numberOfVacancies":
          if (jobData.numberOfVacancies === 0) {
            addError(field, "Should be greater than 0");
          }
          if (jobData.numberOfVacancies.length == 0) {
            addError(field, intl.formatMessage({ id: "label.mandatory" }));
          }
          break;
        case "modeofWork":
          if (Object.values(jobData.modeofWork).length === 0) {
            addError(field, intl.formatMessage({ id: "label.mandatory" }));
          }
          break;
        case "typeOfDisabilty":
          if (
            selectedJobType?.label === jobType.SPECIALLY_ABLE &&
            !jobData.typeOfDisabilty
          ) {
            addError(field, intl.formatMessage({ id: "label.mandatory" }));
          }
          break;
        case "disabiltyPercentage":
          if (
            selectedJobType?.label === jobType.SPECIALLY_ABLE &&
            !jobData.disabiltyPercentage
          ) {
            addError(field, intl.formatMessage({ id: "label.mandatory" }));
          }
          break;
        case "maximumSalary":
          if (jobData.minimumSalary > jobData.maximumSalary) {
            addError("maximumSalary", "Invalid Salary");
            addError("minimumSalary", "Invalid Salary");
          } else if (jobData.maximumSalary == 0 || jobData.maximumSalary == 0) {
            addError("maximumSalary", "Invalid Salary");
            addError("minimumSalary", "Invalid Salary");
          }
          break;
        case "contractYear":
          if (
            selectedJobType?.label === jobType.CONTRACTUAL &&
            jobData.contractDay === 0 &&
            jobData.contractMonth === 0 &&
            jobData.contractYear === 0
          ) {
            addError("contractDay", "Invalid Day");
            addError("contractMonth", "Invalid Month");
            addError("contractYear", "Invalid Year");
          }
          break;
        default:
          break;
      }

      return hasError;
    };

    const getBottomSectionDetails = () => {
      return jobData;
    };
    const getErrors = () => {
      let hasError = false;

      Object.keys(error).forEach((field) => {
        let isValid = validateInput(field);
        if (isValid) {
          hasError = true;
        }
      });
      return hasError;
    };
    useImperativeHandle(ref, () => ({
      getBottomSectionDetails: getBottomSectionDetails,
      getErrors: getErrors,
    }));

    const handleJobDetailsChange = (field, value) => {
      const contractFields = ["contractDay", "contractMonth", "contractYear"];
      const salaryFields = ["maximumSalary", "minimumSalary"];
      const isContractField = contractFields.includes(field);
      const hasContractError = contractFields.some((f) => error[f]);
      const isSalaryField = salaryFields.includes(field);
      const hasSalaryError = salaryFields.some((f) => error[f]);
      if (isContractField && hasContractError) {
        setError((prev) => ({
          ...prev,
          contractDay: "",
          contractMonth: "",
          contractYear: "",
        }));
      } else if (isSalaryField && hasSalaryError) {
        setError((prev) => ({
          ...prev,
          maximumSalary: "",
          minimumSalary: "",
        }));
      } else if (error[field]) {
        setError((prev) => ({
          ...prev,
          [field]: "",
        }));
      }

      setJobData((prev) => ({
        ...prev,
        [field]: value,
      }));
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
              const date1 = dayjs(val);
              const date2 = dayjs(jobData.jobClosingDate);
              if (date2.isBefore(date1) || date2.add(1, "day") !== date1) {
                var nextDay = new Date(val);
                nextDay.setDate(val.getDate() + 1);
                minDate.current = nextDay;
                handleJobDetailsChange("jobClosingDate", nextDay);
              }
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
            isError={(error && error.jobClosingDate && true) || false}
            errorMessage={(error && error.jobClosingDate) || ""}
            minDate={minDate.current}
            value={jobData.jobClosingDate}
            onChangeValue={(val) => {
              const date1 = dayjs(val);
              const date2 = dayjs(jobData.jobOpeningDate);
              if (date2.isAfter(date1)) {
                handleJobDetailsChange("jobOpeningDate", val);
              }

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
            customHandleBlur={() => validateInput("numberOfVacancies")}
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
            toggleTitle1={`"${
              jobData.numberOfVacancies.length === 0
                ? 0
                : jobData.numberOfVacancies
            }"`}
            toggleTitle2={`"${intl.formatMessage({ id: "label.more_than" })} ${
              jobData.numberOfVacancies.length === 0
                ? 0
                : jobData.numberOfVacancies
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
            placeholder={intl.formatMessage({
              id: "label.select_mode_of_work",
            })}
            customHandleBlur={() => validateInput("modeofWork")}
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
          {isWebView && selectedJobType?.label === jobType.SPECIALLY_ABLE && (
            <View style={styles.spacer} />
          )}

          {isWebView &&
            (selectedJobType?.label == jobType.CONTRACTUAL ||
              !selectedJobType?.label) && <View style={styles.spacer} />}

          {(selectedJobType?.label == jobType.REGULAR ||
            selectedJobType?.label == jobType.RETIRED) && (
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
        {selectedJobType?.label === jobType.CONTRACTUAL && (
          <View style={styles.contractualPeriodViewStyle}>
            <View>
              <CustomLabelView
                label={`${intl.formatMessage({
                  id: "label.contractual_period",
                })} ${intl.formatMessage({
                  id: "label.year_month_day",
                })}`}
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
                customStyle={
                  isWeb
                    ? styles.spacer
                    : { ...styles.flex1MarginLeft8, ...{ marginLeft: 24 } }
                }
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
                  isWeb
                    ? styles.flex1marginBottom48
                    : { ...styles.flex1MarginLeft8, ...{ marginLeft: 24 } }
                }
              />
            </View>
          </View>
        )}
        {selectedJobType?.label === jobType.SPECIALLY_ABLE && (
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
              customHandleBlur={() => validateInput("typeOfDisabilty")}
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
  }
);

export default BottomSection;
