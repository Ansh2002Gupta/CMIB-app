import { useState } from "react";
import { useDelete, usePost } from "../../../hooks/useApiRequest";
import { MEMBER_JOB, SAVE } from "../apiEndPoint";

const useSaveAndRemoveJob = ({ id, isSaveVisible }) => {
  const [isSaveVisibleButton, setIsSaveVisibleButton] = useState(isSaveVisible);
  const {
    makeRequest: deleteJob,
    isLoading: isDeletingJob,
    error: errorWhileDeletingJob,
    setError: setErrorWhileDeletingJob,
  } = useDelete({ url: "" });

  const {
    makeRequest: saveJob,
    isLoading: isSaveJobLoading,
    error: errorWhileSavingJob,
    setError: setErrorWhileSavingJob,
  } = usePost({ url: "" });

  const resetError = () => {
    setErrorWhileDeletingJob("");
    setErrorWhileSavingJob("");
  };

  const handleSaveAndRemove = () => {
    if (isSaveVisibleButton) {
      saveJob({
        overrideUrl: MEMBER_JOB + `/${id}` + SAVE,
        onSuccessCallback: () => {
          setIsSaveVisibleButton(null);
        },
      });
    } else {
      deleteJob({
        overrideUrl: MEMBER_JOB + `/${id}` + SAVE,
        onSuccessCallback: () => {
          setIsSaveVisibleButton(id);
        },
      });
    }
  };

  return {
    isSaveVisibleButton,
    handleSaveAndRemove,
    isLoading: isDeletingJob || isSaveJobLoading,
    error: errorWhileDeletingJob || errorWhileSavingJob,
    resetError,
  };
};

export default useSaveAndRemoveJob;
