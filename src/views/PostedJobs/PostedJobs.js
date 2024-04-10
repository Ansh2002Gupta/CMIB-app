import React, { useState } from "react";

import { Base } from "../../core/layouts";

import QuestionaireModal from "../../components/QuestionaireModal";
import usePostedJobs from "./controllers/usePostedJobs";
import PostedJobsTemplate from "./PostedJobsTemplate";
import styles from "./styles";
import useFetch from "../../hooks/useFetch";
import { usePost } from "../../hooks/useApiRequest";
import Spinner from "../../components/Spinner";
import { View } from "@unthinkable/react-core-components";
import { STATUS_CODES } from "../../constants/constants";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import { useParams } from "react-router";
import {
  APPLY_JOB,
  GET_JOB_DETAIL,
} from "../../services/apiServices/apiEndPoint";

const PostedJobs = () => {
  let { jobId } = useParams();
  const [applyJobModal, setApplyJobModal] = useState(false);

  const { data, isLoading, error } = useFetch({
    url: `${GET_JOB_DETAIL}/${jobId}`,
  });

  const {
    makeRequest: handleApplyJob,
    isLoading: isjobAppling,
    error: errorWhileApplyingJobs,
    setError: setErrorWhileApplyingJob,
  } = usePost({
    url: APPLY_JOB,
  });

  const fetchJobError = error?.data;

  const { jobDetail } = usePostedJobs({ state: data ?? {} });

  if (isLoading) {
    return (
      <View style={styles.loaderStyle}>
        <Spinner />
      </View>
    );
  }

  if (fetchJobError && fetchJobError?.code !== STATUS_CODES.UNAUTHORIZED_USER) {
    return <ErrorComponent errorMsg={fetchJobError?.message} />;
  }

  const handleCancelButton = () => {
    setApplyJobModal(false);
  };

  const handleSaveButton = (data) => {
    let payload;
    payload = {
      job_id: jobId,
      answers: data.map((item) => {
        return {
          question_id: item?.id,
          answer: Array.isArray(item?.value) ? item?.value : [item?.value],
        };
      }),
    };
    handleApplyJob({
      body: payload,
      onSuccessCallback: () => {
        setApplyJobModal(false);
      },
    });
  };

  return (
    <Base style={styles.containerViewStyle}>
      {applyJobModal && (
        <QuestionaireModal
          jobId={jobId}
          handleCancelButton={handleCancelButton}
          handleSaveButton={handleSaveButton}
        />
      )}
      <PostedJobsTemplate
        details={jobDetail}
        handleOpenModal={() => {
          setApplyJobModal(true);
        }}
      />
    </Base>
  );
};

export default PostedJobs;
