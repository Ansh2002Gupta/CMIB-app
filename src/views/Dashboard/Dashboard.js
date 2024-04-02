import React, { useState } from "react";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../../components/CommonText";
import RangeSlider from "../../components/RangeSlider";
import UploadImage from "../../components/UploadImage";
import useSaveLogo from "../../services/apiServices/hooks/CompanyLogo/useSaveLogoAPI";
import styles from "./dashboard.style";
import useDeleteLogo from "../../services/apiServices/hooks/CompanyLogo/useDeleteLogoAPI";

const MIN_VALUE = 0;
const MAX_VALUE = 100; // Created for demo purposes , therefore not defining them in the constant.js file
// Just ignore this file as just to test custom component
function DashboardView() {
  const intl = useIntl();
  const [range, setRange] = useState({ max: MAX_VALUE, min: MIN_VALUE });

  const {
    errorWhileUpload,
    fileUploadResult,
    handleFileUpload,
    isLoading: isUploadingImageToServer,
    setErrorWhileUpload,
    setFileUploadResult,
    uploadPercentage,
  } = useSaveLogo({ isDocumentUpload: true });

  const { handleDeleteLogo } = useDeleteLogo();

  const onDeleteImage = () => {
    if (fileUploadResult?.data?.file_name) {
      const fileName = fileUploadResult?.data?.file_name.split("/");
      handleDeleteLogo(fileName[fileName.length - 1]);
    }
  };

  return (
    <View style={styles.container}>
      <CommonText customTextStyle={styles.header}>
        {intl.formatMessage({ id: "label.dashboard" })}
      </CommonText>
      <RangeSlider
        label="Yrs"
        max={MAX_VALUE}
        min={MIN_VALUE}
        onChange={(obj) => {
          console.log(obj);
        }}
        step={5}
        {...{ range, setRange }}
      />
      <View style={{ marginTop: "5rem" }}>
        <UploadImage
          {...{
            onDeleteImage,
            errorWhileUpload,
            fileUploadResult,
            handleFileUpload,
            isDocumentUpload: true,
            isUploadingImageToServer,
            setFileUploadResult,
            uploadPercentage,
          }}
        />
      </View>
    </View>
  );
}

export default DashboardView;
