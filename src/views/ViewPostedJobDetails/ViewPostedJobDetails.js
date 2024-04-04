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
import { getDecryptApiData } from "../../utils/util";
import styles from "./ViewPostedJobDetails.styles";
import { POST_JOB } from "../../services/apiServices/apiEndPoint";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../constants/errorMessages";
import { useSearchParams } from "../../routes";
import ViewJobApplicants from "../../containers/ViewPostedJobDetails/ViewJobApplicants/ViewJobApplicants";
import colors from "../../assets/colors";
import ViewScheduleInterview from "../../containers/ViewPostedJobDetails/ViewScheduleInterview";
import { useParams } from "react-router";
import EditJobDetails from "../EditJobDetails/EditJobDetails";

const ViewPostedJobDetails = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const {
    isLoading: isConstantLoading,
    data: apiData,
    isError: apiIsError,
    error: apiError,
    fetchData: getPostedData,
  } = useFetch({
    url: `${POST_JOB}/${id}`,
  });
  const { isLoading, isSuccess, isError, isErrorData, fetchData } =
    useGetAddNewJobData();
  const [questionnaireData, setQuestionnaireData] = useState([]);
  const [appData, setAppData] = useState({});
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addJobs] = useContext(AddJobContext);
  const [isActive, setActive] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const intl = useIntl();

  useEffect(() => {
    if (searchParams.get("mode") === "edit") {
      setIsEditable(true);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (apiData && isSuccess) {
      const { obj, transformedQuestionnaire } = getDecryptApiData(
        apiData,
        addJobs
      );
      setAppData(obj);

      setQuestionnaireData(transformedQuestionnaire);
    }
  }, [apiData, isSuccess]);
  useEffect(() => {
    if (apiData && addJobs.jobType && Object.keys(appData).length > 0) {
      setLoading(true);
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
            customValue:
              (Array.isArray(appData.jobLocation) &&
                appData?.jobLocation.map((item) => item.value)) ??
              "-",
            value: apiData?.locations ?? "-",
          },
          {},
        ],
        [
          {
            label: "label.functional_areas",
            isMandatory: true,
            showBadgeLabel: true,
            customValue:
              (Array.isArray(appData.functionalAreas) &&
                appData?.functionalAreas.map((item) => item.label)) ??
              "-",
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
            value: apiData?.flexi_hours == 1 ? "Yes" : "No" ?? "-",
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
              {},
            ]
          : [],

        [
          {
            label: "label.salary_negotiable",
            value: apiData?.is_salary_negotiable == 1 ? "Yes" : "No" ?? "-",
          },
          {
            label: "label.minimum_salary",
            value: apiData?.min_salary ? Math.trunc(apiData?.min_salary) : "-",
          },
          {
            label: "label.maximum_salary",
            value: apiData?.max_experience
              ? Math.trunc(apiData?.max_experience)
              : "-",
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
      setLoading(false);
    }
  }, [apiData, addJobs, appData]);
  const onCancelPress = (shouldApiBeCalled = false) => {
    if (isEditable) {
      setIsEditable(false);
      if (shouldApiBeCalled) {
        getPostedData();
      }
    }
  };

  return (
    <>
      {isConstantLoading || isLoading || loading ? (
        <LoadingScreen />
      ) : (
        <>
          {isEditable ? (
            appData &&
            questionnaireData && (
              <EditJobDetails
                jobData={appData}
                questionData={questionnaireData}
                id={id}
                onCancelPress={onCancelPress}
              />
            )
          ) : (
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
              <View style={styles.container}>
                <CustomTabs
                  containerStyle={{ backgroundColor: colors.white }}
                  tabs={[
                    {
                      label: intl.formatMessage({ id: "label.job_details" }),
                      component: (
                        <View
                          style={{
                            backgroundColor: colors.backgroundGrey,
                            flex: 1,
                          }}
                        >
                          <View style={{ flex: 1 }}>
                            {!(isError || apiIsError) ? (
                              <View
                                style={{
                                  ...styles.container,
                                }}
                              >
                                <FormTabs
                                  onEditClick={() => setIsEditable(true)}
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
                                        <ViewQuestion
                                          questionnaireData={questionnaireData}
                                        />
                                      ),
                                    },
                                  ]}
                                  isEditButtonVisible
                                />
                              </View>
                            ) : null}
                          </View>

                          {!(isConstantLoading || isLoading || loading) &&
                            (isError || apiIsError) && (
                              <ErrorComponent
                                errorMsg={
                                  isErrorData?.data?.message ||
                                  apiError?.data?.message ||
                                  GENERIC_GET_API_FAILED_ERROR_MESSAGE
                                }
                              />
                            )}
                        </View>
                      ),
                    },
                    {
                      label: intl.formatMessage({ id: "label.applicants" }),
                      component: <ViewJobApplicants />,
                    },
                    {
                      label: intl.formatMessage({
                        id: "label.schedule_interview",
                      }),
                      component: <ViewScheduleInterview />,
                    },
                  ]}
                />
              </View>
            </View>
          )}
        </>
      )}
    </>
  );
};
export default ViewPostedJobDetails;
