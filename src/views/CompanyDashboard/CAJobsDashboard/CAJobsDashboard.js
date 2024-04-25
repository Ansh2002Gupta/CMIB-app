import React from "react";
import { useIntl } from "react-intl";
import { ScrollView, View } from "@unthinkable/react-core-components";
import useNavigateScreen from "../../../services/hooks/useNavigateScreen";

import { TwoColumn, TwoRow } from "../../../core/layouts";

import CommonText from "../../../components/CommonText";
import CustomButton from "../../../components/CustomButton";
import BarChart from "../../../components/BarChart";
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
import images from "../../../images";
import { navigations } from "../../../constants/routeNames";
import colors from "../../../assets/colors";
import styles from "./CAJobsDashboard.style";

const CAJobsDashboard = () => {
  const intl = useIntl();
  const { navigateScreen } = useNavigateScreen();

  const handleOnPress = () => {
    navigateScreen(`${navigations.MANAGE_SUBSCRIPTION}`);
  };

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

  const topCtcDesignationData = [
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

  const candidatesAcceptingIndustriesData = [
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

  const candidatesAcceptingAreasData = [
    {
      label: "Auditing",
      value: 85,
    },
    {
      label: "Taxation",
      value: 22,
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
      value: 24,
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
      value: 43,
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
      <View>
        <View style={styles.activePackage}>
          <TwoColumn
            style={styles.packageContainer}
            isLeftFillSpace
            leftSection={
              <TwoRow
                topSection={
                  <CommonText customTextStyle={styles.customTextStyle}>
                    {intl.formatMessage({
                      id: "label.current_package_capital",
                    })}
                  </CommonText>
                }
                bottomSection={
                  <CommonText customTextStyle={styles.customSubHeadingStyle}>
                    {intl.formatMessage({
                      id: "label.monthly",
                    })}
                  </CommonText>
                }
              />
            }
            rightSection={
              <View>
                <CustomButton
                  style={styles.customButtonStyle}
                  iconLeft={{ leftIconSource: images.iconEdit }}
                  children={"Manage"}
                  onPress={() => {
                    handleOnPress();
                  }}
                />
              </View>
            }
          />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {topCtcDesignationData?.length > 0 && (
            <BarChart
              yAxisLabel={intl.formatMessage({ id: "label.CTCOfferedINR" })}
              domainPadding={20}
              height={200}
              label={intl.formatMessage({
                id: "label.topDesignationsBasedCTCOffered",
              })}
              barColor={colors.green}
              data={topCtcDesignationData}
              toolTipLabel={({ datum }) => `${datum.y / 100000} L`}
              yAxisTickFormat={(tick) => `${parseInt(tick / 100000)} L`}
              xAxisTickAngle={-20}
            />
          )}
          <View style={styles.pieChartContiner}>
            <View style={isWebView ? { flex: 1 } : { width: "100%" }}>
              <PieChart
                baseRadius={80}
                colorScale={[
                  colors.greenBlue,
                  colors.grassGreen,
                  colors.babyPink,
                  colors.purple,
                  colors.mustardYellow,
                  colors.graphiteGray,
                  colors.yellowGreen,
                  colors.originalPurple,
                  colors.errorRed,
                  colors.darkOrange,
                ]}
                customHeaderText={styles.customHeaderText}
                data={jobTypeChartData}
                width={300}
                height={240}
                label={intl.formatMessage({
                  id: "label.jobTypes",
                })}
                labelFontSize={10}
                labelRadius={90}
                labelColor={colors.darkGrey}
              />
            </View>
            <View style={isWebView ? { flex: 1 } : { width: "100%" }}>
              <PieChart
                baseRadius={80}
                colorScale={[
                  colors.errorRed,
                  colors.green,
                  colors.mustardYellow,
                  colors.graphiteGray,
                  colors.yellowGreen,
                  colors.purple,
                  colors.originalPurple,
                  colors.babyPink,
                  colors.greenBlue,
                  colors.darkOrange,
                ]}
                customHeaderText={styles.customHeaderText}
                data={urgentChartData}
                width={300}
                height={240}
                label={intl.formatMessage({
                  id: "label.urgentJobs",
                })}
                labelFontSize={10}
                labelRadius={90}
                labelColor={colors.darkGrey}
              />
            </View>
            <View style={isWebView ? { flex: 1 } : { width: "100%" }}>
              <PieChart
                baseRadius={80}
                colorScale={[
                  colors.errorRed,
                  colors.grassGreen,
                  colors.mustardYellow,
                  colors.graphiteGray,
                  colors.yellowGreen,
                  colors.purple,
                  colors.originalPurple,
                  colors.babyPink,
                  colors.green,
                  colors.greenBlue,
                  colors.darkOrange,
                ]}
                customHeaderText={styles.customHeaderText}
                data={companyActiveData}
                width={300}
                height={240}
                label={intl.formatMessage({
                  id: "label.activeJobs",
                })}
                labelFontSize={10}
                labelRadius={90}
                labelColor={colors.darkGrey}
              />
            </View>
          </View>
          <View style={isWebView ? {} : { width: "100%" }}>
            {candidatesAcceptingIndustriesData && (
              <BarChart
                xAxisTickAngle={-20}
                yAxisLabel={intl.formatMessage({
                  id: "label.candidates",
                })}
                domainPadding={20}
                height={200}
                label={intl.formatMessage({
                  id: "label.candidatesAcceptingOffersIndustries",
                })}
                toolTipLabel={({ datum }) => datum.y}
                barColor={colors.purple}
                data={candidatesAcceptingIndustriesData}
              />
            )}
          </View>
          <View style={isWebView ? {} : { width: "100%", marginBottom: 620 }}>
            {candidatesAcceptingAreasData?.length > 0 && (
              <BarChart
                xAxisTickAngle={-20}
                yAxisLabel={intl.formatMessage({
                  id: "label.candidates",
                })}
                domainPadding={20}
                height={200}
                label={intl.formatMessage({
                  id: "label.candidatesAcceptingOffersIndustries",
                })}
                toolTipLabel={({ datum }) => datum.y}
                barColor={colors.babyPink}
                data={candidatesAcceptingAreasData}
              />
            )}
          </View>
        </ScrollView>
      </View>
    )
  );
};

export default CAJobsDashboard;
