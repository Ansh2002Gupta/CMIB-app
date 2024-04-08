import React from "react";
import { useIntl } from "react-intl";
import { ScrollView, View } from "@unthinkable/react-core-components";

import TwoRow from "../../core/layouts/TwoRow/TwoRow";

import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import IconHeader from "../../components/IconHeader/IconHeader";
import SavedJobComponent from "../../components/SavedJobComponent";
import SearchView from "../../components/SearchView";
import Spinner from "../../components/Spinner";
import useFetch from "../../hooks/useFetch";
import useIsWebView from "../../hooks/useIsWebView";
import { MEMBER_SAVED_JOBS } from "../../services/apiServices/apiEndPoint";
import style from "./SavedJobs.style";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../constants/errorMessages";
import CommonText from "../../components/CommonText";
import { useNavigate } from "react-router";
import { navigations } from "../../constants/routeNames";

const SavedJobs = () => {
  const intl = useIntl();
  const { isWebView } = useIsWebView();
  const navigate = useNavigate();

  const {
    data: savedJobsList,
    isLoading: isGettingSavedJob,
    fetchData: fetchSavedJobList,
    error: errorWhileGettingSavedJob,
  } = useFetch({
    url: `${MEMBER_SAVED_JOBS}`,
  });

  const handleSearch = (val) => {
    fetchSavedJobList({
      queryParamsObject: {
        search: val,
      },
    });
  };

  const handleClickOnJobCard = (jobId) => {
    navigate(`${navigations.CA_JOBS}/${navigations.JOB_DETAIL}/${jobId}`);
  };

  return (
    <TwoRow
      topSection={
        isWebView && (
          <IconHeader
            headerText={intl.formatMessage({ id: "label.saved_jobs" })}
          />
        )
      }
      bottomSection={
        <TwoRow
          style={style.innerContainer}
          topSection={
            <SearchView
              customParentStyle={isWebView && style.customParentStyle}
              customSearchCriteria={handleSearch}
            />
          }
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
              <View style={style.scrollstyle}>
                {savedJobsList?.length ? (
                  <ScrollView>
                    {savedJobsList?.map((details) => {
                      return (
                        <SavedJobComponent
                          details={details}
                          onPress={handleClickOnJobCard}
                          isSaveVisible={false} //TODO: need to check if job is saved or not
                        />
                      );
                    })}
                  </ScrollView>
                ) : (
                  <View style={style.noResultContainer}>
                    <CommonText
                      customTextStyle={style.noResultText}
                      fontWeight={"600"}
                    >
                      {intl.formatMessage({ id: "label.no_result_found" })}
                    </CommonText>
                  </View>
                )}
              </View>
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
