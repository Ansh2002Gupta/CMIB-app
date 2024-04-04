import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";

import style from "./UploadCVPhotoTemplate.style";
import CommonText from "../../components/CommonText";
import UploadImage from "../../components/UploadImage/UploadImage";
import { useEffect, useMemo } from "react";
import useSaveLogo from "../../services/apiServices/hooks/CompanyLogo/useSaveLogoAPI";

const UploadCVPhotoTemplate = ({
  isEditable,
  headerText,
  onDeleteImage,
  handleImageUploadResult,
  indexKey,
  imageUrl,
}) => {
  const intl = useIntl();
  const {
    errorWhileUpload,
    fileUploadResult,
    handleFileUpload,
    isLoading: isUploadingImageToServer,
    setErrorWhileUpload,
    setFileUploadResult,
    uploadPercentage,
  } = useSaveLogo();

  const updatedFileUploadResult = useMemo(() => {
    let url = imageUrl || fileUploadResult?.data?.url;
    return {
      ...(fileUploadResult ?? {}),
      data: url ? { ...(fileUploadResult?.data ?? {}), url } : null,
    };
  }, [imageUrl, isEditable, fileUploadResult]);

  useEffect(() => {
    handleImageUploadResult &&
      handleImageUploadResult(updatedFileUploadResult, indexKey);
  }, [updatedFileUploadResult]);

  const handleClickOnDeleteImage = () => {
    onDeleteImage && onDeleteImage(indexKey);
  };

  const handleUpload = (data) => {
    setErrorWhileUpload("");
    handleFileUpload(data);
  };

  if (isEditable || updatedFileUploadResult?.data?.url) {
    return (
      <View>
        <CommonText customTextStyle={style.labelText}>
          {intl.formatMessage({ id: headerText })}
        </CommonText>
        <View style={style.customContentContainerStyle}>
          <UploadImage
            {...{
              indexKey,
              onDeleteImage: handleClickOnDeleteImage,
              errorWhileUpload,
              fileUploadResult: updatedFileUploadResult,
              handleFileUpload: handleUpload,
              isUploadingImageToServer,
              setFileUploadResult,
              uploadPercentage,
              isEditable,
              hideIconDelete: !isEditable,
            }}
          />
        </View>
      </View>
    );
  }

  return null;
};

export default UploadCVPhotoTemplate;
