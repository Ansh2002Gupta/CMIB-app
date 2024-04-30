import React from "react";
import { useIntl } from "react-intl";
import { useTheme } from "@unthinkable/react-theme";

import AllJobs from "../AllJobs/AllJobs";
import AppliedJobsView from "../AppliedJobsView";
import CommonText from "../../components/CommonText";
import SavedJobs from "../SavedJobs";
import { CustomTabs } from "../../components/Tab/CustomTabs";
import { Row } from "@unthinkable/react-core-components";
import getStyles from "./Jobs.styles";

const Jobs = () => {
  const intl = useIntl();

  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <CustomTabs
      containerStyle={styles.tabContainer}
      renderHeader={() => (
        <Row style={styles.headerContainer}>
          <CommonText fontWeight={"600"} customTextStyle={styles.titleText}>
            {intl.formatMessage({ id: "label.jobs" })}
          </CommonText>
        </Row>
      )}
      tabs={[
        {
          label: intl.formatMessage({ id: "label.saved_jobs" }),
          component: <SavedJobs />,
        },
        {
          label: intl.formatMessage({ id: "label.applied_Jobs" }),
          component: <AppliedJobsView />,
        },

        {
          label: intl.formatMessage({ id: "label.all_Jobs" }),
          component: <AllJobs />,
        },
      ]}
    />
  );
};

export default Jobs;
