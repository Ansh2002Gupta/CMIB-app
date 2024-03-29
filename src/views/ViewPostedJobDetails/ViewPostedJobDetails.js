import { View, ScrollView } from "@unthinkable/react-core-components";
import React, { useContext, useEffect, useState } from "react";
import CommonText from "../../components/CommonText";
import CustomTextEditor from "../../components/CustomTextEditor";
import { FormTabs } from "../../components/Tab/FormTabs";
import { CustomTabs } from "../../components/Tab";
import TouchableImage from "../../../src/components/TouchableImage";
import DetailComponent from "../../../src/components//DetailComponent/DetailComponent";

import images from "../../images";
import colors from "../../assets/colors";
import CardComponent from "../../components/CardComponent";
import useFetch from "../../hooks/useFetch";
import AddModifyQuestionaireComponent from "../../containers/AddModifyNewJobs/AddModifyQuestionaireComponent/AddModifyQuestionaireComponent";
import useIsWebView from "../../hooks/useIsWebView";
import { getQuestionType } from "../../utils/util";
import IconHeader from "../../components/IconHeader/IconHeader";
import EditJobDetails from "../EditJobDetails";
import useGetAddNewJobData from "../../services/apiServices/hooks/AddNewJobs/useGetAddNewJobData";
import { AddJobContext } from "../../globalContext/addJob/addJobsProvider";
import AddModifyJobComponent from "../../containers/AddModifyNewJobs/AddModifyJobComponent";
const dataApi = {
  id: 62,
  approved: 0,
  approved_by: 1,
  category_preference: "General",
  closing_date: "2024-04-06 00:00:00",
  company_id: 1,
  company_name: "Test Company",
  contract_period: null,
  created_at: "2024-03-14T09:40:48.000000Z",
  created_by: 84,
  designation: "Engineer",
  qualification_details: "BCA",
  perks: "Remote Job",
  desired_qualification: "Master's degree in Computer Science",
  detail:
    "<ul><li>Responsibilities include coding,</li><li>testing, and debugging.</li></ul>",
  disability_percentage: 20,
  disability_type: "Intellectual Disability",
  essential_qualification: "Bachelor's degree in Computer Science",
  flexi_hours: 0,
  functional_areas: [],
  gender_preference: "Male",
  industry: null,
  is_contractual: 1,
  is_for_disabled: 1,
  is_salary_negotiable: 1,
  is_urgent: 1,
  location: [],
  max_experience: 5,
  max_salary: 800000,
  min_experience: 2,
  min_salary: 600000,
  mode: null,
  nationality: "Any",
  opening_date: "2024-03-20 00:00:00",
  service_type: "Full Time",
  status: 1,
  summary: "Exciting opportunity for a skilled software engineer.",
  type: null,
  updated_at: "2024-03-14T09:40:48.000000Z",
  updated_by: null,
  vacancy: 5,
  questionnaire: [
    {
      id: 35,
      question: "Select your preferred php framework",
      type: "multi-select",
      mandatory: 1,
      company_id: 2,
      created_at: "2024-03-11T08:43:28.000000Z",
      updated_at: "2024-03-11T08:43:28.000000Z",
      deleted_at: null,
      job_id: 62,
      question_options: ["laravel", "symphony"],
      question_order: null,
    },
    {
      id: 52,
      question: "What is your full name?",
      type: "text",
      mandatory: 0,
      company_id: 1,
      created_at: "2024-03-14T09:40:48.000000Z",
      updated_at: "2024-03-14T09:40:48.000000Z",
      deleted_at: null,
      job_id: 62,
      question_options: null,
      question_order: 0,
    },
    {
      id: 72,
      question: "What is your favorite color?",
      type: "single_select",
      mandatory: 0,
      company_id: 1,
      created_at: "2024-03-14T13:43:06.000000Z",
      updated_at: "2024-03-14T13:43:06.000000Z",
      deleted_at: null,
      job_id: 62,
      question_options: ["Red", "Blue", "Green"],
      question_order: 0,
    },
    {
      id: 73,
      question: "Select your preferred programming languages",
      type: "multi_select",
      mandatory: 1,
      company_id: 1,
      created_at: "2024-03-14T13:43:06.000000Z",
      updated_at: "2024-03-14T13:43:06.000000Z",
      deleted_at: null,
      job_id: 62,
      question_options: ["JavaScript", "Python", "Java", "C#"],
      question_order: 0,
    },
    {
      id: 74,
      question: "Select your preferred php framework",
      type: "multi_select",
      mandatory: 0,
      company_id: 1,
      created_at: "2024-03-14T13:43:06.000000Z",
      updated_at: "2024-03-14T13:43:06.000000Z",
      deleted_at: null,
      job_id: 62,
      question_options: ["laravel", "symphony"],
      question_order: 0,
    },
  ],
};
const details = [
  [
    {
      label: "label.job_summary",
      value: dataApi.summary,
      isMandatory: true,
    },
  ],
  [
    {
      label: "label.job_details",
      value: dataApi.detail,
      isMandatory: true,
      ShouldRenderOwnComponent: function () {
        return (
          <CustomTextEditor
            value={dataApi.detail}
            disabled={true}
            // label={intl.formatMessage({
            //   id: "label.job_details",
            // })}
            // isError={(error && error.jobDetails && true) || false}
            // errorMessage={(error && error.jobDetails) || ""}
            // customHandleBlur={() => validateInput("jobDetails")}
            // onChangeText={(val) => {
            //   handleJobDetailsChange("jobDetails", val);
            // }}
          />
        );
      },
      style: {
        padding: 16,
        borderWidth: 0.5,
        borderColor: "gray",
        marginBottom: 10,
        borderRadius: 12,
      },
    },
  ],
  [
    {
      label: "label.job_type",
      value: dataApi.type ?? "-",
      isMandatory: true,
    },
    {
      label: "label.urgent",
      value: dataApi.is_urgent,
      isMandatory: true,
    },
    {},
  ],
  [
    {
      label: "label.minimum_experience",
      value: dataApi.min_experience,
      isMandatory: true,
    },
    {
      label: "label.maximum_experience",
      value: dataApi.max_experience,
    },

    {
      label: "label.nationality",
      value: dataApi.nationality ?? "-",
    },
  ],
  [
    {
      label: "label.designation",
      value: dataApi.designation ?? "-",
      isMandatory: true,
    },
    {
      label: "label.job_location",
      value: dataApi.location ?? "-",
      isMandatory: true,
    },
    {},
  ],
  [
    {
      label: "label.functional_areas",
      isMandatory: true,
      showBadgeLabel: true,
      customValue: dataApi.functional_areas ?? "-",
    },
  ],
  [
    {
      label: "label.gender_preference",
      value: dataApi.gender_preference ?? "-",
    },
    {
      label: "label.category_preference",
      value: dataApi.category_preference ?? "-",
      isMandatory: true,
    },
    {},
  ],
  [
    {
      label: "label.essential_qualification",
      value: dataApi.essential_qualification ?? "-",
    },
  ],
  [
    {
      label: "label.desired_qualification",
      value: dataApi.desired_qualification ?? "-",
    },
  ],
  [
    {
      label: "label.job_opening_date",
      value: dataApi.opening_date ?? "-",
      isMandatory: true,
    },
    {
      label: "label.job_closing_date",
      value: dataApi.closing_date ?? "-",
      isMandatory: true,
    },
    {},
  ],
  [
    {
      label: "label.number_of_vacancies",
      value: dataApi.vacancy ?? "-",
      isMandatory: true,
    },
  ],
  [
    {
      label: "label.mode_of_work",
      value: dataApi.mode ?? "-",
      isMandatory: true,
    },
    {
      label: "label.flexi_hours",
      value: dataApi.flexi_hours ?? "-",
    },
    {
      label: "label.fullorPartTime",
      value: dataApi.service_type ?? "-",
      isMandatory: true,
    },
  ],
  [
    {
      label: "label.salary_negotiable",
      value: dataApi.is_salary_negotiable ?? "-",
    },
    {
      label: "label.minimum_salary",
      value: dataApi.min_salary ?? "-",
    },
    {
      label: "label.maximum_salary",
      value: dataApi.max_experience ?? "-",
    },
  ],
  [
    {
      label: "label.job_status",
      value: dataApi.status === 1 ? "Active" : "InActive" ?? "-",
    },
  ],
];

const ViewPostedJobDetails = () => {
  const {
    data: apiData,
    // isLoading,
    // isError,
    // error,
  } = useFetch({
    url: "/company/jobs/132",
  });
  const { isLoading, isSuccess, isError, isErrorData, fetchData } =
    useGetAddNewJobData();

  const [isEdited, setIsEdit] = useState(false);
  const [questionnaireData, setQuestionnaireData] = useState([]);
  const [appData, setAppData] = useState([]);
  const [addJobs] = useContext(AddJobContext);
  console.log(appData);

  useEffect(() => {
    fetchData();
  }, []);
  console.log("APIDARA", addJobs);
  useEffect(() => {
    let obj = {};
    if (apiData && isSuccess) {
      obj.jobSummary = apiData.summary;
      obj.jobDetails = apiData.detail;
      obj.jobType = addJobs.jobType
        .filter((item) => item.id === apiData.job_type_id)
        .map((item) => ({
          id: item.id,
          label: item.name,
          value: item.slug,
        }));
      obj.isUrgentJob = apiData.is_urgent ? 0 : 1;
      obj.salaryNagotiable = apiData.is_salary_negotiable;
      obj.minimumExperience = apiData.experience?.min_experience;
      obj.maximumExperience = apiData.experience?.max_experience;
      obj.jobLocation = apiData.location_id
        ? addJobs.jobLocationData
            .filter((item) => apiData.location_id.includes(item.id))
            .map((item) => ({
              id: item.id,
              label: item.name,
              value: item.slug,
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
        apiData.functional_area_id.length > 0
          ? addJobs.genderPreferenceData
              .filter((item) => apiData.functional_area_id.includes(item.id))
              .map((item) => ({
                id: item.id,
                label: item.name,
                value: item.slug,
              }))
          : []; //
      obj.genderPreference =
        addJobs.genderPreferenceData &&
        addJobs.genderPreferenceData?.filter(
          (item) => item.name == apiData.gender_preference
        ); //
      obj.categoryPreference = apiData.category_preference; //
      obj.essentialQualification = apiData.essential_qualification;
      obj.desiredQualification = apiData.desired_qualification;
      obj.jobOpeningDate = apiData.job_opening_date;
      obj.jobClosingDate = apiData.job_closing_date;
      obj.minimumSalary = apiData.min_salary;
      obj.maximumSalary = apiData.max_salary;
      obj.numberOfVacancies = apiData.number_of_vacancies;
      obj.modeofWork =
        addJobs.genderPreferenceData &&
        addJobs.genderPreferenceData.filter(
          (item) => item.name == apiData.work_mode
        ); //
      obj.flexiHours = apiData.flexi_hours ? 0 : 1;
      obj.vacanciesCountType = apiData.is_extended_vacancy ? 1 : 0;
      obj.fullTime = apiData.service_type == "Full Time" ? 0 : 1;
      obj.disabiltyPercentage = apiData?.disability_percentage;
      obj.typeOfDisabilty = apiData?.disability_type;
    }
    setAppData(obj);

    const transformedQuestionnaire = dataApi.questionnaire.map((item) => {
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
  return (
    <View style={{ flex: 1 }}>
      <IconHeader headerText={"Hello"} />
      <View style={{ backgroundColor: "white", height: 80 }}>
        <CustomTabs
          tabs={[
            { label: "Job Details", component: <View /> },
            { label: "Applicants", component: <View /> },
            { label: "Scheduled Interview", component: <View /> },
          ]}
        />
      </View>
      <View
        style={{
          flex: 1,
        }}
      >
        <FormTabs
          onEditClick={() => setIsEdit(!isEdited)}
          tabs={[
            {
              label: "Job Details",
              component: (
                <View style={{ flex: 1 }}>
                  <ScrollView
                    style={{
                      overflow: "hidden",
                    }}
                  >
                    {isEdited ? (
                      <EditJobDetails appData={appData} />
                    ) : (
                      <CardComponent
                        customStyle={{
                          margin: 16,
                          padding: 16,
                        }}
                      >
                        <DetailComponent
                          details={details}
                          isColumnVariableWidth
                          customContainerStyle={{ marginTop: 0 }}
                        />
                      </CardComponent>
                    )}
                  </ScrollView>
                </View>
              ),
            },
            {
              label: "Questionaire",
              component: (
                <View style={{ flex: 1, margin: 16 }}>
                  <ScrollView>
                    {isEdited ? (
                      <EditJobDetails questionnaireData={questionnaireData} />
                    ) : (
                      questionnaireData?.map((item) => {
                        return (
                          <View style={{ marginBottom: 16 }}>
                            <CardComponent>
                              <View style={{ flexDirection: "row" }}>
                                <CommonText
                                  customTextStyle={{
                                    fontSize: 12,
                                    color: colors.darkGrey,
                                  }}
                                >{`Question 1`}</CommonText>
                                <CommonText
                                  customContainerStyle={{ marginLeft: 4 }}
                                  customTextStyle={{
                                    fontSize: 12,
                                    color: colors.darkGrey,
                                  }}
                                >{`(${item.typeofQuestion})`}</CommonText>
                                {item.mandatory == 1 && (
                                  <CommonText
                                    customContainerStyle={{ marginLeft: 4 }}
                                    customTextStyle={{
                                      fontSize: 12,
                                      color: colors.red,
                                    }}
                                  >{`*`}</CommonText>
                                )}
                              </View>
                              <View style={{ marginTop: 8 }}>
                                <CommonText
                                  customTextStyle={{
                                    fontSize: 12,
                                    color: colors.black,
                                  }}
                                >
                                  {item.question}
                                </CommonText>
                              </View>
                              <View style={{ marginTop: 8, marginBottom: 8 }}>
                                {Array.isArray(item.question_options) &&
                                  item?.question_options?.map(
                                    (items, index) => {
                                      return (
                                        <View
                                          style={{
                                            marginBottom: 8,
                                            marginLeft: 2,
                                          }}
                                        >
                                          <CommonText
                                            customTextStyle={{
                                              fontSize: 12,
                                              color: colors.black,
                                            }}
                                          >{` ${index + 1}.${
                                            items.value
                                          }`}</CommonText>
                                        </View>
                                      );
                                    }
                                  )}
                              </View>
                            </CardComponent>
                          </View>
                        );
                      })
                    )}
                  </ScrollView>
                </View>
              ),
            },
          ]}
          isEditButtonVisible
        />
      </View>
    </View>
  );
};
export default ViewPostedJobDetails;
