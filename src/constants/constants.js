export const API_URL = "https://api.cmib.cloudzmall.com/api/";

export const numRegex = /^\d+$/;
export const urlRegex =
  /(?:https?:\/\/)?(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b(?:[-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

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

export const SALUTATION_OPTIONS = [
  { label: "Mr.", value: "Mr." },
  { label: "Ms.", value: "Ms." },
  { label: "Dr.", value: "Dr." },
];

export const COMPANY_TYPE_OPTIONS = [
  { label: "Exempt", value: "exempt" },
  { label: "Nil Rated", value: "nil rated" },
  { label: "Bill of Supply", value: "bill of supply" },
  { label: "Export", value: "export" },
  { label: "SEZ", value: "sez" },
  { label: "Deemed Export", value: "deemed export" },
  { label: "Taxable", value: "taxan;e" },
];

export const NATURE_OF_SUPPLIER = [
  { label: "Registered", value: "registered" },
  { label: "Unregistered", value: "unregistered" },
  { label: "Composition Supplier", value: "composition supplier" },
  { label: "UIN Holder", value: "UIN holder" },
];

export const INTEREST_OPTIONS = [
  { messageId: "label.email_from_cpaib", isSelected: false, id: 1 },
  { messageId: "label.campus", isSelected: false, id: 2 },
  { messageId: "label.programme_brouchers", isSelected: false, id: 3 },
  { messageId: "label.based_on_prev_participation", isSelected: false, id: 4 },
  { messageId: "label.telephonic_call_from_icai", isSelected: false, id: 5 },
  { messageId: "label.advertisement_in_ca_journal", isSelected: false, id: 6 },
];

export const MODULE_OPTIONS = [
  {
    id: "ca-jobs",
    messageId: "label.ca_jobs",
  },
  {
    id: "newly-qualified-ca-placement",
    messageId: "label.newly_qualified_ca",
  },
  {
    id: "overseas-placements",
    messageId: "label.overseas_placements",
  },
  {
    id: "career-ascents",
    messageId: "label.career_ascents",
  },
  {
    id: "women-placement",
    messageId: "label.women_placements",
  },
];
