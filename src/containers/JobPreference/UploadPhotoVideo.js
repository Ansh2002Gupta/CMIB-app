import { View } from "@unthinkable/react-core-components";
import { useIntl } from "react-intl";

import useIsWebView from "../../hooks/useIsWebView";
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
  isEditProfile,
  uploadImageToServerUtils,
  handleImageUploadResult
}) => {
  const intl = useIntl();
  const { isWebView } = useIsWebView();

  if (isEditable) {
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
      uploadImageToServerUtils={uploadImageToServerUtils}
      handleImageUploadResult={handleImageUploadResult}
      indexKey="cv_path"
      ></UploadCVPhotoUI>
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
      uploadImageToServerUtils={uploadImageToServerUtils}
      handleImageUploadResult={handleImageUploadResult}
      indexKey="job_photo_path"
      ></UploadCVPhotoUI>
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
      uploadImageToServerUtils={uploadImageToServerUtils}
      handleImageUploadResult={handleImageUploadResult}
      indexKey="introduction_video_path"
      ></UploadCVPhotoUI>
         </View>
         </View>
    );
  }
  return null;
};

export default UploadPhotoVideo;
