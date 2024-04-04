import { useEffect, useState } from "react";
import { useIntl } from "react-intl";

import {
  IMAGE_MAX_SIZE,
  TOAST_TIMEOUT,
  VIDEO_MAX_SIZE,
} from "../constants/constants";
import {
  DOCUMENT_ACCEPTABLE_FORMAT_REGEX,
  IMAGE_ACCEPTABLE_FORMAT_REGEX,
  VIDEO_ACCEPTABLE_FORMAT_REGEX,
} from "../constants/Regex";
import { getImageSource } from "../utils/util";

const useUploadedFileValidations = ({ isDocumentUpload, isVideoUpload }) => {
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

  const getMimeType = () => {
    if (isDocumentUpload) return DOCUMENT_ACCEPTABLE_FORMAT_REGEX;
    if (isVideoUpload) return VIDEO_ACCEPTABLE_FORMAT_REGEX;
    return IMAGE_ACCEPTABLE_FORMAT_REGEX;
  };

  const initiateFileUpload = ({ onLoad, resetUploadInput, uploadedFile }) => {
    setFileTooLargeError("");
    setInvalidFormatError("");
    setNonUploadableImageError("");
    if (uploadedFile) {
      if (!uploadedFile.type.match(getMimeType())) {
        setInvalidFormatError(
          isDocumentUpload
            ? intl.formatMessage({
                id: "label.allowedDocumentFormatsError",
              })
            : intl.formatMessage({
                id: "label.allowedFileFormatsError",
              })
        );
        resetUploadInput && resetUploadInput();
        return;
      }
      if (isVideoUpload && uploadedFile.size > VIDEO_MAX_SIZE) {
        setFileTooLargeError(
          intl.formatMessage({ id: "label.videoTooLargeError" })
        );
        resetUploadInput && resetUploadInput();
        return;
      }
      if (!isVideoUpload && uploadedFile.size > IMAGE_MAX_SIZE) {
        setFileTooLargeError(
          intl.formatMessage({ id: "label.fileTooLargeError" })
        );
        resetUploadInput && resetUploadInput();
        return;
      }
      if (isDocumentUpload || isVideoUpload) {
        onLoad && onLoad({ uploadedFile });
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
