import React from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "../../routes";
import { ScrollView, View } from "@unthinkable/react-core-components";

import CustomTable from "../../components/CustomTable";
import IconHeader from "../../components/IconHeader/IconHeader";
import useTicketListing from "./controller/useTicketListing";
import { navigations } from "../../constants/routeNames";
import {
  ROWS_PER_PAGE_ARRAY as rowsLimit,
  TICKET_TABLE_HEADING as tableHeading,
} from "../../constants/constants";
import styles from "./TicketsListing.style";

const TicketsListing = () => {
  const {
    allDataLoaded,
    currentRecords,
    currentPage,
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
    loadingMore,
    onIconPress,
    queryTypeData,
    rowsPerPage,
    setCurrentRecords,
    statusData,
    statusText,
    subHeadingText,
    tableIcon,
    ticketListingData,
    totalcards,
  } = useTicketListing();

  const intl = useIntl();
  const navigate = useNavigate();

  const onGoBack = () => {
    navigate(navigations.PROFILE);
  };

  return (
    <View style={styles.container}>
      <IconHeader
        headerText={intl.formatMessage({ id: "label.tickets" })}
        onPressLeftIcon={onGoBack}
        hasIconBar
      />
      <ScrollView style={styles.tableContent}>
        <CustomTable
          {...{
            allDataLoaded,
            currentPage,
            currentRecords,
            data: ticketListingData,
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
            loadingMore,
            onIconPress,
            queryTypeData,
            rowsLimit,
            rowsPerPage,
            setCurrentRecords,
            statusData,
            statusText,
            subHeadingText,
            tableHeading,
            tableIcon,
            totalcards,
          }}
        />
      </ScrollView>
    </View>
  );
};

export default TicketsListing;
