import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";

import CommonText from "../../components/CommonText";

import styles from "./ConsentMarkingManagement.styles";
import useIsWebView from "../../hooks/useIsWebView";
import { CustomTabs } from "../../components/Tab";
import CustomTable from "../../components/CustomTable";
import { TwoColumn, TwoRow } from "../../core/layouts";
import SearchView from "../../components/SearchView";
import useContentMarketingManagement from "./controller/useContentMarketingManagement";
import {
  ROUND_ONE_CONSENT_MARKETING_MANAGEMENT,
  ROWS_PER_PAGE_ARRAY as rowsLimit,
  ROUND_ONE_CONSENT_MARKETING_MANAGEMENT as tableHeading,
} from "../../constants/constants";
import colors from "../../assets/colors";
import AddTicketModal from "../../components/AddTicketModal/AddTicketModal";
import PopupMessage from "../../components/PopupMessage/PopupMessage";
import Chip from "../../components/Chip";
import TouchableImage from "../../components/TouchableImage";
import Modal from "../../components/Modal";
import images from "../../images";
import CustomTouchableOpacity from "../../components/CustomTouchableOpacity";
import CustomModal from "../../components/CustomModal";
import DetailCard from "../../components/DetailCard";
import {
  recordDataAkola,
  recordDataAhemdabad,
  recordDataAurangabad,
  recordDataGurgaon,
} from "./dummyData";

const ConsentMarketingManagementTemplate = ({ intl }) => {
  const { isWebView } = useIsWebView();
  const onViewPress = (item) => {};
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
    inactiveSubscriptionListData,
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
  } = useContentMarketingManagement(onViewPress);

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

  const CommonTableComponent = ({ data }) => {
    return (
      <View
        style={{
          backgroundColor: colors.backgroundGrey,
          height: !isWebView && "100%",
          flex: 1,
          display: 'block',
        }}
      >
        <SearchView
          customParentStyle={{ width: isWebView ? "30%" : "60%", marginTop: 16, marginLeft: 16 }}
          customSearchCriteria={() => {}}
          placeholder={"Search by company name"}
        />
        <CustomTable
          {...{
            customTableStyle: { padding: 16 },
            allDataLoaded,
            currentPage,
            currentRecords: data,
            data: data,
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
            placeholder: intl.formatMessage({
              id: "label.serach_by_applicant_name_id",
            }),
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
      </View>
    );
  };

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
        <CustomTabs
          containerStyle={styles.containerStyle}
          renderHeader={() => {}}
          renderFooter={() => {}}
          tabs={[
            {
              label: intl.formatMessage({ id: "label.ahemdabad" }),
              component: <CommonTableComponent data={recordDataAhemdabad} />,
            },
            {
              label: intl.formatMessage({ id: "label.akola" }),
              component: <CommonTableComponent data={recordDataAkola} />,
            },
            {
              label: intl.formatMessage({ id: "label.aurangabad" }),
              component: <CommonTableComponent data={recordDataAurangabad} />,
            },
            {
              label: intl.formatMessage({ id: "label.gurgaon" }),
              component: <CommonTableComponent data={recordDataGurgaon} />,
            },
          ]}
        />
      </View>
    </View>
  );
};

export default ConsentMarketingManagementTemplate;
