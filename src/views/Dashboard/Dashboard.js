import React, { useContext } from "react";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";
import useIsWebView from "../../hooks/useIsWebView";

import { TwoRow } from "../../core/layouts";

import CAJobsDashboard from "../CAJobsDashboard";
import IconHeader from "../../components/IconHeader/IconHeader";
import { moduleKeys } from "../../constants/sideBarHelpers";
import { SideBarContext } from "../../globalContext/sidebar/sidebarProvider";
import styles from "./dashboard.style";
import useSaveLogo from "../../services/apiServices/hooks/CompanyLogo/useSaveLogoAPI";
import useDeleteLogo from "../../services/apiServices/hooks/CompanyLogo/useDeleteLogoAPI";
import UploadImage from "../../components/UploadImage";

function DashboardView() {
  const intl = useIntl();
  const { isWebView } = useIsWebView();
  const [sideBarState] = useContext(SideBarContext);
  const { selectedModule } = sideBarState;
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
  return (
    <>
      <View style={styles.container}>
        <TwoRow
          topSection={
            <IconHeader
              hasActionButton={false}
              showInWeb={isWebView}
              hasIconBar
              headerText={intl.formatMessage({ id: "label.dashboard" })}
              intl={intl}
            />
          }
          isBottomFillSpace
          bottomSection={
            <>
              {moduleKeys.CA_JOBS_KEY === selectedModule?.key ? (
                <CAJobsDashboard />
              ) : null}
            </>
          }
        />
      </View>
      <View style={{ margin: 16 }}>
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
    </>
  );
}

export default DashboardView;
