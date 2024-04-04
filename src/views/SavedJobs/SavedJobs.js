import React from "react";
import { useIntl } from "react-intl";
import { ScrollView, View } from "@unthinkable/react-core-components";

import TwoRow from "../../core/layouts/TwoRow/TwoRow";

import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import IconHeader from "../../components/IconHeader/IconHeader";
import SavedJobComponent from "../../components/SavedJobComponent";
import ToastComponent from "../../components/ToastComponent/ToastComponent";
import SearchView from "../../components/SearchView";
import Spinner from "../../components/Spinner";
import useFetch from "../../hooks/useFetch";
import { useDelete } from "../../hooks/useApiRequest";
import useIsWebView from "../../hooks/useIsWebView";
import {
  MEMBER_JOB,
  MEMBER_SAVED_JOBS,
  SAVE,
} from "../../services/apiServices/apiEndPoint";
import images from "../../images";
import style from "./SavedJobs.style";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../constants/errorMessages";
import CommonText from "../../components/CommonText";

const SavedJobs = () => {
  const intl = useIntl();
  const { isWebView } = useIsWebView();
  const {
    data: savedJobsList,
    isLoading: isGettingSavedJob,
    fetchData: fetchSavedJobList,
    error: errorWhileGettingSavedJob,
  } = useFetch({
    url: `${MEMBER_SAVED_JOBS}`,
  });

  const {
    makeRequest: deleteJob,
    isLoading: isDeletingJob,
    isSuccess,
    error: errorWhileDeletingJob,
    setError: setErrorWhileDeletingJob,
  } = useDelete({ url: MEMBER_JOB });

  const handleSearch = (val) => {
    fetchSavedJobList({
      queryParamsObject: {
        search: val,
      },
    });
  };
  const handleDismissToast = () => {
    setErrorWhileDeletingJob("");
  };

  const handleRemove = (id) => {
    deleteJob({ overrideUrl: MEMBER_JOB + `/${id}` + SAVE });
  };

  return (
    <>
      {errorWhileDeletingJob && (
        <ToastComponent
          toastMessage={
            errorWhileDeletingJob || GENERIC_GET_API_FAILED_ERROR_MESSAGE
          }
          onDismiss={handleDismissToast}
          customToastStyle={style.customToastStyle}
        />
      )}
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
                            handleRemove={() => {
                              handleRemove(details?.id);
                            }}
                            isLoading={isDeletingJob}
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
    </>
  );
};

export default SavedJobs;
