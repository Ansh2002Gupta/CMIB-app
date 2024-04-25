import React, { useState } from "react";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";

import styles from "./ShortListingConsentCandidate.styles";
import {
  SHORTLISTING_TABLE_HEADING,
  ROWS_PER_PAGE_ARRAY as rowsLimit,
  totalCardHeading,
} from "../../constants/constants";
import IconHeader from "../../components/IconHeader/IconHeader";
import { CustomTabs, FormTabs } from "../../components/Tab";
import { getCenterLabel, tabsLabel } from "./mappedData";
import CustomTable from "../../components/CustomTable";
import { useNavigate, useParams } from "react-router";
import useShortListingConsent from "./controller/useShortListingConsent";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import DownloadMoreComponent from "../../containers/PostedJobs/DownloadMoreComponent";
import useIsWebView from "../../hooks/useIsWebView";
import CustomTextInput from "../../components/CustomTextInput";
import MobileViewComponent from "../../containers/ShortListingConsentCandidate/MobileViewComponent";
import UpdateTestResultModal from "../../containers/ShortListingConsentCandidate/UpdateTestResultModal";

const ShortListingConsentCandidate = () => {
  const intl = useIntl();
  const { id } = useParams();
  const { isWebView } = useIsWebView();

  const navigate = useNavigate();

  const {
    allDataLoaded,
    currentRecords,
    currentPage,
    customFilterInfo,
    defaultCategory,
    filterApplyHandler,
    filterCategory,
    filterState,
    getColoumConfigs,
    getStatusStyle,
    handleLoadMore,
    handlePageChange,
    handleRowPerPageChange,
    handleSearchResults,
    handleSaveAddTicket,
    headingTexts,
    indexOfFirstRecord,
    indexOfLastRecord,
    isHeading,
    isTicketListingLoading,
    isFirstPageReceived,
    getErrorDetails,
    isError,
    loadingMore,
    onIconPress,
    queryTypeData,
    rowsPerPage,
    setCurrentRecords,
    setFilterState,
    statusData,
    statusText,
    subHeadingText,
    tableIcon,
    candidateData,
    totalcards,
    initialFilterState,
    companyLocation,
    seletedCenter,
    setSeletedCenter,
    selectedTabs,
    setSelectedTabs,
    markedElement,
    isModalVisible,
    setIsModalVisible,
    updateShortListCandidate,
    getUpdatedUrl,
  } = useShortListingConsent(id);

  const getMobileView = (item, index) => {
    return (
      <MobileViewComponent
        item={item}
        getStatusStyle={getStatusStyle}
        lastElement={candidateData.length - 1 === index}
        statusData={statusData}
        selectedTabs={selectedTabs}
      />
    );
  };
  const onSubmit = (item, selectedToggle, isMarked) => {
    let body = {};

    if (isMarked) {
      body = {
        application_ids: [item.application_id],
        status: "offer-accepted",
        interview_result: selectedToggle === 0 ? "pass" : "fail",
      };
    } else {
      body = {
        application_ids: [item.application_id],
        interview_result: selectedToggle === 0 ? "pass" : "fail",
      };
    }

    setIsModalVisible(false);
    updateShortListCandidate({
      body,
      overrideUrl: getUpdatedUrl(companyLocation[seletedCenter].id),
    });
  };
  return (
    <View style={{ backgroundColor: "white" }}>
      <IconHeader
        headerText={"Shortlisting, Consent Marking & Interviews"}
        customHeaderContainer={{ width: isWebView ? "61%" : "90%" }}
        isBorderVisible={false}
      />
      <View>
        {companyLocation && (
          <>
            {isWebView ? (
              <FormTabs
                tabs={getCenterLabel(companyLocation) ?? []}
                cleanupFuntion={(index) => {
                  setSeletedCenter(index);
                }}
              />
            ) : (
              <View style={{ marginTop: 16, marginLeft: 16, marginRight: 16 }}>
                <CustomTextInput
                  isDropdown
                  label={"Designation"}
                  options={getCenterLabel(companyLocation) ?? []}
                  value={getCenterLabel(companyLocation)[seletedCenter]?.label}
                  valueField={"label"}
                  selectAllField
                  includeAllKeys
                  onChangeValue={(item) => {
                    setSeletedCenter(item.index);
                  }}
                />
              </View>
            )}
          </>
        )}
      </View>
      <View style={{ height: isWebView ? undefined : 40 }}>
        <CustomTabs
          tabs={tabsLabel}
          containerStyle={{ borderTopWidth: 0 }}
          cleanupFuntion={(item) => {
            setSelectedTabs(item);
          }}
        />
      </View>

      <View>
        {!isError && (
          <CustomTable
            {...{
              customFilterInfo,
              allDataLoaded,
              currentPage,
              currentRecords,
              data: candidateData,
              defaultCategory,
              filterApplyHandler,
              filterCategory,
              getColoumConfigs,
              getStatusStyle,
              handleLoadMore,
              handlePageChange,
              handleRowPerPageChange,
              handleSearchResults,
              handleSaveAddTicket,
              headingTexts,
              indexOfFirstRecord,
              indexOfLastRecord,
              isHeading,
              isTicketListingLoading,
              isFirstPageReceived,
              initialFilterState,
              loadingMore,
              onIconPress,
              queryTypeData,
              rowsLimit,
              rowsPerPage,
              setCurrentRecords,
              selectedFilterOptions: filterState,
              setSelectedFilterOptions: setFilterState,
              statusData,
              statusText,
              subHeadingText,
              tableHeading: SHORTLISTING_TABLE_HEADING(selectedTabs),
              tableIcon,
              totalcards,
              placeholder: intl.formatMessage({
                id: "label.search_by_designation",
              }),
            }}
            mobileComponentToRender={getMobileView}
            containerStyle={styles.customTableStyle}
            customTableTopSectionStyle={{
              flex: undefined,
            }}
            customTableStyle={{
              flex: undefined,
            }}
            isTotalCardVisible={totalCardHeading[selectedTabs] ? true : false}
            defaultCategory={"Experience"}
            unit={"Years"}
            selectedTabs={selectedTabs}
            totalCardHeading={totalCardHeading[selectedTabs]}
            ThirdSection={<DownloadMoreComponent onPress={() => {}} />}
          />
        )}
        {isModalVisible && (
          <UpdateTestResultModal
            setIsModal={setIsModalVisible}
            isMarked={markedElement.current.isMarked}
            item={markedElement.current.item}
            onSubmit={onSubmit}
          />
        )}

        {isError && !!getErrorDetails()?.errorMessage && (
          <View style={styles.marginTop24}>
            <ErrorComponent
              errorMsg={getErrorDetails()?.errorMessage}
              onRetry={() => getErrorDetails()?.onRetry()}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default ShortListingConsentCandidate;
