import React, { useContext, useState } from "react";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";

import { TwoRow } from "../../core/layouts";
import CAJobsDashboard from "../CompanyDashboard/CAJobsDashboard";
import CAJobsMemberDashboard from "../MemberDashBoard/CAJobsMemberDashboard";
import CarrerAscentMemeberDashboard from "../MemberDashBoard/CarrerAscentMemeberDashboard";
import NQCACandidateDashboard from "../MemberDashBoard/NQCACandidateDashboard";
import NQCACompanyDashboard from "../CompanyDashboard/NQCACompanyDashboard";
import OverSeasMemberDashBoard from "../MemberDashBoard/OverSeasMemberDashBoard";
import WomenMemberDashBoard from "../MemberDashBoard/WomenMemberDashBoard";
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
            {isCompany ? (
              <View style={styles.innerContainer}>
                {moduleKeys.CA_JOBS_KEY === selectedModule?.key && (
                  <CAJobsDashboard />
                )}
                {moduleKeys.NEWLY_QUALIFIED_PLACEMENTS_KEY ===
                  selectedModule?.key && <NQCACompanyDashboard />}
              </View>
            ) : (
              <View style={styles.innerContainer}>
                {moduleKeys.CA_JOBS_KEY === selectedModule?.key && (
                  <CAJobsMemberDashboard />
                )}
                {moduleKeys.CARRER_ASCENT_KEY === selectedModule?.key && (
                  <CarrerAscentMemeberDashboard />
                )}
                {moduleKeys.OVERSEAS_CHAPTERS_KEY === selectedModule?.key && (
                  <OverSeasMemberDashBoard />
                )}
                {moduleKeys.NEWLY_QUALIFIED_PLACEMENTS_KEY ===
                  selectedModule?.key && <NQCACandidateDashboard />}
                {moduleKeys.WOMEN_PARTTIME_KEY === selectedModule?.key && (
                  <WomenMemberDashBoard />
                )}
              </View>
            )}
          </View>
        }
      ></TwoRow>
    </View>
  );
}

export default DashboardView;
