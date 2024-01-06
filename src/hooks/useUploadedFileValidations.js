import { useEffect, useState } from "react";
import { useIntl } from "react-intl";

import { IMAGE_MAX_SIZE, TOAST_TIMEOUT } from "../constants/constants";
import { IMAGE_ACCEPTABLE_FORMAT_REGEX } from "../constants/Regex";
import { getImageSource } from "../utils/util";

const useUploadedFileValidations = () => {
  const intl = useIntl();

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

  const initiateFileUpload = ({ onLoad, resetUploadInput, uploadedFile }) => {
    setFileTooLargeError("");
    setInvalidFormatError("");
    setNonUploadableImageError("");
    const imageMimeType = IMAGE_ACCEPTABLE_FORMAT_REGEX;
    if (uploadedFile) {
      if (!uploadedFile.type.match(imageMimeType)) {
        setInvalidFormatError(
          intl.formatMessage({
            id: "label.allowedFileFormatsError",
          })
        );
        resetUploadInput && resetUploadInput();
        return;
      }
      if (uploadedFile.size > IMAGE_MAX_SIZE) {
        setFileTooLargeError(
          intl.formatMessage({ id: "label.fileTooLargeError" })
        );
        resetUploadInput && resetUploadInput();
        return;
      }
      const img = document.createElement("img");
      img.src = getImageSource(uploadedFile);
      img.alt = uploadedFile.name;
      img.onload = () => {
        onLoad && onLoad({ uploadedFile });
      };
      img.onerror = () => {
        setNonUploadableImageError(
          intl.formatMessage({
            id: "label.allowedFileFormatsError",
          })
        );
      };
    }
    resetUploadInput && resetUploadInput();
  };

  return {
    fileTooLargeError,
    initiateFileUpload,
    invalidFormatError,
    nonUploadableImageError,
    setFileTooLargeError,
    setInvalidFormatError,
    setNonUploadableImageError,
  };
};

export default useUploadedFileValidations;
