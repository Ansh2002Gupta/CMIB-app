import React from "react";
import { useIntl } from "react-intl";

import { TwoRow } from "../../core/layouts";

import IconHeader from "../../components/IconHeader/IconHeader";
import CustomTable from "../../components/CustomTable";
import useIsWebView from "../../hooks/useIsWebView";
import useJobApplicants from "./controllers/useJobApplicantsView";
import { data } from "./constant";
import {
  JOB_APPLICANTS_HEADING,
  ROWS_PER_PAGE_ARRAY,
} from "../../constants/constants";

const JobApplicants = () => {
  const intl = useIntl();
  const { isWebView } = useIsWebView();
  const {
    getColoumConfigs,
    getStatusStyle,
    headingTexts,
    isHeading,
    subHeadingText,
    statusText,
    tableIcon,
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
          rowsLimit={ROWS_PER_PAGE_ARRAY}
        />
      }
    />
  );
};

export default JobApplicants;
