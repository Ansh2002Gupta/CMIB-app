import { DOCUMENT_TYPE, document_keys } from "../../../../constants/constants";
import { convertStringtoNumber } from "../../../../utils/util";

export const mapMonthyApiToUI = () => {
  return [
    {
      key: "monthly_basic",
      label: "label.basic",
      value: "",
      placeholder: "label.basic",
      isMandatory: true,
      isRow: true,
      maxLength: 9,
      isRupee: true,
      isNumeric: true,
    },
    {
      key: "monthly_hra",
      label: "label.hra",
      value: "",
      isMandatory: true,
      placeholder: "label.hra",
      isRow: true,
      maxLength: 9,
      isRupee: true,
      isNumeric: true,
    },
    {
      key: "monthly_other",
      label: "label.others",
      value: "",
      isMandatory: true,
      placeholder: "label.others",
      isRow: true,
      maxLength: 9,
      isRupee: true,
      isNumeric: true,
    },
    {
      key: "monthly_fixed_pay",
      label: "label.fixedPay",
      value: "",
      isMandatory: true,
      placeholder: "label.fixedPay",
      isRow: true,
      maxLength: 9,
      isRupee: true,
      isNumeric: true,
    },
    {
      key: "monthly_variable_pay",
      label: "label.variablePay",
      value: "",
      isMandatory: true,
      placeholder: "label.variablePay",
      isRow: true,
      maxLength: 9,
      isRupee: true,
      isNumeric: true,
    },
    {
      key: "monthly_semi_variable",
      label: "label.semiVariable",
      value: "",
      isMandatory: true,
      placeholder: "label.semiVariable",
      isRow: true,
      maxLength: 9,
      isRupee: true,
      isNumeric: true,
    },
    {
      key: "monthly_take_home",
      label: "label.takeHome",
      value: "",
      isMandatory: true,
      placeholder: "label.takeHome",
      isRow: true,
      maxLength: 9,
      isRupee: true,
      isNumeric: true,
    },
    {
      key: "monthly_gross_salary",
      label: "label.gross_Salary",
      value: "",
      isMandatory: true,
      placeholder: "label.enter_gross_Salary",
      isRow: true,
      maxLength: 9,
      isRupee: true,
      isEditable: false,
      isNumeric: true,
    },
  ];
};

export const mapYearlyApiToUI = () => {
  return [
    {
      key: "yearly_one_time_payment",
      label: "label.oneTimePayment",
      value: "",
      isMandatory: true,
      placeholder: "label.oneTimePayment",
      isRow: true,
      maxLength: 9,
      isRupee: true,
      isNumeric: true,
    },
    {
      key: "yearly_total_gross_salary",
      label: "label.totalGrossSalary",
      value: "",
      isMandatory: true,
      placeholder: "label.totalGrossSalary",
      isRow: true,
      isEditable: false,
      maxLength: 9,
      isRupee: true,
      isNumeric: true,
    },
    {
      key: "yearly_ctc",
      label: "label.ctc",
      value: "",
      isMandatory: true,
      isEditable: false,
      placeholder: "label.ctc",
      maxLength: 9,
      isRupee: true,
      isNumeric: true,
    },
  ];
};

export const mapPostedPlaceApiToUI = () => {
  return [
    {
      key: "others",
      label: "label.others",
      value: "",
    },
    {
      key: "obc",
      label: "label.OBC",
      value: "",
    },
    {
      key: "sc",
      label: "label.SC",
      value: "",
    },
    {
      key: "st",
      label: "label.ST",
      value: "",
    },
    {
      key: "ph",
      label: "label.PH",
      value: "",
    },
    {
      key: "general",
      label: "label.general",
      value: "",
    },
  ];
};

export const mapDataToUI = (data) => {
  return {
    designation: data?.designation || "-",
    compensation: convertStringtoNumber(data?.compensation) || "-",
    starting_salary: convertStringtoNumber(data?.starting_salary) || "-",
    role_responsibility: data?.role_responsibility || "-",
    ctc_details: data?.ctc_details || "-",
    otherInfo: data?.other_details || "-",
    job_type: data?.job_type || "-",
    flexi_hours: data?.flexi_hours === "yes" ? 0 : 1 || "-",
    work_exp_range_id: data?.work_exp_range_id || "-",
    monthly: [
      {
        key: "monthly_basic",
        label: "label.basic",
        value: convertStringtoNumber(data?.monthly?.monthly_basic) || "-",
        placeholder: "label.basic",
        isMandatory: true,
        isRow: true,
        maxLength: 9,
        isRupee: true,
        isNumeric: true,
      },
      {
        key: "monthly_hra",
        label: "label.hra",
        value: convertStringtoNumber(data?.monthly?.monthly_hra) || "-",
        isMandatory: true,
        placeholder: "label.hra",
        isRow: true,
        maxLength: 9,
        isRupee: true,
        isNumeric: true,
      },
      {
        key: "monthly_other",
        label: "label.others",
        value: convertStringtoNumber(data?.monthly?.monthly_other) || "-",
        isMandatory: true,
        placeholder: "label.others",
        isRow: true,
        maxLength: 9,
        isRupee: true,
        isNumeric: true,
      },
      {
        key: "monthly_fixed_pay",
        label: "label.fixedPay",
        value: convertStringtoNumber(data?.monthly?.monthly_fixed_pay) || "-",
        isMandatory: true,
        placeholder: "label.fixedPay",
        isRow: true,
        maxLength: 9,
        isRupee: true,
        isNumeric: true,
      },
      {
        key: "monthly_variable_pay",
        label: "label.variablePay",
        value:
          convertStringtoNumber(data?.monthly?.monthly_variable_pay) || "-",
        isMandatory: true,
        placeholder: "label.variablePay",
        isRow: true,
        maxLength: 9,
        isRupee: true,
        isNumeric: true,
      },
      {
        key: "monthly_semi_variable",
        label: "label.semiVariable",
        value:
          convertStringtoNumber(data?.monthly?.monthly_semi_variable) || "-",
        isMandatory: true,
        placeholder: "label.semiVariable",
        isRow: true,
        maxLength: 9,
        isRupee: true,
        isNumeric: true,
      },
      {
        key: "monthly_take_home",
        label: "label.takeHome",
        value: convertStringtoNumber(data?.monthly?.monthly_take_home) || "-",
        isMandatory: true,
        placeholder: "label.takeHome",
        isRow: true,
        maxLength: 9,
        isRupee: true,
        isNumeric: true,
      },
      {
        key: "monthly_gross_salary",
        label: "label.gross_Salary",
        value:
          convertStringtoNumber(data?.monthly?.monthly_gross_salary) || "-",
        isMandatory: true,
        placeholder: "label.enter_gross_Salary",
        isRow: true,
        maxLength: 9,
        isRupee: true,
        isEditable: false,
        isNumeric: true,
      },
    ],
    yearly: [
      {
        key: "yearly_one_time_payment",
        label: "label.oneTimePayment",
        value:
          convertStringtoNumber(data?.yearly?.yearly_one_time_payment) || "-",
        isMandatory: true,
        placeholder: "label.oneTimePayment",
        isRow: true,
        maxLength: 9,
        isRupee: true,
        isNumeric: true,
      },
      {
        key: "yearly_total_gross_salary",
        label: "label.totalGrossSalary",
        value:
          convertStringtoNumber(data?.yearly?.yearly_total_gross_salary) || "-",
        isMandatory: true,
        placeholder: "label.totalGrossSalary",
        isRow: true,
        isEditable: false,
        maxLength: 9,
        isRupee: true,
        isNumeric: true,
      },
      {
        key: "yearly_ctc",
        label: "label.ctc",
        value: convertStringtoNumber(data?.yearly?.yearly_ctc) || "-",
        isMandatory: true,
        isEditable: false,
        placeholder: "label.ctc",
        maxLength: 9,
        isRupee: true,
        isNumeric: true,
      },
    ],
    required_docs: mapDocsToUI(data?.required_docs),
    bond_details: {
      is_bond_included:
        data?.bond_details?.is_bond_included === "yes" ? 0 : 1 || "-",
      bond_period_in_mm:
        convertStringtoNumber(data?.bond_details?.bond_period_in_mm) || "-",
      exit_amount:
        convertStringtoNumber(data?.bond_details?.exit_amount) || "-",
    },
    specific_performa_required:
      data?.specific_performa_required === "yes" ? 0 : 1 || "-",
    posting_details: mapPostingDetailsToUI(data?.posting_details),
  };
};

export const mapDocsToUI = (data) => {
  if (!data.length) {
    return getDocumentField();
  }

  const newDocsArray = data.map((docs, index) => {
    const idObject = docs?.id
      ? {
          id: docs?.id,
        }
      : {};
    return [
      {
        cellID: index + 1,
        key: document_keys.DOCUMENT_NAME,
        label: "label.document_name",
        placeholder: "label.select_document_name",
        value: docs?.doc_name,
      },
      {
        cellID: index + 1,
        includeAllKeys: true,
        key: document_keys.DOCUMENT_TYPE,
        label: "label.document_type",
        placeholder: "label.select_document_type",
        isDropdown: true,
        labelField: "label",
        valueField: "value",
        options: DOCUMENT_TYPE,
        value: docs?.doc_type,
      },
      {
        ...idObject,
        cellID: index + 1,
        key: document_keys.NUMBER_OF_COPIES,
        label: "label.no_of_copies",
        placeholder: "label.select_no_of_copies",
        value: docs?.no_of_photocopies,
        isNumeric: true,
      },
      {
        cellID: index + 1,
        isButton: true,
        isAdd: data.length - 1 === index,
      },
    ];
  });

  return newDocsArray.flat();
};

export const getDocumentField = () => {
  return [
    {
      cellID: 1,
      key: document_keys.DOCUMENT_NAME,
      label: "label.document_name",
      placeholder: "label.select_document_name",
      value: "",
    },
    {
      cellID: 1,
      includeAllKeys: true,
      key: document_keys.DOCUMENT_TYPE,
      label: "label.document_type",
      placeholder: "label.select_document_type",
      isDropdown: true,
      labelField: "label",
      valueField: "value",
      options: DOCUMENT_TYPE,
      value: "",
    },
    {
      cellID: 1,
      key: document_keys.NUMBER_OF_COPIES,
      label: "label.no_of_copies",
      placeholder: "label.select_no_of_copies",
      value: "",
      isNumeric: true,
    },
    {
      cellID: 1,
      isButton: true,
      isAdd: true,
    },
  ];
};

export const mapPostingDetailsToUI = (data) => {
  if (!data.length) {
    return getPlaceOfPostingDetails();
  }
  const newDocsArray = data.map((docs, index) => {
    const location = Object.keys(docs)[0];
    const details = docs[location];
    return [
      {
        cellID: index + 1,
        key: "place_of_posting",
        label: "label.place_of_posting",
        placeholder: "label.select_place_of_posting",
        value: location,
      },
      {
        cellID: index + 1,
        key: "general",
        label: "label.general",
        placeholder: "label.general",
        value: details.general,
        isNumeric: true,
      },
      {
        cellID: index + 1,
        key: "obc",
        label: "label.obc",
        placeholder: "label.obc",
        value: details.obc,
        isNumeric: true,
      },
      {
        cellID: index + 1,
        key: "sc",
        label: "label.sc",
        placeholder: "label.sc",
        value: details.sc,
        isNumeric: true,
      },
      {
        cellID: index + 1,
        key: "st",
        label: "label.st",
        placeholder: "label.st",
        value: details.st,
        isNumeric: true,
      },
      {
        cellID: index + 1,
        key: "ph",
        label: "label.ph",
        placeholder: "label.ph",
        value: details.ph,
        isNumeric: true,
      },
      {
        cellID: index + 1,
        key: "others",
        label: "label.others",
        placeholder: "label.others",
        value: details.others,
        isNumeric: true,
      },
      {
        cellID: index + 1,
        key: "total",
        label: "label.total",
        placeholder: "label.total",
        value: details.total,
        isNumeric: true,
      },
      {
        cellID: index + 1,
        isButton: true,
        isAdd: data.length - 1 === index,
      },
    ];
  });

  return newDocsArray.flat();
};

export const getPlaceOfPostingDetails = () => {
  return [
    {
      cellID: 1,
      key: "place_of_posting",
      label: "label.place_of_posting",
      placeholder: "label.select_place_of_posting",
      value: "",
    },
    {
      cellID: 1,
      key: "general",
      label: "label.general",
      placeholder: "label.general",
      value: "",
      isNumeric: true,
    },
    {
      cellID: 1,
      key: "obc",
      label: "label.obc",
      placeholder: "label.obc",
      value: "",
      isNumeric: true,
    },
    {
      cellID: 1,
      key: "sc",
      label: "label.sc",
      placeholder: "label.sc",
      value: "",
      isNumeric: true,
    },
    {
      cellID: 1,
      key: "st",
      label: "label.st",
      placeholder: "label.st",
      value: "",
      isNumeric: true,
    },
    {
      cellID: 1,
      key: "ph",
      label: "label.ph",
      placeholder: "label.ph",
      value: "",
      isNumeric: true,
    },
    {
      cellID: 1,
      key: "others",
      label: "label.others",
      placeholder: "label.others",
      value: "",
      isNumeric: true,
    },
    {
      cellID: 1,
      key: "total",
      label: "label.total",
      placeholder: "label.total",
      value: "",
      isNumeric: true,
    },
    {
      cellID: 1,
      isButton: true,
      isAdd: true,
    },
  ];
};

const mapPostingDetailsToPayload = (fieldsArray) => {
  const postingDetails = [];

  const groupedByCellID = fieldsArray?.posting_details?.reduce((acc, field) => {
    if (!acc[field.cellID]) {
      acc[field.cellID] = {};
    }
    acc[field.cellID][field.key] = field.value;
    return acc;
  }, {});

  Object.values(groupedByCellID).forEach((group) => {
    const detail = {};
    const placeOfPosting = group.place_of_posting;
    detail[placeOfPosting] = {
      general: parseInt(group.general, 10) || 0,
      obc: parseInt(group.obc, 10) || 0,
      sc: parseInt(group.sc, 10) || 0,
      st: parseInt(group.st, 10) || 0,
      ph: parseInt(group.ph, 10) || 0,
      others: parseInt(group.others, 10) || 0,
      total: parseInt(group.total, 10) || 0,
    };
    postingDetails.push(detail);
  });

  return { posting_details: postingDetails };
};

export const mapDataToPayload = (data, currentModule) => {
  const overSeasProps =
    currentModule === "overseas"
      ? {
          job_type: data?.job_type,
          flexi_hours: data?.flexi_hours === 0 ? "yes" : "no",
          work_exp_range_id: data?.work_exp_range_id,
        }
      : {};

  const bond_details_paylaod =
    data?.bond_details?.is_bond_included === 0
      ? {
          bond_period_in_mm: data?.bond_details?.bond_period_in_mm,
          exit_amount: data?.bond_details?.exit_amount,
        }
      : {};
  const payload = {
    designation: data?.designation,
    compensation: data?.compensation,
    starting_salary: data?.starting_salary,
    role_responsibility: data?.role_responsibility,
    ctc_details: data?.ctc_details,
    monthly: {},
    yearly: {},
    ...mapPostingDetailsToPayload(data),
    required_docs: [],
    bond_details: {
      is_bond_included:
        data?.bond_details?.is_bond_included === 0 ? "yes" : "no",
      ...bond_details_paylaod,
    },
    specific_performa_required:
      data?.specific_performa_required === 0 ? "yes" : "no",
    other_details: data?.otherInfo,
    ...overSeasProps,
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

  const docsByCellID = data.required_docs.reduce((acc, item) => {
    const cellID = item.cellID;
    if (!acc[cellID]) {
      acc[cellID] = {};
    }
    if (item.key === "document_name") {
      acc[cellID].doc_name = item.value;
    } else if (item.key === "document_type") {
      acc[cellID].doc_type = item.value;
    } else if (item.key === "no_of_copies") {
      acc[cellID].no_of_photocopies = parseInt(item.value, 10);
    }
    if (!!item.id) {
      acc[cellID].id = item?.id;
    }
    return acc;
  }, {});

  payload.required_docs = Object.values(docsByCellID);

  return payload;
};
