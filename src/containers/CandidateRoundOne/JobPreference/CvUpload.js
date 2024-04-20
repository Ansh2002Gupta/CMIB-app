import React, {useState, useImperativeHandle, useEffect} from "react";
import { View } from "@unthinkable/react-core-components";

import CardComponent from "../../../components/CardComponent";
import CommonText from "../../../components/CommonText";
import CustomTextInput from "../../../components/CustomTextInput";
import styles from "./JobPreferenceDetails.style";
import { YEARS } from "../../../constants/constants";
import UploadImage from "../../../components/UploadImage";

const CvUpload = ({intl, isWebView, isViewMode = false}, ref) => {
  //states


  useImperativeHandle(ref, () => ({
    getState: () => {
      return {
      };
    },
  }));

  
  return (
    <CardComponent customStyle={styles.cardContainer}>
          <CommonText customTextStyle={styles.titleText} fontWeight={"600"}>
            {intl.formatMessage({ id: "label.cv_photo" })}
          </CommonText>
          <View style={isWebView ? styles.twoColumnSingleElement : styles.gap}>
            <UploadImage
                {...{
                onDeleteImage: () => {},
                fileUploadResult: () => {},
                handleFileUpload: () => {},
                isUploadingImageToServer: false,
                setFileUploadResult: () => {},
                uploadPercentage: '10' ,
                isEditable: true,
                hideIconDelete: false,
                isDocumentUpload: false,
                }}
            />
            <View></View>
            <UploadImage
                {...{
                onDeleteImage: () => {},
                fileUploadResult: () => {},
                handleFileUpload: () => {},
                isUploadingImageToServer: false,
                setFileUploadResult: () => {},
                uploadPercentage: '10' ,
                isEditable: true,
                hideIconDelete: false,
                isDocumentUpload: false,
                }}
            />
          </View>
        </CardComponent>
  )
};

export default  React.forwardRef(CvUpload);