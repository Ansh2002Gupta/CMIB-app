import React from "react";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";

import TwoRow from "../../core/layouts/TwoRow/TwoRow";

import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import IconHeader from "../../components/IconHeader/IconHeader";
import SavedJobComponent from "../../components/SavedJobComponent";
import SearchView from "../../components/SearchView";
import Spinner from "../../components/Spinner";
import useFetch from "../../hooks/useFetch";
import { MEMBER_SAVED_JOBS } from "../../services/apiServices/apiEndPoint";
import style from "./SavedJobs.style";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../constants/errorMessages";

const SavedJobs = () => {
  const intl = useIntl();
  const {
    data: savedJobsList,
    isLoading: isGettingSavedJob,
    fetchData: fetchSavedJobList,
    error: errorWhileGettingSavedJob,
  } = useFetch({
    url: `${MEMBER_SAVED_JOBS}`,
  });

  console.log(
    savedJobsList,
    "savedJobsList.",
    errorWhileGettingSavedJob,
    "errorWhileGettingSavedJob.."
  );
  return (
    <TwoRow
      topSection={
        <IconHeader
          headerText={intl.formatMessage({ id: "label.saved_jobs" })}
        />
      }
      bottomSection={
        <TwoRow
          style={style.innerContainer}
          topSection={<SearchView />}
          bottomSection={
            isGettingSavedJob ? (
              <View style={style.loaderStyle}>
                <Spinner />
              </View>
            ) : errorWhileGettingSavedJob ? (
              <ErrorComponent
                errorMsg={
                  errorWhileGettingSavedJob?.message ||
                  GENERIC_GET_API_FAILED_ERROR_MESSAGE
                }
                onRetry={() => {
                  fetchSavedJobList({});
                }}
                disableRetryBtn={isGettingSavedJob}
              />
            ) : (
              <SavedJobComponent />
            )
          }
          bottomSectionStyle={style.bottomSectionStyle}
        />
      }
      isBottomFillSpace
    />
  );
};

export default SavedJobs;
