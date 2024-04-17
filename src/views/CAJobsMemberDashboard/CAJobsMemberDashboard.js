import React from "react";
import { useIntl } from "react-intl";
import { ScrollView, View } from "@unthinkable/react-core-components";

import BarChart from "../../components/BarChart";
import DonutChart from "../../components/DonutChart/DonutChart";
import PieChart from "../../components/PieChart/PieChart";
import colors from "../../assets/colors";
import styles from "./CAJobsMemberDashboard.style";

const CAJobsMemberDashboard = () => {
  const intl = useIntl();
  const DATA = [
    { label: "Google", value: 35 },
    { label: "Infosys", value: 40 },
    { label: "TCS", value: 80 },
    { label: "Wipro", value: 96 },
    { label: "Microsoft", value: 101 },
    { label: "Daffodil", value: 20 },
    { label: "Cars24", value: 19 },
    { label: "Facebook", value: 34 },
    { label: "Snapchat", value: 67 },
    { label: "Infosys", value: 45 },
    { label: "DBMS", value: 56 },
    { label: "HighTech", value: 2 },
  ];
  const PIE_ONE_DATA = [
    { label: "Interviews Pending", value: 6 },
    { label: "Interviews Given", value: 8 },
  ];
  const PIE_TWO_DATA = [
    { label: "Regular", value: 25 },
    { label: "Construtural", value: 25 },
    { label: "Post Retirement", value: 25 },
    { label: "For Specially Added", value: 25 },
  ];
  const PIE_THREE_DATA = [
    { label: "Urgent", value: 33 },
    { label: "Others", value: 67 },
  ];
  const PIE_FOUR_DATA = [
    { label: "Functional Area (1)", value: 8 },
    { label: "Functional Area (2)", value: 13 },
    { label: "Functional Area (3)", value: 13 },
    { label: "Functional Area (4)", value: 8 },
    { label: "Functional Area (5)", value: 8 },
    { label: "Functional Area (6)", value: 13 },
    { label: "Functional Area (7)", value: 8 },
    { label: "Functional Area (8)", value: 8 },
    { label: "Functional Area (9)", value: 8 },
    { label: "Functional Area (10)", value: 13 },
  ];

  return (
    <ScrollView style={{ gap: 24 }}>
      <View style={{ gap: 24, flexDirection: "row", flexWrap: "wrap" }}>
        <DonutChart
          colorScale={[colors.disabledGrey, colors.purple]}
          data={PIE_ONE_DATA}
          height={200}
          innerRadius={60}
          label={intl.formatMessage({
            id: "label.interviewsScheduled",
          })}
          labelRadius={42}
          labelColor={colors.white}
          width={500}
        />
        <PieChart
          colorScale={[
            colors.greenBlue,
            colors.green,
            colors.babyPink,
            colors.purple,
          ]}
          data={PIE_TWO_DATA}
          height={248}
          label={intl.formatMessage({
            id: "label.jobTypes",
          })}
          labelRadius={120}
          labelColor={colors.darkGrey}
          width={300}
        />
      </View>
      <View style={{ gap: 24, flexDirection: "row", flexWrap: "wrap" }}>
        <PieChart
          colorScale={[colors.errorRed, colors.grassGreen]}
          data={PIE_THREE_DATA}
          height={248}
          label={intl.formatMessage({
            id: "label.urgentJobs",
          })}
          labelRadius={42}
          labelColor={colors.white}
        />
        <PieChart
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
          data={PIE_FOUR_DATA}
          width={500}
          height={248}
          label={intl.formatMessage({
            id: "label.selectedFunctionalAreas",
          })}
          labelRadius={120}
          labelColor={colors.darkGrey}
        />
      </View>

      <BarChart
        label={intl.formatMessage({
          id: "label.topCompaniesHighestJobsOffered",
        })}
        barColor={colors.purple}
        data={DATA}
      />
      <BarChart
        label={intl.formatMessage({
          id: "label.topCompaniesHighestCTCs",
        })}
        barColor={colors.green}
        data={DATA}
      />
    </ScrollView>
  );
};

export default CAJobsMemberDashboard;
