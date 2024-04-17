import { useState, useEffect, useContext } from "react";
import { useIntl } from "react-intl";

import {
  getDocumentField,
  mapDataToUI,
  mapDocsToUI,
  mapMonthyApiToUI,
  mapPostedPlaceApiToUI,
  mapYearlyApiToUI,
} from "../MappedData";
import {
  SELECTION_PROCESS,
  document_keys,
} from "../../../../../constants/constants";
import { useDelete, usePost } from "../../../../../hooks/useApiRequest";
import {
  APPLICATION,
  JOB_DETAILS,
  ROUNDS,
  USER_TYPE_COMPANY,
} from "../../../../../services/apiServices/apiEndPoint";
import { SideBarContext } from "../../../../../globalContext/sidebar/sidebarProvider";
import { useParams } from "react-router";
import useFetch from "../../../../../hooks/useFetch";

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
  selectionProcess: [],
};

const useJobDetailForm = () => {
  const intl = useIntl();
  const [sideBarState] = useContext(SideBarContext);
  const [requiredPostingPlaceDetail, setRequiredPostingPlaceDetail] = useState(
    []
  );
  const [documentState, setDocumentState] = useState([addDocumentField()]);
  const [selectionProcess, setSelectionProcess] = useState(
    SELECTION_PROCESS.map((option) => ({
      ...option,
      title: intl.formatMessage({ id: option.messageId }),
    }))
  );
  const [startingSalary, setStartingSalary] = useState(null);
  const currentModule = sideBarState?.selectedModule?.key;
  const { id } = useParams();

  // const id = 133;

  const [isAddNewJob, setIsAddNewJob] = useState(false);
  const [editJobDetails, setEditJobDetails] = useState(initialState);
  const [addNewJobDetails, setAddNewJobDetails] = useState(initialState);

  const [configurableListQuery, setConfigurableListQuery] = useState("");
  const [menuOptions, setMenuOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [desginationItems, setDesginationItems] = useState([]);
  const [deleteDesginationId, setDeleteDesginationId] = useState(null);
  const [currentDesginationID, setCurrentDesginationID] = useState(null);

  const renderJobDetails = isAddNewJob ? addNewJobDetails : editJobDetails;
  const setRenderJobDetails = isAddNewJob
    ? setAddNewJobDetails
    : setEditJobDetails;
  let isMultiSelect = false;

  console.log("renderJobDetails", renderJobDetails);

  const {
    fetchData: fetchDesginationList,
    isLoading: isDisagnationListLoading,
  } = useFetch({
    url:
      USER_TYPE_COMPANY +
      `/${currentModule}` +
      ROUNDS +
      `/${id}` +
      APPLICATION +
      JOB_DETAILS,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  const {
    fetchData: fetchJobDetailsData,
    isLoading: isFetchingJobDetailsData,
  } = useFetch({
    url:
      USER_TYPE_COMPANY +
      `/${currentModule}` +
      ROUNDS +
      `/${id}` +
      APPLICATION +
      JOB_DETAILS +
      `/${currentDesginationID}`,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  const { makeRequest } = usePost({
    url:
      USER_TYPE_COMPANY +
      `/${currentModule}` +
      ROUNDS +
      `/${id}` +
      APPLICATION +
      JOB_DETAILS,
  });

  const { makeRequest: handleDesginationDelete } = useDelete({
    url:
      USER_TYPE_COMPANY +
      `/${currentModule}` +
      ROUNDS +
      `/${id}` +
      APPLICATION +
      JOB_DETAILS +
      `/${deleteDesginationId}`,
  });

  useEffect(() => {
    const fetchListing = async () => {
      if (currentModule) {
        const newList = await fetchDesginationList();

        if (!!newList?.length) {
          setDesginationItems([...newList]);
        }
      }
    };

    fetchListing();
  }, [currentModule]);

  useEffect(() => {
    setRenderJobDetails((prev) => ({
      ...prev,
      monthly: mapMonthyApiToUI(),
      yearly: mapYearlyApiToUI(),
      posting_details: mapPostedPlaceApiToUI(),
      required_docs: getDocumentField(),
      selectionProcess: SELECTION_PROCESS.map((option) => ({
        ...option,
        title: intl.formatMessage({ id: option.messageId }),
      })),
    }));
  }, [isAddNewJob]);

  useEffect(() => {
    if (deleteDesginationId) {
      handleDesginationDelete();
    }
  }, [deleteDesginationId]);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (currentDesginationID) {
        const newProfileData = await fetchJobDetailsData({});
        setEditJobDetails(mapDataToUI(newProfileData));
      }
    };

    fetchProfileData();
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
    let updatedMonthly = renderJobDetails.monthly.map((detail) =>
      detail.label === fieldName ? { ...detail, value: value } : detail
    );
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
        detail.key === "grossSalary"
          ? { ...detail, value: sumOfGrossSalary.toString() }
          : detail
      );

      updatedYearly = updatedYearly.map((detail) =>
        detail.key === "totalGrossSalary"
          ? { ...detail, value: sumOfGrossSalary.toString() }
          : detail
      );
      const oneTimePayment =
        updatedYearly.find((detail) => detail.key === "oneTimePayment").value ||
        "0";
      const newCtc = sumOfGrossSalary + parseFloat(oneTimePayment);
      updatedYearly = updatedYearly.map((detail) =>
        detail.key === "ctc" ? { ...detail, value: newCtc.toString() } : detail
      );
    }

    setRenderJobDetails({
      ...renderJobDetails,
      monthly: updatedMonthly,
      yearly: updatedYearly,
    });
  };

  const handleYearlyData = (fieldName, value) => {
    let updatedYearly = renderJobDetails.yearly.map((detail) =>
      detail.label === fieldName ? { ...detail, value: value } : detail
    );
    const monthlyGrossSalary = getMonthlyGrossSalary();
    updatedYearly = updatedYearly.map((detail) =>
      detail.key === "totalGrossSalary"
        ? { ...detail, value: monthlyGrossSalary.toString() }
        : detail
    );
    if (
      fieldName === "label.oneTimePayment" ||
      fieldName === "label.totalGrossSalary"
    ) {
      const oneTimePayment =
        updatedYearly.find((detail) => detail.key === "oneTimePayment").value ||
        "0";
      const ctc = +monthlyGrossSalary + +oneTimePayment;
      updatedYearly = updatedYearly.map((detail) =>
        detail.key === "ctc" ? { ...detail, value: ctc.toString() } : detail
      );
    }
    setRenderJobDetails({
      ...renderJobDetails,
      yearly: updatedYearly,
    });
  };

  function getMonthlyGrossSalary() {
    const monthlyDetail = renderJobDetails.monthly.find(
      (detail) => detail.key === "grossSalary"
    );
    return monthlyDetail ? monthlyDetail.value : "0";
  }

  const handleToggle = (id) => {
    const updatedItems = renderJobDetails?.selectionProcess?.map((item) => {
      if (item.id === id) {
        return { ...item, isSelected: !item.isSelected };
      }
      return item;
    });
    setRenderJobDetails((prev) => ({
      ...prev,
      selectionProcess: [...updatedItems],
    }));
  };

  const handleDelete = ({ itemToBeDeletedId, prevState }) => {
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
  };

  const handlePress = (selectedItemID) => {
    setIsAddNewJob(false);
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
    setSelectedOptions([]);
  };

  // TODO
  // I have created function for single line code we have to add code later

  const mapDataToPayload = (data) => {
    const payload = {
      monthly: {},
      yearly: {},
      Posting_Place: {},
    };

    // Map monthly data
    data.monthly.forEach((item) => {
      payload.monthly[item.key] = item.value;
    });

    // Map yearly data
    data.yearly.forEach((item) => {
      payload.yearly[item.key] = item.value;
    });

    // Map Posting_Place data
    data.Posting_Place.forEach((item) => {
      payload.Posting_Place[item.key] = item.value;
    });

    return payload;
  };

  const mapRequiredDocumentsToPayload = (requiredDocumentDetails) => {
    const payload = [];

    requiredDocumentDetails.forEach((item) => {
      const docPayload = {
        id: item.key, // Assuming key is the unique identifier for each document
        doc_name: item.document_name,
        doc_type: item.document_type,
        no_of_photocopies: item.no_of_copies,
        // Add other properties as needed
      };
      payload.push(docPayload);
    });

    return payload;
  };

  const mapPostingDetailsToPayload = (requiredPostingPlaceDetail) => {
    const payload = requiredPostingPlaceDetail.map((item) => {
      const postingPlace = item.postingPlace;
      const postingData = {
        [postingPlace]: {
          general: item.general,
          obc: item.obc,
          sc: item.sc,
          st: item.st,
          ph: item.ph,
          others: item.others,
          total: item.total,
        },
      };
      return postingData;
    });

    return payload;
  };

  const handleSaveAndNext = () => {
    // const extraDetails = mapDataToPayload(jobDetailData);
    // const documentDetails = mapRequiredDocumentsToPayload(
    //   requiredDocumentDetails
    // );
    // const posting_details = mapPostingDetailsToPayload(
    //   requiredPostingPlaceDetail
    // );
    // const payload = {
    //   designation: designationName,
    //   compensation: compensation,
    //   starting_salary: startingSalary,
    //   role_responsibility: textEditorContent,
    //   ctc_details: CTCDetail,
    //   monthly: {
    //     monthly_basic: extraDetails?.monthly?.basic,
    //     monthly_hra: extraDetails?.monthly?.hra,
    //     monthly_other: extraDetails?.monthly?.others,
    //     monthly_fixed_pay: extraDetails?.monthly?.fixedPay,
    //     monthly_variable_pay: extraDetails?.monthly?.variablePay,
    //     monthly_semi_variable: extraDetails?.monthly?.semiVariable,
    //     monthly_gross_salary: extraDetails?.monthly?.grossSalary,
    //     monthly_take_home: extraDetails?.monthly?.takeHome,
    //   },
    //   yearly: {
    //     yearly_one_time_payment: extraDetails?.yearly?.oneTimePayment,
    //     yearly_total_gross_salary: extraDetails?.yearly?.totalGrossSalary,
    //     yearly_ctc: extraDetails?.yearly?.ctc,
    //   },
    //   required_docs: documentDetails,
    //   bond_details: {
    //     is_bond_included: "yes",
    //     bond_period_in_mm: bondPeriod,
    //     exit_amount: exitAmount,
    //   },
    //   specific_performa_required: "yes",
    //   posting_details: posting_details,
    // };
    const payload = {
      designation: "Nikhil",
      compensation: "500000",
      starting_salary: "500000",
      role_responsibility:
        "<h1>This is a heading</h1> <p>This is a paragraph.</p>",
      ctc_details: "ctc details",
      monthly: {
        monthly_basic: 500000,
        monthly_hra: 50000,
        monthly_other: 50000,
        monthly_fixed_pay: 50000,
        monthly_variable_pay: 5000,
        monthly_semi_variable: 2000,
        monthly_gross_salary: 500000,
        monthly_take_home: 500000,
      },
      yearly: {
        yearly_one_time_payment: 500000,
        yearly_total_gross_salary: 500000,
        yearly_ctc: 1000000,
      },
      required_docs: [
        {
          id: 1,
          doc_name: "name",
          doc_type: "original",
          no_of_photocopies: 1,
        },
        {
          id: 2,
          doc_name: "name",
          doc_type: "original",
          no_of_photocopies: 1,
        },
        {
          id: 3,
          doc_name: "name",
          doc_type: "original",
          no_of_photocopies: 1,
        },
      ],
      bond_details: {
        is_bond_included: "yes",
        bond_period_in_mm: 5,
        exit_amount: 500000,
      },
      specific_performa_required: "yes",
      posting_details: [
        {
          Delhi: {
            general: 30,
            obc: 2,
            sc: 34,
            st: 1,
            ph: 0,
            others: 3,
            total: 70,
          },
          Karnataka: {
            general: 30,
            obc: 2,
            sc: 34,
            st: 1,
            ph: 0,
            others: 3,
            total: 70,
          },
        },
      ],
    };

    makeRequest({
      body: payload,
    });
  };

  return {
    renderJobDetails,
    setRenderJobDetails,
    handlePress,
    handleAdd,
    selectedOptions,
    setSelectedOptions,
    desginationItems,
    handleDelete,
    handleInputChange,
    addDocumentField: documentState,
    configurableListQuery,
    setConfigurableListQuery,
    menuOptions,
    setMenuOptions,
    handleMonthlyData,
    handleYearlyData,
    handleToggle,
    selectionProcess,
    handleSaveAndNext,
    requiredPostingPlaceDetail,
    setRequiredPostingPlaceDetail,
    startingSalary,
  };
};

export default useJobDetailForm;
