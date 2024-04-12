import React, { useEffect } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "../../routes";
import { CustomTabs } from "../../components/Tab/CustomTabs";

import styles from "./Jobs.styles";
import CommonText from "../../components/CommonText";
import { Row, View } from "@unthinkable/react-core-components";
import SavedJobs from "../SavedJobs";
import useIsWebView from "../../hooks/useIsWebView";
import { navigations } from "../../constants/routeNames";
import AllJobs from "../AllJobs/AllJobs";

const Jobs = () => {
  const intl = useIntl();
  const isEditable = false;
  const { isWebView } = useIsWebView();
  const handleEdit = () => {};
  const navigate = useNavigate();

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
          component: (
            <CommonText>
              {intl.formatMessage({ id: "label.applied_Jobs" })}
            </CommonText>
          ),
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
