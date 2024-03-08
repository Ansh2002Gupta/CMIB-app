import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

import CropAndRotateImage from "../CropAndRotateImage";
import DragAndDropCard from "../DragAndDropCard/DragAndDropCard";
import PreviewImage from "../PreviewImage";
import useUploadedFileValidations from "../../hooks/useUploadedFileValidations";
import { getImageSource } from "../../utils/util";

const UploadImage = ({
  errorWhileUpload,
  fileUploadResult,
  handleFileUpload,
  hideIconDelete,
  isUploadingImageToServer,
  onDeleteImage,
  openCropViewAfterImageSelection,
  setFileUploadResult,
  uploadPercentage,
}) => {
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [openCropView, setOpenCropView] = useState(false);

  const {
    nonUploadableImageError,
    fileTooLargeError,
    initiateFileUpload,
    invalidFormatError,
  } = useUploadedFileValidations();

  const imageUploadedToServer = fileUploadResult?.data;

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const onValidImageUpload = ({ uploadedFile }) => {
    setFile(uploadedFile);
    openCropViewAfterImageSelection && setOpenCropView(true);
    if (!openCropViewAfterImageSelection) {
      const formData = new FormData();
      formData.append("file", uploadedFile);
      handleFileUpload({
        file: formData,
        errorCallback: () => {
          setFile(null);
        },
      });
    }
  };

  const fileUploadHandler = (e) => {
    initiateFileUpload({
      onLoad: onValidImageUpload,
      resetUploadInput: () => (e.target.value = null),
      uploadedFile: e.target.files[0],
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    initiateFileUpload({
      onLoad: onValidImageUpload,
      resetUploadInput: () => (e.target.value = null),
      uploadedFile: e.dataTransfer.files?.[0],
    });
  };

  const handleDeleteImage = () => {
    setFile(null);
    setFileUploadResult(null);
    onDeleteImage();
  };

  return (
    <>
      {!!file && openCropView && (
        <CropAndRotateImage
          {...{
            file,
            handleFileUpload,
            initiateFileUpload,
            photoURL: getImageSource(file),
            setFile,
            setOpenCropView,
          }}
        />
      )}
      {!isUploadingImageToServer &&
        !!imageUploadedToServer &&
        !openCropView && (
          <PreviewImage
            {...{
              fileName: imageUploadedToServer?.["file_name"] || "",
              hideIconDelete,
              onRemoveImage: handleDeleteImage,
              source: imageUploadedToServer?.url || "",
            }}
          />
        )}
      {!imageUploadedToServer && (
        <DragAndDropCard
          {...{
            errorMessage:
              nonUploadableImageError ||
              fileTooLargeError ||
              invalidFormatError ||
              errorWhileUpload,
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

UploadImage.defaultProps = {
  errorWhileUpload: "",
  fileUploadResult: {},
  handleFileUpload: () => {},
  isUploadingImageToServer: false,
  onDeleteImage: () => {},
  openCropViewAfterImageSelection: false,
  setFileUploadResult: () => {},
  uploadPercentage: 0,
};

UploadImage.propTypes = {
  errorWhileUpload: PropTypes.string,
  fileUploadResult: PropTypes.object,
  handleFileUpload: PropTypes.func,
  hideIconDelete: PropTypes.bool,
  isUploadingImageToServer: PropTypes.bool,
  onDeleteImage: PropTypes.func,
  openCropViewAfterImageSelection: PropTypes.bool,
  setFileUploadResult: PropTypes.func,
  uploadPercentage: PropTypes.number,
};

export default UploadImage;
