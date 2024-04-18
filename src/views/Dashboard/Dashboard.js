import React, { useContext, useState } from "react";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";
import { TwoColumn, TwoRow } from "../../core/layouts";

import CAJobsDashboard from "../CAJobsDashboard";
import CAJobsMemberDashboard from "../CAJobsMemberDashboard";
import JobProfileTab from "../JobProfile";
import ScheduleInterviewModal from "../../containers/ScheduleInterviewModal/ScheduleInterviewModal";
import BarChart from "../../components/BarChart";
import DonutChart from "../../components/DonutChart/DonutChart";
import PieChart from "../../components/PieChart/PieChart";
import IconHeader from "../../components/IconHeader/IconHeader";
import TouchableImage from "../../components/TouchableImage";
import useFetch from "../../hooks/useFetch";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";
import useSaveLogo from "../../services/apiServices/hooks/CompanyLogo/useSaveLogoAPI";
import useDeleteLogo from "../../services/apiServices/hooks/CompanyLogo/useDeleteLogoAPI";
import { moduleKeys } from "../../constants/sideBarHelpers";
import images from "../../images";
import styles from "./dashboard.style";
import useIsWebView from "../../hooks/useIsWebView";
import { SideBarContext } from "../../globalContext/sidebar/sidebarProvider";
import {
  ROUND_ONE_DASHBOARD,
  USER_TYPE_MEMBER,
} from "../../services/apiServices/apiEndPoint";
import SearchView from "../../components/SearchView";
import colors from "../../assets/colors";
import { CHART_DATA_TYPE } from "../../constants/constants";

function DashboardView() {
  const intl = useIntl();
  const [isEnabled, setIsEnabled] = useState(false);
  const { isWebView } = useIsWebView();
  const [sideBarState] = useContext(SideBarContext);
  const { isCompany } = useGetCurrentUser();

  const { selectedModule } = sideBarState;

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
          <View>
            {moduleKeys.CA_JOBS_KEY === selectedModule?.key ? (
              isCompany ? (
                <CAJobsDashboard />
              ) : (
                <CAJobsMemberDashboard />
              )
            ) : null}
          </View>
        }
        bottomSectionStyle={{ padding: 24 }}
      />
    </View>
  );
}

export default DashboardView;
