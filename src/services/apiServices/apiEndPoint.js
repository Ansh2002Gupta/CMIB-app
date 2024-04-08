/* User Types */
export const USER_TYPE_COMPANY = "company";
export const USER_TYPE_MEMBER = "member";
export const USER_TYPE_ADMIN = "admin";
export const CORE = "core";

/* API Endpoints */
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
export const JOBS = "jobs";

/* API Endpoints Members*/
export const MEMBER_LOGIN = `${USER_TYPE_MEMBER}/login`;
export const MEMBER_VERIFY_OTP = `${USER_TYPE_MEMBER}/otp/verify`;
export const MEMBER_PERSONAL_DETAILS = `${USER_TYPE_MEMBER}/profile`;
export const MEMBER_EXAM_DETAILS = `${USER_TYPE_MEMBER}/academics`;
export const MEMBER_JOBS_LISTING = `${USER_TYPE_MEMBER}/${JOBS}/apply`;
export const OFFER_RESPONSE = `${USER_TYPE_ADMIN}/job/applicants`;
export const JOB_LOCATION_OPTIONS = `${USER_TYPE_COMPANY}/job/locations`;
export const JOB_TYPE_OPTIONS = `${USER_TYPE_COMPANY}/job-type`;
export const WORK_MODE_OPTIONS = `${USER_TYPE_COMPANY}/workmode`;

//sub routes
export const TICKET_REPLIES_SUB_ROUTES = "replies";
export const INTERVIEWS = "/interviews";
export const INTERVIEW = "/interview";
export const ACCEPTED = "/accepted";
