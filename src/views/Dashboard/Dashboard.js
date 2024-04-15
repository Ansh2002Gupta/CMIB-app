import React, { useContext, useState } from "react";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";
import { TwoRow } from "../../core/layouts";

import CAJobsDashboard from "../CAJobsDashboard";
import JobProfileTab from "../JobProfile";
import ScheduleInterviewModal from "../../containers/ScheduleInterviewModal/ScheduleInterviewModal";
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

function DashboardView() {
  const intl = useIntl();
  const [isEnabled, setIsEnabled] = useState(false);
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
      {/* <ScheduleInterviewModal /> */}
    </View>
  );
}

export default DashboardView;
