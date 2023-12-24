import { useEffect, useState } from "react";

import { TOAST_TIMEOUT } from "../constants/constants";

const useUploadedFileValidations = () => {
  const [fileTooLargeError, setFileTooLargeError] = useState("");
  const [invalidFormatError, setInvalidFormatError] = useState("");
  const [nonUploadableImageError, setNonUploadableImageError] = useState("");

  useEffect(() => {
    let timerId = null;
    if (fileTooLargeError || invalidFormatError || nonUploadableImageError) {
      timerId = setTimeout(() => {
        fileTooLargeError && setFileTooLargeError("");
        invalidFormatError && setInvalidFormatError("");
        nonUploadableImageError && setNonUploadableImageError("");
      }, TOAST_TIMEOUT);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [fileTooLargeError, invalidFormatError, nonUploadableImageError]);

  return {
    fileTooLargeError,
    invalidFormatError,
    nonUploadableImageError,
    setFileTooLargeError,
    setInvalidFormatError,
    setNonUploadableImageError,
  };
};

export default useUploadedFileValidations;
