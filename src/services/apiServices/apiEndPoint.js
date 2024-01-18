/* User Types */
export const USER_TYPE_COMPANY = "company";

/* API Endpoints */
export const COMPANY_RESET_PASSWORD_OTP = `${USER_TYPE_COMPANY}/reset-password`;
export const COMPANY_LOGIN = `${USER_TYPE_COMPANY}/login`;
export const COMPANY_CHANGE_PASSWORD_OTP = `${USER_TYPE_COMPANY}/change-password`;
export const COMPANY_SEND_OTP = `${USER_TYPE_COMPANY}/send-otp`;
export const COMPANY_VERIFY_OTP = `${USER_TYPE_COMPANY}/verify-otp`;
export const COMPANY_LOGOUT = `${USER_TYPE_COMPANY}/logout`;
export const COMPANY_PROFILE = `${USER_TYPE_COMPANY}/get-profile-details`;
export const COMPANY_SIGN_UP = `${USER_TYPE_COMPANY}/sign-up`;
export const COMPANY_VALIDATE_SIGN_UP = `${USER_TYPE_COMPANY}/sign-up/validate`;
export const COMPANY_UPDATE_PROFILE = `${USER_TYPE_COMPANY}/update-profile`;
export const COMPANY_SAVE_LOGO = `${USER_TYPE_COMPANY}/logo`;
export const COMPANY_DELETE_LOGO = `${USER_TYPE_COMPANY}/delete-logo`;
export const USER_PROFILE = `${USER_TYPE_COMPANY}/user/profile`;
export const COMPANY_SAVE_LOGO_AUTH = `${USER_TYPE_COMPANY}/save-logo-auth`;
export const COMPANY_DELETE_LOGO_AUTH = `${USER_TYPE_COMPANY}/delete-logo-auth`;
export const MENU_PROFILE = `core/menu-profile/${USER_TYPE_COMPANY}`;
