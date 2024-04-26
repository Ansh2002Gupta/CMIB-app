import React, { useContext } from "react";
import { useIntl } from "react-intl";

import CommonText from "../../components/CommonText";
import styles from "./ConsentMarkingManagement.styles";
import ConsentMarkingManagementTemplate from "./ConsentMarketingManagementTemplate";
import useContentMarketingManagement from "./controller/useContentMarketingManagement";
import { View } from "@unthinkable/react-core-components";
import SearchView from "../../components/SearchView";
import colors from "../../assets/colors";
import useIsWebView from "../../hooks/useIsWebView";
import CustomTable from "../../components/CustomTable";
import DetailCard from "../../components/DetailCard";
import CustomModal from "../../components/CustomModal";
import PopupMessage from "../../components/PopupMessage/PopupMessage";
import TouchableImage from "../../components/TouchableImage";
import {
    ROWS_PER_PAGE_ARRAY as rowsLimit,
    ROUND_ONE_CONSENT_MARKETING_MANAGEMENT as tableHeading,
  } from "../../constants/constants";
import { SideBarContext } from "../../globalContext/sidebar/sidebarProvider";
import ToastComponent from "../../components/ToastComponent/ToastComponent";
import Spinner from "../../components/Spinner";

const ConsentMarkingTable = ({centerId, roundId}) => {
  const { isWebView } = useIsWebView();
  const onViewPress = (item) => {};
  const intl = useIntl();
  const [sideBarState] = useContext(SideBarContext);
  const currentModule = sideBarState?.selectedModule?.key;


  const messageData = [
    { id: 1, name: "View interview details" },
    { id: 2, name: "Download CTC info" },
    { id: 3, name: "Download PDF" },
  ];
  
  const getMobileView = (item, index) => {
    return (
      <View style={styles.mobileContainer} key={index}>
        <View>
          <CommonText
            fontWeight={"600"}
            customTextStyle={styles.cellTextStyle()}
          >
            {item.employer_name || "-"}
          </CommonText>
          <CommonText customTextStyle={styles.tableQueryText}>
            {item?.interview_dates || "-"}
          </CommonText>
        </View>
        <View style={styles.rowsPerPageWeb}>
          <TouchableImage
            onPress={() => {
              onIconPress(item);
            }}
            source={tableIcon}
            style={styles.iconTicket}
            isSvg={true}
          />
          {showCurrentPopupmessage == item?.employer_id && (
            <PopupMessage
              popUpHeaderText={intl.formatMessage({
                id: "label.actions",
              })}
              message={messageData}
              customStyle={styles.popupMessageStyle}
              onPopupClick={(action) => {
                handleActions(action, item);
              }}
              isPopupModal={true}
              onPopUpClose={() => setCurrentPopupMessage(-1)}
            />
          )}
          {showCurrentPopupmessageDetails === item?.employer_id && (
            <CustomModal
              headerText={intl.formatMessage({
                id: "label.interview_details",
              })}
              isIconCross
              onPressIconCross={() => setCurrentPopupMessageDetails(-1)}
              onBackdropPress={() => setCurrentPopupMessageDetails(-1)}
            >
              <DetailCard
                customCardStyle={styles.customCardStyle}
                details={[
                  [
                    {
                      label: intl.formatMessage({
                        id: "label.interview_type",
                      }),
                      isMandator: true,
                      value: item.employer_name,
                    },
                  ],
                  [
                    {
                      label: intl.formatMessage({
                        id: "label.interview_type",
                      }),
                      isMandator: true,
                      value: item?.interview_type,
                    },
                    { label: "Mode", isMandator: true, value: item?.mode },
                  ],
                  [
                    {
                      label: intl.formatMessage({
                        id: "label.interview_dates",
                      }),
                      isMandator: true,
                      value: item?.interview_dates,
                    },
                  ],
                  [
                    {
                      label: intl.formatMessage({
                        id: "label.shortlisting_round",
                      }),
                      isMandator: true,
                      value: item?.shortlisting_round,
                    },
                  ],
                ]}
                isColumnVariableWidth
              />
            </CustomModal>
          )}
        </View>
      </View>
    );
  };

  const {
    allDataLoaded,
    currentPage,
    currentRecords,
    setCurrentRecords,
    defaultCategory,
    getColoumConfigs,
    handleLoadMore,
    handlePageChange,
    handleRowPerPageChange,
    handleSearchResults,
    getErrorDetails,
    indexOfFirstRecord,
    indexOfLastRecord,
    isError,
    isFirstPageReceived,
    isGeetingJobbSeekers,
    subHeadingText,
    extraDetailsText,
    extraDetailsKey,
    loadingMore,
    rowsPerPage,
    consentTitleData,
    totalcards,
    headingTexts,
    tableIcon,
    isHeading,
    onIconPress,
    showCurrentPopupmessage,
    setCurrentPopupMessage,
    handleActions,
    setCurrentPopupMessageDetails,
    showCurrentPopupmessageDetails,
    errorWhileUpdatingCandidateConsent,
    setErrorWhileUpdatingCandidateConsent,
    isConsentTitleDataLoading,
  } = useContentMarketingManagement(onViewPress, centerId, roundId);

  if (isConsentTitleDataLoading) {
    return (
      <View style={styles.loaderStyle}>
        <Spinner />
      </View>
    );
  }

  return <>
    <View
        style={{
          backgroundColor: colors.backgroundGrey,
          height: !isWebView && "100%",
          flex: 1,
          display: "block",
        }}
      >
        <SearchView
          customParentStyle={{
            width: isWebView ? "30%" : "60%",
            marginTop: 16,
            marginLeft: 16,
          }}
          customSearchCriteria={() => {}}
          placeholder={"Search by company name"}
        />
        <CustomTable
          {...{
            customTableStyle: { padding: 16 },
            allDataLoaded,
            currentPage,
            currentRecords: currentRecords,
            data: consentTitleData,
            setCurrentRecords,
            defaultCategory,
            getColoumConfigs,
            handleLoadMore,
            handlePageChange,
            handleRowPerPageChange,
            handleSearchResults,
            headingTexts,
            isTotalCardVisible: false,
            hideTotalCount: false,
            indexOfFirstRecord,
            indexOfLastRecord,
            isFirstPageReceived,
            isGeetingJobbSeekers,
            isHeading,
            loadingMore,
            placeholder: "",
            rowsLimit,
            rowsPerPage,
            subHeadingText,
            tableHeading,
            tableIcon,
            extraDetailsText,
            extraDetailsKey,
            showSearchBar: false,
            totalcards,
            onIconPress,
            mobileComponentToRender: getMobileView,
          }}
        />
        {(!!errorWhileUpdatingCandidateConsent) && (
        <ToastComponent
          toastMessage={errorWhileUpdatingCandidateConsent}
          onDismiss={() => {
            setErrorWhileUpdatingCandidateConsent("")
          }}
        />
      )}
      </View>
  </>;
};

export default ConsentMarkingTable;
