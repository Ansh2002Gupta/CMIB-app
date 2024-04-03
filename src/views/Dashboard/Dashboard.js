import React, { useContext, useState } from "react";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";
import useIsWebView from "../../hooks/useIsWebView";
import styles from "./dashboard.style";
import IconHeader from "../../components/IconHeader/IconHeader";
import { TwoRow } from "../../core/layouts";
import CAJobsDashboard from "../CAJobsDashboard";
import { SideBarContext } from "../../globalContext/sidebar/sidebarProvider";
import { moduleKeys } from "../../constants/sideBarHelpers";

function DashboardView() {
  const intl = useIntl();
  const { isWebView } = useIsWebView();
  const [sideBarState] = useContext(SideBarContext);
  const { selectedModule } = sideBarState;

  console.log(selectedModule.key, "selectedModule");

  return (
    <View style={styles.container}>
      <TwoRow
        topSection={
          <IconHeader
            hasActionButton={false}
            showInWeb={isWebView}
            hasIconBar
            headerText={intl.formatMessage({ id: "label.dashboard" })}
            intl={intl}
          />
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
    </View>
  );
}

export default DashboardView;
