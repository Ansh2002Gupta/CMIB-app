import { useIntl } from "react-intl";
import useIsWebView from "../../../hooks/useIsWebView";
import { View } from "@unthinkable/react-core-components";
import style from "./UploadCVPhotoUI.style";
import CommonText from "../../../components/CommonText";
import useUploadedFileValidations from "../../../hooks/useUploadedFileValidations";
import UploadImage from "../../../components/UploadImage/UploadImage";

const UploadCVPhotoUI = ({
  isEditable,
  headerText,
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
        <View >
        <CommonText customTextStyle={style.labelText}>
        {intl.formatMessage({ id: headerText })}
        </CommonText>   
        <UploadImage
                    {...{
                      onDeleteImage,
                      errorWhileUpload,
                      fileUploadResult: updatedFileUploadResult,
                      handleFileUpload,
                      isUploadingImageToServer,
                      setFileUploadResult,
                      uploadPercentage,
                      hideIconDelete: !isEditProfile,
                      customContentContainerStyle: style.customContentContainerStyle
                    }}
         />
        </View>
    );
  }
  return null;
};

export default UploadCVPhotoUI;
