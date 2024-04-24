import React, { useState } from "react";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../../components/CommonText";
import CustomButton from "../../components/CustomButton";
import useNavigateScreen from "../../services/hooks/useNavigateScreen";
import { navigations } from "../../constants/routeNames";
import styles from "./ShortListingConsentCandidate.styles";
import {
  SHORTLISTING_TABLE_HEADING,
  ROWS_PER_PAGE_ARRAY as rowsLimit,
} from "../../constants/constants";
import IconHeader from "../../components/IconHeader/IconHeader";
import { CustomTabs, FormTabs } from "../../components/Tab";
import { getCenterLabel, tabsLabel } from "./mappedData";
import CustomTable from "../../components/CustomTable";
import MobileCard from "../../containers/PostedJobs/MobileCard";
import { useNavigate, useParams } from "react-router";
import useShortListingConsent from "./controller/useShortListingConsent";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import DownloadMoreComponent from "../../containers/PostedJobs/DownloadMoreComponent";
import colors from "../../assets/colors";

const ShortListingConsentCandidate = () => {
  const intl = useIntl();
  const { id } = useParams();

  const navigate = useNavigate();
  const onViewPress = (item) => {
    // navigate(
    //   `/${selectedModule.key}/${navigations.POSTED_JOBS}/${item.id}?mode=view&activeTab=0`
    // );
  };
  const onEditPress = (item) => {
    // navigate(
    //   `/${selectedModule.key}/${navigations.POSTED_JOBS}/${item.id}?mode=edit&activeTab=0`
    // );
  };

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
    seletedTabs,
    setSelectedTabs,
  } = useShortListingConsent(onViewPress, onEditPress, id);

  const getMobileView = (item, index) => {
    return (
      <MobileCard
        item={item}
        getStatusStyle={getStatusStyle}
        lastElement={candidateData.length - 1 === index}
        statusData={statusData}
        onEditPress={onEditPress}
        onViewPress={onViewPress}
      />
    );
  };

  return (
    <View style={{ backgroundColor: "white" }}>
      <IconHeader
        headerText={"Shortlisting, Consent Marking & Interviews"}
        customHeaderContainer={{ width: "61%" }}
        isBorderVisible={false}
      />
      <View
        style={{
          backgroundColor: colors.white,
        }}
      >
        {companyLocation && (
          <FormTabs
            tabs={getCenterLabel(companyLocation) ?? []}
            cleanupFuntion={(index) => {
              setSeletedCenter(index);
            }}
          />
        )}
      </View>
      <CustomTabs
        tabs={tabsLabel}
        containerStyle={{ borderTopWidth: 0 }}
        cleanupFuntion={(item) => {
          setSelectedTabs(item);
        }}
      />
      <>
        {!false && (
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
              tableHeading: SHORTLISTING_TABLE_HEADING(seletedTabs),
              tableIcon,
              totalcards,
              placeholder: intl.formatMessage({
                id: "label.search_by_designation",
              }),
            }}
            mobileComponentToRender={getMobileView}
            containerStyle={styles.customTableStyle}
            isTotalCardVisible={false}
            selectedTabs={seletedTabs}
            isFilterVisible={false}
            ThirdSection={<DownloadMoreComponent onPress={() => {}} />}
          />
        )}
        {isError && !!getErrorDetails()?.errorMessage && (
          <ErrorComponent
            errorMsg={getErrorDetails()?.errorMessage}
            onRetry={() => getErrorDetails()?.onRetry()}
          />
        )}
      </>
    </View>
  );
};

export default ShortListingConsentCandidate;
