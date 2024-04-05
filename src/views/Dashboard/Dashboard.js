import React, { useContext, useState } from "react";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";
import useIsWebView from "../../hooks/useIsWebView";

import CommonText from "../../components/CommonText";
import RangeSlider from "../../components/RangeSlider";
import styles from "./dashboard.style";
import images from "../../images";
import SearchView from "../../components/SearchView";
import TouchableImage from "../../components/TouchableImage";
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
