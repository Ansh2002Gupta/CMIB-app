import React, { useContext, useState } from "react";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";
import useIsWebView from "../../hooks/useIsWebView";

import styles from "./dashboard.style";

import { SideBarContext } from "../../globalContext/sidebar/sidebarProvider";
import IconHeader from "../../components/IconHeader/IconHeader";
import { TwoRow } from "../../core/layouts";
import { moduleKeys } from "../../constants/sideBarHelpers";
import CAJobsDashboard from "../CAJobsDashboard";

function DashboardView() {
  const intl = useIntl();
  const { isWebView } = useIsWebView();
  const [sideBarState] = useContext(SideBarContext);
  const { selectedModule } = sideBarState;
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
