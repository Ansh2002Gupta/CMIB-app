import React, { useRef, useState } from "react";
import { useIntl } from "react-intl";

import CropAndRotateImage from "../CropAndRotateImage";
import DragAndDropCard from "../DragAndDropCard/DragAndDropCard";
import PreviewImage from "../PreviewImage";
import useSaveLogo from "../../services/apiServices/hooks/useSaveLogoAPI";
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

  const {
    handleFileUpload,
    isLoading: isUploadingImageToServer,
    uploadPercentage,
  } = useSaveLogo();

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const fileUploadHandler = (e) => {
    initiateFileUpload(e.target.files[0], () => (e.target.value = null));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    initiateFileUpload(e.dataTransfer.files?.[0], () => e.target.null);
  };

  const initiateFileUpload = (uploadedFile, resetUploadInput) => {
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
        resetUploadInput();
        return;
      }
      if (uploadedFile.size > IMAGE_MAX_SIZE) {
        setFileTooLargeError(
          intl.formatMessage({ id: "label.fileTooLargeError" })
        );
        resetUploadInput();
        return;
      }
      const img = document.createElement("img");
      img.src = getImageSource(uploadedFile);
      img.alt = uploadedFile.name;
      img.onload = () => {
        setFile(uploadedFile);
        openCropViewAfterImageSelection && setOpenCropView(true);
        if (!openCropViewAfterImageSelection) {
          const formData = new FormData();
          formData.append("company_logo", uploadedFile);
          handleFileUpload(formData);
        }
      };
      img.onerror = () => {
        setNonUploadableImageError(
          intl.formatMessage({
            id: "label.allowedFileFormatsError",
          })
        );
      };
    }
    resetUploadInput();
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
      {!isUploadingImageToServer && !!file && !openCropView && (
        <PreviewImage
          {...{
            fileName: file?.name,
            onRemoveImage: () => setFile(null),
            source: getImageSource(file),
          }}
        />
      )}
      {(!file || openCropView || isUploadingImageToServer) && (
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
            isLoading: isUploadingImageToServer,
            uploadPercentage,
          }}
        />
      )}
    </>
  );
};

export default UploadImage;
