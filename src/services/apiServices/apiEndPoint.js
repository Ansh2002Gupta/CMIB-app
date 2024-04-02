/* User Types */
export const USER_TYPE_COMPANY = "company";
export const USER_TYPE_MEMBER = "member";
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

/* API Endpoints Members*/
export const MEMBER_LOGIN = `${USER_TYPE_MEMBER}/login`;
export const MEMBER_VERIFY_OTP = `${USER_TYPE_MEMBER}/otp/verify`;
export const MEMBER_PERSONAL_DETAILS = `${USER_TYPE_MEMBER}/profile`;
export const MEMBER_EXAM_DETAILS = `${USER_TYPE_MEMBER}/academics`;

//sub routes
export const TICKET_REPLIES_SUB_ROUTES = "replies";

/* API Endpoints Member CA JOB profile */
export const MEMBER_CA_JOB_PROFILE = `${USER_TYPE_MEMBER}/profile/personal`;
export const MEMBER_CA_JOB_PROFILE_EDUCATION = `${USER_TYPE_MEMBER}/profile/education`;
export const MEMBER_CA_JOB_PROFILE_EXAMS = `${USER_TYPE_MEMBER}/profile/exams`;
export const MEMBER_CA_JOB_PROFILE_OTHER_COURSES = `${USER_TYPE_MEMBER}/profile/other-courses`;
export const MEMBER_CA_JOB_PROFILE_SKILLS =  `${USER_TYPE_MEMBER}/profile/skills`;
export const LANGUAGES = `${CORE}/languages`;
export const SKILLS = `${USER_TYPE_MEMBER}/ca-jobs/master/configurations`;
export const MEMBER_CA_JOB_PROFILE_ACTIVITY = `${USER_TYPE_MEMBER}/profile/activities`;
export const MEMBER_CA_JOB_PROFILE_WORK_EXPERIENCE = `${USER_TYPE_MEMBER}/profile/work-experiences`;
export const FUNCTION_AREAS = `${USER_TYPE_COMPANY}/functional-areas`;
export const INDUSTRY_TYPES = `${CORE}/industry-types`;
export const MEMBER_CA_JOB_MEMBERSHIP_DETAILS = `${USER_TYPE_MEMBER}/profile/membership`;
