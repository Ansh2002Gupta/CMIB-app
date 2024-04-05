import React from "react";
import { useIntl } from "react-intl";

import { TwoRow } from "../../core/layouts";

import CustomTable from "../../components/CustomTable";
import IconHeader from "../../components/IconHeader/IconHeader";
import useIsWebView from "../../hooks/useIsWebView";
import useSavedCandidates from "./controllers/useSavedCandidates";
import {
  ROWS_PER_PAGE_ARRAY,
  SAVED_CANDIDATES_TABLE_HEADING,
} from "../../constants/constants";

const SavedCandidatesView = () => {
  const intl = useIntl();
  const { isWebView } = useIsWebView();

  const {
    data,
    formatConfig,
    getStatusStyle,
    getColoumConfigs,
    headingTexts,
    subHeadingText,
    statusText,
    tableIcon,
  } = useSavedCandidates();

  return (
    <TwoRow
      topSection={
        isWebView && (
          <IconHeader
            headerText={intl.formatMessage({ id: "label.saved_candidates" })}
          />
        )
      }
      isBottomFillSpace
      bottomSection={
        <CustomTable
          getColoumConfigs={getColoumConfigs}
          data={data?.records}
          tableHeading={SAVED_CANDIDATES_TABLE_HEADING}
          isHeading
          headingTexts={headingTexts}
          subHeadingText={subHeadingText}
          statusText={statusText}
          getStatusStyle={getStatusStyle}
          tableIcon={tableIcon}
          rowsLimit={ROWS_PER_PAGE_ARRAY}
          formatConfig={formatConfig}
        />
      }
    />
  );
};

export default SavedCandidatesView;
