import React, { useState } from "react";
import { useIntl } from "react-intl";
import { Platform, View } from "@unthinkable/react-core-components";

import { TwoColumn, TwoRow } from "../../core/layouts";

import CommonText from "../CommonText";
import JobCardMobile from "./JobCardMobile";
import JobCardWeb from "./JobCardWeb";
import useIsWebView from "../../hooks/useIsWebView";
import style from "./SavedJobComponent.style";
import { useDelete, usePost } from "../../hooks/useApiRequest";
import { MEMBER_JOB, SAVE } from "../../services/apiServices/apiEndPoint";
import ToastComponent from "../ToastComponent/ToastComponent";

const SavedJobComponent = ({ details }) => {
  const intl = useIntl();
  const isWeb = Platform.OS.toLowerCase() === "web";
  const { isWebView } = useIsWebView();
  const [isRemoved, setIsRemoved] = useState(false);
  const { id } = details;

  const cardDetails = {
    companyName: details?.company_name,
    createdAt: details?.created_at,
    jobPostion: details?.designation,
    jobDescription: details?.detail,
    jobLocation: details?.location,
    vaccancies: details?.vacancy,
    minSalary: details?.min_salary,
    maxSalary: details?.max_salary,
    minExperience: details?.min_experience,
    maxExperience: details?.max_experience,
    requirement: details?.functional_areas,
    company_logo: details?.company_logo,
  };

  const {
    makeRequest: deleteJob,
    isLoading: isDeletingJob,
    error: errorWhileDeletingJob,
    setError: setErrorWhileDeletingJob,
  } = useDelete({ url: MEMBER_JOB });

  const {
    makeRequest: saveJob,
    isLoading: isSaveJobJob,
    error: errorWhileSavingJob,
    setError: setErrorWhileSavingJob,
  } = usePost({ url: MEMBER_JOB });

  const isLoading = isDeletingJob || isSaveJobJob;

  const error = errorWhileDeletingJob || errorWhileSavingJob;

  const handleRemove = () => {
    deleteJob({
      overrideUrl: MEMBER_JOB + `/${id}` + SAVE,
      onSuccessCallback: () => {
        setIsRemoved(id);
      },
    });
  };

  const handleSave = () => {
    saveJob({
      overrideUrl: MEMBER_JOB + `/${id}` + SAVE,
      onSuccessCallback: () => {
        setIsRemoved(null);
      },
    });
  };

  const handleApply = () => {};

  const handleResetError = () => {
    setErrorWhileDeletingJob("");
    setErrorWhileSavingJob("");
  };

  return (
    <>
      <TwoRow
        style={style.mainContainer}
        topSection={
          <TwoColumn
            style={style.topCurveSection}
            isLeftFillSpace
            leftSection={<View style={style.whiteCurveSection} />}
            rightSection={
              <CommonText
                customContainerStyle={style.urgentText}
                customTextStyle={style.urgentTextStyles}
                fontWeight="600"
              >
                {intl.formatMessage({ id: "label.urgent" })}
              </CommonText>
            }
            rightSectionStyle={style.backgroundWhite}
          />
        }
        bottomSection={
          isWebView ? (
            <JobCardWeb
              {...{
                cardDetails,
                isLoading,
                handleRemove,
                handleApply,
                handleSave,
                isRemoved,
              }}
            />
          ) : (
            <JobCardMobile
              {...{
                cardDetails,
                isLoading,
                handleRemove,
                handleApply,
                handleSave,
                isRemoved,
              }}
            />
          )
        }
      />
      {!!error && (
        <ToastComponent toastMessage={error} onDismiss={handleResetError} />
      )}
    </>
  );
};

export default SavedJobComponent;
