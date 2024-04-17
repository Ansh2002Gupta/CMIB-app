import React, { useContext, useState } from "react";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";

import { TwoRow } from "../../core/layouts";

import CAJobsDashboard from "../CAJobsDashboard";
import IconHeader from "../../components/IconHeader/IconHeader";
import { SideBarContext } from "../../globalContext/sidebar/sidebarProvider";
import useIsWebView from "../../hooks/useIsWebView";
import { moduleKeys } from "../../constants/sideBarHelpers";
import styles from "./dashboard.style";
import JobDetails from "../../containers/RoundOne/ApplicationFormContainer/JobDetails";
import CompanyProfileForm from "../../containers/RoundOne/ApplicationFormContainer/CompanyProfileForm/CompanyProfileForm";

// Just ignore this file as just to test custom component
function DashboardView() {
  const intl = useIntl();
  const [sideBarState] = useContext(SideBarContext);
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
          <>
            {moduleKeys.CA_JOBS_KEY === selectedModule?.key ? (
              <CAJobsDashboard />
            ) : null}
          </>
        }
      ></TwoRow>
    </View>
  );
}

export default DashboardView;
