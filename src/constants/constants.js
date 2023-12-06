export const API_URL = "https://api.cmib.cloudzmall.com/api/";

export const numRegex = /^\d+$/;

export const API_STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

export const STATUS_CODES = {
  SUCCESS_STATUS: 200,
  NOT_FOUND: 404,
  UNAUTHORIZED_USER: 401,
};

export const ENTITY_OPTIONS = [
  { label: "Corporate", value: "corporate" },
  { label: "Non-Corporate", value: "non-corporate" },
  {
    label: "Firm of Chartered Accountants",
    value: "firm of chartered accountants",
  },
];

export const CURRENT_INDUSTRY_OPTIONS = [
  { label: "Diversified", value: "1" },
  { label: "Information Technology", value: "2" },
  { label: "BPO", value: "3" },
  { label: "Financial Services", value: "4" },
  { label: "Service Industry", value: "5" },
  { label: "Trading", value: "6" },
  { label: "Manufacturing", value: "7" },
  { label: "Infrastructure", value: "8" },
  { label: "Construction", value: "9" },
  { label: "Firm of Chartered Accountants", value: "10" },
];

export const SALUTATION_OPTIONS = [
  { label: "Mr.", value: "1" },
  { label: "Ms", value: "2" },
  { label: "Dr.", value: "3" },
];

export const COMPANY_TYPE_OPTIONS = [
  { label: "Exempt", value: "1" },
  { label: "Nil Rated", value: "2" },
  { label: "Bill of Supply", value: "3" },
  { label: "Export", value: "4" },
  { label: "SEZ", value: "5" },
  { label: "Deemed Export", value: "6" },
  { label: "Taxable", value: "7" },
];

export const NATURE_OF_SUPPLIER = [
  { label: "Registered", value: "registered" },
  { label: "Unregistered", value: "unregistered" },
  { label: "Composition Supplier", value: "composition supplier" },
  { label: "UIN Holder", value: "UIN holder" },
];
