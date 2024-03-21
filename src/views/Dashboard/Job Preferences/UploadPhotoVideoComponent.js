import { useIntl } from "react-intl";
import useIsWebView from "../../../hooks/useIsWebView";
import { View } from "@unthinkable/react-core-components";
import style from "./UploadCVPhotoUI.style";
import CommonText from "../../../components/CommonText";
import useUploadedFileValidations from "../../../hooks/useUploadedFileValidations";
import UploadImage from "../../../components/UploadImage/UploadImage";
import UploadCVPhotoUI from "./UploadCVPhotoUI";

const UploadPhotoVideoComponent = ({
  isEditable,
  onDeleteImage,
  errorWhileUpload,
  updatedFileUploadResult,
  handleFileUpload,
  isUploadingImageToServer,
  setFileUploadResult,
  uploadPercentage,
  isEditProfile
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
      onDeleteImage={() => console.log("call when image deleted")}
      ></UploadCVPhotoUI>
      <UploadCVPhotoUI
      isEditable={isEditable}
      headerText={"label.photo"}
      onDeleteImage={() => console.log("call when image deleted")}
      ></UploadCVPhotoUI>
        </View>

         <View style={style.innerContainerStyle}>
         <CommonText customTextStyle={style.headerText}>
        {intl.formatMessage({ id: "label.intro_video_upload" })}
        </CommonText>  
        <UploadCVPhotoUI
      isEditable={isEditable}
      headerText={"label.short_video"}
      onDeleteImage={() => console.log("call when image deleted")}
      ></UploadCVPhotoUI>
         </View>
         </View>
    );
  }
  return null;
};

export default UploadPhotoVideoComponent;
