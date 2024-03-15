import React, { useState } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "../../routes";
import { TwoRow } from "../../core/layouts";

import CustomTable from "../../components/CustomTable";
import IconHeader from "../../components/IconHeader/IconHeader";
import useTicketListing from "./controller/useTicketListing";
import { navigations } from "../../constants/routeNames";
import {
  ROWS_PER_PAGE_ARRAY as rowsLimit,
  TICKET_TABLE_HEADING as tableHeading,
} from "../../constants/constants";
import images from "../../images";
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
  const [addNewTicket, setAddNewTicket] = useState(false);

  const handleTicketModal = () => {
    setAddNewTicket((prev) => !prev);
  };

  const onGoBack = () => {
    navigate(navigations.PROFILE);
  };

  return (
    <TwoRow
      topSection={
        <IconHeader
          actionButtonIcon={images.iconAddWhite}
          buttonTitle={intl.formatMessage({ id: "label.add_new_ticket" })}
          customActionButtonStyle={styles.addNewButton}
          customActionButtonText={styles.addNewText}
          hasIconBar
          hasActionButton
          handleButtonClick={handleTicketModal}
          headerText={intl.formatMessage({ id: "label.tickets" })}
          onPressLeftIcon={onGoBack}
        />
      }
      isBottomFillSpace
      bottomSection={
        <CustomTable
          {...{
            addNewTicket,
            allDataLoaded,
            currentPage,
            currentRecords,
            data: ticketListingData,
            filterApplyHandler,
            filterCategory,
            getColoumConfigs,
            getStatusStyle,
            handleTicketModal,
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
            placeholder: intl.formatMessage({
              id: "label.search_by_ticket",
            }),
          }}
        />
      }
    />
  );
};

export default TicketsListing;