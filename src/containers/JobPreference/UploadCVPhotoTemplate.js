import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";

import useIsWebView from "../../hooks/useIsWebView";
import style from "./UploadCVPhotoTemplate.style";
import CommonText from "../../components/CommonText";
import UploadImage from "../../components/UploadImage/UploadImage";

const UploadCVPhotoTemplate = ({
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

export default UploadCVPhotoTemplate;
