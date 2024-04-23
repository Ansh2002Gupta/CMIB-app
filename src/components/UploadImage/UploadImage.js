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
  isDocumentUpload,
  isVideoUpload,
  isUploadingImageToServer,
  onDeleteImage,
  openCropViewAfterImageSelection,
  setFileUploadResult,
  uploadPercentage,
  customContentContainerStyle,
  fileTypes,
  fileLabel,
}) => {
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [openCropView, setOpenCropView] = useState(false);

  const {
    nonUploadableImageError,
    fileTooLargeError,
    initiateFileUpload,
    invalidFormatError,
  } = useUploadedFileValidations({ isDocumentUpload, isVideoUpload });

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
              fileUrl: imageUploadedToServer?.["url"] || "",
              isDocumentUpload,
              isVideoUpload,
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
            isDocumentUpload,
            isVideoUpload,
            isLoading: isUploadingImageToServer,
            uploadPercentage,
            customContentContainerStyle: customContentContainerStyle,
            fileTypes,
            fileLabel,
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
  isDocumentUpload: false,
  isUploadingImageToServer: false,
  onDeleteImage: () => {},
  openCropViewAfterImageSelection: false,
  setFileUploadResult: () => {},
  uploadPercentage: 0,
  customContentContainerStyle: {},
  isAllFormat: false,
  isImageAndPDF: false,
};

UploadImage.propTypes = {
  errorWhileUpload: PropTypes.string,
  fileUploadResult: PropTypes.object,
  handleFileUpload: PropTypes.func,
  hideIconDelete: PropTypes.bool,
  isDocumentUpload: PropTypes.bool,
  isUploadingImageToServer: PropTypes.bool,
  onDeleteImage: PropTypes.func,
  openCropViewAfterImageSelection: PropTypes.bool,
  setFileUploadResult: PropTypes.func,
  uploadPercentage: PropTypes.number,
  customContentContainerStyle: PropTypes.object,
  isAllFormat: PropTypes.bool,
  isImageAndPDF: PropTypes.bool,
};

export default UploadImage;
