import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { View } from "@unthinkable/react-core-components";
import CustomTextEditor from "../../components/CustomTextEditor";
import { FormTabs } from "../../components/Tab/FormTabs";
import { CustomTabs } from "../../components/Tab";
import IconHeader from "../../components/IconHeader/IconHeader";
import ViewJobs from "../../containers/ViewPostedJobDetails/ViewJobs";
import ViewQuestion from "../../containers/ViewPostedJobDetails/ViewQuestion";
import LoadingScreen from "../../components/LoadingScreen";
import { jobType } from "../../constants/constants";
import { useIntl } from "react-intl";
import { getDecryptApiData } from "../../utils/util";
import styles from "./ViewPostedJobDetails.styles";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../constants/errorMessages";
import { useSearchParams } from "../../routes";
import ViewJobApplicants from "../../containers/ViewPostedJobDetails/ViewJobApplicants/ViewJobApplicants";
import colors from "../../assets/colors";
import ViewScheduleInterview from "../../containers/ViewPostedJobDetails/ViewScheduleInterview";
import { useParams } from "react-router";
import EditJobDetails from "../EditJobDetails/EditJobDetails";
import useGetEditJobs from "../../services/apiServices/hooks/EditJobs/useGetEditJobs";

const ViewPostedJobDetails = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    isLoading: isConstantLoading,
    stateResult: apiData,
    isSuccess: isSuccess,
    isError: apiIsError,
    error: apiError,
    getJobs: getPostedData,
  } = useGetEditJobs(id);

  const [questionnaireData, setQuestionnaireData] = useState([]);
  const [appData, setAppData] = useState({});
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isActive, setActive] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [activeTab, setActiveTab] = useState(
    Number(searchParams.get("activeTab"))
  );
  const intl = useIntl();

  useEffect(() => {
    if (searchParams.get("mode") === "edit") {
      setIsEditable(true);
    }
    getPostedData();
  }, []);
  useEffect(() => {
    if (searchParams.get("mode") === "view" && isEditable) {
      setIsEditable(false);
      getPostedData();
    }
  }, [searchParams]);

  useEffect(() => {
    if (isSuccess && apiData) {
      const { obj, transformedQuestionnaire } = getDecryptApiData(apiData);
      setAppData(obj);
      setQuestionnaireData(transformedQuestionnaire);
    }
  }, [isSuccess, apiData]);
  useEffect(() => {
    if (apiData && Object.keys(apiData).length > 0 && isSuccess) {
      setLoading(true);
      let jobName = apiData.type.name;
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
            value: apiData?.nationality?.name ?? "-",
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
              (Array.isArray(apiData.locations) &&
                apiData?.locations.map((item) => item.city)) ??
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
              (Array.isArray(apiData.functional_areas) &&
                apiData?.functional_areas.map((item) => item.name)) ??
              "-",
          },
        ],
        [
          {
            label: "label.gender_preference",
            value: apiData?.gender_preference?.label ?? "-",
          },
          {
            label: "label.category_preference",
            value: apiData?.category_prefrence.name ?? "-",
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
            value: apiData?.work_mode?.name ?? "-",
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
  }, [apiData]);

  const onCancelPress = (shouldApiBeCalled = false) => {
    if (isEditable) {
      setIsEditable(false);
      setSearchParams((prev) => {
        prev.set("mode", "view");
        return prev;
      });
      if (shouldApiBeCalled) {
        getPostedData();
      }
    }
  };
  return (
    <>
      {isConstantLoading || loading ? (
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
                  setSelectedTab={(item) => {
                    setSearchParams((prev) => {
                      prev.set("activeTab", `${item}`);
                      return prev;
                    });
                    setActiveTab(item);
                  }}
                  tabs={[
                    {
                      label: intl.formatMessage({ id: "label.job_details" }),
                      component: (
                        <View style={styles.innerContainer}>
                          <View style={styles.flex1}>
                            {!apiIsError ? (
                              <View
                                style={{
                                  ...styles.container,
                                }}
                              >
                                <FormTabs
                                  onEditClick={() => {
                                    setIsEditable(true);
                                    setSearchParams((prev) => {
                                      prev.set("mode", "edit");
                                      return prev;
                                    });
                                  }}
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

                          {!(isConstantLoading || loading) && apiIsError && (
                            <ErrorComponent
                              errorMsg={
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
                      component: <ViewJobApplicants id={id} />,
                    },
                    {
                      label: intl.formatMessage({
                        id: "label.schedule_interview",
                      }),
                      component: <ViewScheduleInterview id={id} />,
                    },
                  ]}
                  intialActiveTab={activeTab}
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
