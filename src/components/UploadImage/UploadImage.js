import React, { useRef, useState } from "react";

import CropAndRotateImage from "../CropAndRotateImage";
import DragAndDropCard from "../DragAndDropCard/DragAndDropCard";
import PreviewImage from "../PreviewImage";
import useSaveLogo from "../../services/apiServices/hooks/useSaveLogoAPI";
import useUploadedFileValidations from "../../hooks/useUploadedFileValidations";
import { getImageSource } from "../../utils/util";

const UploadImage = ({ openCropViewAfterImageSelection }) => {
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [openCropView, setOpenCropView] = useState(false);

  const {
    nonUploadableImageError,
    fileTooLargeError,
    initiateFileUpload,
    invalidFormatError,
  } = useUploadedFileValidations();

  const {
    handleFileUpload,
    isLoading: isUploadingImageToServer,
    uploadPercentage,
  } = useSaveLogo();

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const onValidImageUpload = ({ uploadedFile }) => {
    setFile(uploadedFile);
    openCropViewAfterImageSelection && setOpenCropView(true);
    if (!openCropViewAfterImageSelection) {
      const formData = new FormData();
      formData.append("company_logo", uploadedFile);
      handleFileUpload(formData);
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
