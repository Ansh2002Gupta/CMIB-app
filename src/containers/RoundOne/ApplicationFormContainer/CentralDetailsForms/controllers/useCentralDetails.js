import { useContext, useMemo, useState } from "react";
import {
  addValueOnField,
  contactDetailFields,
  getFormattedData,
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

const useCentralDetails = () => {
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

  const {
    data: countryData,
    isLoading: countryLoading,
    fetchData: fetchingCountryCode,
  } = useFetch({
    url: COUNTRY_CODE,
    otherOptions: {
      //   skipApiCallOnMount: true,
    },
  });

  //used to fetch mapped centers
  const {
    data: mappedCentersList,
    isLoading: mappedCentersListLoading,
    fetchData: fetchMappedCentersList,
  } = useFetch({
    url: `/company/${selectedModule.key}/rounds/${roundId}/application/centres`,
    otherOptions: {},
  });

  //used to fetch application detail based on center id
  const {
    data: applicationDetail,
    isLoading: applicationDetailLoading,
    fetchData: fetchApplicationDetail,
  } = useFetch({
    //
    url: "",
    otherOptions: {},
  });

  const {
    data: roundCenterDetails,
    isLoading: roundCenterDetailsLoading,
    fetchData: fetchRoundCenterDetails,
    error: roundCenterDetailsError,
  } = useFetch({
    //
    url: `/core/${selectedModule.key}/rounds/${roundId}/centres/{centreId}`,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  const {
    // data: applicationDetail,
    isLoading: mapCenterLoading,
    fetchData: fetchMapCenter,
    makeRequest: mapCenter,
  } = usePost({
    url: "",
    otherOptions: {},
  });
  const {
    // data: applicationDetail,
    isLoading: unMapCenterLoading,
    fetchData: fetchUnMapCenter,
    makeRequest: unMapCenter,
  } = useDelete({
    url: "",
    otherOptions: {},
  });

  const {
    data: centerListData,
    isLoading: centerListLoading,
    fetchData: fetchCenterList,
  } = useFetch({
    url: `core/${selectedModule.key}/rounds/${roundId}`,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  const {
    data: desginationData,
    isLoading: designationDataLoading,
    // fetchData: fetchDesignationData,
  } = useFetch({
    url: `/company/${selectedModule.key}/rounds/${roundId}/application/job-detail`,
    otherOptions: {},
  });

  const { isLoading: saveRoundDetailLoading, makeRequest: saveRoundDetails } =
    usePut({
      url: ``,
      otherOptions: {},
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

  const contactDetailTemplate = useMemo(() => {
    const data = contactDetailFields(countryData, intl);
    return data.map((row) => {
      return row.map((field) => {
        return { ...field, error: fieldError[field.key] };
      });
    });
  }, [contactDetailsState, countryData, intl, fieldError]);

  const interviewDetailsTemplate = useMemo(() => {
    return interviewDetailsFields(interviewDetailsState, roundCenterDetails);
  }, [interviewDetailsState, roundCenterDetails]);

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
      overrideUrl: `company/${selectedModule.key}/rounds/${roundId}/application/centres/${itemToBeDeletedId}`,
      onSuccessCallback: () => {
        setDeleteDesginationId(itemToBeDeletedId);
        prevState.current = prevState.current.filter(
          (item) => item.id !== itemToBeDeletedId
        );
        setSelectedOptions((prev) => [
          ...prev.filter((itemID) => itemID !== itemToBeDeletedId),
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
    });
  };

  const handlePress = (centerData) => {
    setIsAddNewJob(false);
    setCurrentDesginationID(centerData);
    setSelectedOptions([centerData]);
    if (centerData?.id !== selectedOptions?.[0]?.id) {
      setContactDetailsState({});
      fetchRoundCenterDetails({
        overrideUrl: `core/${selectedModule.key}/rounds/${roundId}/centres/${centerData?.id}`,
      });
      fetchApplicationDetail({
        overrideUrl: `company/${selectedModule.key}/rounds/${roundId}/application/centres/${centerData?.detailId}`,
      });
    }
  };

  const handleAdd = () => {
    setShowCenterModal(true);
    fetchCenterList();
  };

  const handleSaveCenter = () => {
    mapCenter({
      overrideUrl: `company/${selectedModule.key}/rounds/${roundId}/application/centres/${selectedCenterData?.id}`,
      onSuccessCallback: () => {
        handleCenterCancel();
        fetchMappedCentersList();
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
        .map((item) => item?.value)
    );

    saveRoundDetails({
      overrideUrl: `company/${selectedModule.key}/rounds/${roundId}/application/centres/${selectedOptions[0]?.detailId}`,
      body,
      onSuccessCallback: () => {
        console.log("onSuccessCallback,onSuccessCallback");
      },
    });
    console.log(body, selectedOptions, "body");
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
    roundCenterDetailsLoading,
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
  };
};

export default useCentralDetails;
