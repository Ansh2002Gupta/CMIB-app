import React, { useState } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "../../routes";
import { TwoRow } from "../../core/layouts";

import CustomTable from "../../components/CustomTable";
import IconHeader from "../../components/IconHeader/IconHeader";
import { navigations } from "../../constants/routeNames";
import {
  ROWS_PER_PAGE_ARRAY as rowsLimit,
  POSTED_JOB_LISTING as tableHeading,
} from "../../constants/constants";
import images from "../../images";
import styles from "./PostedJobsView.styles";
import usePostedJobListing from "./controller/usePostedJobListing";
import { View } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";
import CommonText from "../../components/CommonText";
import TouchableImage from "../../components/TouchableImage";
import CustomImage from "../../components/CustomImage";
import MobileCard from "../../containers/PostedJobs/MobileCard";

const PostedJobsView = () => {
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
    postedJobData,
    totalcards,
  } = usePostedJobListing();

  const navigate = useNavigate();
  const [addNewTicket, setAddNewTicket] = useState(false);

  const handleTicketModal = () => {
    setAddNewTicket((prev) => !prev);
  };

  const onGoBack = () => {
    navigate(navigations.PROFILE);
  };
  const getMobileView = (item, index) => {
    return (
      <MobileCard
        item={item}
        getStatusStyle={getStatusStyle}
        tableIcon={tableIcon}
        lastElement={postedJobData.length - 1 === index}
      />
    );
  };

  return (
    <TwoRow
      topSection={
        <IconHeader
          actionButtonIcon={images.iconAddWhite}
          buttonTitle={"Add"}
          customActionButtonStyle={styles.addNewButton}
          customActionButtonText={styles.addNewText}
          hasActionButton
          handleButtonClick={handleTicketModal}
          headerText={"Posted Job"}
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
            data: postedJobData,
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
            placeholder: "Search By Designation or Job ID",
          }}
          mobileComponentToRender={getMobileView}
          containerStyle={{ backgroundColor: colors.white, paddingBottom: 4 }}
        />
      }
    />
  );
};

export default PostedJobsView;
