import React, { useState } from "react";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../../components/CommonText";
import CustomButton from "../../components/CustomButton";
import ScheduleInterviewModal from "../../containers/ScheduleInterviewModal/ScheduleInterviewModal";
import RangeSlider from "../../components/RangeSlider";
import SavedJobComponent from "../../components/SavedJobComponent/SavedJobComponent";
import UploadImage from "../../components/UploadImage";
import useSaveLogo from "../../services/apiServices/hooks/CompanyLogo/useSaveLogoAPI";
import styles from "./dashboard.style";
import useDeleteLogo from "../../services/apiServices/hooks/CompanyLogo/useDeleteLogoAPI";

const MIN_VALUE = 0;
const MAX_VALUE = 100; // Created for demo purposes , therefore not defining them in the constant.js file
// Just ignore this file as just to test custom component
function DashboardView() {
  const intl = useIntl();
  const [showScheduledInterviewModal, setShowScheduledInterviewModal] =
    useState(false);
  const [range, setRange] = useState({ max: MAX_VALUE, min: MIN_VALUE });

  const {
    errorWhileUpload,
    fileUploadResult,
    handleFileUpload,
    isLoading: isUploadingImageToServer,
    setErrorWhileUpload,
    setFileUploadResult,
    uploadPercentage,
  } = useSaveLogo({});

  const { handleDeleteLogo } = useDeleteLogo();

  const onDeleteImage = () => {
    if (fileUploadResult?.data?.file_name) {
      const fileName = fileUploadResult?.data?.file_name.split("/");
      handleDeleteLogo(fileName[fileName.length - 1]);
    }
  };

  const handleOnClose = () => {
    setShowScheduledInterviewModal(false);
  };

  return (
    <View style={styles.container}>
      <CommonText customTextStyle={styles.header}>
        {intl.formatMessage({ id: "label.dashboard" })}
      </CommonText>
      <View>
        {/* <UploadImage
          {...{
            onDeleteImage,
            errorWhileUpload,
            fileUploadResult,
            handleFileUpload,
            isVideoUpload: true,
            isUploadingImageToServer,
            setFileUploadResult,
            uploadPercentage,
          }}
        /> */}
        <SavedJobComponent />
      </View>
      <View>
        <CommonText customTextStyle={styles.header}>
          {intl.formatMessage({ id: "label.dashboard" })}
        </CommonText>
      </View>
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

      <CustomButton onPress={() => setShowScheduledInterviewModal(true)}>
        <CommonText>Open Schduled Interview Modal</CommonText>
      </CustomButton>
      {showScheduledInterviewModal && (
        <ScheduleInterviewModal onClose={handleOnClose} />
      )}
    </View>
  );
}

export default DashboardView;
