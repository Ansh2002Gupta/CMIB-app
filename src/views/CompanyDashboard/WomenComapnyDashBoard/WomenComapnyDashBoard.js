import React from "react";
import { useIntl } from "react-intl";
import { ScrollView, View } from "@unthinkable/react-core-components";

import BarChart from "../../../components/BarChart";
import BarGroupChart from "../../../components/BarGroupChart";
import ErrorComponent from "../../../components/ErrorComponent/ErrorComponent";
import PieChart from "../../../components/PieChart/PieChart";
import LoadingScreen from "../../../components/LoadingScreen";
import useFetch from "../../../hooks/useFetch";
import useIsWebView from "../../../hooks/useIsWebView";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../../constants/errorMessages";
import { CHART_DATA_TYPE } from "../../../constants/constants";
import {
  ROUND_ONE_DASHBOARD,
  USER_TYPE_MEMBER,
} from "../../../services/apiServices/apiEndPoint";
import colors from "../../../assets/colors";
import styles from "./WomenComapnyDashBoard.style";

const WomenComapnyDashBoard = () => {
  const intl = useIntl();
  const { isWebView } = useIsWebView();
  const {
    data: interviewChartData,
    isLoading: isGettingInterview,
    fetchData: getInterViewData,
    error: errorWhileGettingInterviewData,
  } = useFetch({
    url:
      USER_TYPE_MEMBER +
      ROUND_ONE_DASHBOARD +
      `?type=${CHART_DATA_TYPE?.INTERVIEW_SCHEDULED}`,
  });
  const {
    data: jobTypeChartData,
    isLoading: isGettingJobType,
    fetchData: getJobTypeData,
    error: errorWhileGettingJobTypeData,
  } = useFetch({
    url:
      USER_TYPE_MEMBER +
      ROUND_ONE_DASHBOARD +
      `?type=${CHART_DATA_TYPE?.JOBS_BY_TYPES}`,
  });

  const {
    data: urgentChartData,
    isLoading: isGettingUrgentJob,
    fetchData: getUrgentJobsData,
    error: errorWhileGettingUrgentJobsData,
  } = useFetch({
    url:
      USER_TYPE_MEMBER +
      ROUND_ONE_DASHBOARD +
      `?type=${CHART_DATA_TYPE?.URGENT_JOBS}`,
  });
  const {
    data: functionalAreaChartData,
    isLoading: isGettingFunctionalArea,
    fetchData: getFunctionalArea,
    error: errorWhileGettingFunctionalArea,
  } = useFetch({
    url:
      USER_TYPE_MEMBER +
      ROUND_ONE_DASHBOARD +
      `?type=${CHART_DATA_TYPE?.SELECTED_FUNCTION_AREAS}`,
  });
  const {
    data: highestOffetChartData,
    isLoading: isGettingHighestOffer,
    fetchData: getHighestOffer,
    error: errorWhileGettingHighestOffer,
  } = useFetch({
    url:
      USER_TYPE_MEMBER +
      ROUND_ONE_DASHBOARD +
      `?type=${CHART_DATA_TYPE?.TOP_COMPANIES_WITH_HIGHEST_JOB_OFFERED}`,
  });

  const {
    data: hightCtcChartData,
    isLoading: isGettingHighestCtc,
    fetchData: getHighestCtc,
    error: errorWhileGettingHighestCtc,
  } = useFetch({
    url:
      USER_TYPE_MEMBER +
      ROUND_ONE_DASHBOARD +
      `?type=${CHART_DATA_TYPE?.TOP_COMPANIES_WITH_HIGHEST_CTC}`,
  });

  const isLoading =
    isGettingInterview ||
    isGettingJobType ||
    isGettingUrgentJob ||
    isGettingFunctionalArea ||
    isGettingHighestOffer ||
    isGettingHighestCtc;

  const error =
    errorWhileGettingInterviewData ||
    errorWhileGettingJobTypeData ||
    errorWhileGettingUrgentJobsData ||
    errorWhileGettingFunctionalArea ||
    errorWhileGettingHighestOffer ||
    errorWhileGettingHighestCtc;

  const getAllChartData = () => {
    getInterViewData({});
    getJobTypeData({});
    getUrgentJobsData({});
    getFunctionalArea({});
    getHighestOffer({});
    getHighestCtc({});
  };

  const centreChoosenData = [
    {
      label: "Agra",
      value: 24,
    },
    {
      label: "Delhi",
      value: 21,
    },
    {
      label: "Mumbai",
      value: 33,
    },
    {
      label: "Pune",
      value: 18,
    },
    {
      label: "Lukcnow",
      value: 12,
    },
    {
      label: "Jammu",
      value: 6,
    },

    {
      label: "Ahmedabad",
      value: 21,
    },
    {
      label: "Kanpur",
      value: 12,
    },
    {
      label: "Banglore",
      value: 46,
    },
    {
      label: "Goa",
      value: 32,
    },
  ];
  const candidatesAcceptingData = [
    {
      label: "Auditing",
      value: 35,
    },
    {
      label: "Taxation",
      value: 60,
    },
    {
      label: "Accounting",
      value: 101,
    },
    {
      label: "Corporate Finance",
      value: 83,
    },
    {
      label: "Forensic Accounting",
      value: 64,
    },
    {
      label: "Risk Management",
      value: 34,
    },

    {
      label: "International Finance",
      value: 75,
    },
    {
      label: "Non-Profit Sector",
      value: 50,
    },
    {
      label: "Entrepreneurship",
      value: 35,
    },
    {
      label: "Direct Taxation",
      value: 53,
    },
    {
      label: "Costing",
      value: 83,
    },
  ];
  const recruitmentHistoryData = {
    candidatesInterviewed: [
      {
        label: "16/08/2023",
        value: 32,
      },
      {
        label: "17/08/2023",
        value: 35,
      },
      {
        label: "18/08/2023",
        value: 41,
      },
      {
        label: "19/08/2023",
        value: 26,
      },
      {
        label: "20/08/2023",
        value: 29,
      },
      {
        label: "21/08/2023",
        value: 19,
      },

      {
        label: "22/08/2023",
        value: 14,
      },
      {
        label: "23/08/2023",
        value: 9,
      },
      {
        label: "24/08/2023",
        value: 44,
      },
      {
        label: "25/08/2023",
        value: 56,
      },
    ],
    candidatesHired: [
      {
        label: "16/08/2023",
        value: 34,
      },
      {
        label: "17/08/2023",
        value: 36,
      },
      {
        label: "18/08/2023",
        value: 29,
      },
      {
        label: "19/08/2023",
        value: 20,
      },
      {
        label: "20/08/2023",
        value: 21,
      },
      {
        label: "21/08/2023",
        value: 28,
      },

      {
        label: "22/08/2023",
        value: 22,
      },
      {
        label: "23/08/2023",
        value: 16,
      },
      {
        label: "24/08/2023",
        value: 49,
      },
      {
        label: "25/08/2023",
        value: 60,
      },
    ],
  };
  const legendData = [
    { name: "Candidates Interviewed", symbol: { fill: colors.purple } },
    { name: "Candidates Hired", symbol: { fill: colors.babyPink } },
  ];

  const ctcOfferedData = [
    {
      label: "Accountant",
      value: 4300000,
    },
    {
      label: "Financial Analyst",
      value: 2200000,
    },
    {
      label: "CPA",
      value: 6500000,
    },
    {
      label: "CFO",
      value: 7000000,
    },
    {
      label: "Accounting consultant",
      value: 800000,
    },
    {
      label: "Junior Accountant",
      value: 400000,
    },

    {
      label: "Audit Associate",
      value: 2500000,
    },
    {
      label: "Audit Manager",
      value: 4000000,
    },
    {
      label: "Internal Auditor",
      value: 4500000,
    },
    {
      label: "Forensic Accountant",
      value: 2300000,
    },
  ];

  return isLoading ? (
    <LoadingScreen />
  ) : error ? (
    <ErrorComponent
      errorMsg={error?.data?.message || GENERIC_GET_API_FAILED_ERROR_MESSAGE}
      onRetry={() => {
        getAllChartData();
      }}
    />
  ) : (
    interviewChartData &&
    jobTypeChartData &&
    urgentChartData &&
    functionalAreaChartData &&
    highestOffetChartData &&
    hightCtcChartData &&
    !isLoading &&
    !error && (
      <ScrollView style={{ gap: 24 }}>
        {ctcOfferedData?.length > 0 && (
          <BarChart
            yAxisLabel={intl.formatMessage({ id: "label.CTCOfferedINR" })}
            domainPadding={20}
            height={200}
            label={intl.formatMessage({
              id: "label.CTCOfferedDesignation",
            })}
            barColor={colors.green}
            data={ctcOfferedData}
            toolTipLabel={({ datum }) => `${datum.y / 100000} L`}
            yAxisTickFormat={(tick) => `${parseInt(tick / 100000)} L`}
            xAxisTickAngle={-20}
          />
        )}
        <View style={styles.pieChartContiner}>
          <View style={isWebView && { flex: 1 }}>
            <PieChart
              baseRadius={25}
              colorScale={[
                colors.mustardYellow,
                colors.graphiteGray,
                colors.yellowGreen,
                colors.purple,
                colors.originalPurple,
                colors.babyPink,
                colors.green,
                colors.errorRed,
                colors.greenBlue,
                colors.darkOrange,
              ]}
              customHeaderText={styles.customHeaderText}
              data={centreChoosenData}
              width={300}
              height={80}
              label={intl.formatMessage({
                id: "label.centersChosenCandidatesInterview",
              })}
              labelFontSize={3}
              labelRadius={30}
              labelColor={colors.darkGrey}
            />
          </View>
        </View>
        {candidatesAcceptingData?.length && (
          <BarChart
            xAxisTickAngle={-20}
            yAxisLabel={intl.formatMessage({
              id: "label.candidates",
            })}
            domainPadding={20}
            height={200}
            label={intl.formatMessage({
              id: "label.candidatesAcceptingOffersAreasWork",
            })}
            toolTipLabel={({ datum }) => datum.y}
            barColor={colors.purple}
            data={candidatesAcceptingData}
          />
        )}

        <BarGroupChart
          domainPadding={20}
          barWidth={7}
          height={200}
          label={intl.formatMessage({
            id: "label.recruitmentHistory",
          })}
          legendData={legendData}
          toolTipLabel={({ datum }) => datum.y}
          barColor1={colors.purple}
          barColor2={colors.babyPink}
          data1={recruitmentHistoryData.candidatesInterviewed}
          data2={recruitmentHistoryData.candidatesHired}
          offset={12}
        />
      </ScrollView>
    )
  );
};

export default WomenComapnyDashBoard;
