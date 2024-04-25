import React, { useState, useEffect } from "react";
import { useTheme } from "@unthinkable/react-theme";

import { Base } from "../../core/layouts";

import QuestionaireModal from "../../components/QuestionaireModal";
import usePostedJobs from "./controllers/usePostedJobs";
import PostedJobsTemplate from "./PostedJobsTemplate";
import ToastComponent from "../../components/ToastComponent/ToastComponent";
import getStyles from "./styles";
import useFetch from "../../hooks/useFetch";
import { usePost } from "../../hooks/useApiRequest";
import useSaveAndRemoveJob from "../../services/apiServices/hooks/useSaveAndRemoveJob";
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
  const theme = useTheme();
  const styles = getStyles(theme);

  const [applyJobModal, setApplyJobModal] = useState(false);
  const [isApplyVisible, setIsApplyVisible] = useState(null);
  const [isSaveVisible, setIsSaveVisible] = useState(null);

  const { data, isLoading, error } = useFetch({
    url: `${GET_JOB_DETAIL}/${jobId}`,
  });

  useEffect(() => {
    setIsApplyVisible(!data?.is_applied);
    setIsSaveVisible(!data?.is_saved);
  }, [data]);

  const {
    isSaveVisibleButton,
    handleSaveAndRemove,
    isLoading: isSavingRemoving,
    error: errorWhileGettingSaveRemove,
    resetError,
  } = useSaveAndRemoveJob({ id: jobId, isSaveVisible: isSaveVisible });

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

  const handleCloseModal = () => {
    setApplyJobModal(false);
  };
  const handleResetError = () => {
    resetError();
  };

  const handleSuccessApply = (id) => {
    setIsApplyVisible(false);
  };

  return (
    <Base style={styles.containerViewStyle}>
      {applyJobModal && (
        <QuestionaireModal
          jobId={jobId}
          handleCloseModal={handleCloseModal}
          handleSuccessApply={handleSuccessApply}
        />
      )}
      <PostedJobsTemplate
        details={jobDetail}
        handleOpenModal={() => {
          setApplyJobModal(true);
        }}
        handleSaveAndRemove={handleSaveAndRemove}
        isApplyVisible={isApplyVisible}
        isSaveVisibleButton={isSaveVisibleButton}
        isSavingRemoving={isSavingRemoving}
      />
      {errorWhileGettingSaveRemove ? (
        <ToastComponent
          toastMessage={errorWhileGettingSaveRemove}
          onDismiss={handleResetError}
        />
      ) : null}
    </Base>
  );
};

export default PostedJobs;
