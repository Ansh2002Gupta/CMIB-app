import { useState, useEffect, useContext } from "react";
import { useIntl } from "react-intl";

import {
  getDocumentField,
  getPlaceOfPostingDetails,
  mapDataToPayload,
  mapDataToUI,
  mapMonthyApiToUI,
  mapYearlyApiToUI,
} from "../MappedData";
import {
  API_VERSION_QUERY_PARAM,
  NEWLY_QUALIFIED,
  SESSION_ID_QUERY_PARAM,
  UPDATED_API_VERSION,
  document_keys,
} from "../../../../../constants/constants";
import { useDelete, usePost, usePut } from "../../../../../hooks/useApiRequest";
import {
  APPLICATION,
  CORE,
  JOB_DETAILS,
  ROUNDS,
  USER_TYPE_COMPANY,
} from "../../../../../services/apiServices/apiEndPoint";
import { SideBarContext } from "../../../../../globalContext/sidebar/sidebarProvider";
import { useParams } from "react-router";
import useFetch from "../../../../../hooks/useFetch";
import { areAllValuesEmpty } from "../../../../../utils/util";

const addDocumentField = () => [
  {
    key: document_keys.DOCUMENT_NAME,
    label: "label.document_name",
    placeholder: "label.select_document_name",
    isDropdown: false,
  },
  {
    key: document_keys.DOCUMENT_TYPE,
    label: "label.document_type",
    placeholder: "label.select_document_type",
    isDropdown: true,
    labelField: "label",
    valueField: "type",
    options: [
      {
        id: 1,
        label: "Original",
        value: "Original",
      },
    ],
  },
  {
    key: document_keys.NUMBER_OF_COPIES,
    label: "label.no_of_copies",
    placeholder: "label.select_no_of_copies",
    isActionToAdd: true,
    isSingleSelection: true,
  },
];

const initialState = {
  designation: "",
  compensation: "",
  starting_salary: "",
  role_responsibility: "",
  ctc_details: "",
  monthly: [],
  yearly: [],
  required_docs: [],
  bond_details: {
    is_bond_included: "",
    bond_period_in_mm: null,
    exit_amount: null,
  },
  specific_performa_required: "",
  posting_details: [],
  otherInfo: "",
  job_type: "",
  flexi_hours: "",
  work_exp_range_id: "",
  errors: "",
};

const useJobDetailForm = ({ tabHandler }) => {
  const intl = useIntl();
  const [sideBarState] = useContext(SideBarContext);
  const [documentState, setDocumentState] = useState([addDocumentField()]);

  const [startingSalary, setStartingSalary] = useState(null);
  const currentModule = sideBarState?.selectedModule?.key;
  const sessionId = sideBarState?.selectedSession?.value;

  const { id } = useParams();

  const [isAddNewJob, setIsAddNewJob] = useState(false);
  const [editJobDetails, setEditJobDetails] = useState(initialState);
  const [addNewJobDetails, setAddNewJobDetails] = useState(initialState);
  const [currentError, setCurrentError] = useState("");

  const [configurableListQuery, setConfigurableListQuery] = useState("");
  const [menuOptions, setMenuOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [desginationItems, setDesginationItems] = useState([]);
  const [deleteDesginationId, setDeleteDesginationId] = useState(null);
  const [currentDesginationID, setCurrentDesginationID] = useState(null);
  const [workExperienceOptions, setWorkExperienceOptions] = useState([]);
  const [validateError, setValidateError] = useState(initialState);
  const [modalDetails, setModalDetails] = useState({
    isShown: false,
    isDeleteModal: false,
    isChangeTabModal: false,
    modalMessage: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  const renderJobDetails = isAddNewJob ? addNewJobDetails : editJobDetails;
  const setRenderJobDetails = isAddNewJob
    ? setAddNewJobDetails
    : setEditJobDetails;
  let isMultiSelect = false;

  const {
    fetchData: fetchDesginationList,
    isLoading: isDisagnationListLoading,
    error: errorInDesginationList,
  } = useFetch({
    url:
      USER_TYPE_COMPANY +
      `/${currentModule}` +
      ROUNDS +
      `/${id}` +
      APPLICATION +
      `${JOB_DETAILS}?${SESSION_ID_QUERY_PARAM}=${sessionId}`,
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
    fetchData: fetchingWorkExperience,
    isLoading: isLoadingWorkExperience,
    error: errorInWorkExperience,
  } = useFetch({
    url:
      CORE +
      `/${currentModule}` +
      ROUNDS +
      `/${id}?${SESSION_ID_QUERY_PARAM}=${sessionId}`,
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
    fetchData: fetchJobDetailsData,
    isLoading: isFetchingJobDetailsData,
    error: errorWhileFetchingData,
  } = useFetch({
    url:
      USER_TYPE_COMPANY +
      `/${currentModule}` +
      ROUNDS +
      `/${id}` +
      APPLICATION +
      JOB_DETAILS +
      `/${currentDesginationID}?${SESSION_ID_QUERY_PARAM}=${sessionId}`,
    otherOptions: {
      skipApiCallOnMount: true,
    },
    apiOptions: {
      headers: {
        [API_VERSION_QUERY_PARAM]: UPDATED_API_VERSION,
      },
    },
  });

  const error = errorWhileFetchingData || errorInDesginationList;

  const { makeRequest, isLoading: isLoadingOnAddJob } = usePost({
    url:
      USER_TYPE_COMPANY +
      `/${currentModule}` +
      ROUNDS +
      `/${id}` +
      APPLICATION +
      `${JOB_DETAILS}?${SESSION_ID_QUERY_PARAM}=${sessionId}`,
    apiOptions: {
      headers: {
        [API_VERSION_QUERY_PARAM]: UPDATED_API_VERSION,
      },
    },
  });

  const {
    makeRequest: handleDesginationDelete,
    isLoading: isLoadingOndeleting,
  } = useDelete({
    url:
      USER_TYPE_COMPANY +
      `/${currentModule}` +
      ROUNDS +
      `/${id}` +
      APPLICATION +
      JOB_DETAILS +
      `/${deleteDesginationId}?${SESSION_ID_QUERY_PARAM}=${sessionId}`,
    apiOptions: {
      headers: {
        [API_VERSION_QUERY_PARAM]: UPDATED_API_VERSION,
      },
    },
  });

  const { makeRequest: handleUpdateDetails, isLoading: isLoadingOnUpdating } =
    usePut({
      url:
        USER_TYPE_COMPANY +
        `/${currentModule}` +
        ROUNDS +
        `/${id}` +
        APPLICATION +
        JOB_DETAILS +
        `/${currentDesginationID}?${SESSION_ID_QUERY_PARAM}=${sessionId}`,
      apiOptions: {
        headers: {
          [API_VERSION_QUERY_PARAM]: UPDATED_API_VERSION,
        },
      },
    });

  const isButtonLoading =
    currentDesginationID === null ? isLoadingOnAddJob : isLoadingOnUpdating;

  useEffect(() => {
    const fetchListing = async () => {
      if (currentModule && sessionId) {
        const newList = await fetchDesginationList();
        if (currentModule !== NEWLY_QUALIFIED) {
          const workExperienceOptions = await fetchingWorkExperience({});
          setWorkExperienceOptions([...workExperienceOptions?.experiences]);
        }
        if (!!newList?.length) {
          setDesginationItems([...newList]);
          setSelectedOptions([String(newList[0]?.id)]);
          setCurrentDesginationID(newList[0]?.id);
          setIsLoading(false);
        } else {
          setIsAddNewJob(true);
          setIsLoading(false);
        }
      }
    };
    fetchListing();
    if (!!error) {
      setIsLoading(false);
    }
  }, [currentModule, sessionId]);

  useEffect(() => {
    setRenderJobDetails((prev) => ({
      ...prev,
      monthly: mapMonthyApiToUI(),
      yearly: mapYearlyApiToUI(),
      required_docs: getDocumentField(),
      posting_details: getPlaceOfPostingDetails(),
    }));
  }, [isAddNewJob]);

  useEffect(() => {
    if (deleteDesginationId) {
      handleDesginationDelete({
        onErrorCallback: (errorMessage) => {
          setCurrentError(errorMessage);
        },
      });
    }
  }, [deleteDesginationId]);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!!currentDesginationID) {
        const newProfileData = await fetchJobDetailsData({});
        setEditJobDetails(mapDataToUI(newProfileData, workExperienceOptions));
        setIsLoading(false);
      }
    };
    fetchProfileData();
    if (!!error) {
      setIsLoading(false);
    }
  }, [currentDesginationID]);

  const handleInputChange = (fieldName, value, subFieldName) => {
    if (fieldName === "bond_details") {
      setRenderJobDetails((prev) => ({
        ...prev,
        bond_details: {
          ...prev.bond_details,
          [subFieldName]: value,
        },
      }));
    } else {
      setRenderJobDetails((prev) => ({
        ...prev,
        [fieldName]: value,
      }));
    }
  };

  const handleMonthlyData = (fieldName, value) => {
    let updatedMonthly = renderJobDetails.monthly.map((detail) => {
      if (!value && detail.label === fieldName) {
        return {
          ...detail,
          value: value,
          isError: true,
          error: intl.formatMessage({ id: "label.error.cannot_be_empty" }),
        };
      } else {
        return detail.label === fieldName
          ? { ...detail, value: value, isError: null, error: null }
          : detail;
      }
    });
    let updatedYearly = [...renderJobDetails.yearly];
    if (
      [
        "label.basic",
        "label.hra",
        "label.others",
        "label.fixedPay",
        "label.variablePay",
        "label.semiVariable",
      ].includes(fieldName)
    ) {
      const sumOfGrossSalary = updatedMonthly.reduce((acc, detail) => {
        if (
          [
            "label.basic",
            "label.hra",
            "label.others",
            "label.fixedPay",
            "label.variablePay",
            "label.semiVariable",
          ].includes(detail.label)
        ) {
          return acc + parseFloat(detail.value || 0);
        }
        return acc;
      }, 0);

      updatedMonthly = updatedMonthly.map((detail) =>
        detail.key === "monthly_gross_salary"
          ? { ...detail, value: sumOfGrossSalary.toString() }
          : detail
      );

      updatedYearly = updatedYearly.map((detail) =>
        detail.key === "yearly_total_gross_salary"
          ? { ...detail, value: sumOfGrossSalary.toString() }
          : detail
      );
      const oneTimePayment =
        updatedYearly.find((detail) => detail.key === "yearly_one_time_payment")
          .value || "0";
      const newCtc = sumOfGrossSalary + parseFloat(oneTimePayment);
      updatedYearly = updatedYearly.map((detail) =>
        detail.key === "yearly_ctc"
          ? { ...detail, value: newCtc.toString() }
          : detail
      );
    }

    setRenderJobDetails({
      ...renderJobDetails,
      monthly: updatedMonthly,
      yearly: updatedYearly,
    });
  };

  const handleYearlyData = (fieldName, value) => {
    let updatedYearly = renderJobDetails.yearly.map((detail) => {
      if (!value && detail.label === fieldName) {
        return {
          ...detail,
          value: value,
          isError: true,
          error: intl.formatMessage({ id: "label.error.cannot_be_empty" }),
        };
      } else {
        return detail.label === fieldName
          ? { ...detail, value: value, isError: null, error: null }
          : detail;
      }
    });
    if (fieldName === "label.oneTimePayment") {
      const totalGrossSalaryDetail = updatedYearly.find(
        (detail) => detail.key === "yearly_total_gross_salary"
      );
      const totalGrossSalary = totalGrossSalaryDetail
        ? parseFloat(totalGrossSalaryDetail.value) || 0
        : 0;

      const oneTimePayment = parseFloat(value) || 0;

      const newCtc = totalGrossSalary + oneTimePayment;

      updatedYearly = updatedYearly.map((detail) => {
        if (detail.key === "yearly_ctc") {
          return { ...detail, value: newCtc.toString() };
        }
        return detail;
      });
    }

    setRenderJobDetails({
      ...renderJobDetails,
      yearly: updatedYearly,
    });
  };

  function getMonthlyGrossSalary() {
    const monthlyDetail = renderJobDetails.monthly.find(
      (detail) => detail.key === "monthly_gross_salary"
    );
    return monthlyDetail ? monthlyDetail.value : "0";
  }

  const deleteDesignationFromList = ({ itemToBeDeletedId, prevState }) => {
    if (currentDesginationID !== null) {
      setDeleteDesginationId(itemToBeDeletedId);
    }
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
    setRenderJobDetails(initialState);
  };

  const handleDelete = ({ itemToBeDeletedId, prevState }) => {
    setModalDetails((prev) => ({
      ...prev,
      isDeleteModal: true,
      deleteDetails: { itemToBeDeletedId, prevState },
      modalMessage: intl.formatMessage({
        id: "label.tabs_removed_data",
      }),
    }));
  };

  const handlePress = (selectedItemID) => {
    if (selectedItemID === currentDesginationID) {
      return;
    }
    if (selectedItemID === null) {
      setIsAddNewJob(true);
    } else {
      setIsAddNewJob(false);
    }
    setCurrentDesginationID(selectedItemID);
    if (isMultiSelect) {
      if (selectedOptions.includes(selectedItemID)) {
        const newSelectedOptions = selectedOptions.filter(
          (id) => id !== selectedItemID
        );
        setSelectedOptions(newSelectedOptions);
      } else setSelectedOptions((prev) => [...prev, selectedItemID]);
    } else setSelectedOptions([selectedItemID]);
  };

  const handleAdd = () => {
    setIsAddNewJob(true);
    const val = !menuOptions.some((item) => item.id === null);
    if (val) {
      setMenuOptions((prev) => [
        { id: null, name: "Add your designation" },
        ...prev,
      ]);
      setSelectedOptions([null]);
      setCurrentDesginationID(null);
    } else {
      setModalDetails({
        isShown: true,
        modalMessage: intl.formatMessage({
          id: "label.you_can_add_one_desgination",
        }),
      });
    }
  };

  const handleBlur = (fieldName) => {
    if (fieldName === "designation") {
      setMenuOptions((prevOptions) => {
        return prevOptions.map((option) => {
          if (option.id === null) {
            return { ...option, name: renderJobDetails?.[fieldName] };
          }
          return option;
        });
      });
    }
    const value = renderJobDetails[fieldName];
    if (value == null || value == "") {
      setValidateError((prev) => ({
        ...prev,
        [fieldName]: intl.formatMessage({
          id: "label.error.cannot_be_empty",
        }),
      }));
    } else
      setValidateError((prev) => ({
        ...prev,
        [fieldName]: "",
      }));
  };
  const isDisabled = !areAllValuesEmpty(validateError);

  const handleSaveAndNext = () => {
    const mappedPayload = mapDataToPayload(renderJobDetails, currentModule);
    if (currentDesginationID !== null) {
      handleUpdateDetails({
        body: mappedPayload,
        onSuccessCallback: () => {
          tabHandler("next");
        },
        onErrorCallback: (errorMessage) => {
          setCurrentError(errorMessage);
        },
      });
    } else {
      makeRequest({
        body: mappedPayload,
        onSuccessCallback: (data) => {
          const { newId } = data;
          setMenuOptions((prevMenuOptions) => {
            return prevMenuOptions.map((option) => {
              if (option.id === null) {
                return { ...option, id: newId };
              }
              return option;
            });
          });
          setCurrentDesginationID(newId);
          tabHandler("next");
        },
        onErrorCallback: (errorMessage) => {
          setCurrentError(errorMessage);
        },
      });
    }
  };

  return {
    isButtonLoading,
    isDisabled,
    validateError,
    renderJobDetails,
    setRenderJobDetails,
    handlePress,
    handleAdd,
    selectedOptions,
    setSelectedOptions,
    modalDetails,
    setModalDetails,
    deleteDesignationFromList,
    desginationItems,
    handleBlur,
    isLoading,
    error,
    handleDelete,
    handleInputChange,
    addDocumentField: documentState,
    configurableListQuery,
    setConfigurableListQuery,
    menuOptions,
    setMenuOptions,
    handleMonthlyData,
    workExperienceOptions,
    handleYearlyData,
    handleSaveAndNext,
    currentError,
    setCurrentError,
    startingSalary,
  };
};

export default useJobDetailForm;
