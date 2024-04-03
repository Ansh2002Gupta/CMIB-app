import React, { useEffect } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "../../routes";
import { CustomTabs } from "../../components/Tab/CustomTabs";

import styles from "./Candidates.style";
import CommonText from "../../components/CommonText";
import { Row, View } from "@unthinkable/react-core-components";
import JobApplicants from "../JobApplicantsView/JobApplicantsView";
import useIsWebView from "../../hooks/useIsWebView";
import { navigations } from "../../constants/routeNames";

const Candidates = () => {
  const intl = useIntl();
  const isEditable = false;
  const { isWebView } = useIsWebView();
  const handleEdit = () => {};
  const navigate = useNavigate();

  return (
    <CustomTabs
      renderHeader={() => (
        <Row style={styles.headerContainer}>
          <CommonText fontWeight={"600"} customTextStyle={styles.titleText}>
            {intl.formatMessage({ id: "label.candidates" })}
          </CommonText>
        </Row>
      )}
      tabs={[
        {
          label: intl.formatMessage({ id: "label.job_applicants" }),
          component: <JobApplicants />,
        },
        {
          label: intl.formatMessage({ id: "label.job_seekers" }),
          component: (
            <CommonText>
              {intl.formatMessage({ id: "label.job_seekers" })}
            </CommonText>
          ),
        },

        {
          label: intl.formatMessage({ id: "label.saved_candidates" }),
          component: (
            <CommonText>
              {intl.formatMessage({ id: "label.saved_candidates" })}
            </CommonText>
          ),
        },
      ]}
    />
  );
};

export default Candidates;
