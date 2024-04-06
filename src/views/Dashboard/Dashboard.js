import React, { useContext } from "react";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";
import useIsWebView from "../../hooks/useIsWebView";

import CustomButton from "../../components/CustomButton";
import ScheduleInterviewModal from "../../containers/ScheduleInterviewModal/ScheduleInterviewModal";
import { TwoRow } from "../../core/layouts";

import CAJobsDashboard from "../CAJobsDashboard";
import IconHeader from "../../components/IconHeader/IconHeader";
import { moduleKeys } from "../../constants/sideBarHelpers";
import { SideBarContext } from "../../globalContext/sidebar/sidebarProvider";
import styles from "./dashboard.style";

function DashboardView() {
  const intl = useIntl();
  const { isWebView } = useIsWebView();
  const [sideBarState] = useContext(SideBarContext);
  const { selectedModule } = sideBarState;
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
