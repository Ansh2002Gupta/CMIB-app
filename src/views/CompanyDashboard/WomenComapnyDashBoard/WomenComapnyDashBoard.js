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

  const womenPlacedData = [
    {
      label: "2023 Feb",
      value: 25,
    },
    {
      label: "2023 Aug",
      value: 20,
    },
    {
      label: "2022 Feb",
      value: 15,
    },
    {
      label: "2022 Aug",
      value: 10,
    },
    {
      label: "2021 Feb",
      value: 7,
    },
    {
      label: "2021 Aug",
      value: 5,
    },
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

  const companyActiveData = [
    {
      label: "Inactive",
      value: 33,
    },
    {
      label: "Active",
      value: 67,
    },
  ];

  const companyPreferenceData = [
    {
      label: "Trading",
      value: 10,
    },
    {
      label: "IT",
      value: 54,
    },
    {
      label: "Construction",
      value: 30,
    },
    {
      label: "Infrastructure",
      value: 75,
    },
    {
      label: "BPO",
      value: 20,
    },
    {
      label: "Financial Services",
      value: 28,
    },

    {
      label: "Diversified",
      value: 45,
    },
    {
      label: "Firm of Charted Accountants",
      value: 60,
    },
    {
      label: "Service Industry",
      value: 35,
    },
    {
      label: "Constructional Services",
      value: 86,
    },
  ];

  const companyVaccancyData = [
    {
      label: "Active",
      value: 20,
    },
    {
      label: "Inactive",
      value: 24,
    },
    {
      label: "Construction",
      value: 30,
    },
    {
      label: "Infrastructure",
      value: 15,
    },
    {
      label: "BPO",
      value: 10,
    },
    {
      label: "Financial Services",
      value: 2,
    },

    {
      label: "Diversified",
      value: 25,
    },
    {
      label: "Firm of Charted Accountants",
      value: 10,
    },
    {
      label: "Service Industry",
      value: 55,
    },
    {
      label: "Constructional Services",
      value: 36,
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
        <BarChart
          yAxisLabel={intl.formatMessage({
            id: "label.percentageWomenMembers",
          })}
          domainPadding={20}
          height={200}
          label={intl.formatMessage({
            id: "label.womenPlacedYears",
          })}
          barColor={colors.purple}
          data={womenPlacedData}
          toolTipLabel={({ datum }) => `${datum.y}%`}
        />
        <View style={styles.pieChartContiner}>
          <View style={isWebView && { flex: 2 }}>
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
          </View>
          <View style={isWebView && { flex: 1 }}>
            <PieChart
              baseRadius={90}
              colorScale={[colors.errorRed, colors.green]}
              customHeaderText={styles.customHeaderText}
              data={companyActiveData}
              width={300}
              height={280}
              label={intl.formatMessage({
                id: "label.companies",
              })}
              labelFontSize={12}
              labelRadius={100}
              labelColor={colors.darkGrey}
            />
          </View>
        </View>

        <View style={styles.pieChartContiner}>
          <View style={isWebView && { flex: 1 }}>
            <PieChart
              baseRadius={50}
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
              data={companyPreferenceData}
              width={300}
              height={140}
              label={intl.formatMessage({
                id: "label.companyPreferenceKindIndustry",
              })}
              labelFontSize={8}
              labelRadius={60}
              labelColor={colors.darkGrey}
            />
          </View>
          <View style={isWebView && { flex: 1 }}>
            <PieChart
              baseRadius={50}
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
              data={companyVaccancyData}
              width={300}
              height={140}
              label={intl.formatMessage({
                id: "label.vacanciesIndustries",
              })}
              labelFontSize={8}
              labelRadius={60}
              labelColor={colors.darkGrey}
            />
          </View>
        </View>
        <BarChart
          yAxisLabel={intl.formatMessage({ id: "label.numberJobsOffered" })}
          domainPadding={20}
          height={200}
          label={intl.formatMessage({
            id: "label.topCompaniesHighestJobsOffered",
          })}
          toolTipLabel={({ datum }) => datum.y}
          barColor={colors.purple}
          data={highestOffetChartData}
        />
        <BarChart
          yAxisLabel={intl.formatMessage({ id: "label.highestCTCinINR" })}
          domainPadding={20}
          height={200}
          label={intl.formatMessage({
            id: "label.topCompaniesHighestCTCs",
          })}
          barColor={colors.green}
          data={hightCtcChartData}
          toolTipLabel={({ datum }) => `${datum.y / 100000} L`}
          yAxisTickFormat={(tick) => `${parseInt(tick / 100000)} L`}
        />
      </ScrollView>
    )
  );
};

export default WomenComapnyDashBoard;
