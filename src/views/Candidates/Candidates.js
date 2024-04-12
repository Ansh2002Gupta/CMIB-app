import React from "react";
import { Row, View } from "@unthinkable/react-core-components";
import { useIntl } from "react-intl";

import { CustomTabs } from "../../components/Tab";
import CommonText from "../../components/CommonText";
import style from "./Candidates.style";
import JobSeekers from "../JobSeekers";

const Candidates = () => {
  const intl = useIntl();

  return (
    <View style={style.containerStyle}>
      <CustomTabs
        renderHeader={() => (
          <Row style={style.headerContainer}>
            <CommonText fontWeight={"600"} customTextStyle={style.titleText}>
              {intl.formatMessage({ id: "label.candidates" })}
            </CommonText>
          </Row>
        )}
        tabs={[
          {
            label: intl.formatMessage({ id: "label.job_applicants" }),
            component: <></>,
          },
          {
            label: intl.formatMessage({ id: "label.job_seekers" }),
            component: <JobSeekers />,
          },
          {
            label: intl.formatMessage({ id: "label.saved_candidates" }),
            component: <></>,
          },
        ]}
      />
    </View>
  );
};

export default Candidates;
