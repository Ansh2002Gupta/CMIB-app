import { useState, useEffect, useRef, useContext } from "react";
import { useIntl } from "react-intl";
import { Platform, View } from "@unthinkable/react-core-components";
import { useNavigate } from "../../../routes";
import {
  getValidCurrentPage,
  getValidRowPerPage,
} from "../../../utils/queryParamsHelpers";
import useFetch from "../../../hooks/useFetch";
import CommonText from "../../../components/CommonText";
import CustomTouchableOpacity from "../../../components/CustomTouchableOpacity";
import CustomImage from "../../../components/CustomImage";
import styles from "../ConsentMarkingManagement.styles";
import commonStyles from "../../../theme/styles/commonStyles";
import images from "../../../images";
import {
  APPLICATION,
  CENTRES,
  COMPANIES,
  COMPANY_INACTIVE_SUBSCRIPTION_LISTING,
  CONSENT,
  ROUND,
  SHORTLISTS,
  USER_TYPE_MEMBER,
} from "../../../services/apiServices/apiEndPoint";
import { formatDate } from "../../../utils/util";
import TouchableImage from "../../../components/TouchableImage";
import { urlService } from "../../../services/urlService";
import { ROWS_PER_PAGE_ARRAY } from "../../../constants/constants";
import usePagination from "../../../hooks/usePagination";
import useOutsideClick from "../../../hooks/useOutsideClick";
import PopupMessage from "../../../components/PopupMessage/PopupMessage";
import CustomModal from "../../../components/CustomModal";
import useGetCurrentUser from "../../../hooks/useGetCurrentUser";
import { usePatch } from "../../../hooks/useApiRequest";
import { SideBarContext } from "../../../globalContext/sidebar/sidebarProvider";

const useContentMarketingManagement = (onViewPress, centerId, roundId) => {
  const isMob = Platform.OS.toLowerCase() !== "web";
  const defaultCategory = "Experience";
  const [loadingMore, setLoadingMore] = useState(false);
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  const [isFirstPageReceived, setIsFirstPageReceived] = useState(true);
  const [currentRecords, setCurrentRecords] = useState([]);
  const [isAscendingOrder, setIsAscendingOrder] = useState(false);
  const navigate = useNavigate();
  const intl = useIntl();
  const [sideBarState] = useContext(SideBarContext);
  const [companyId, setCompanyId] = useState("");
  const currentModule = sideBarState?.selectedModule?.key;

  const [rowsPerPage, setRowPerPage] = useState(
    getValidRowPerPage(urlService.getQueryStringValue("rowsPerPage")) ||
      ROWS_PER_PAGE_ARRAY[0].value
  );
  const [currentPage, setCurrentPage] = useState(
    getValidCurrentPage(urlService.getQueryStringValue("page"))
  );
  const [showCurrentPopupmessage, setCurrentPopupMessage] = useState(0);
  const [showCurrentPopupmessageDetails, setCurrentPopupMessageDetails] =
    useState(0);
  const [showConsentModal, setShowConsentModal] = useState(0);

  const {
    data: consentTitleData,
    isLoading: isConsentTitleDataLoading,
    isError: isConsentListError,
    error: errorConsentTitleData,
    fetchData: fetchConsentListing,
    setData: setConsentData,
    isSuccess,
  } = useFetch({
    url: `/member/${currentModule}/rounds/${roundId}/centres/${centerId}/companies/shotrlisted`,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });


  const {
    makeRequest: updateCandidateConsent,
    error: errorWhileUpdatingCandidateConsent,
    setError: setErrorWhileUpdatingCandidateConsent,
    isLoading: isUpdatingCandidateConsent,
    isError: isErrorWhileUpdating,
    isSuccess: isConsentDataUpdateSuccess,
  } = usePatch({
    url:
      USER_TYPE_MEMBER +
      `/${currentModule}` +
      '/application' + '/shortlist' + `/${companyId}`
  });

  useEffect(() => {
    if (centerId) {
      const fetchData = async () => {
        const requestedParams = {
          perPage: rowsPerPage,
          page: currentPage,
        };
        const initialData = await fetchConsentListing({
          queryParamsObject: requestedParams,
        });
        if (initialData && initialData?.records?.length > 0) {
          setCurrentRecords(initialData?.records);
          if (initialData?.records?.length < rowsPerPage && isMob) {
            setAllDataLoaded(true);
          }
        }
        setIsFirstPageReceived(false);
      };
      fetchData();
    }
  }, [centerId]);

  const { handlePagePerChange, handleRowsPerPageChange } = usePagination({
    shouldSetQueryParamsOnMount: true,
    setCurrentPage,
    setRowPerPage,
  });
  const popMessageRef = useRef(null);

  useOutsideClick(popMessageRef, () => setCurrentPopupMessage(-1));

  const getErrorDetails = () => {
    //TODO: Api error handling
  };
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const requestedParams = {
  //       perPage: rowsPerPage,
  //       page: currentPage,
  //     };
  //     const initialData = await fetchConsentListing({
  //       queryParamsObject: requestedParams,
  //     });
  //     if (initialData && initialData?.records?.length > 0) {
  //       setCurrentRecords(initialData?.records);
  //       if (initialData?.records?.length < rowsPerPage && isMob) {
  //         setAllDataLoaded(true);
  //       }
  //     }
  //     setIsFirstPageReceived(false);
  //   };
  //   fetchData();
  // }, []);

  const indexOfLastRecord = currentPage * rowsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - rowsPerPage;

  const updateCurrentRecords = async (params) => {
    const newData = await fetchConsentListing({
      queryParamsObject: params,
    });
    setCurrentRecords(newData?.records);
  };
  const handleLoadMore = async () => {
    if (loadingMore || allDataLoaded) return;
    setLoadingMore(true);
    const nextPage = currentPage + 1;
    try {
      const newData = await fetchConsentListing({
        queryParamsObject: {
          perPage: rowsPerPage,
          page: nextPage,
        },
      });
      if (newData && newData?.records?.length > 0) {
        setCurrentRecords((prevRecords) => [
          ...prevRecords,
          ...newData.records,
        ]);
      }
      setCurrentPage(nextPage);
      if (newData?.meta?.currentPage === newData?.meta?.lastPage) {
        setAllDataLoaded(true);
      }
    } catch (error) {
      console.error("Error fetching data on load more:", error);
    } finally {
      setLoadingMore(false);
    }
  };
  const handlePageChange = async (page) => {
    handlePagePerChange(page);
    await updateCurrentRecords({
      perPage: rowsPerPage,
      page: page,
    });
  };

  const handleRowPerPageChange = async (option) => {
    handleRowsPerPageChange(option.value);
    await updateCurrentRecords({
      perPage: option.value,
      page: currentPage,
    });
  };

  const handleSearchResults = async (searchedData) => {
    setIsFirstPageReceived(true);
    //NOTE: check if it is correct or not
    // setFilterOptions((prev) => ({ ...prev, searchData: searchedData }));
    if (isMob) {
      setCurrentPage(1);
      const newData = await fetchConsentListing({
        queryParamsObject: {
          q: searchedData,
        },
      });
      setIsFirstPageReceived(false);
      setCurrentRecords(newData?.records);
      if (newData?.meta?.currentPage === newData?.meta?.lastPage) {
        setAllDataLoaded(true);
      } else {
        setAllDataLoaded(false);
      }
    } else {
      await updateCurrentRecords({
        q: searchedData,
        perPage: rowsPerPage,
        page: currentPage,
      });
    }
  };

  const onIconPress = (item) => {
    showCurrentPopupmessage !== item?.employer_id && item?.employer_id !== null
      ? setCurrentPopupMessage(item?.employer_id)
      : setCurrentPopupMessage(-1);
  };

  const onConsentPress = (item) => {
    showConsentModal !== item?.employer_id && item?.employer_id !== null
      ? setShowConsentModal(item?.employer_id)
      : setShowConsentModal(-1);
  };

  const handleActions = (action, item) => {
    setCurrentPopupMessageDetails(item?.employer_id);
    setCurrentPopupMessage(-1);
  };

  let headingTexts = ["employer_name"];
  let subHeadingText = ["interview_dates"];
  let extraDetailsText = [""];
  let extraDetailsKey = [""];
  let tableIcon = images.iconMore;
  let isHeading = true;
  const onNameSorting = async (sortField) => {
    setIsAscendingOrder((prev) => !prev);
    await updateCurrentRecords({
      perPage: rowsPerPage,
      page: currentPage,
      sortField: sortField,
      sortDirection: !isAscendingOrder ? "asc" : "desc",
    });
  };

  const getColoumConfigs = (item, isHeading) => {
    const tableStyle = isHeading
      ? styles.tableHeadingText
      : styles.tableRowText;
    return [
      {
        content: isHeading ? (
          <CustomTouchableOpacity onPress={() => onNameSorting("name")}>
            <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
              {!!item.employer_name ? item.employer_name : "-"}
            </CommonText>
            <CustomImage
              source={
                isAscendingOrder
                  ? images.iconArrowUpSorting
                  : images.iconArrowDownSorting
              }
              style={styles.sortingIcon}
            />
          </CustomTouchableOpacity>
        ) : (
          <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
            {!!item.name ? item.name : "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("15%"),
        isFillSpace: true,
      },
      {
        content: isHeading ? (
          <CustomTouchableOpacity>
            <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
              {!!item.interview_type ? item.interview_type : "-"}
            </CommonText>
          </CustomTouchableOpacity>
        ) : (
          <CommonText fontWeight={"500"} customTextStyle={tableStyle}>
            {!!item.interview_type ? item.interview_type : "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("20%"),
        isFillSpace: true,
      },
      {
        content: isHeading ? (
          <CustomTouchableOpacity>
            <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
              {!!item.mode ? item.mode : "-"}
            </CommonText>
          </CustomTouchableOpacity>
        ) : (
          <CommonText fontWeight={"500"} customTextStyle={tableStyle}>
            {!!item.selection_process ? JSON.parse(item.selection_process).join(', ') : "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("10%"),
        isFillSpace: true,
      },
      {
        content: isHeading ? (
          <CustomTouchableOpacity>
            <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
              {!!item.interview_dates ? item.interview_dates : "-"}
            </CommonText>
          </CustomTouchableOpacity>
        ) : (
          <CommonText fontWeight={"500"} customTextStyle={tableStyle}>
            {!!item.interview_dates ? item.interview_dates : "0"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("15%"),
        isFillSpace: true,
      },
      {
        content: isHeading ? (
          <CustomTouchableOpacity>
            <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
              {!!item.shortlisting_round ? item.shortlisting_round : "-"}
            </CommonText>
          </CustomTouchableOpacity>
        ) : (
          <CommonText fontWeight={"500"} customTextStyle={tableStyle}>
            {!!item.shortlisting_round ? item.shortlisting_round : "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("15%"),
        isFillSpace: true,
      },
      {
        content: !isHeading && (
          <>
            {item.application_status === "shortlisted" ? (
              <TouchableImage
                onPress={() => {
                  onConsentPress(item);
                  setCompanyId(item?.id);
                }}
                source={images.iconShieldTickDisable}
                imageStyle={styles.iconTicket}
                isSvg={true}
              />
            ) : (
              <TouchableImage
                onPress={() => {
                  // onConsentPress(item);
                }}
                source={images.iconSheildTick}
                imageStyle={styles.iconTicket}
                isSvg={true}
              />
            )}
          </>
        ),
        style: {
          ...commonStyles.columnStyle("5%"),
          ...styles.iconTicketColoum,
        },
        isFillSpace: true,
      },
      {
        content: !isHeading && (
          <>
            <TouchableImage
              onPress={() => {
                onIconPress(item);
              }}
              source={images.iconMore}
              imageStyle={styles.iconTicket}
              isSvg={true}
            />
            {showCurrentPopupmessage === item?.id && (
              <View ref={popMessageRef}>
                <PopupMessage
                  ref={popMessageRef}
                  message={[
                    { id: 1, name: "Download CTC info" },
                    { id: 2, name: "Download PDF" },
                  ]}
                  labelName={"name"}
                  customStyle={styles.popupMessageStyle}
                  onPopupClick={(action) => handleActions(action, item)}
                />
              </View>
            )}
          </>
        ),
        style: {
          ...commonStyles.columnStyle("5%"),
          ...styles.iconTicketColoum,
        },
        isFillSpace: true,
      },
      {
        content: !isHeading && showConsentModal == item?.employer_id && (
          <>
            <CustomModal
              headerText={intl.formatMessage({
                id: "label.provide_online_consent",
              })}
              secondaryText={intl.formatMessage({
                id: "label.confirmation_provide_online_consent",
              })}
              buttonLeftTitle={intl.formatMessage({
                id: "label.cancel",
              })}
              buttonRightTitle={intl.formatMessage({
                id: "label.grant_consent",
              })}
              showActionButtonOnSuccess
              onPress={() => {}}
              isSuccess
              maxWidth={"xs"}
              imageOnSuccess={images.iconShieldSuccess}
              handleButtonOnePress={() => {
                setShowConsentModal(-1);
              }}
              handleButtonTwoPress={() => {
                updateCandidateConsent({body: {
                  application_status: "consent-given"
                },
                onSuccessCallback: () => {
                  setConsentData((prevData)=>prevData?.records?.map((e)=>e.id===item.id?{...item,application_status:"consent-given"}:e)
                  )
                },
              })
                setShowConsentModal(-1);
              }}
            />
          </>
        ),
        style: {
          ...commonStyles.columnStyle("5%"),
          ...styles.iconTicketColoum,
        },
        isFillSpace: true,
      },
    ];
  };

  return {
    intl,
    defaultCategory,
    allDataLoaded,
    currentPage,
    currentRecords,
    setCurrentRecords,
    getColoumConfigs,
    getErrorDetails,
    handleLoadMore,
    handlePageChange,
    handleRowPerPageChange,
    handleSearchResults,
    headingTexts,
    indexOfFirstRecord,
    indexOfLastRecord,
    isFirstPageReceived,
    isConsentTitleDataLoading,
    isHeading,
    consentTitleData: currentRecords,
    loadingMore,
    rowsPerPage,
    subHeadingText,
    extraDetailsText,
    extraDetailsKey,
    tableIcon,
    totalcards: consentTitleData?.meta?.total,
    onIconPress,
    showCurrentPopupmessage,
    setCurrentPopupMessage,
    handleActions,
    setCurrentPopupMessageDetails,
    showCurrentPopupmessageDetails,
    errorWhileUpdatingCandidateConsent,
    setErrorWhileUpdatingCandidateConsent,
  };
};

export default useContentMarketingManagement;
