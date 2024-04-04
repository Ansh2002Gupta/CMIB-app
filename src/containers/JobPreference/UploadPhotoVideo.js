import React from "react";
import { View } from "@unthinkable/react-core-components";
import { useIntl } from "react-intl";

import style from "./UploadCVPhotoTemplate.style";
import CommonText from "../../components/CommonText";
import UploadCVPhotoUI from "./UploadCVPhotoTemplate";

const UploadPhotoVideo = ({
  isEditable,
  onDeleteImage,
  errorWhileUpload,
  updatedFileUploadResult,
  handleFileUpload,
  isUploadingImageToServer,
  setFileUploadResult,
  uploadPercentage,
  handleImageUploadResult,
  imageDetails,
}) => {
  const intl = useIntl();

  return (
    <View>
      <View style={style.innerContainerStyle}>
        <CommonText customTextStyle={style.headerText}>
          {intl.formatMessage({ id: "label.cv_photo" })}
        </CommonText>
        <UploadCVPhotoUI
          isEditable={isEditable}
          headerText={"label.cv_photo"}
          onDeleteImage={onDeleteImage}
          errorWhileUpload={errorWhileUpload}
          updatedFileUploadResult={updatedFileUploadResult}
          handleFileUpload={handleFileUpload}
          isUploadingImageToServer={isUploadingImageToServer}
          setFileUploadResult={setFileUploadResult}
          uploadPercentage={uploadPercentage}
          handleImageUploadResult={handleImageUploadResult}
          indexKey="cv_path"
          imageUrl={imageDetails?.cv_path}
          isImageAndPDF
        />
        <UploadCVPhotoUI
          isEditable={isEditable}
          headerText={"label.photo"}
          onDeleteImage={onDeleteImage}
          errorWhileUpload={errorWhileUpload}
          updatedFileUploadResult={updatedFileUploadResult}
          handleFileUpload={handleFileUpload}
          isUploadingImageToServer={isUploadingImageToServer}
          setFileUploadResult={setFileUploadResult}
          uploadPercentage={uploadPercentage}
          handleImageUploadResult={handleImageUploadResult}
          indexKey="job_photo_path"
          imageUrl={imageDetails?.job_photo_path}
        />
      </View>
      <View style={style.innerContainerStyle}>
        <CommonText customTextStyle={style.headerText}>
          {intl.formatMessage({ id: "label.intro_video_upload" })}
        </CommonText>
        <UploadCVPhotoUI
          isEditable={isEditable}
          headerText={"label.short_video"}
          onDeleteImage={onDeleteImage}
          errorWhileUpload={errorWhileUpload}
          updatedFileUploadResult={updatedFileUploadResult}
          handleFileUpload={handleFileUpload}
          isUploadingImageToServer={isUploadingImageToServer}
          setFileUploadResult={setFileUploadResult}
          uploadPercentage={uploadPercentage}
          handleImageUploadResult={handleImageUploadResult}
          indexKey="introduction_video_path"
          imageUrl={imageDetails?.introduction_video_path}
          isAllFormat
        />
      </View>
    </View>
  );
};

export default UploadPhotoVideo;
