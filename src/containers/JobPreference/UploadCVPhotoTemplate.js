import React from "react";
import { useIntl } from "react-intl";
import { useTheme } from "@unthinkable/react-theme";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../../components/CommonText";
import UploadImage from "../../components/UploadImage/UploadImage";
import { useEffect, useMemo } from "react";
import useSaveLogo from "../../services/apiServices/hooks/CompanyLogo/useSaveLogoAPI";
import getStyles from "./UploadCVPhotoTemplate.style";

const UploadCVPhotoTemplate = ({
  isEditable,
  headerText,
  onDeleteImage,
  handleImageUploadResult,
  indexKey,
  imageUrl,
  isDocumentUpload,
  isVideoUpload,
}) => {
  const intl = useIntl();
  const theme = useTheme();
  const style = getStyles(theme);
  const {
    errorWhileUpload,
    fileUploadResult,
    handleFileUpload,
    isLoading: isUploadingImageToServer,
    setErrorWhileUpload,
    setFileUploadResult,
    uploadPercentage,
  } = useSaveLogo();

  useEffect(() => {
    return () => {
      setFileUploadResult(null);
    };
  }, [isEditable]);

  const updatedFileUploadResult = useMemo(() => {
    let url = imageUrl || (isEditable && fileUploadResult?.data?.url);
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
              isDocumentUpload,
              isVideoUpload,
            }}
          />
        </View>
      </View>
    );
  }

  return null;
};

export default UploadCVPhotoTemplate;
