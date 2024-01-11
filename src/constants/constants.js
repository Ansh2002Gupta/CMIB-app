export const API_URL = "https://api.cmib.cloudzmall.com/api/";
export const VALID_EMAIL = "Not a valid email, please enter again";
export const VALID_OTP = "Not a valid otp, please enter again";

export const numRegex = /^\d+$/;
export const urlRegex =
  /(?:https?:\/\/)?(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b(?:[-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

export const TOAST_TIMEOUT = 5000;
export const API_VERSION_NUMBER = "v1";
export const FIELD_MIN_LENGTH = 6;
export const FIELD_MAX_LENGTH = 255;
export const CODE_MIN_LENGTH = 2;
export const CODE_MAX_LENGTH = 8;
export const NUMBER_MIN_LENGTH = 7;
export const NUMBER_MAX_LENGTH = 15;
export const REGISTRATION_NO_LENGTH = 10;
export const ADDRESS_MAX_LENGTH = 500;
export const COMPANY_DETAIL_MAX_LENGTH = 100;
export const IMAGE_MAX_SIZE = 5000000;
export const CA_JOBS = "ca-jobs";
export const NEWLY_QUALIFIED = "nqca-placement";
export const OVERSEAS_PLACEMENTS = "overseas-placement";
export const CAREER_ASCENTS = "career-ascent";
export const WOMENT_PLACEMENT = "women-placement";

export const OTP_TRY_COUNT = 5;
export const OTP_TIMER_SECOND = 0;
export const OTP_TIMER_MIN_MINUTES = 1;
export const OTP_TIMER_MAX_MINUTES = 15;
export const DEBOUNCE_TIME = 300;
export const PREVIOUS_SCREEN = -1;
export const DOTS = "...";

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
    id: "nqca-placement",
    messageId: "label.newly_qualified_ca",
  },
  {
    id: "overseas-placement",
    messageId: "label.overseas_placements",
  },
  {
    id: "career-ascent",
    messageId: "label.career_ascents",
  },
  {
    id: "women-placement",
    messageId: "label.women_placements",
  },
];

export const COLOR_MODES = ["light", "dark"];
export const ROUND_ONE_CARD = [
  {
    title: "label.add_application_form_text",
    id: 1,
    image: "iconAddApplicationForm",
    subTitle: "label.add_application_form_description_text",
  },
  {
    title: "label.hiring_process_text",
    id: 2,
    image: "iconHiringProcess",
    subTitle: "label.hiring_process_description",
  },
  {
    title: "label.download_details_text",
    id: 3,
    image: "iconDownloadDetails",
    subTitle: "label.download_details_description",
  },
];

export const VALIDATION_TYPE = [
  { key: "length", id: "label.char_length_validation" },
  { key: "numeric", id: "label.numeric_char_validation" },
  { key: "uppercase", id: "label.upper_case_validation" },
  { key: "lowercase", id: "label.lower_case_validation" },
  { key: "specialChar", id: "label.special_char_validation" },
];

export const REDIRECT_URL = "redirectUrl";

export const STEPPER_STATE = {
  ACTIVE: "active",
  DONE: "done",
  INACTIVE: "inActive",
};

export const SIGN_UP_STEPPER_OPTION = [
  {
    title: "label.welcome_to_sign_up",
  },
  {
    title: "label.basic_details",
  },
  {
    title: "label.contact_personal_details",
  },
  {
    title: "label.other_details",
  },
];

export const ZOOM_CONSTANT = {
  MAX_ZOOM: 3,
  MIN_ZOOM: 1,
  ZOOM_STEP: 0.1,
};

export const SCREEN_NAMES = {
  COMPANY_PROFILE: "label.company_profile",
  VIEW_PROFILE: "label.view_profile",
  PROFILE: "label.my_account",
  ROUND_ONE: "label.round1",
  ROUND_ONE_APPLICATION_FORM: "label.add_application_form",
};

export const APPLICATION_FORM_STEPPER_OPTIONS = [
  {
    title: "label.company_profile",
  },
  {
    title: "label.job_details",
  },
  {
    title: "label.pre_interview_preferences",
  },
  {
    title: "label.centre_details",
  },
  {
    title: "label.payment",
  },
];

export const ROWSLIMIT = [
  { value: 10, label: "10" },
  { value: 15, label: "15" },
  { value: 20, label: "20" },
];

export const TABLE_HEADING = {
  id: "Ticket ID",
  query_type: "Query Type",
  status: "Status",
  assigned_to: "Assigned To",
  created_at: "Created On",
};
