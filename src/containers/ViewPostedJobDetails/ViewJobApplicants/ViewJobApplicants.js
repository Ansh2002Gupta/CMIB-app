import React from "react";
import styles from "./ViewJobApplicants.styles";
import { useIntl } from "react-intl";
import CustomTable from "../../../components/CustomTable";
import DownloadMoreComponent from "../../PostedJobs/DownloadMoreComponent";
import useGetApplicantList from "../../../views/ViewPostedJobDetails/controller/useGetApplicantList";
import {
  ROWS_PER_PAGE_ARRAY as rowsLimit,
  APPLICANT_LISTING as tableHeading,
} from "../../../constants/constants";
import RenderMobileItem from "../component/RenderMobileItem/RenderMobileItem";
import { useNavigate } from "../../../routes";
import { navigations } from "../../../constants/routeNames";
import ErrorComponent from "../../../components/ErrorComponent/ErrorComponent";
const ViewJobApplicants = ({ id, questionaireData }) => {
  const navigate = useNavigate();
  const onEditPress = (item) => {
    navigate(navigations.VIEW_JOB_DETAILS, { state: { questionaireData } });
  };

  const intl = useIntl();
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
    getErrorDetails,
    isError,
    loadingMore,
    onIconPress,
    queryTypeData,
    rowsPerPage,
    setCurrentRecords,
    statusData,
    statusText,
    subHeadingText,
    tableIcon,
    applicantListingData,
    totalcards,
  } = useGetApplicantList(id, onEditPress);

  const getMobileView = (item, index) => {
    return (
      <RenderMobileItem
        lastElement={applicantListingData.length - 1 === index}
        item={item}
      />
    );
  };

  return (
    <>
      {!isError && (
        <CustomTable
          {...{
            allDataLoaded,
            currentPage,
            currentRecords,
            filterApplyHandler,
            filterCategory,
            getColoumConfigs,
            getStatusStyle,
            handleLoadMore,
            getErrorDetails,
            tableHeading,
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
              id: "label.search_by_applicant_name",
            }),
          }}
          mobileComponentToRender={getMobileView}
          isFilterVisible={false}
          containerStyle={styles.innerContainerStyle}
          isTotalCardVisible={false}
          data={applicantListingData}
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
  );
};
export default ViewJobApplicants;
