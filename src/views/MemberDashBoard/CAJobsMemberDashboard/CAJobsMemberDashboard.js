import React from "react";
import { useIntl } from "react-intl";
import { useTheme } from "@unthinkable/react-theme";
import { ScrollView, View } from "@unthinkable/react-core-components";

import BarChart from "../../../components/BarChart";
import DonutChart from "../../../components/DonutChart/DonutChart";
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
import getStyles from "./CAJobsMemberDashboard.style";

const CAJobsMemberDashboard = () => {
  const intl = useIntl();
  const { isWebView } = useIsWebView();

  const theme = useTheme();
  const { colors } = theme;
  const styles = getStyles(theme);

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
      <ScrollView style={{ gap: 24 }} showsVerticalScrollIndicator={false}>
        <View style={styles.pieChartContiner}>
          <View
            style={
              isWebView ? styles.webGraphContainer : styles.mobileGraphContainer
            }
          >
            <DonutChart
              colorScale={[
                colors.disabledGrey,
                colors.purple,
                colors.greenBlue,
                colors.green,
                colors.errorRed,
                colors.darkOrange,
              ]}
              data={interviewChartData}
              width={250}
              height={200}
              innerRadius={40}
              label={intl.formatMessage({
                id: "label.interviewsScheduled",
              })}
              labelRadius={100}
              labelColor={colors.white}
            />
          </View>
          <View
            style={
              isWebView ? styles.webGraphContainer : styles.mobileGraphContainer
            }
          >
            <PieChart
              colorScale={[
                colors.greenBlue,
                colors.greenAccepted,
                colors.babyPink,
                colors.purple,
              ]}
              data={jobTypeChartData}
              width={250}
              height={248}
              label={intl.formatMessage({
                id: "label.jobTypes",
              })}
              labelFontSize={8}
              labelRadius={100}
              labelColor={colors.darkGrey}
            />
          </View>
        </View>
        <View style={styles.pieChartContiner}>
          <View
            style={
              isWebView ? styles.webGraphContainer : styles.mobileGraphContainer
            }
          >
            <PieChart
              colorScale={[colors.errorRed, colors.grassGreen]}
              data={urgentChartData}
              width={250}
              height={248}
              label={intl.formatMessage({
                id: "label.urgentJobs",
              })}
              labelFontSize={8}
              labelRadius={100}
              labelColor={colors.darkGrey}
              // popupMessage={intl.formatMessage({
              //   id: "label.viewAllUrgentJobs",
              // })}
              onPopupClick={() => {}}
            />
          </View>
          <View
            style={
              isWebView ? styles.webGraphContainer : styles.mobileGraphContainer
            }
          >
            <PieChart
              colorScale={[
                colors.mustardYellow,
                colors.graphiteGray,
                colors.yellowGreen,
                colors.purple,
                colors.originalPurple,
                colors.babyPink,
                colors.greenAccepted,
                colors.errorRed,
                colors.greenBlue,
                colors.darkOrange,
              ]}
              data={functionalAreaChartData}
              width={250}
              height={248}
              label={intl.formatMessage({
                id: "label.selectedFunctionalAreas",
              })}
              labelFontSize={8}
              labelRadius={100}
              labelColor={colors.darkGrey}
            />
          </View>
        </View>
        {highestOffetChartData?.length > 0 && (
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
        )}
        {hightCtcChartData?.length > 0 && (
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
        )}
      </ScrollView>
    )
  );
};

export default CAJobsMemberDashboard;
