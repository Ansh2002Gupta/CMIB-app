import { Modal, ScrollView, View } from "@unthinkable/react-core-components";
import React, { useState } from "react";
import styles from "./ViewJobApplicants.styles";
import { useIntl } from "react-intl";
import usePostedJobListing from "../../../views/PostedJobsView/controller/usePostedJobListing";
import { useNavigate } from "../../../routes";
import MobileCard from "../../PostedJobs/MobileCard";
import { TwoRow } from "../../../core/layouts";
import IconHeader from "../../../components/IconHeader/IconHeader";
import CustomTable from "../../../components/CustomTable";
import DownloadMoreComponent from "../../PostedJobs/DownloadMoreComponent";
import images from "../../../images";
import useGetApplicantList from "../../../views/ViewPostedJobDetails/controller/useGetApplicantList";
import PopupMessage from "../../../components/PopupMessage/PopupMessage";
import TouchableImage from "../../../components/TouchableImage";
import {
  ROWS_PER_PAGE_ARRAY as rowsLimit,
  APPLICANT_LISTING as tableHeading,
} from "../../../constants/constants";
import CommonText from "../../../components/CommonText";
import colors from "../../../assets/colors";
import RenderMobileItem from "../component/RenderMobileItem/RenderMobileItem";
import CustomModal from "../../../components/CustomModal";
import ViewJobDetails from "../../../views/ViewJobDetails";
import { useParams } from "react-router";
const ViewJobApplicants = ({ questionaireData }) => {
  console.log("questionaireData", questionaireData);
  const intl = useIntl();
  const onEditPress = (item) => {
    setIsModalVisible(true);
    //   navigate(navigations.EDIT_JOB, {
    //     state: item,
    //   });
  };
  const onViewPress = (item) => {
    //   navigate(navigations.DETAILS_JOBS, {
    //     state: item,
    //   });
  };
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
    isErrorGetPostedJob,
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
  } = useGetApplicantList(onEditPress);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { id } = useParams();
  console.log("ID IS", id);

  const handleTicketModal = () => {
    // navigate(navigations.ADD_NEW_JOBS);
  };

  const getMobileView = (item, index) => {
    return (
      <RenderMobileItem
        lastElement={postedJobData.length - 1 === index}
        item={item}
      />
    );
  };

  return (
    <>
      <CustomTable
        {...{
          allDataLoaded,
          currentPage,
          currentRecords,
          filterApplyHandler,
          filterCategory,
          getColoumConfigs,
          getStatusStyle,
          handleTicketModal,
          handleLoadMore,
          getErrorDetails,
          tableHeading,
          isErrorGetPostedJob,
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
        data={postedJobData}
        ThirdSection={
          <DownloadMoreComponent
            onPress={() => {
              console.log("HI I AM pressed");
            }}
          />
        }
      />
      {isModalVisible && (
        <CustomModal
          containerStyle={{
            maxHeight: 600,
            minHeight: 600,
            maxWidth: 1000,
            overflow: "auto",
          }}
          customInnerContainerStyle={{ flex: 1 }}
        >
          <ViewJobDetails
            shouldRenderExtraComponent={true}
            questionaireData={questionaireData}
            setIsModalVisible={setIsModalVisible}
          />
        </CustomModal>
      )}
    </>
  );
};
export default ViewJobApplicants;
