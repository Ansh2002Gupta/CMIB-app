import React from "react";
import { useIntl } from "react-intl";
import { Platform } from "@unthinkable/react-core-components";

import { TwoColumn, TwoRow } from "../../core/layouts";

import CommonText from "../CommonText";
import JobCardMobile from "./JobCardMobile";
import JobCardWeb from "./JobCardWeb";
import ToastComponent from "../ToastComponent/ToastComponent";
import { useDelete } from "../../hooks/useApiRequest";
import useIsWebView from "../../hooks/useIsWebView";
import { MEMBER_JOB, SAVE } from "../../services/apiServices/apiEndPoint";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../constants/errorMessages";
import style from "./SavedJobComponent.style";

const SavedJobComponent = ({ details }) => {
  const intl = useIntl();
  const isWeb = Platform.OS.toLowerCase() === "web";
  const { isWebView } = useIsWebView();
  const {
    makeRequest: deleteJob,
    isLoading: isDeletingJob,
    isSuccess,
    error: errorWhileDeletingJob,
    setError: setErrorWhileDeletingJob,
  } = useDelete({ url: MEMBER_JOB });

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
        style={style.mainContainer}
        topSection={
          <TwoColumn
            isLeftFillSpace
            rightSection={
              <CommonText
                customContainerStyle={style.urgentText}
                customTextStyle={style.urgentTextStyles}
              >
                {intl.formatMessage({ id: "label.urgent" })}
              </CommonText>
            }
          />
        }
        bottomSection={
          isWebView ? (
            <JobCardWeb
              isLoading={isDeletingJob}
              companyName={details?.company_name}
              createdAt={details?.created_at}
              jobPostion={"vsvfs"}
              jobDescription={details?.summary}
              jobLocation={details?.location}
              handleRemove={() => handleRemove(details.id)}
              vaccancies={details?.vacancy}
              minSalary={details?.min_salary}
              maxSalary={details?.max_salary}
              minExperience={details?.min_experience}
              maxExperience={details?.max_experience}
              requirement={[
                "Audit",
                "dsbdf",
                "dfsbdsfb",
                "dfgsdfg",
                "dfgsg",
                "dsfgwergw",
                "regwerg",
                "Rtfergwer",
              ]}
            />
          ) : (
            <JobCardMobile
              isLoading={isDeletingJob}
              companyName={details?.company_name}
              createdAt={details?.created_at}
              jobPostion={"vsvfs"}
              jobDescription={details?.summary}
              jobLocation={details?.location}
              handleRemove={() => handleRemove(details.id)}
              vaccancies={details?.vacancy}
              minSalary={details?.min_salary}
              maxSalary={details?.max_salary}
              minExperience={details?.min_experience}
              maxExperience={details?.max_experience}
              requirement={[
                "Audit",
                "dsbdf",
                "dfsbdsfb",
                "dfgsdfg",
                "dfgsg",
                "dsfgwergw",
                "regwerg",
                "Rtfergwer",
              ]}
            />
          )
        }
      />
    </>
  );
};

export default SavedJobComponent;
