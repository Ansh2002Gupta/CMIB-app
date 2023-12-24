import React, { useRef, useState } from "react";
import { useIntl } from "react-intl";

import CropAndRotateImage from "../CropAndRotateImage";
import DragAndDropCard from "../DragAndDropCard/DragAndDropCard";
import PreviewImage from "../PreviewImage";
import useUploadedFileValidations from "../../hooks/useUploadedFileValidations";
import { getImageSource } from "../../utils/util";
import { IMAGE_MAX_SIZE } from "../../constants/constants";
import { IMAGE_ACCEPTABLE_FORMAT_REGEX } from "../../constants/Regex";

const UploadImage = ({ openCropViewAfterImageSelection }) => {
  const intl = useIntl();
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [openCropView, setOpenCropView] = useState(false);

  const {
    nonUploadableImageError,
    fileTooLargeError,
    invalidFormatError,
    setNonUploadableImageError,
    setFileTooLargeError,
    setInvalidFormatError,
  } = useUploadedFileValidations();

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const fileUploadHandler = (e) => {
    setFileTooLargeError("");
    setInvalidFormatError("");
    setNonUploadableImageError("");
    const imageMimeType = IMAGE_ACCEPTABLE_FORMAT_REGEX;
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      if (!uploadedFile.type.match(imageMimeType)) {
        setInvalidFormatError(
          intl.formatMessage({
            id: "label.allowedFileFormatsError",
          })
        );
        e.target.value = null;
        return;
      }
      if (uploadedFile.size > IMAGE_MAX_SIZE) {
        setFileTooLargeError(
          intl.formatMessage({ id: "label.fileTooLargeError" })
        );
        e.target.value = null;
        return;
      }
      const img = document.createElement("img");
      img.src = getImageSource(uploadedFile);
      img.alt = uploadedFile.name;
      img.onload = () => {
        setFile(uploadedFile);
        openCropViewAfterImageSelection && setOpenCropView(true);
      };
      img.onerror = () => {
        setNonUploadableImageError(
          intl.formatMessage({
            id: "label.allowedFileFormatsError",
          })
        );
      };
    }
    e.target.value = null;
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setFile(e.dataTransfer.files?.[0]);
    openCropViewAfterImageSelection && setOpenCropView(true);
  };

  return (
    <>
      {!!file && openCropView && (
        <CropAndRotateImage
          {...{
            file,
            photoURL: getImageSource(file),
            setFile,
            setOpenCropView,
          }}
        />
      )}
      {!!file && !openCropView && (
        <PreviewImage
          fileName={file?.name}
          onRemoveImage={() => setFile(null)}
          source={getImageSource(file)}
        />
      )}
      {(!file || openCropView) && (
        <DragAndDropCard
          {...{
            errorMessage:
              nonUploadableImageError ||
              fileTooLargeError ||
              invalidFormatError,
            fileInputRef,
            fileUploadHandler,
            handleDragOver,
            handleDrop,
            handleUploadClick,
          }}
        />
      )}
    </>
  );
};

export default UploadImage;
