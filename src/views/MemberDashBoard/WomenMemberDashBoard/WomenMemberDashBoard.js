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
import colors from "../../../assets/colors";
import getStyles from "./WomenMemberDashBoard.style";

const WomenMemberDashBoard = () => {
  const intl = useIntl();
  const theme = useTheme();
  const styles = getStyles(theme);

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

  const isLoading =
    isGettingInterview ||
    isGettingFunctionalArea ||
    isGettingHighestOffer ||
    isGettingHighestCtc;

  const error =
    errorWhileGettingInterviewData ||
    errorWhileGettingFunctionalArea ||
    errorWhileGettingHighestOffer ||
    errorWhileGettingHighestCtc;

  const getAllChartData = () => {
    getInterViewData({});
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
    functionalAreaChartData &&
    highestOffetChartData &&
    hightCtcChartData &&
    !isLoading &&
    !error && (
      <ScrollView style={{ gap: 24 }}>
        {womenPlacedData?.length > 0 && (
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
        )}
        <View style={styles.pieChartContiner}>
          <View style={isWebView && { flex: 1 }}>
            <DonutChart
              colorScale={[
                theme.colors.disabledGrey,
                theme.colors.purple,
                theme.colors.greenBlue,
                theme.colors.green,
                theme.colors.errorRed,
                theme.colors.darkOrange,
              ]}
              data={interviewChartData}
              width={250}
              height={200}
              innerRadius={40}
              label={intl.formatMessage({
                id: "label.interviewsScheduled",
              })}
              labelRadius={100}
              labelColor={theme.colors.white}
            />
          </View>
          <View style={isWebView && { flex: 1 }}>
            <PieChart
              colorScale={[
                theme.colors.mustardYellow,
                theme.colors.graphiteGray,
                theme.colors.yellowGreen,
                theme.colors.purple,
                theme.colors.originalPurple,
                theme.colors.babyPink,
                theme.colors.green,
                theme.colors.errorRed,
                theme.colors.greenBlue,
                theme.colors.darkOrange,
              ]}
              data={functionalAreaChartData}
              width={250}
              height={248}
              label={intl.formatMessage({
                id: "label.selectedFunctionalAreas",
              })}
              labelFontSize={8}
              labelRadius={100}
              labelColor={theme.colors.darkGrey}
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

export default WomenMemberDashBoard;
