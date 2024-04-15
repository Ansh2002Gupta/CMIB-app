import React, { useContext, useState } from "react";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";
import { TwoColumn, TwoRow } from "../../core/layouts";

import CAJobsDashboard from "../CAJobsDashboard";
import JobProfileTab from "../JobProfile";
import ScheduleInterviewModal from "../../containers/ScheduleInterviewModal/ScheduleInterviewModal";
import BarChart from "../../components/BarChart";
import PieChart from "../../components/PieChart/PieChart";
import IconHeader from "../../components/IconHeader/IconHeader";
import TouchableImage from "../../components/TouchableImage";
import useSaveLogo from "../../services/apiServices/hooks/CompanyLogo/useSaveLogoAPI";
import useDeleteLogo from "../../services/apiServices/hooks/CompanyLogo/useDeleteLogoAPI";
import { moduleKeys } from "../../constants/sideBarHelpers";
import images from "../../images";
import styles from "./dashboard.style";
import useIsWebView from "../../hooks/useIsWebView";
import { SideBarContext } from "../../globalContext/sidebar/sidebarProvider";
import SearchView from "../../components/SearchView";
import colors from "../../assets/colors";

function DashboardView() {
  const intl = useIntl();
  const [isEnabled, setIsEnabled] = useState(false);
  const { isWebView } = useIsWebView();
  const [sideBarState] = useContext(SideBarContext);
  const { selectedModule } = sideBarState;
  const DATA = [
    { x: "Google", y: 35 },
    { x: "Infosys", y: 40 },
    { x: "TCS", y: 80 },
    { x: "Wipro", y: 96 },
    { x: "Microsoft", y: 101 },
    { x: "Daffodil", y: 20 },
    { x: "Cars24", y: 19 },
    { x: "Facebook", y: 34 },
    { x: "Snapchat", y: 67 },
    { x: "Infosys", y: 45 },
    { x: "DBMS", y: 56 },
    { x: "HighTech", y: 2 },
  ];
  const PIE_ONE_DATA = [
    { x: "Urgent", y: 33 },
    { x: "Others", y: 67 },
  ];
  const PIE_TWO_DATA = [
    { x: "Functional Area (1)", y: 8 },
    { x: "Functional Area (2)", y: 13 },
    { x: "Functional Area (3)", y: 13 },
    { x: "Functional Area (4)", y: 8 },
    { x: "Functional Area (5)", y: 8 },
    { x: "Functional Area (6)", y: 13 },
    { x: "Functional Area (7)", y: 8 },
    { x: "Functional Area (8)", y: 8 },
    { x: "Functional Area (9)", y: 8 },
    { x: "Functional Area (10)", y: 13 },
  ];
  const PIE_THREE_DATA = [
    { x: "Regular", y: 25 },
    { x: "Construtural", y: 25 },
    { x: "Post Retirement", y: 25 },
    { x: "For Specially Added", y: 25 },
  ];
  return (
    <View style={styles.container}>
      <TwoRow
        topSection={
          isWebView && (
            <IconHeader
              hasIconBar
              headerText={intl.formatMessage({ id: "label.dashboard" })}
              intl={intl}
            />
          )
        }
        isBottomFillSpace
        bottomSection={
          <>
            {/* {moduleKeys.CA_JOBS_KEY === selectedModule?.key ? (
              <CAJobsDashboard />
            ) : null} */}
            <TwoColumn
              isLeftFillSpace
              leftSection={
                <PieChart
                  label={intl.formatMessage({
                    id: "label.selectedFunctionalAreas",
                  })}
                  data={PIE_ONE_DATA}
                  colorScale={[colors.errorRed, colors.grassGreen]}
                  labelRadius={42}
                  labelColor={colors.white}
                />
              }
              rightSection={
                <PieChart
                  label={intl.formatMessage({
                    id: "label.urgentJobs",
                  })}
                  data={PIE_THREE_DATA}
                  colorScale={[
                    colors.greenBlue,
                    colors.green,
                    colors.babyPink,
                    colors.purple,
                  ]}
                  labelRadius={120}
                  labelColor={colors.darkGrey}
                />
              }
            />
            <TwoColumn
              isRightFillSpace
              leftSection={
                <PieChart
                  label={intl.formatMessage({
                    id: "label.selectedFunctionalAreas",
                  })}
                  data={PIE_ONE_DATA}
                  colorScale={[colors.errorRed, colors.grassGreen]}
                  labelRadius={42}
                  labelColor={colors.white}
                />
              }
              rightSection={
                <PieChart
                  label={intl.formatMessage({
                    id: "label.urgentJobs",
                  })}
                  data={PIE_TWO_DATA}
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
                  labelRadius={120}
                  labelColor={colors.darkGrey}
                />
              }
            />
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
          </>
        }
        bottomSectionStyle={{ padding: 24 }}
      />
    </View>
  );
}

export default DashboardView;
