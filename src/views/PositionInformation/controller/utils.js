import dayjs from "dayjs";
import {
  DOCUMENT_TYPE_KEYS,
  INTERVIEW_TYPE,
} from "../../../constants/constants";
import { capitalize } from "../../../utils/util";

export const keys = {
  noOfPosition: "noOfPosition",
  compensation: "compensation",
  startingSalaryIncludingPerks: "startingSalaryIncludingPerks",
  roleAndResponsibility: "roleAndResponsibility",
  detailsOfCTC: "detailsOfCTC",
  bondRequired: "bondRequired",
  monthsBondPeriod: "monthsBondPeriod",
  exitAmount: "exitAmount",
  interviewDates: "interviewDates",
  companyAvailablity: "companyAvailablity",
};

export const formatYearlyData = (data = {}, intl) => {
  return [
    {
      label: intl.formatMessage({ id: "label.totalGrossSalary" }),
      amount: data?.yearly_one_time_payment
        ? `${data?.yearly_one_time_payment} INR`
        : "-",
    },
    {
      label: intl.formatMessage({ id: "label.oneTimePayment" }),
      amount: data?.yearly_total_gross_salary
        ? `${data?.yearly_total_gross_salary} INR`
        : "-",
    },
    {
      label: intl.formatMessage({ id: "label.ctc" }),
      amount: data?.yearly_ctc ? `${data?.yearly_ctc} INR` : "-",
      highlight: true,
    },
  ];
};

export const formatMonthlyData = (data = {}, intl) => {
  return [
    {
      label: intl.formatMessage({ id: "label.basic" }),
      amount: data?.monthly_basic ? `${data?.monthly_basic} INR` : "-",
    },
    {
      label: intl.formatMessage({ id: "label.hra" }),
      amount: data?.monthly_hra ? `${data?.monthly_hra} INR` : "-",
    },
    {
      label: intl.formatMessage({ id: "label.others" }),
      amount: data?.monthly_other ? `${data?.monthly_other} INR` : "-",
    },
    {
      label: intl.formatMessage({ id: "label.gross_Salary" }),
      amount: data?.monthly_gross_salary
        ? `${data?.monthly_gross_salary} INR`
        : "-",
    },
    {
      label: intl.formatMessage({ id: "label.fixedPay" }),
      amount: data?.monthly_fixed_pay ? `${data?.monthly_fixed_pay} INR` : "-",
    },
    {
      label: intl.formatMessage({ id: "label.variablePay" }),
      amount: data?.monthly_variable_pay
        ? `${data?.monthly_variable_pay} INR`
        : "-",
    },
    {
      label: intl.formatMessage({ id: "label.semiVariable" }),
      amount: data?.monthly_semi_variable
        ? `${data?.monthly_semi_variable} INR`
        : "-",
    },
    {
      label: intl.formatMessage({ id: "label.takeHome" }),
      amount: data?.monthly_take_home ? `${data?.monthly_take_home} INR` : "-",
      highlight: true,
    },
  ];
};

export const formatPostingAndVaccanyData = (data, intl) => {
  return Object.keys(data).map((key) => {
    return {
      placeOfPosting: key,
      general: data[key]?.general ?? "-",
      obc: data[key]?.obc ?? "-",
      sc: data[key]?.sc ?? "-",
      st: data[key]?.st ?? "-",
      ph: data[key]?.ph ?? "-",
      others: data[key]?.others ?? "-",
      total: data[key]?.total ?? "-",
    };
  });
};
export const dummy = [
  {
    designation: "Assistant Finance Manager",
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
    selection_process: ["A", "B"],
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
    other_benefits: [
      {
        id: 1,
        name: "Meals and Snacks",
        amount: 5000,
      },
      {
        id: 2,
        name: "Parental",
        amount: 5000,
      },
    ],
    other_details: {
      company_ppt: "yes",
      file_path: "<path.ext>",
    },
  },
  {
    designation: "Assistant Finance Manager",
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
    selection_process: ["A", "B"],
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
    other_benefits: [
      {
        id: 1,
        name: "Meals and Snacks",
        amount: 5000,
      },
      {
        id: 2,
        name: "Parental",
        amount: 5000,
      },
    ],
    other_details: {
      company_ppt: "yes",
      file_path: "<path.ext>",
    },
  },
];

export const formatPositionDetail = (data) => {
  return {
    [keys.noOfPosition]: String(data?.no_of_vacancy) ?? "",
    [keys.compensation]: data?.compensation ?? "",
    [keys.startingSalaryIncludingPerks]: data?.starting_salary ?? "",
    [keys.roleAndResponsibility]: data?.role_responsibility ?? "",
    [keys.detailsOfCTC]: data?.ctc_details ?? "",
  };
};

export const formatBondDetail = (data) => {
  return {
    [keys.bondRequired]: capitalize(data?.is_bond_included) ?? "",
    [keys.monthsBondPeriod]: data?.bond_period_in_mm ?? "",
    [keys.exitAmount]: data?.exit_amount ?? "",
  };
};

export const formatInterviewDetails = (data) => {
  return {
    [keys.interviewDates]: data?.interview_dates?.map((item) =>
      item?.schedule_date
        ? dayjs(item?.schedule_date).format("DD/MM/YYYY")
        : "-"
    ),
    [keys.companyAvailablity]: INTERVIEW_TYPE[data?.interview_type] ?? "",
  };
};

export const addValueOnField = ({ state, details }) => {
  return details.map((row) => {
    return row.map((item) => {
      const { key, isEmptyView } = item;
      if (isEmptyView) return { ...item };

      return {
        ...item,
        value: state[key] ? state[key] : "--",
      };
    });
  });
};

export const addValueOnInterviewField = ({ state, details }) => {
  return details.map((item) => {
    const { key, isEmptyView } = item;
    if (isEmptyView) return { ...item };

    return {
      ...item,
      value: state[key] ? state[key] : "--",
    };
  });
};

export const getRequiredDocs = (data) => {
  return data?.map((item) => {
    return { ...item, doc_type: DOCUMENT_TYPE_KEYS[item.doc_type] ?? "-" };
  });
};
