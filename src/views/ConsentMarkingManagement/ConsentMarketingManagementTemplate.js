import { View } from "@unthinkable/react-core-components";
import React, { useContext } from "react";

import CommonText from "../../components/CommonText";

import colors from "../../assets/colors";
import CustomModal from "../../components/CustomModal";
import CustomTable from "../../components/CustomTable";
import DetailCard from "../../components/DetailCard";
import PopupMessage from "../../components/PopupMessage/PopupMessage";
import SearchView from "../../components/SearchView";
import { CustomTabs } from "../../components/Tab";
import TouchableImage from "../../components/TouchableImage";
import {
  ROWS_PER_PAGE_ARRAY as rowsLimit,
  ROUND_ONE_CONSENT_MARKETING_MANAGEMENT as tableHeading,
} from "../../constants/constants";
import ToastComponent from "../../components/ToastComponent/ToastComponent";
import useIsWebView from "../../hooks/useIsWebView";
import styles from "./ConsentMarkingManagement.styles";
import useFetch from "../../hooks/useFetch";
import { SideBarContext } from "../../globalContext/sidebar/sidebarProvider";
import CommonTableComponent from './ConsentMarketingTable';

const ConsentMarketingManagementTemplate = ({ intl }) => {
  const { isWebView } = useIsWebView();
  const [sideBarState] = useContext(SideBarContext);
  const currentModule = sideBarState?.selectedModule?.key;
  const onViewPress = (item) => {};
  const {
    data: consentCenterData,
    isLoading: isConsentCenterDataLoading,
    isError: isConsentListError,
    error: errorConsentCenterData,
    fetchData: fetchConsentCenterDataListing,
  } = useFetch({
    url: `/member/${currentModule}/rounds/264/candidate-centers`,
  });
  console.log(consentCenterData, "consentCenterData")

  return (
    <View style={styles.mainContainer}>
      <View
        style={isWebView ? styles.webHeaderContainer : styles.headerContainer}
      >
        <CommonText
          customTextStyle={styles.headerText(isWebView)}
          fontWeight={"600"}
        >
          {intl.formatMessage({ id: "label.consent_marking_management" })}
        </CommonText>
      </View>
      <View style={styles.row}>
        {consentCenterData && consentCenterData?.records && !isConsentCenterDataLoading &&
        <CustomTabs
          containerStyle={styles.containerStyle}
          renderHeader={() => {}}
          renderFooter={() => {}}
          tabs={ consentCenterData?.records?.map((item)=> {
            return (
              {
                label: item.name,
                component: <CommonTableComponent centerId={item.id}  />,
              }
            )
          }
          )}
        />}
      </View>
      {/* {(!!errorWhileUpdatingCandidateConsent) && (
        <ToastComponent
          toastMessage={errorWhileUpdatingCandidateConsent}
          onDismiss={() => {
            setErrorWhileUpdatingCandidateConsent("")
          }}
        />
      )} */}
    </View>
  );
};

export default ConsentMarketingManagementTemplate;
