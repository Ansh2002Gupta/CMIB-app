/* User Types */
export const USER_TYPE_COMPANY = "company";
export const USER_TYPE_MEMBER = "member";
export const USER_TYPE_CANDIDATES = "candidates";
export const USER_TYPE_ADMIN = "admin";
export const CORE = "core";
export const ADMIN = "admin";

/* API Endpoints */
export const CANDIDATES = "/candidates";
export const COMPANY_RESET_PASSWORD_OTP = `${USER_TYPE_COMPANY}/reset-password/confirm`;
export const COMPANY_LOGIN = `${USER_TYPE_COMPANY}/login`;
export const COMPANY_CHANGE_PASSWORD_OTP = `${USER_TYPE_COMPANY}/user/password`;
export const COMPANY_SEND_OTP = `${USER_TYPE_COMPANY}/reset-password/request`;
export const COMPANY_VERIFY_OTP = `${USER_TYPE_COMPANY}/otp/verify`;
export const COMPANY_LOGOUT = `${USER_TYPE_COMPANY}/logout`;
export const COMPANY_PROFILE = `${USER_TYPE_COMPANY}/profile`;
export const COMPANY_SIGN_UP = `${USER_TYPE_COMPANY}/sign-up`;
export const COMPANY_VALIDATE_SIGN_UP = `${USER_TYPE_COMPANY}/sign-up/validate`;
export const COMPANY_UPDATE_PROFILE = `${USER_TYPE_COMPANY}/update-profile`;
export const COMPANY_LOGO = `${CORE}/${USER_TYPE_COMPANY}/files`;
export const USER_PROFILE = `${USER_TYPE_COMPANY}/user/profile`;
export const CORE_INDUSTRY_TYPE = `${CORE}/industry-types`;
export const CORE_STATE = `${CORE}/states`;
export const CORE_USERS_PERMISSION = `${CORE}/users/permission`;
export const MENU_PROFILE = `${CORE}/menu-profile/${USER_TYPE_COMPANY}`;
export const COUNTRY_CODE = `${CORE}/countries`;
export const COMPANY_DELETE_USER = `${USER_TYPE_COMPANY}/user`;
export const COMPANY_QUERY_TYPE_TICKET = `${CORE}/queries/types`;
export const COMPANY_TICKET_LISTING = `${CORE}/tickets`;
export const COMPANY_TICKET_STATUS = `${CORE}/status`;
export const COMPANY_SUBSCRIPTION_LISTING = `${USER_TYPE_COMPANY}/subscriptions`;
export const GET_PAYMENTS_STATUS = `${CORE}/payments`;
export const COMPANY_INACTIVE_SUBSCRIPTION_LISTING = `${USER_TYPE_COMPANY}/inactive-subscription`;
export const COMPANY_SUBSCRIPTION_DETAIL = `${USER_TYPE_COMPANY}/subscriptions`;
export const COMPANY_INIT_PAYMENT = `${USER_TYPE_COMPANY}/subscribe`;
export const COMPANY_SUBSCRIPTION_STATUS = `${USER_TYPE_COMPANY}/active-subscription`;
export const DETAIL = `/detail`;
export const CENTRES = "/centres";
export const STATUS_UPDATE = "/status-update";

//sub routes
export const ACADEMICS = "/academics";
export const APPLICANTS = "/applicants";
export const ACTIVITIES = "/activities";
export const APPLICANT = "/applicant";
export const APPLICATION = "/application";
export const BILLING_INFO = "/billing-info";
export const DECLARATION_FORM = "/declaration-form";
export const FILTERS = "/filters";
export const INTERVIEWS = "/interviews";
export const INTERVIEW = "/interview";
export const JOB_APPLICANTS = "/applicants";
export const JOB_APPLICANT = "/applicant";
export const JOBS = "jobs";
export const JOB_SKILLS = "/skills";
export const JOB_PREFERENCES = "/job-preferences";
export const MEMBERS = "/members";
export const MEMBERSHIP = "/membership";
export const MEMBER_WORK_EXPERIENCE = "/work-experience";
export const MARK_PREFER = "/mark-prefer";
export const PAY = "/pay";
export const PERSONAL = "/personal";
export const PAYMENT_INFO = "/payment-info";
export const PROFILE = "/profile";
export const ROUNDS = "/rounds";
export const ROUND = "/round";
export const STATUS = "/status";
export const SUBMIT = "/submit";
export const TRAINING_DETAILS = "/training-details";
export const JOB_DETAILS = "/job-detail";
export const TICKET_REPLIES_SUB_ROUTES = "replies";
export const TRANSACTIONS = "/transactions";
export const WORK_EXPERIENCE = "/work-experiences";
export const QUESTIONNAIRE = "/questionnaire";
export const UNMARK_PREFER = "/unmark-prefer";
export const ROUND_ONE_DASHBOARD = `/dashboard`;
export const ROUND_ONE_BOARD = `/board`;
export const GLOBAL_SESSIONS = `/sessions`;

/* API Endpoints Members*/
export const MEMBER_CATEGORY = `${USER_TYPE_COMPANY}/job/category`;
export const MEMBER_LOGIN = `${USER_TYPE_MEMBER}/login`;
export const MEMBER_VERIFY_OTP = `${USER_TYPE_MEMBER}/otp/verify`;
export const MEMBER_PERSONAL_DETAILS = `${USER_TYPE_MEMBER}/profile`;
export const MEMBER_EXAM_DETAILS = `${USER_TYPE_MEMBER}/academics`;
export const MEMBER_SAVED_JOBS = `${USER_TYPE_MEMBER}/jobs/save`;
export const MEMBER_JOB = `${USER_TYPE_MEMBER}/jobs`;
export const SAVE = `/save`;

//sub routes
export const APPLY_JOB = `${USER_TYPE_MEMBER}/jobs/apply`;
export const MEMBER_JOBS_LISTING = `${USER_TYPE_MEMBER}/${JOBS}/apply`;
export const OFFER_RESPONSE = `${USER_TYPE_MEMBER}/${JOBS}/applicants`;
export const JOB_LOCATION_OPTIONS = `${USER_TYPE_COMPANY}/job/locations`;
export const JOB_TYPE_OPTIONS = `${USER_TYPE_COMPANY}/job-type`;
export const WORK_MODE_OPTIONS = `${USER_TYPE_COMPANY}/workmode`;

export const PREFERRED = "/preferred";
export const MARKED_PREFER = "/marked-prefer";
export const UNMARKED_PREFER = "/unmark-prefer";

/* API Endpoints COMPANY CA JOB profile */
export const COMPANY_CA_JOB_PROFILE = `${USER_TYPE_COMPANY}/ca-jobs/members`;

/* API Endpoints MEMBER CA JOB profile */
export const MEMBER_CA_JOB_PROFILE = `${USER_TYPE_MEMBER}/profile`;
export const MEMBER_CA_JOB_PROFILE_PERSONAL = `${USER_TYPE_MEMBER}/profile/personal`;
export const MEMBER_CA_JOB_PROFILE_EDUCATION = `${USER_TYPE_MEMBER}/profile/academics`;
export const MEMBER_CA_JOB_PROFILE_EXAMS = `${USER_TYPE_MEMBER}/profile/exams`;
export const MEMBER_CA_JOB_PROFILE_OTHER_COURSES = `${USER_TYPE_MEMBER}/profile/other-courses`;

//endpoint add Job
export const GET_FUNCTIONAL_TYPE = `${USER_TYPE_COMPANY}/functional-areas`;
export const GET_JOB_LOCATION = `${USER_TYPE_COMPANY}/job/locations`;
export const GET_JOB_TYPE = `${USER_TYPE_COMPANY}/job-type`;
export const GET_CATERORY_PREFERENCE = `${USER_TYPE_COMPANY}/job/category`;
export const GET_GENDER_PREFERENCE = `${USER_TYPE_COMPANY}/genders`;
export const GET_WORK_MODE = `${USER_TYPE_COMPANY}/workmode`;
export const POST_JOB = `${USER_TYPE_COMPANY}/jobs`;
export const UPDATE_JOB = `${USER_TYPE_COMPANY}/jobs/update`;
export const GET_SCHEDULE_INTERVIEW = `/scheduled-interview`;
export const MEMBER_CA_JOB_PROFILE_SKILLS = `${USER_TYPE_MEMBER}/profile/skills`;
export const LANGUAGES = `${CORE}/languages`;
export const SKILLS = `${USER_TYPE_MEMBER}/ca-jobs/master/configurations`;

/* API Endpoints Member CA JOB COMPANY profile */
export const COMPANY_LISTING = `${USER_TYPE_COMPANY}/${JOBS}/seekers`;
export const MEMBER_CA_JOB_PROFILE_ACTIVITY = `${USER_TYPE_MEMBER}/profile/activities`;
export const MEMBER_CA_JOB_PROFILE_WORK_EXPERIENCE = `${USER_TYPE_MEMBER}/profile/work-experiences`;
export const FUNCTION_AREAS = `${USER_TYPE_COMPANY}/functional-areas`;
export const INDUSTRY_TYPES = `${CORE}/industry-types`;
export const MEMBER_CA_JOB_MEMBERSHIP_DETAILS = `${USER_TYPE_MEMBER}/profile/membership`;
export const MEMBER_CA_JOB_JOB_PREFERENCES = `${USER_TYPE_MEMBER}/profile/job-preferences`;
export const COMPANY_FUNCTIONAL_AREAS = `${USER_TYPE_COMPANY}/functional-areas`;
export const UPLOAD_IMAGE = `${USER_TYPE_COMPANY}/upload-image`;
export const QUESTIONAIRE = `/questionnaire`;

//endpoint view job
export const GET_JOB_DETAIL = `${USER_TYPE_COMPANY}/jobs`;
export const SAVE_JOB_DETAIL = `${USER_TYPE_MEMBER}/jobs`;
export const SEARCH_JOBS = `search/jobs`;
export const CHANGE_APPLICANT_STATUS = `${USER_TYPE_COMPANY}/jobs/applicants`;
export const CHANGE_STATUS = "/change-status";
export const GET_INTERVIEW_DETAILS = `${USER_TYPE_COMPANY}${APPLICANTS}${INTERVIEW}`;
export const ACCEPTED = "/accepted";
export const GET_MEMBER_COMPLETION = `${USER_TYPE_MEMBER}/profile/percentage`;

//api endpoint: Round-1>NQCA Placements>Pre-Interview Placements
export const PRE_INTERVIEW = `/pre-interview`;

export const SHORTLISTS = `/shortlists`;
export const CONSENT = `/consent`;
export const COMPANIES = `/companies`;
export const CONSENT_CENTRES = `/centres`;
//API endpoint for NQCA Shortlisting, Consent and Interview module.
export const OVERVIEW_DATA = "overview-data";
