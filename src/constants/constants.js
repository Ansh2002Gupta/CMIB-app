import colors from "../assets/colors";

export const API_URL = "https://api.cmib.cloudzmall.com/api/";
export const VALID_EMAIL = "Not a valid email, Please enter again";
export const VALID_OTP = "Not a valid otp, please enter again";
export const VALID_PAN = "Not a valid PAN, Please enter again";
export const VALID_TAN = "Not a valid TAN, Please enter again";
export const VALID_GSTIN = "Not a valid GSTIN, Please enter again";

export const numRegex = /^\d+$/;
export const alphaNumericRegex = /^[a-zA-Z0-9]+$/;
export const urlRegex =
  /^(?:https?:\/\/)?www\.[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b(?:[-a-zA-Z0-9@:%_\+.~#?&=]*)/;

export const TOAST_TIMEOUT = 5000;
export const API_VERSION_NUMBER = "1.0.0";
export const UPDATED_API_VERSION = "1.0.1";
export const API_VERSION_QUERY_PARAM = "api-version";
export const SESSION_ID_QUERY_PARAM = "session-id";
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
export const OTHER_INFO_MAX_LENGTH = 400;
export const SCHEDULE_INTERVIEW_ADDRESS_MAX_LENGTH = 250;
export const COMPANY_DETAIL_MAX_LENGTH = 2000;
export const FILE_MAX_SIZE = 5000000;
export const VIDEO_FILE_MAX_SIZE = 50000000;
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
export const SESSION_KEY = "sessionKey";

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
export const MINIMUM_EXPERIENCE_LIMIT = 0;
export const MAXIMUM_EXPERIENCE_LIMIT = 40;
export const MINIMUM_SALARY_LIMIT = 0;
export const MAXIMUM_SALARY_LIMIT = 100;
export const MINIMUM_FRESHNESS_LIMIT = 0;
export const MAXIMUM_FRESHNESS_LIMIT = 100;

export const POSTED_JOB_LISTING_ENUM = {
  activeorInactive: "Active/Inactive",
  approvedNotApproved: "Approved/NotApproved",
};

export const DEFAULT_CATEGORY_FOR_FILTER_MODAL = {
  AppliedJobs: "Work Mode",
  TicketListing: "Status",
  PostedJobs: "Active/Inactive",
  Feedback: "Status",
  GetSchedule: "Date",
};

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

export const getCompanyRoundCards = ({ is_filled }) => {
  return [
    {
      title: !is_filled
        ? "label.add_application_form_text"
        : "label.edit_application_form_text",
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
};

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

export const DOCUMENT_TYPE = [
  { label: "Photocopies", value: "photocopies" },
  { label: "Original", value: "original" },
  {
    label: "Both",
    value: "both",
  },
];

export const EXEPERIENCE_RANGE = [
  { label: "1-5", value: "1-5" },
  { label: "5-10", value: "5-10" },
  {
    label: "10-20",
    value: "10-20",
  },
  {
    label: "20 years and above",
    value: "20 years and above",
  },
];

export const JOB_TYPE = [
  { label: "WFH", value: "WFH" },
  { label: "Hybrid", value: "Hybrid" },
  {
    label: "On-Site",
    value: "On-Site",
  },
];

export const AREA_CODES = [
  { label: "+01", value: "+01" },
  { label: "+02", value: "+02" },
  {
    label: "+03",
    value: "+03",
  },
];

export const MOBILE_CODES = [
  { label: "+01", value: "+01" },
  { label: "+02", value: "+02" },
  {
    label: "+03",
    value: "+03",
  },
];

export const ADD_DOCUMENT = {
  BOTH: "Both",
  PHOTOCOPIES: "Photocopies",
  DOCUMENT_NAME: "documentName",
  DOCUMENT_TYPE: "documentType",
  COPIESNUMBER: "copiesNumber",
  ORIGINAL: "Original",
};

export const PLACE_OF_POSTING = {
  TOTAL: "total",
  POSTING_PLACE: "postingPlace",
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

export const document_keys = {
  DOCUMENT_NAME: "document_name",
  DOCUMENT_TYPE: "document_type",
  NUMBER_OF_COPIES: "no_of_copies",
};

export const HEAD_CONTACT = {
  DESIGNATION: "designation",
  NAME: "name",
  EMAIL: "email",
  MOBILE_COUNTRY_CODE: "mobile_country_code",
  MOBILE_NUMBER: "mobile_number",
  AREA_CODE: "std_country_code",
  TELEPHONE_NUMBER: "telephone_number",
};

export const document_keys_with_label = {
  "label.document_name": "documentName",
  "label.document_type": "documentType",
  "label.no_of_copies": "copiesNumber",
};

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
    title: "label.billing_info",
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

export const APPLIED_JOBS_TABLE_HEADING = {
  readable_id: "Job Id",
  company_name: "Company Name",
  designation: "Designation",
  vacancy: "Vacancies",
  status: "Status",
  active_status: "Active/Inactive",
  created_at: "Created On",
};

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
export const SHORTLISTING_TABLE_HEADING = (centerSelected) => {
  let additionalColumn;
  if (centerSelected == 3 || centerSelected == 4) {
    additionalColumn = {
      consent: "Consent Given",
    };
  } else if (centerSelected == 5) {
    additionalColumn = {
      test_result: "Written Test",
    };
  } else if (centerSelected == 6) {
    additionalColumn = {
      job_offered: "Offered",
    };
  } else if (centerSelected == 7) {
    additionalColumn = {
      offered_status: "Offer Status",
    };
  } else {
    additionalColumn = {};
  }

  return {
    application_number: "Registration Number",
    name: "Name",
    gender: "Gender",
    age: "Age",
    city: "City",
    country: "Country",
    ca_inter_rank: "CA Inter %",
    ca_final_rank: "CA Final %",
    ca_experience_rank: "Experience (Years)",
    rank: "Rank",
    category: "Category",
    expected_salary: "Expected Salary",
    ...additionalColumn,
  };
};

export const BILLING_INFO_HEADING_FOR_NQCA = (currentModule) => {
  const currentModules =
    currentModule === NEWLY_QUALIFIED
      ? {
          psychometric_test_fee: "Psychometric/ Written Test Fee",
        }
      : {};
  return {
    centre_name: "Centre Name",
    total_vacancies: "Vacany",
    interview_dates: "Interview Dates",
    amount: "Amount",
    ...currentModules,
  };
};

export const TRANSACTION_LIST_HEADING_FOR_NQCA = () => {
  return {
    txn_id: "Transaction ID",
    payment_type: "Offline/Online Transaction",
    created_at: "Payment Date & Time",
    payment_mode: "Payment Mode",
    payment_status: "Payment Status",
  };
};

export const FEEDBACK_TABLE_HEADING = {
  id: "Feedback ID",
  status: "Status",
  created_at: "Created On",
};

export const getCandidatesRoundCards = ({ hasRoundone }) => {
  return [
    {
      title: "label.application",
      id: 1,
      image: "iconApplication",
      subTitle: "label.application_description",
    },
    {
      title: hasRoundone
        ? "label.download_id"
        : "label.download_id_and_print_id",
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
};

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
  {
    label: "Other",
    value: "Other",
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

export const UNITS = {
  YRS: "Yrs",
};

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

export const PAYMENT_MODE_OPTIONS = [
  {
    label: "Online",
    value: "online",
  },
  {
    label: "Offline",
    value: "offline",
  },
];

export const PREVIEWED_LENGTH = 100;
export const COMPANY_QUERY_TYPE_TICKET = "/";

export const POPUP_OPTIONS = [
  { name: "Download Profile & Resume", id: 1 },
  { name: "View Details", id: 2 },
];
export const FILTER_TYPE_ENUM = { CHECKBOX: "checkbox", SLIDER: "slider" };
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
  name: "Candidate Name",
  candidate_id: "Candidate ID",
  total_experience: "Total Experience",
  functional_area: "Functional Area",
};

export const INACTIVE_PACKAGE_TABLE_HEADING = {
  package_name: "Package Name",
  description: "Package Description",
  price: "Price",
  validity: "Package Validuty Period",
  start_date: "Start Date",
  validity_date: "Validity Date",
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
export const STATUS_OPTIONS = {
  INTERVIEW_SCHEDULED: "interview scheduled",
  JOB_OFFERED: "job offered",
  JOB_NOT_OFFERED: "job not offered",
  NO_RESPONSE: "No Response From Applicant For Interview",
  OFFER_ACCEPTED: "offer accepted",
  OFFERE_REJECTED: "offer rejected",
  PENDING: "pending",
  REJECTED: "rejected",
  SHORTLISTED: "shortlisted",
};

export const DATA_FORMATTER_LOCALES = ["en-US"];

export const DATA_FORMATTER_OPTIONS = {
  day: "numeric",
  month: "long",
  hour: "numeric",
  minute: "numeric",
  hour12: true,
};

export const API_DATA_FOR_INTERVIEW_SCHEDULING = [
  {
    id: 42,
    primary_schedule: "2024-03-01 14:53:12",
    alternate_schedule: "2024-04-03 21:05:58",
    type: "Face-To-Face",
    alternate_type: "Telephonic",
  },
];

export const KEYS = {
  OFFER_ACCEPTED: 7,
  OFFERE_REJECTED: 8,
};

export const MODULES = {
  CA_JOBS: "ca-jobs",
  MEMBER: "member",
};

export const JOB_APPLICANTS_HEADING = {
  name: "Application Name",
  applicantion_id: "Applicant ID",
  job_id: "Job Id",
  designation: "Designation",
  job_status: "Active/Inactive",
  status: "Status",
};

export const STATUS_ENUM = {
  SHORTLISTED: "shortlisted",
  INTERVIEW_SCHEDULED: "interview scheduled",
};
export const JOB_APPLICANTS_POP_MESSAGE = {
  pending: [
    "label.download_profile_resume",
    "label.view_applicant_details",
    "label.shorlist_candidate",
    "label.reject_candidate",
  ],
  shorlisted: [
    "label.download_profile_resume",
    "label.view_applicant_details",
    "label.schedule_interview",
  ],
  noresponse: [
    "label.download_profile_resume",
    "label.view_applicant_details",
    "label.view_interview_details",
  ],
  interviewscheduled: [
    "label.download_profile_resume",
    "label.view_applicant_details",
    "label.view_interview_details",
    "label.offer_job",
    "label.reject_after_interview",
  ],
  offerrejected: [
    "label.download_profile_resume",
    "label.view_applicant_details",
  ],
};

export const SAVED_CANDIDATES_TABLE_HEADING = {
  candidate_id: "Candidate ID",
  candidate_name: "Candidate Name",
  experience: "Total Experience",
  functional_areas: ["Functional Area"],
  designation_applied_for: ["Designation Applied For"],
};

export const interviewTypeOptions = [
  { label: "Virtual Interview", value: "online" },
  { label: "Face to Face", value: "offline" },
];

export const benefits_key = {
  BENEFITS_DETAILS: "benefits_details",
  BENEFITS_AMOUNT: "benefits_amount",
};

export const designation_key = {
  DESIGNATION_DETAILS: "designation_details",
  NUMBER_OF_VACANCIES: "number_of_vacancies",
};

export const CHART_DATA_TYPE = {
  JOBS_BY_TYPES: "JOBS_BY_TYPES",
  URGENT_JOBS: "URGENT_JOBS",
  INTERVIEW_SCHEDULED: "INTERVIEW_SCHEDULED",
  SELECTED_FUNCTION_AREAS: "SELECTED_FUNCTION_AREAS",
  TOP_COMPANIES_WITH_HIGHEST_JOB_OFFERED:
    "TOP_COMPANIES_WITH_HIGHEST_JOB_OFFERED",
  TOP_COMPANIES_WITH_HIGHEST_CTC: "TOP_COMPANIES_WITH_HIGHEST_CTC",
};
