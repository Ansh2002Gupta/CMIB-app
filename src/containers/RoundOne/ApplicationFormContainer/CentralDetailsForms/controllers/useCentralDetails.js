import { useContext, useEffect, useMemo, useState } from "react";
import {
  addValueOnField,
  contactDetailFields,
  getDesignationsData,
  getFormattedContactDetails,
  getFormattedData,
  getFormattedOtherBenefits,
  getInterviewDetails,
  getSelectionProcess,
  interviewDetailsFields,
  keys,
  selectionProcessFields,
} from "./utils";
import useFetch from "../../../../../hooks/useFetch";
import { COUNTRY_CODE } from "../../../../../services/apiServices/apiEndPoint";
import { useParams } from "react-router";
import { SideBarContext } from "../../../../../globalContext/sidebar/sidebarProvider";
import { useDelete, usePost, usePut } from "../../../../../hooks/useApiRequest";
import { useIntl } from "react-intl";
import useDeleteLogo from "../../../../../services/apiServices/hooks/CompanyLogo/useDeleteLogoAPI";
import useSaveLogo from "../../../../../services/apiServices/hooks/CompanyLogo/useSaveLogoAPI";
import { formateErrors } from "../../../../../utils/util";
import { moduleKeys } from "../../../../../constants/sideBarHelpers";
import {
  API_VERSION_QUERY_PARAM,
  SESSION_ID_QUERY_PARAM,
  UPDATED_API_VERSION,
} from "../../../../../constants/constants";

const useCentralDetails = ({ tabHandler }) => {
  const [contactDetailsState, setContactDetailsState] = useState({});
  const [interviewDetailsState, setInterviewDetailsState] = useState({
    [keys.campusDates]: [],
    [keys.companyAvailableForInterview]: [],
  });
  const { id: roundId } = useParams();
  const intl = useIntl();

  const [sideBarState] = useContext(SideBarContext);
  const { selectedModule } = sideBarState;
  const [configurableListQuery, setConfigurableListQuery] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [menuOptions, setMenuOptions] = useState([]);
  const [deleteDesginationId, setDeleteDesginationId] = useState(null);
  const [currentDesginationID, setCurrentDesginationID] = useState(null);
  const [isAddNewJob, setIsAddNewJob] = useState(false);
  const [fieldError, setFieldError] = useState({});
  const [selectedCenterData, setSelectedCenterData] = useState(null);
  const [showCenterModal, setShowCenterModal] = useState(false);
  const [requiredDocumentDetails, setRequiredDocumentDetails] = useState([]);
  const [designationDetatils, setDesignationDetatils] = useState([]);
  const [isCompanyPPt, setIsCompanyPPT] = useState(0);
  const [selectionProcess, setSelectionProcess] = useState([
    ...selectionProcessFields(intl),
  ]);
  const sessionId = sideBarState?.selectedSession?.value;

  const [selectionFieldError, setSelectionFieldError] = useState("");
  const [error, setError] = useState("");

  const { data: countryData } = useFetch({
    url: COUNTRY_CODE,
    otherOptions: {},
  });

  //used to fetch mapped centers
  const {
    data: mappedCentersList,
    isLoading: mappedCentersListLoading,
    fetchData: fetchMappedCentersList,
    error: mappedCenterListError,
  } = useFetch({
    url: `/company/${selectedModule.key}/rounds/${roundId}/application/centres?${SESSION_ID_QUERY_PARAM}=${sessionId}`,
    otherOptions: {
      skipApiCallOnMount: true,
    },
    apiOptions: {
      headers: {
        [API_VERSION_QUERY_PARAM]: UPDATED_API_VERSION,
      },
    },
  });

  //used to fetch application detail based on center id
  const {
    data: applicationDetail,
    isLoading: applicationDetailLoading,
    fetchData: fetchApplicationDetail,
    error: fetchApplicationDetailError,
  } = useFetch({
    url: "",
    otherOptions: {
      skipApiCallOnMount: true,
    },
    apiOptions: {
      headers: {
        [API_VERSION_QUERY_PARAM]: UPDATED_API_VERSION,
      },
    },
  });

  const {
    data: roundCenterDetails,
    isLoading: roundCenterDetailsLoading,
    fetchData: fetchRoundCenterDetails,
    error: roundCenterDetailsError,
  } = useFetch({
    otherOptions: {
      skipApiCallOnMount: true,
    },
    apiOptions: {
      headers: {
        [API_VERSION_QUERY_PARAM]: UPDATED_API_VERSION,
      },
    },
  });

  const { isLoading: mapCenterLoading, makeRequest: mapCenter } = usePost({
    url: "",
    otherOptions: {},
  });

  const { isLoading: unMapCenterLoading, makeRequest: unMapCenter } = useDelete(
    { url: "", otherOptions: {} }
  );

  const {
    data: centerListData,
    isLoading: centerListLoading,
    fetchData: fetchCenterList,
    error: centerListError,
  } = useFetch({
    url: `core/${selectedModule.key}/rounds/${roundId}?${SESSION_ID_QUERY_PARAM}=${sessionId}`,
    otherOptions: {
      skipApiCallOnMount: true,
    },
    apiOptions: {
      headers: {
        [API_VERSION_QUERY_PARAM]: UPDATED_API_VERSION,
      },
    },
  });

  const {
    data: desginationData,
    isLoading: designationDataLoading,
    fetchData: fetchDesignationData,
    error: designationDataError,
  } = useFetch({
    url: `/company/${selectedModule.key}/rounds/${roundId}/application/job-detail?${SESSION_ID_QUERY_PARAM}=${sessionId}`,
    otherOptions: {
      fetchMappedCentersList: true,
    },
    apiOptions: {
      headers: {
        [API_VERSION_QUERY_PARAM]: UPDATED_API_VERSION,
      },
    },
  });

  const { isLoading: saveRoundDetailLoading, makeRequest: saveRoundDetails } =
    usePut({
      url: ``,
      otherOptions: {},
      apiOptions: {
        headers: {
          [API_VERSION_QUERY_PARAM]: UPDATED_API_VERSION,
        },
      },
    });

  const { handleDeleteLogo, errorWhileDeletion, setErrorWhileDeletion } =
    useDeleteLogo();

  const {
    errorWhileUpload,
    fileUploadResult,
    handleFileUpload,
    isLoading: isUploadingImageToServer,
    setErrorWhileUpload,
    setFileUploadResult,
    uploadPercentage,
  } = useSaveLogo();

  let isPageLoading = mappedCentersListLoading;
  let innerPageLoading =
    applicationDetailLoading ||
    roundCenterDetailsLoading ||
    designationDataLoading;

  let fetchErrors =
    mappedCenterListError ||
    fetchApplicationDetailError ||
    roundCenterDetailsError ||
    designationDataError;

  const contactDetailTemplate = useMemo(() => {
    const data = contactDetailFields(countryData, intl);
    return data.map((row) => {
      return row.map((field) => {
        return { ...field, error: fieldError[field.key] };
      });
    });
  }, [contactDetailsState, countryData, intl, fieldError]);

  const interviewDetailsTemplate = useMemo(() => {
    return interviewDetailsFields(
      interviewDetailsState,
      roundCenterDetails,
      intl,
      selectedModule.key !== moduleKeys.OVERSEAS_CHAPTERS_KEY
    );
  }, [interviewDetailsState, roundCenterDetails, selectedModule]);

  useEffect(() => {
    if (selectedModule?.key && roundId) {
      fetchDesignationData({});
      fetchMappedCentersList();
    }
  }, [selectedModule, roundId]);

  useEffect(() => {
    if (applicationDetail) {
      setContactDetailsState(
        getFormattedContactDetails(applicationDetail?.contact_person_info)
      );
      setInterviewDetailsState(
        getInterviewDetails(applicationDetail?.interview_details)
      );
      setSelectionProcess(
        getSelectionProcess(
          selectionProcessFields(intl),
          applicationDetail?.selection_process
        )
      );
      setRequiredDocumentDetails(
        getFormattedOtherBenefits(applicationDetail?.other_benefits)
      );
      setDesignationDetatils(
        getDesignationsData(
          applicationDetail?.designation_details,
          desginationData
        )
      );
      if (applicationDetail?.other_details) {
        setIsCompanyPPT(
          applicationDetail?.other_details?.company_ppt === "yes" ? 0 : 1
        );
        setFileUploadResult(
          applicationDetail?.other_details?.file_path
            ? {
                data: { url: applicationDetail?.other_details?.file_path },
              }
            : null
        );
      }
    }
  }, [applicationDetail, desginationData]);

  const findFieldByKeyOrLabel = (value, details) => {
    return details
      .flatMap((group) => group)
      .find((item) => item.label === value || item.key === value);
  };

  const handleContactDetailsChange = (field, value, codeValue) => {
    const { key, isMobileNumber } = findFieldByKeyOrLabel(
      field,
      contactDetailTemplate
    );

    setFieldError({ ...fieldError, [key]: undefined });
    if (codeValue && isMobileNumber) {
      setContactDetailsState((prev) => ({
        ...prev,
        [keys.countryCode]: value,
      }));
    } else {
      setContactDetailsState((prev) => ({ ...prev, [key]: value }));
    }
  };

  const handleClickOnSelectionProcess = (key) => {
    const updatedItems = selectionProcess?.map((item) => {
      if (item.key === key) {
        return { ...item, isSelected: !item.isSelected };
      }
      return item;
    });
    setSelectionFieldError("");
    setSelectionProcess([...updatedItems]);
  };

  const handleInterviewDetailChange = (field, value) => {
    const { key } = findFieldByKeyOrLabel(field, interviewDetailsTemplate);
    setInterviewDetailsState((prev) => ({ ...prev, [key]: value }));
  };

  const handleInterviewDetailMultiSelect = (value, detail) => {
    const { key } = detail;

    if (key === keys.companyAvailableForInterview) {
      interviewDetailsState[key] = value;
    }

    const valIndex = interviewDetailsState?.[key].indexOf(value);
    if (valIndex > -1) {
      interviewDetailsState?.[key].splice(valIndex, 1);
    } else {
      interviewDetailsState?.[key].push(value);
    }

    setInterviewDetailsState({ ...interviewDetailsState });
  };

  const handleSelectedCenterData = (data) => {
    setSelectedCenterData(data);
  };

  const handleDelete = ({ itemToBeDeletedId, prevState }) => {
    unMapCenter({
      overrideUrl: `company/${selectedModule.key}/rounds/${roundId}/application/centres/${itemToBeDeletedId}?${SESSION_ID_QUERY_PARAM}=${sessionId}`,
      onSuccessCallback: () => {
        setDeleteDesginationId(itemToBeDeletedId);
        prevState.current = prevState.current.filter(
          (item) => item.id !== itemToBeDeletedId
        );
        selectedOptions.forEach((item) => {
          if (item?.id) {
            resetForm();
          }
        });
        setSelectedOptions((prev) => [
          ...prev.filter((item) => item?.id !== itemToBeDeletedId),
        ]);
        if (configurableListQuery.length > 0) {
          const queryList = menuOptions.filter(
            (item) => item.id !== itemToBeDeletedId
          );
          setMenuOptions([...queryList]);
        } else {
          setMenuOptions([...prevState.current]);
        }
      },
      onErrorCallback: (error) => {
        setError(formateErrors(error));
      },
    });
  };

  const handlePress = (centerData) => {
    setIsAddNewJob(false);
    setCurrentDesginationID(centerData);
    setSelectedOptions([centerData]);
    if (centerData?.id !== selectedOptions?.[0]?.id) {
      resetForm();
      fetchRoundCenterDetails({
        overrideUrl: `core/${selectedModule.key}/rounds/${roundId}/centres/${centerData?.id}?${SESSION_ID_QUERY_PARAM}=${sessionId}`,
      });
      fetchApplicationDetail({
        overrideUrl: `company/${selectedModule.key}/rounds/${roundId}/application/centres/${centerData?.detailId}?${SESSION_ID_QUERY_PARAM}=${sessionId}`,
      });
    }
  };

  const resetForm = () => {
    setContactDetailsState({});
    setInterviewDetailsState({});
    setRequiredDocumentDetails([]);
    setDesignationDetatils([]);
  };

  const handleAdd = () => {
    setShowCenterModal(true);
    fetchCenterList();
  };

  const handleSaveCenter = () => {
    mapCenter({
      overrideUrl: `company/${selectedModule.key}/rounds/${roundId}/application/centres/${selectedCenterData?.id}?${SESSION_ID_QUERY_PARAM}=${sessionId}`,
      onSuccessCallback: () => {
        handleCenterCancel();
        fetchMappedCentersList();
      },
      onErrorCallback: (error) => {
        handleCenterCancel();
        setError(formateErrors(error));
      },
    });
  };

  const handleCenterCancel = () => {
    setShowCenterModal(false);
    setSelectedCenterData(null);
  };

  const handleSave = () => {
    const body = getFormattedData(
      contactDetailsState,
      interviewDetailsState,
      designationDetatils,
      requiredDocumentDetails,
      isCompanyPPt,
      fileUploadResult,
      selectionProcess
        .filter((item) => item?.isSelected)
        .map((item) => item?.value),
      applicationDetail?.other_details
    );

    saveRoundDetails({
      overrideUrl: `company/${selectedModule.key}/rounds/${roundId}/application/centres/${selectedOptions[0]?.detailId}?${SESSION_ID_QUERY_PARAM}=${sessionId}`,
      body,
      onSuccessCallback: () => {
        console.log("onSuccessCallback,onSuccessCallback");
        tabHandler("next");
      },
      onErrorCallback: (error) => {
        setError(formateErrors(error));
      },
    });
  };

  const handleError = () => {
    setError("");
  };

  const handleCancel = () => {};

  const handleBlur = (key, stateKey) => {
    let state = {
      [keys.contactDetails]: contactDetailsState,
      [keys.interviewDetails]: interviewDetailsState,
    };
    let stateTemplate = {
      [keys.contactDetails]: contactDetailTemplate,
      [keys.interviewDetails]: interviewDetailsTemplate,
    };

    const { validate } = findFieldByKeyOrLabel(key, stateTemplate[stateKey]);
    if (validate) {
      setFieldError({
        ...fieldError,
        [key]: validate(state[stateKey][key]),
      });
    }
  };

  const handleImageDeletion = () => {
    if (fileUploadResult?.data?.file_name) {
      const fileName = fileUploadResult?.data?.file_name.split("/");
      handleDeleteLogo(fileName[fileName.length - 1]);
    }
  };

  return {
    contactDetails: addValueOnField(
      contactDetailsState,
      contactDetailTemplate,
      countryData
    ),
    interviewDetails: addValueOnField(
      interviewDetailsState,
      interviewDetailsTemplate
    ),
    handleContactDetailsChange,
    handleInterviewDetailChange,
    mappedCentersList,
    configurableListQuery,
    setConfigurableListQuery,

    selectedOptions,
    handleDelete,
    handlePress,
    handleAdd,
    mappedCentersList,
    menuOptions,
    setMenuOptions,
    handleSave,
    handleCancel,
    isValidAllFields: false,
    handleBlur,

    selectedCenterData,
    handleSelectedCenterData,
    centerListData: centerListData?.centres,
    handleSaveCenter,
    handleCenterCancel,
    showCenterModal,
    mapCenterLoading,
    centerListLoading,
    isEditProfile: true,
    handleInterviewDetailMultiSelect,
    innerPageLoading,
    roundCenterDetails,
    roundCenterDetailsError,

    errorWhileUpload,
    handleFileUpload,
    isUploadingImageToServer,
    onDeleteImage: handleImageDeletion,
    setFileUploadResult,
    uploadImageToServerUtils: {
      fileUploadResult,
      handleFileUpload,
      isUploadingImageToServer,
      setFileUploadResult,
      uploadPercentage,
    },
    uploadPercentage,
    requiredDocumentDetails,
    setRequiredDocumentDetails,
    designationDetatils,
    setDesignationDetatils,
    isCompanyPPt,
    setIsCompanyPPT,
    desginationData,
    selectionProcess,
    handleClickOnSelectionProcess,
    selectionFieldError,
    errorWhileUpdating: error,
    setErrorWhileUpdating: handleError,
    isPageLoading,
    fetchErrors,
    centerListError,
    saveRoundDetailLoading,
  };
};

export default useCentralDetails;
