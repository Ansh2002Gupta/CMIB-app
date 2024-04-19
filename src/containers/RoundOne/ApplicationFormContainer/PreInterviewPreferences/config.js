import {
  AREA_CODES,
  HEAD_CONTACT,
  MOBILE_CODES,
} from "../../../../constants/constants";

export const headStartRowConfig = [
  {
    cellID: 1,
    key: HEAD_CONTACT.DESIGNATION,
    label: "label.designation",
    placeholder: "label.enter_designation",
    value: "",
  },
  {
    cellID: 1,
    key: HEAD_CONTACT.NAME,
    label: "label.name",
    placeholder: "label.enter_name",
    value: "",
  },
  {
    cellID: 1,
    key: HEAD_CONTACT.EMAIL,
    label: "label.email",
    placeholder: "label.enter_email",
    value: "",
  },
  {
    cellID: 1,
    key: HEAD_CONTACT.MOBILE_COUNTRY_CODE,
    label: "label.mobile_country_code",
    placeholder: "label.select_mobile_country_code",
    value: "",
    isDropdown: true,
    labelField: "label",
    valueField: "value",
    options: MOBILE_CODES,
  },
  {
    cellID: 1,
    key: HEAD_CONTACT.MOBILE_NUMBER,
    label: "label.mobile_number",
    placeholder: "label.mobile_number",
    value: "",
    isNumeric: true,
  },
  {
    cellID: 1,
    key: HEAD_CONTACT.AREA_CODE,
    label: "label.area_code",
    placeholder: "label.select_area_code",
    value: "",
    isNumeric: true,
  },
  {
    cellID: 1,
    key: HEAD_CONTACT.TELEPHONE_NUMBER,
    label: "label.telephone_number",
    placeholder: "label.enter_telephone_number",
    value: "",
    isNumeric: true,
  },
  {
    cellID: 1,
    isButton: true,
    isAdd: true,
  },
];
