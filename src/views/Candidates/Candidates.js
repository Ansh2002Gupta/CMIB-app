import React from "react";
import { useIntl } from "react-intl";
import { useTheme } from "@unthinkable/react-theme";
import { Row } from "@unthinkable/react-core-components";

import { CustomTabs } from "../../components/Tab/CustomTabs";
import CommonText from "../../components/CommonText";
import JobApplicants from "../JobApplicantsView/JobApplicantsView";
import SavedCandidates from "../SavedCandidatesView";
import JobSeekers from "../JobSeekers";
import getStyles from "./Candidates.style";

const Candidates = () => {
  const intl = useIntl();
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <CustomTabs
      containerStyle={styles.customTabsStyle}
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
          component: <JobSeekers />,
        },

        {
          label: intl.formatMessage({ id: "label.saved_candidates" }),
          component: <SavedCandidates />,
        },
      ]}
    />
  );
};

export default Candidates;
