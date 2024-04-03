import React from "react";
import { useIntl } from "react-intl";

import { TwoRow } from "../../core/layouts";

import IconHeader from "../../components/IconHeader/IconHeader";
import CustomTable from "../../components/CustomTable";
import useIsWebView from "../../hooks/useIsWebView";
import useJobApplicants from "./controllers/useJobApplicantsView";
import { data } from "./constant";
import { JOB_APPLICANTS_HEADING } from "../../constants/constants";

const JobApplicants = () => {
  const intl = useIntl();
  const { isWebView } = useIsWebView();
  const {
    getColoumConfigs,
    isHeading,
    headingTexts,
    subHeadingText,
    statusText,
    tableIcon,
    getStatusStyle,
  } = useJobApplicants();

  return (
    <TwoRow
      topSection={
        isWebView && (
          <IconHeader
            headerText={intl.formatMessage({ id: "label.job_applicants" })}
          />
        )
      }
      isBottomFillSpace
      bottomSection={
        <CustomTable
          getColoumConfigs={getColoumConfigs}
          data={data?.records}
          tableHeading={JOB_APPLICANTS_HEADING}
          isHeading={isHeading}
          headingTexts={headingTexts}
          subHeadingText={subHeadingText}
          statusText={statusText}
          getStatusStyle={getStatusStyle}
          tableIcon={tableIcon}
        />
      }
    />
  );
};

export default JobApplicants;
