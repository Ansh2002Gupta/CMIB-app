import React, { useContext } from "react";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";
import useIsWebView from "../../hooks/useIsWebView";

import { TwoRow } from "../../core/layouts";

import CAJobsDashboard from "../CAJobsDashboard";
import IconHeader from "../../components/IconHeader/IconHeader";
import { moduleKeys } from "../../constants/sideBarHelpers";
import { SideBarContext } from "../../globalContext/sidebar/sidebarProvider";
import styles from "./dashboard.style";
import ViewInterviewDetails from "../../containers/ViewInterviewDetails";
import ScheduleInterviewModal from "../../containers/ScheduleInterviewModal/ScheduleInterviewModal";

function DashboardView() {
  const intl = useIntl();
  const { isWebView } = useIsWebView();
  const [sideBarState] = useContext(SideBarContext);
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
          <>
            {moduleKeys.CA_JOBS_KEY === selectedModule?.key ? (
              <CAJobsDashboard />
            ) : null}
          </>
        }
      />
      {/*  uncomment this to see modals */}
      {/* <ViewInterviewDetails /> */}
      <ScheduleInterviewModal />
    </View>
  );
}

export default DashboardView;
