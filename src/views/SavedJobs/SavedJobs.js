import React from "react";
import { useIntl } from "react-intl";
import { ScrollView, View } from "@unthinkable/react-core-components";

import TwoRow from "../../core/layouts/TwoRow/TwoRow";

import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import IconHeader from "../../components/IconHeader/IconHeader";
import SavedJobComponent from "../../components/SavedJobComponent";
import SearchView from "../../components/SearchView";
import Spinner from "../../components/Spinner";
import useFetch from "../../hooks/useFetch";
import { MEMBER_SAVED_JOBS } from "../../services/apiServices/apiEndPoint";
import images from "../../images";
import style from "./SavedJobs.style";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../constants/errorMessages";

const SavedJobs = () => {
  const intl = useIntl();
  const {
    data: savedJobsList,
    isLoading: isGettingSavedJob,
    fetchData: fetchSavedJobList,
    error: errorWhileGettingSavedJob,
  } = useFetch({
    url: `${MEMBER_SAVED_JOBS}`,
  });

  const savedjob = {
    records: [
      {
        id: 1,
        approved: 1,
        approved_by: 1,
        category_preference: "General",
        closing_date: "2024-04-06 00:00:00",
        company_id: 1,
        contract_period: null,
        created_at: "2023-12-14T05:35:32.000000Z",
        created_by: 1,
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
        functional_areas: null,
        gender_preference: "Male",
        industry: null,
        is_contractual: 1,
        is_for_disabled: 1,
        is_salary_negotiable: 1,
        is_urgent: 1,
        location: null,
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
        updated_at: "2024-03-14T19:13:06.000000Z",
        updated_by: 84,
        vacancy: 5,
      },
      {
        id: 2,
        approved: 1,
        approved_by: 1,
        category_preference: "General",
        closing_date: "2024-04-06 00:00:00",
        company_id: 1,
        contract_period: null,
        created_at: "2023-12-14T05:35:32.000000Z",
        created_by: 1,
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
        functional_areas: null,
        gender_preference: "Male",
        industry: null,
        is_contractual: 1,
        is_for_disabled: 1,
        is_salary_negotiable: 1,
        is_urgent: 1,
        location: null,
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
        updated_at: "2024-03-14T19:13:06.000000Z",
        updated_by: 84,
        vacancy: 5,
      },
      {
        id: 3,
        approved: 1,
        approved_by: 1,
        category_preference: "General",
        closing_date: "2024-04-06 00:00:00",
        company_id: 1,
        contract_period: null,
        created_at: "2023-12-14T05:35:32.000000Z",
        created_by: 1,
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
        functional_areas: null,
        gender_preference: "Male",
        industry: null,
        is_contractual: 1,
        is_for_disabled: 1,
        is_salary_negotiable: 1,
        is_urgent: 1,
        location: null,
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
        updated_at: "2024-03-14T19:13:06.000000Z",
        updated_by: 84,
        vacancy: 5,
      },
    ],
  };

  return (
    <TwoRow
      topSection={
        <IconHeader
          headerText={intl.formatMessage({ id: "label.saved_jobs" })}
        />
      }
      bottomSection={
        <TwoRow
          style={style.innerContainer}
          topSection={<SearchView />}
          bottomSection={
            isGettingSavedJob ? (
              <View style={style.loaderStyle}>
                <Spinner />
              </View>
            ) : errorWhileGettingSavedJob ? (
              <ErrorComponent
                errorMsg={
                  errorWhileGettingSavedJob?.message ||
                  GENERIC_GET_API_FAILED_ERROR_MESSAGE
                }
                onRetry={() => {
                  fetchSavedJobList({});
                }}
                disableRetryBtn={isGettingSavedJob}
              />
            ) : (
              <View style={style.scrollstyle}>
                <ScrollView>
                  {savedjob?.records?.map((details) => {
                    return <SavedJobComponent details={details} />;
                  })}
                </ScrollView>
              </View>
            )
          }
          bottomSectionStyle={style.bottomSectionStyle}
        />
      }
      isBottomFillSpace
    />
  );
};

export default SavedJobs;
