import React, { useContext } from "react";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";

import { TwoRow } from "../../core/layouts";

import CAJobsDashboard from "../CAJobsDashboard";
import CAJobsMemberDashboard from "../CAJobsMemberDashboard";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";
import IconHeader from "../../components/IconHeader/IconHeader";
import { SideBarContext } from "../../globalContext/sidebar/sidebarProvider";
import useIsWebView from "../../hooks/useIsWebView";
import { moduleKeys } from "../../constants/sideBarHelpers";
import styles from "./dashboard.style";

// Just ignore this file as just to test custom component
function DashboardView() {
  const intl = useIntl();
  const [sideBarState] = useContext(SideBarContext);
  const { isCompany } = useGetCurrentUser();

  const { selectedModule } = sideBarState;
  const { isWebView } = useIsWebView();

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
                <View style={{ padding: 24 }}>
                  <CAJobsMemberDashboard />
                </View>
              )
            ) : null}
          </View>
        }
      ></TwoRow>
    </View>
  );
}

export default DashboardView;
