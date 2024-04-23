import { PAYMENT_MODE_OPTIONS } from "../../../../constants/constants";
import {
  convertStringtoNumber,
  formatDateToYYYYMMDD,
} from "../../../../utils/util";

export const mappedDataToUI = (data) => {
  const finalAmount =
    convertStringtoNumber(data?.amount_to_pay) -
    convertStringtoNumber(data?.amount_paid);

  return [
    {
      key: "gstin",
      label: "label.gstin",
      value: data?.gstin || null,
      placeholder: "label.enter_gstin",
      isMandatory: true,
      isError: null,
    },
    {
      key: "tan",
      label: "label.tan",
      value: data?.tan || null,
      placeholder: "label.enter_tan",
      isMandatory: true,
      isError: null,
    },
    {
      key: "pan",
      label: "label.pan",
      value: data?.pan || null,
      placeholder: "label.enter_pan",
      isMandatory: true,
      isError: null,
    },
    {
      key: "poNumber",
      label: "label.po_number",
      value: data?.po_number || null,
      placeholder: "label.enter_po_number",
      isError: null,
    },
    {
      key: "address_for_hard_copy",
      label: "label.address_for_hard_copy",
      value: data?.address_for_hard_copy || "",
      placeholder: "label.enter_address_for_hard_copy",
      isMandatory: true,
      isError: null,
    },
    {
      key: "amount_paid",
      label: "label.amount_paid",
      value: convertStringtoNumber(data?.amount_paid) || 0,
      placeholder: "label.amount_paid",
      isMandatory: true,
      isEditable: false,
      isRupee: true,
      isError: null,
    },
    {
      key: "amount_to_pay",
      label: "label.amount_to_pay",
      value: convertStringtoNumber(data?.amount_to_pay) || 0,
      placeholder: "label.amount_to_pay",
      isMandatory: true,
      isEditable: false,
      isRupee: true,
      isError: null,
    },
    {
      key: "totaltdsNumber",
      label: "label.total_tds_number",
      value: null,
      placeholder: "label.enter_total_tds_number",
      isMandatory: true,
      isRupee: true,
      isNumeric: true,
      isError: null,
    },
    {
      key: "final_amount",
      label: "label.final_amount",
      value: finalAmount || 0,
      placeholder: "label.select_final_amount",
      isMandatory: true,
      isRupee: true,
      isNumeric: true,
      isError: null,
    },
    {
      key: "payment_mode",
      label: "label.payment_mode",
      value: "" || null,
      placeholder: "label.payment_mode",
      isMandatory: true,
      isDropdown: true,
      options: PAYMENT_MODE_OPTIONS,
      isError: null,
    },
  ];
};

export const offlineFields = (data) => {
  return [
    {
      key: "cheque_no_or_dd_no_or_transaction_id",
      label: "label.cheque_no_or_dd_no_or_transaction_id",
      value: "" || null,
      placeholder: "label.cheque_no_or_dd_no_or_transaction_id",
      isMandatory: true,
      isNumeric: true,
    },
    {
      key: "payment_date",
      label: "label.payment_date",
      value: "" || null,
      placeholder: "label.payment_date",
      isMandatory: true,
      isCalendar: true,
    },
  ];
};

export const mappedPayload = (data) => {
  const payloadData = {
    tan: "",
    pan: "",
    gstin: "",
    address: "",
    po_number: "",
    tds: "",
    amount: "",
    payment_mode: "",
    payment_date: "",
    cheque_or_dd_no: "",
  };

  data.forEach((item) => {
    switch (item.key) {
      case "gstin":
        payloadData.gstin = item.value;
        break;
      case "tan":
        payloadData.tan = item.value;
        break;
      case "pan":
        payloadData.pan = item.value;
        break;
      case "poNumber":
        payloadData.po_number = item.value;
        break;
      case "address_for_hard_copy":
        payloadData.address = item.value;
        break;
      case "totaltdsNumber":
        payloadData.tds = item.value;
        break;
      case "final_amount":
        payloadData.amount = item.value;
        break;
      case "payment_mode":
        payloadData.payment_mode = item.value;
      case "cheque_no_or_dd_no_or_transaction_id":
        payloadData.cheque_or_dd_no = item.value;
        break;
      case "payment_date":
        payloadData.payment_date = formatDateToYYYYMMDD(item.value);
        break;
      default:
        break;
    }
  });

  return payloadData;
};
