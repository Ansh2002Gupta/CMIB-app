import colors from "../assets/colors";

export const API_URL = "https://api.cmib.cloudzmall.com/api/";
export const VALID_EMAIL = "Not a valid email, Please enter again";
export const VALID_OTP = "Not a valid otp, please enter again";
export const VALID_PAN = "Not a valid PAN, Please enter again";
export const VALID_GSTIN = "Not a valid GSTIN, Please enter again";

export const numRegex = /^\d+$/;
export const alphaNumericRegex = /^[a-zA-Z0-9]+$/;
export const urlRegex =
  /^(?:https?:\/\/)?www\.[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b(?:[-a-zA-Z0-9@:%_\+.~#?&=]*)/;

export const TOAST_TIMEOUT = 5000;
export const API_VERSION_NUMBER = "1.0.0";
export const FIELD_MIN_LENGTH = 6;
export const DEFAULT_INPUT_MAX_LENGTH = 100;
export const CODE_MIN_LENGTH = 2;
export const CODE_MAX_LENGTH = 8;
export const NUMBER_MIN_LENGTH = 7;
export const NUMBER_MAX_LENGTH = 15;
export const NUMBER_OF_PARTNERS_LENGTH = 3;
export const MOBILE_NUMBER_MIN_LENGTH = 4;
export const MOBILE_NUMBER_MAX_LENGTH = 13;
export const MESSAGE_MAX_LENGTH = 5000;
export const FIRM_REGISTRATION_NO_LENGTH = 30;
export const ADDRESS_MAX_LENGTH = 500;
export const SCHEDULE_INTERVIEW_ADDRESS_MAX_LENGTH = 250;
export const COMPANY_DETAIL_MAX_LENGTH = 2000;
export const FILE_MAX_SIZE = 5000000;
export const VIDEO_MAX_SIZE = 50000000;
export const CA_JOBS = "ca-jobs";
export const NEWLY_QUALIFIED = "nqca-placements";
export const OVERSEAS_PLACEMENTS = "overseas-chapters";
export const CAREER_ASCENTS = "career-ascents";
export const WOMENT_PLACEMENT = "women-placements";
export const FIRM_OF_CHARTERED_ACCOUNTANTS = "Firm of chartered accountants";
export const MIN_ZOOM_SCALE = 1;
export const MAX_ZOOM_SCALE = 3;
export const DEFAULT_BALANCE_CREDIT = 0;
export const GSTIN_MAX_LENGTH = 15;
export const PAN_MAX_LENGTH = 10;
export const COMPANY = "company";
export const Candidate = "Candidate";
export const Company = "Company";

export const OTP_TRY_COUNT = 5;
export const OTP_TIMER_SECOND = 0;
export const OTP_TIMER_MIN_MINUTES = 1;
export const OTP_TIMER_MAX_MINUTES = 15;
export const DEBOUNCE_TIME = 300;
export const PREVIOUS_SCREEN = -1;
export const DOTS = "...";
export const ANONYMOUS = "Anonymous";
export const USER_TYPE_CANDIDATE = "candidate";
export const EDIT = "edit";
export const HYPHEN = "-";

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
  { label: "Taxable", value: "taxable" },
];

export const NATURE_OF_SUPPLIER = [
  { label: "Registered", value: "Registered" },
  { label: "Unregistered", value: "Unregistered" },
  { label: "Composition Supplier", value: "Composition Supplier" },
  { label: "UIN Holder", value: "UIN Holder" },
];

export const INTEREST_OPTIONS = [
  { messageId: "label.email_from_cmib", isSelected: false, id: 1 },
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
  { value: 20, label: "20" },
  { value: 30, label: "30" },
  { value: 40, label: "40" },
];

export const TICKET_TABLE_HEADING = {
  readable_id: "Ticket ID",
  query_type: "Query Type",
  status: "Status",
  assigned_to: {
    id: "",
    name: "Assigned To",
  },
  created_at: "Created On",
};
export const POSTED_JOB_LISTING = {
  job_id: "Job ID",
  designation: "Designation",
  status: "Active / Inactive",
  number_of_interviews: "Scheduled Interview",
  number_of_applications: "Applicants",
  approve: "Approved/Not Approved by Admin",
};
export const APPLICANT_LISTING = {
  name: "Applicant Name",
  applicant_id: "Applicant ID",
  status: "Status",
};
export const SCHEDULE_LISTING = {
  name: "Applicant Name",
  applicant_id: "Applicant ID",
  type: "Interview Type",
  primary_interview_date: "Primary Interview Date",
  primary_interview_time: "Primary Interview Time",
  status: "Status",
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
    id: 4,
    image: "iconConsent",
    subTitle: "label.consent_marking_management_description",
  },
  {
    title: "label.campus_interview_management",
    id: 5,
    image: "iconCampus",
    subTitle: "label.campus_interview_management_description",
  },
];

export const ADD_APPLICATION_STEPPER = [
  {
    id: 1,
    title: "label.personal_details",
  },
  {
    id: 2,
    title: "label.educational_details",
  },
  {
    id: 3,
    title: "label.training_details",
  },
  {
    id: 4,
    title: "label.work_experience",
  },
  {
    id: 5,
    title: "label.hobbies_achievements",
  },
  {
    id: 6,
    title: "label.job_preference",
  },
  {
    id: 7,
    title: "label.payment",
  },
];

export const EDUCATIONAL_DETAIL_TABS = [
  {
    id: 1,
    title: "label.educational_details",
  },
  {
    id: 2,
    title: "label.exams",
  },
  {
    id: 3,
    title: "label.other_courses",
  },
];

export const GENDER = [
  {
    label: "Male",
    value: "MALE",
  },
  {
    label: "Female",
    value: "FEMALE",
  },
  {
    label: "Others",
    value: "OTHERS",
  },
];

export const MARITAL_STATUS = [
  {
    label: "Married",
    value: "Married",
  },
  {
    label: "Single",
    value: "Single",
  },
];
export const MONTHS = [
  {
    label: "January",
    value: "January",
  },
  {
    label: "February",
    value: "February",
  },
  {
    label: "March",
    value: "March",
  },
  {
    label: "April",
    value: "April",
  },
  {
    label: "May",
    value: "May",
  },
  {
    label: "June",
    value: "June",
  },
  {
    label: "July",
    value: "July",
  },
  {
    label: "August",
    value: "August",
  },
  {
    label: "September",
    value: "September",
  },
  {
    label: "October",
    value: "October",
  },
  {
    label: "November",
    value: "November",
  },
  {
    label: "December",
    value: "December",
  },
];

export const ATTEMPTS = Array.from({ length: 30 }, (_, x) => ({
  label: `${x + 1}`,
  value: `${x + 1}`,
}));

export const YEARS = Array.from({ length: 30 }, (_, x) => ({
  label: `${x + 1995}`,
  value: `${x + 1995}`,
}));

export const Education_Status_Options = [
  {
    label: "Regular",
    value: "regular",
  },
  {
    label: "Correspondence",
    value: "correspondence",
  },
];

export const BOOLEAN_OPTION = [
  {
    label: "Yes",
    value: true,
  },
  {
    label: "No",
    value: false,
  },
];
export const COLOR = [
  "#000000",
  "#e60000",
  "#ff9900",
  "#ffff00",
  "#008a00",
  "#0066cc",
  "#9933ff",
  "#ffffff",
  "#facccc",
  "#ffebcc",
  "#ffffcc",
  "#cce8cc",
  "#cce0f5",
  "#ebd6ff",
  "#bbbbbb",
  "#f06666",
  "#ffc266",
  "#ffff66",
  "#66b966",
  "#66a3e0",
  "#c285ff",
  "#888888",
  "#a10000",
  "#b26b00",
  "#b2b200",
  "#006100",
  "#0047b2",
  "#6b24b2",
  "#444444",
  "#5c0000",
  "#663d00",
  "#666600",
  "#003700",
  "#002966",
  "#3d1466",
  "custom-color",
];

export const SIZE = ["small", false, "large", "huge"];

export const FORMAT = [
  "header",
  "height",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "color",
  "bullet",
  "indent",
  "link",
  "image",
  "align",
  "size",
];
export const TEXT_FORMATS = [
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
];
export const LIST_TYPE = [{ list: "ordered" }, { list: "bullet" }];
export const ATTACHMENT_TYPE = ["link", "image"];
export const LIST_OPTION = [
  { list: "ordered" },
  { list: "bullet" },
  { indent: "-1" },
  { indent: "+1" },
  { align: [] },
];

export const color = [
  "#000000",
  "#e60000",
  "#ff9900",
  "#ffff00",
  "#008a00",
  "#0066cc",
  "#9933ff",
  "#ffffff",
  "#facccc",
  "#ffebcc",
  "#ffffcc",
  "#cce8cc",
  "#cce0f5",
  "#ebd6ff",
  "#bbbbbb",
  "#f06666",
  "#ffc266",
  "#ffff66",
  "#66b966",
  "#66a3e0",
  "#c285ff",
  "#888888",
  "#a10000",
  "#b26b00",
  "#b2b200",
  "#006100",
  "#0047b2",
  "#6b24b2",
  "#444444",
  "#5c0000",
  "#663d00",
  "#666600",
  "#003700",
  "#002966",
  "#3d1466",
  "custom-color",
];

export const size = ["small", false, "large", "huge"];

export const format = [
  "header",
  "height",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "color",
  "bullet",
  "indent",
  "link",
  "image",
  "align",
  "size",
];
export const textFormats = [
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
];
export const listType = [{ list: "ordered" }, { list: "bullet" }];
export const attachmentType = ["link", "image"];
export const listOptions = [
  { list: "ordered" },
  { list: "bullet" },
  { indent: "-1" },
  { indent: "+1" },
  { align: [] },
];
export const questionaireType = [
  {
    value: "label.text_question",
    label: "label.text_question",
  },
  {
    value: "label.single_select",
    label: "label.single_select",
  },
  {
    value: "label.multiple_select",
    label: "label.multiple_select",
  },
];
export const jobType = {
  SPECIALLY_ABLE: "For Specially Abled Persons",
  CONTRACTUAL: "Contractual",
  REGULAR: "Regular",
  RETIRED: "For Retired Persons",
};
export const questionType = {
  "Text Question": "text",
  "Single-select": "single-select",
  "Multi-select": "multi-select",
};
export const progressData = {
  0: {
    backgroundColor: colors.greyOne,
    text: "Form In Progress...",
    textColor: colors.black,
  },
  1: {
    backgroundColor: colors.skyBlueLight,
    text: "Form Half Filled...",
    textColor: colors.skyBlueDark,
  },
  2: {
    backgroundColor: colors.lightPurple,
    text: "Form Almost Done!",
    textColor: colors.darkPurple,
  },
  3: {
    backgroundColor: colors.lightGreen,
    text: "Form Complete!",
    textColor: colors.darkSecondGreen,
  },
};
export const JOB_SEEKERS_TABLE_HEADING = {
  company_name: "Company Name",
  candidate_id: "Candidate ID",
  total_experience: "Total Experience",
  functional_area: "Functional Area",
};
export const JOB_STATUS_RESPONSE_CODE = {
  "Shortlist Candidate": 3,
  "Reject Candidate": 2,
  "Offer Job": 6,
  "Reject After Interview": 2,
  "Offer Accepted": 7,
  "Offer Rejected": 8,
  "Job Not Offered": 9,
};

export const RADIO_BUTTON_OPTIONS = ["Yes", "No"];
export const GET_INTERVIEW_TYPE = {
  "Face-To-Face": 0,
  Telephonic: 1,
  Remote: 2,
};
