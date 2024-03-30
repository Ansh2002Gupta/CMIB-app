import React, { useContext, useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { View } from "@unthinkable/react-core-components";
import CustomTextEditor from "../../components/CustomTextEditor";
import { FormTabs } from "../../components/Tab/FormTabs";
import { CustomTabs } from "../../components/Tab";
import useFetch from "../../hooks/useFetch";
import IconHeader from "../../components/IconHeader/IconHeader";
import useGetAddNewJobData from "../../services/apiServices/hooks/AddNewJobs/useGetAddNewJobData";
import ViewJobs from "../../containers/ViewPostedJobDetails/ViewJobs";
import ViewQuestion from "../../containers/ViewPostedJobDetails/ViewQuestion";
import LoadingScreen from "../../components/LoadingScreen";
import { AddJobContext } from "../../globalContext/addJob/addJobsProvider";
import { jobType } from "../../constants/constants";
import { useIntl } from "react-intl";
import { getFormatedData, getQuestionType } from "../../utils/util";
import styles from "./ViewPostedJobDetails.styles";
import { POST_JOB, UPDATE_JOB } from "../../services/apiServices/apiEndPoint";
import Http from "../../services/http-service";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../constants/errorMessages";
import { useNavigate } from "../../routes";
import { navigations } from "../../constants/routeNames";

const ViewPostedJobDetails = () => {
  const navigate = useNavigate();
  const {
    data: apiData,
    isLoading: apiLoading,
    isError: apiIsError,
    error: apiError,
    fetchData: getData,
  } = useFetch({
    url: `${POST_JOB}/158`,
  });

  const { isLoading, isSuccess, isError, isErrorData, fetchData } =
    useGetAddNewJobData();
  const [questionnaireData, setQuestionnaireData] = useState([]);
  const [appData, setAppData] = useState([]);
  const [details, setDetails] = useState([]);
  const [addJobs] = useContext(AddJobContext);
  const [isActive, setActive] = useState(false);
  const intl = useIntl();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let obj = {};
    if (apiData && isSuccess) {
      obj.jobSummary = apiData.summary;
      obj.jobDetails = apiData.detail;
      obj.jobType = apiData.job_type_id
        ? addJobs.jobType
            .filter((item) => item.id === apiData.job_type_id)
            .map((item) => ({
              id: item.id,
              label: item.name,
              value: item.slug,
            }))[0]
        : {};
      obj.isUrgentJob = apiData.is_urgent ? 0 : 1;
      obj.salaryNagotiable = apiData.is_salary_negotiable == 1 ? 0 : 1 ?? 0;
      obj.minimumExperience = apiData?.min_experience;
      obj.maximumExperience = apiData?.max_experience;
      obj.jobLocation = apiData.locations
        ? apiData.locations.map((item) => ({
            id: item.id,
            label: item.city,
            value: item.city,
          }))
        : []; //
      obj.nationality = apiData.countryData
        ? addJobs.countryData
            ?.filter((item) => apiData.nationality.includes(item.name))
            .map((item) => ({
              id: item.id,
              label: item.name,
              value: item.slug,
            }))
        : ""; //
      obj.designation = apiData.designation;
      obj.functionalAreas =
        apiData.functional_areas.length > 0
          ? apiData.functional_areas.map((item) => ({
              id: item.id,
              label: item.name,
              value: item.slug,
            }))
          : [];
      obj.genderPreference = apiData.gender_preference
        ? addJobs.genderPreferenceData
            ?.filter((item) => item.name == apiData.gender_preference)
            .map((item) => ({
              id: item.name,
              label: item.label,
              value: item.name,
            }))[0]
        : {};
      obj.categoryPreference = apiData.category_preference
        ? addJobs.jobCategory
            ?.filter((item) => item.name == apiData.category_preference)
            .map((item) => ({
              id: item.id,
              label: item.name,
              value: item.slug,
            }))[0]
        : {}; //
      obj.essentialQualification = apiData.essential_qualification;
      obj.desiredQualification = apiData.desired_qualification;
      obj.jobOpeningDate = apiData.opening_date;
      obj.jobClosingDate = apiData.closing_date;
      obj.minimumSalary = apiData.min_salary;
      obj.maximumSalary = apiData.max_salary;
      obj.numberOfVacancies = apiData.vacancy;
      obj.modeofWork = apiData.work_mode
        ? addJobs.workModeData
            .filter((item) => {
              if (item.name == apiData.work_mode) {
                return item;
              }
            })
            .map((item) => ({
              id: item.id,
              label: item.name,
              value: item.slug,
            }))[0]
        : {}; //
      obj.flexiHours = apiData.flexi_hours ? 0 : 1;
      obj.vacanciesCountType = apiData.is_extended_vacancy == 1 ? 0 : 1;
      obj.fullTime = apiData.service_type == "Full Time" ? 0 : 1;
      obj.disabiltyPercentage = apiData?.disability_percentage ?? 0;
      obj.typeOfDisabilty = apiData?.disability_type ?? "";
      obj.contractYear = apiData?.contract_period
        ? apiData.contract_period.years
        : 0;
      obj.contractMonth = apiData?.contract_period
        ? apiData.contract_period.months
        : 0;
      obj.contractDay = apiData?.contract_period
        ? apiData.contract_period.days
        : 0;
    }
    setAppData(obj);
    const transformedQuestionnaire = apiData?.questionnaires.map((item) => {
      if (
        Array.isArray(item.question_options) &&
        item.question_options.length > 0
      ) {
        return {
          ...item,
          typeofQuestion: getQuestionType[item.type],
          isMandatory: item.mandatory,
          question_options: item.question_options.map((option, index) => ({
            id: Date.now() + index,
            value: option,
          })),
        };
      } else {
        return {
          ...item,
          typeofQuestion: getQuestionType[item.type],
          isMandatory: item.mandatory,
        };
      }
    });

    setQuestionnaireData(transformedQuestionnaire);
  }, [apiData, isSuccess]);

  useEffect(() => {
    if (apiData && addJobs.jobType) {
      let jobName = addJobs.jobType.find(
        (item) => item.id == apiData.job_type_id
      )?.name;
      let temp = [
        [
          {
            label: "label.job_summary",
            value: apiData?.summary,
            isMandatory: true,
          },
        ],
        [
          {
            label: "label.job_details",
            value: apiData?.detail,
            isMandatory: true,
            ShouldRenderOwnComponent: function () {
              return (
                <CustomTextEditor
                  value={apiData?.detail}
                  disabled={true}
                  quillContainerStyle={{ marginBottom: 24 }}
                  quilStyle={{ height: undefined }}
                />
              );
            },
          },
        ],
        [
          {
            label: "label.job_type",
            value: jobName ?? "-",
            isMandatory: true,
          },
          {
            label: "label.urgent",
            value: apiData?.is_urgent == 1 ? "Yes" : "No",
            isMandatory: true,
          },
          {},
        ],
        [
          {
            label: "label.minimum_experience",
            value: apiData?.min_experience,
            isMandatory: true,
          },
          {
            label: "label.maximum_experience",
            value: apiData?.max_experience,
          },

          {
            label: "label.nationality",
            value: apiData?.nationality ?? "-",
          },
        ],
        [
          {
            label: "label.designation",
            value: apiData?.designation ?? "-",
            isMandatory: true,
          },
          {
            label: "label.job_location",
            isMandatory: true,
            showBadgeLabel: true,
            customValue: apiData?.locations.map((item) => item.city) ?? "-",
            value: apiData?.locations ?? "-",
          },
          false ? {} : [],
        ],
        [
          {
            label: "label.functional_areas",
            isMandatory: true,
            showBadgeLabel: true,
            customValue:
              apiData?.functional_areas.map((item) => item.name) ?? "-",
          },
        ],
        [
          {
            label: "label.gender_preference",
            value: apiData?.gender_preference ?? "-",
          },
          {
            label: "label.category_preference",
            value: apiData?.category_preference ?? "-",
            isMandatory: true,
          },
          {},
        ],
        [
          {
            label: "label.essential_qualification",
            value: apiData?.essential_qualification ?? "-",
          },
        ],
        [
          {
            label: "label.desired_qualification",
            value: apiData?.desired_qualification ?? "-",
          },
        ],
        [
          {
            label: "label.job_opening_date",
            value: apiData?.opening_date
              ? dayjs(apiData?.opening_date).format("DD/MM/YYYY")
              : "-",
            isMandatory: true,
          },
          {
            label: "label.job_closing_date",
            value: apiData?.closing_date
              ? dayjs(apiData?.closing_date).format("DD/MM/YYYY")
              : "-",
            isMandatory: true,
          },
          {},
        ],
        [
          {
            label: "label.number_of_vacancies",
            value: apiData?.vacancy ?? "-",
            isMandatory: true,
          },
        ],
        [
          {
            label: "label.mode_of_work",
            value: apiData?.work_mode ?? "-",
            isMandatory: true,
          },
          {
            label: "label.flexi_hours",
            value: apiData?.flexi_hours ?? "-",
          },
          !jobName === jobType.CONTRACTUAL
            ? {
                label: "label.fullorPartTime",
                value: apiData?.service_type ?? "-",
                isMandatory: true,
              }
            : {},
        ],
        jobName === jobType.CONTRACTUAL
          ? [
              {
                label: "label.contractual_period_year",
                value: apiData?.contract_period.years ?? "-",
                isMandatory: true,
              },
              {
                label: "label.contractual_period_month",
                value: apiData?.contract_period.months ?? "-",
                isMandatory: true,
              },
              {
                label: "label.contractual_period_day",
                value: apiData?.contract_period.days ?? "-",
                isMandatory: true,
              },
            ]
          : [],
        jobName === jobType.SPECIALLY_ABLE
          ? [
              {
                label: "label.type_of_disability",
                value: apiData?.disability_type ?? "-",
                isMandatory: true,
              },
              {
                label: "label.disability_percentage",
                value: apiData?.disability_percentage ?? "-",
                isMandatory: true,
              },
            ]
          : [],

        [
          {
            label: "label.salary_negotiable",
            value: apiData?.is_salary_negotiable ?? "-",
          },
          {
            label: "label.minimum_salary",
            value: apiData?.min_salary ?? "-",
          },
          {
            label: "label.maximum_salary",
            value: apiData?.max_experience ?? "-",
          },
        ],
        [
          {
            label: "label.job_status",
            value: apiData?.status === 1 ? "Active" : "InActive" ?? "-",
          },
        ],
      ];
      setActive(apiData?.status === 1);

      setDetails(temp);
    }
  }, [apiData, addJobs]);

  return (
    <View style={styles.container}>
      <IconHeader
        headerText={apiData?.designation}
        isSwitchVisible
        isActive={isActive}
        isBorderVisible={false}
        handleSwitchChange={() => {
          setActive(!isActive);
        }}
      />
      <View style={styles.backgroundColorWhite}>
        <CustomTabs
          tabs={[
            {
              label: intl.formatMessage({ id: "label.job_details" }),
              component: <></>,
            },
            {
              label: intl.formatMessage({ id: "label.applicants" }),
              component: <View />,
            },
            {
              label: intl.formatMessage({ id: "label.schedule_interview" }),
              component: <View />,
            },
          ]}
        />
      </View>
      {isLoading || apiLoading ? (
        <LoadingScreen />
      ) : (
        <View style={styles.container}>
          <FormTabs
            onEditClick={() =>
              navigate(navigations.EDIT_JOB, {
                state: { jobData: appData, questionData: questionnaireData },
              })
            }
            tabs={[
              {
                label: intl.formatMessage({
                  id: "label.job_details",
                }),
                component: <ViewJobs details={details} />,
              },
              {
                label: intl.formatMessage({
                  id: "label.view_questionaire",
                }),
                component: (
                  <ViewQuestion questionnaireData={questionnaireData} />
                ),
              },
            ]}
            isEditButtonVisible
          />
        </View>
      )}
      {!isLoading && isError && apiIsError && (
        <ErrorComponent
          errorMsg={
            isErrorData?.data?.message ||
            apiError?.data?.message ||
            GENERIC_GET_API_FAILED_ERROR_MESSAGE
          }
        />
      )}
    </View>
  );
};
export default ViewPostedJobDetails;
