export const API_URL = "https://api.cmib.cloudzmall.com/api/";
export const VALID_EMAIL = "Not a valid email, Please enter again";
export const VALID_OTP = "Not a valid otp, please enter again";

export const numRegex = /^\d+$/;
export const urlRegex =
  /^(?:https?:\/\/)?www\.[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b(?:[-a-zA-Z0-9@:%_\+.~#?&=]*)/;

export const TOAST_TIMEOUT = 5000;
export const API_VERSION_NUMBER = "v1";
export const FIELD_MIN_LENGTH = 6;
export const DEFAULT_INPUT_MAX_LENGTH = 100;
export const CODE_MIN_LENGTH = 2;
export const CODE_MAX_LENGTH = 8;
export const NUMBER_MIN_LENGTH = 7;
export const NUMBER_MAX_LENGTH = 15;
export const MOBILE_NUMBER_MIN_LENGTH = 4;
export const MOBILE_NUMBER_MAX_LENGTH = 13;
export const REGISTRATION_NO_LENGTH = 10;
export const ADDRESS_MAX_LENGTH = 500;
export const COMPANY_DETAIL_MAX_LENGTH = 2000;
export const IMAGE_MAX_SIZE = 5000000;
export const CA_JOBS = "ca-jobs";
export const NEWLY_QUALIFIED = "nqca-placements";
export const OVERSEAS_PLACEMENTS = "overseas-chapters";
export const CAREER_ASCENTS = "career-ascents";
export const WOMENT_PLACEMENT = "women-placements";
export const FIRM_OF_CHARTERED_ACCOUNTANTS = "Firm of chartered accountants";

export const OTP_TRY_COUNT = 5;
export const OTP_TIMER_SECOND = 0;
export const OTP_TIMER_MIN_MINUTES = 1;
export const OTP_TIMER_MAX_MINUTES = 15;
export const DEBOUNCE_TIME = 300;
export const PREVIOUS_SCREEN = -1;
export const DOTS = "...";
export const ANONYMOUS = "Anonymous";

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
  { label: "Corporate", value: "Corporate" },
  { label: "Non-Corporate", value: "Non-corporate" },
  {
    label: "Firm of Chartered Accountants",
    value: "Firm of chartered accountants",
  },
  { label: "PSU", value: "PSU" },
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
  { label: "Registered", value: "Registered" },
  { label: "Unregistered", value: "Unregistered" },
  { label: "Composition Supplier", value: "Composition Supplier" },
  { label: "UIN Holder", value: "UIN Holder" },
];

export const INTEREST_OPTIONS = [
  { messageId: "label.email_from_cpaib", isSelected: false, id: 1 },
  { messageId: "label.campus", isSelected: false, id: 2 },
  { messageId: "label.programme_brouchers", isSelected: false, id: 3 },
  { messageId: "label.based_on_prev_participation", isSelected: false, id: 4 },
  { messageId: "label.telephonic_call_from_icai", isSelected: false, id: 5 },
  { messageId: "label.advertisement_in_ca_journal", isSelected: false, id: 6 },
];

export const SELECTION_PROCESS = [
  { messageId: "label.group_discussion", isSelected: false, id: 1 },
  { messageId: "label.psychometric_test", isSelected: false, id: 2 },
  { messageId: "label.personal_interview", isSelected: false, id: 3 },
];

export const MODULE_OPTIONS = [
  {
    id: CA_JOBS,
    messageId: "label.ca_jobs",
  },
  {
    id: NEWLY_QUALIFIED,
    messageId: "label.newly_qualified_ca",
  },
  {
    id: OVERSEAS_PLACEMENTS,
    messageId: "label.overseas_placements",
  },
  {
    id: CAREER_ASCENTS,
    messageId: "label.career_ascents",
  },
  {
    id: WOMENT_PLACEMENT,
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

export const ROWS_PER_PAGE_ARRAY = [
  { value: 10, label: "10" },
  { value: 15, label: "15" },
  { value: 20, label: "20" },
];

export const TICKET_TABLE_HEADING = {
  id: "Ticket ID",
  query_type: "Query Type",
  status: "Status",
  assigned_to: "Assigned To",
  created_at: "Created On",
};

export const FEEDBACK_TABLE_HEADING = {
  id: "Feedback ID",
  status: "Status",
  created_at: "Created On",
};

export const CANDIDATE_ROUND_ONE_CARDS = [
  {
    title: "label.application",
    id: 1,
    image: "iconApplication",
    subTitle: "label.application_description",
  },
  {
    title: "label.download_id",
    id: 2,
    image: "iconDownload",
    subTitle: "label.download_id_description",
  },
  {
    title: "label.centre_wise_company_detail",
    id: 3,
    image: "iconDiscover",
    subTitle: "label.centre_wise_company_detail_description",
  },
  {
    title: "label.consent_marking_management",
    id: 3,
    image: "iconConsent",
    subTitle: "label.consent_marking_management_description",
  },
  {
    title: "label.campus_interview_management",
    id: 3,
    image: "iconCampus",
    subTitle: "label.campus_interview_management_description",
  },
];
