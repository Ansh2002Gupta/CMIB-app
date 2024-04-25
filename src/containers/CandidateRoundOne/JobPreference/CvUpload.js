import React, {
  useState,
  useImperativeHandle,
  useEffect,
  useMemo,
} from "react";
import { View } from "@unthinkable/react-core-components";

import CardComponent from "../../../components/CardComponent";
import CommonText from "../../../components/CommonText";
import CustomTextInput from "../../../components/CustomTextInput";
import useSaveLogo from "../../../services/apiServices/hooks/CompanyLogo/useSaveLogoAPI";
import styles from "./JobPreferenceDetails.style";
import { YEARS } from "../../../constants/constants";
import UploadImage from "../../../components/UploadImage";

const CvUpload = (
  { intl, isWebView, isViewMode = false, onValidationChange = () => {} },
  ref
) => {
  //states

  const [uploadCV, setUploadCV] = useState();
  const [uploadImage, setUploadImage] = useState();
  const [uploadCVPath, setUploadCVPath] = useState();
  const [uploadImagePath, setUploadImagePath] = useState();
  const {
    errorWhileUpload: errorWhileUploadDocument,
    fileUploadResult,
    handleFileUpload,
    isLoading: isUploadingDocumentToServer,
    setErrorWhileUpload: setErrorWhileUploadImage,
    uploadPercentage: uploadDocumentPercentage,
  } = useSaveLogo();

  const {
    errorWhileUpload: errorWhileUploadImage,
    fileUploadResult: photouploadResult,
    handleFileUpload: handlePhotoUpload,
    isLoading: isUploadingImageToServer,
    setErrorWhileUpload,
    uploadPercentage: uploadImagePercentage,
  } = useSaveLogo();

  useImperativeHandle(ref, () => ({
    getState: () => {
      return {
        job_photo_path: uploadImagePath || '',
        cv_path: uploadCVPath || '',
      };
    },
  }));

  useEffect(() => {
    onValidationChange(true);
  }, [uploadCV, uploadImage, onValidationChange]);

  const handleUploadImage = (data) => {
    handlePhotoUpload(data);
  };

  const handleClickOnDeleteImage = () => {
    setUploadImage("");
  };

  const handleUploadDocumnet = (data) => {
    handleFileUpload(data);
  };

  const handleClickOnDeleteDocument = () => {
    setUploadCV("");
  };

  useEffect(() => {
    setUploadCV(fileUploadResult);
    setUploadCVPath(fileUploadResult?.data?.file_name);
  }, [fileUploadResult]);

  useEffect(() => {
    setUploadImage(photouploadResult);
    setUploadImagePath(photouploadResult?.data?.file_name);
  }, [photouploadResult]);

  return (
    <CardComponent customStyle={styles.cardContainer}>
      <CommonText customTextStyle={styles.titleText} fontWeight={"600"}>
        {intl.formatMessage({ id: "label.cv_photo" })}
      </CommonText>

      <View style={styles.gap}>
        <CommonText customTextStyle={styles.infoStyle}>
          {intl.formatMessage({
            id: "label.cv_curriculum_vitae",
          })}
        </CommonText>
        <UploadImage
          {...{
            onDeleteImage: handleClickOnDeleteDocument,
            fileUploadResult: uploadCV,
            handleFileUpload: handleUploadDocumnet,
            isUploadingImageToServer: isUploadingDocumentToServer,
            setFileUploadResult: setUploadCV,
            uploadPercentage: uploadDocumentPercentage,
            isEditable: true,
            hideIconDelete: false,
            fileLabel: "label.supported_document",
            isDocumentUpload: true,
          }}
        />

        <CommonText customTextStyle={styles.infoStyle}>
          {intl.formatMessage({
            id: "label.photo",
          })}
        </CommonText>
        <UploadImage
          {...{
            onDeleteImage: handleClickOnDeleteImage,
            fileUploadResult: uploadImage,
            handleFileUpload: handleUploadImage,
            isUploadingImageToServer: isUploadingImageToServer,
            setFileUploadResult: setUploadImage,
            uploadPercentage: uploadImagePercentage,
            isEditable: true,
            hideIconDelete: false,
            isDocumentUpload: false,
            fileLabel: "label.supported_image_pdf",
          }}
        />
      </View>
    </CardComponent>
  );
};

export default React.forwardRef(CvUpload);
