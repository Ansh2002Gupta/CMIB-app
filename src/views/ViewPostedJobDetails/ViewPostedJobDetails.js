import { View, ScrollView } from "@unthinkable/react-core-components";
import React, { useEffect, useState } from "react";
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
      mandatory: 0,
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
      label: "Job Summary",
      value: dataApi.summary,
      isMandatory: true,
    },
  ],
  [
    {
      label: "Job Details",
      value: dataApi.detail,
      isMandatory: true,
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
      label: "Job Type",
      value: dataApi.type ?? "-",
      isMandatory: true,
    },
    {
      label: "Urgent Job",
      value: dataApi.is_urgent,
      isMandatory: true,
    },
    {},
  ],
  [
    {
      label: "Minimum Experience",
      value: dataApi.min_experience,
      isMandatory: true,
    },
    {
      label: "Maximum Experience",
      value: dataApi.max_experience,
    },

    {
      label: "Nationality",
      value: dataApi.nationality ?? "-",
    },
  ],
  [
    {
      label: "Designation",
      value: dataApi.designation ?? "-",
      isMandatory: true,
    },
    {
      label: "Job Location",
      value: dataApi.location ?? "-",
      isMandatory: true,
    },
    {},
  ],
  [
    {
      label: "Functional Areas",
      isMandatory: true,
      showBadgeLabel: true,
      customValue: dataApi.functional_areas ?? "-",
    },
  ],
  [
    {
      label: "Gender Preference",
      value: dataApi.gender_preference ?? "-",
    },
    {
      label: "Category Preference",
      value: dataApi.category_preference ?? "-",
      isMandatory: true,
    },
    {},
  ],
  [
    {
      label: "Essential Qualification",
      value: dataApi.essential_qualification ?? "-",
    },
  ],
  [
    {
      label: "Desired Qualification",
      value: dataApi.desired_qualification ?? "-",
    },
  ],
  [
    {
      label: "Job Opening Date",
      value: dataApi.opening_date ?? "-",
      isMandatory: true,
    },
    {
      label: "Job Closing Date",
      value: dataApi.closing_date ?? "-",
      isMandatory: true,
    },
    {},
  ],
  [
    {
      label: "Number of Vacancies",
      value: dataApi.vacancy ?? "-",
      isMandatory: true,
    },
  ],
  [
    {
      label: "Mode of Work",
      value: dataApi.mode ?? "-",
      isMandatory: true,
    },
    {
      label: "Flexi Hours",
      value: dataApi.flexi_hours ?? "-",
    },
    {
      label: "Full Time/Part Time",
      value: dataApi.service_type ?? "-",
      isMandatory: true,
    },
  ],
  [
    {
      label: "Salary Negotiable",
      value: dataApi.is_salary_negotiable ?? "-",
    },
    {
      label: "Minimum Salary(Annual CTC)",
      value: dataApi.min_salary ?? "-",
    },
    {
      label: "Maximum Salary",
      value: dataApi.max_experience ?? "-",
    },
  ],
  [
    {
      label: "Job Status",
      value: dataApi.status === 1 ? "Active" : "InActive" ?? "-",
    },
  ],
];

const ViewPostedJobDetails = () => {
  const { data, isLoading, isError, error, fetchData } = useFetch({
    url: "/api/company/jobs/JOB_20240327_148",
  });
  const { isWebView } = useIsWebView();
  const [isEdited, setIsEdit] = useState(false);
  const [questionnaireData, setQuestionnaireData] = useState([]);
  useEffect(() => {
    const transformedQuestionnaire = dataApi.questionnaire.map((item) => {
      if (item.question_options) {
        return {
          ...item,
          question_options: item.question_options.map((option, index) => ({
            id: Date.now(),
            value: option,
          })),
        };
      }
      return { ...item, typeofQuestion: item.type };
    });
    setQuestionnaireData(transformedQuestionnaire);
  }, []);

  return (
    <View style={{ flex: 1 }}>
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
                    ) : (
                      <View />
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
                      <View>
                        <AddModifyQuestionaireComponent
                          isQuestionaire={true}
                          addNewJobData={questionnaireData}
                          isWebView={isWebView}
                        />
                      </View>
                    ) : (
                      dataApi?.questionnaire?.map((item) => {
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
                                >{`(${item.type})`}</CommonText>
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
                                          >{` ${
                                            index + 1
                                          }.${items}`}</CommonText>
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
