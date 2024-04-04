import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";

import useIsWebView from "../../hooks/useIsWebView";
import style from "./UploadCVPhotoTemplate.style";
import CommonText from "../../components/CommonText";
import UploadImage from "../../components/UploadImage/UploadImage";
import { useEffect } from "react";

const UploadCVPhotoTemplate = ({
  isEditable,
  headerText,
  onDeleteImage,
  errorWhileUpload,
  isEditProfile,
  uploadImageToServerUtils,
  handleImageUploadResult,
  indexKey
}) => {
  console.log("indexKey", indexKey)
  const intl = useIntl();
  const { isWebView } = useIsWebView();

  const {
    fileUploadResult,
    handleFileUpload,
    isUploadingImageToServer,
    setFileUploadResult,
    uploadPercentage,
  } = uploadImageToServerUtils;

  const updatedFileUploadResult = fileUploadResult;
  const newFileUploadResult = [];


  // useEffect(() => {
  //   if (indexKey in newFileUploadResult) {
  //     newFileUploadResult[indexKey] = updatedFileUploadResult;
  //   } else {
  //     newFileUploadResult[indexKey] = updatedFileUploadResult;
  //   }
  //  //handleFileUpload(updatedFileUploadResult);
  //  console.log("updatedFileUploadResult", newFileUploadResult)
  // }, [updatedFileUploadResult]);
   

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
