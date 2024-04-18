export const mappedDataToUI = (data) => {
  return [
    {
      key: "gstin",
      label: "label.gstin",
      value: data?.gstin || "-",
      placeholder: "label.enter_gstin",
      isMandatory: true,
    },
    {
      key: "tan",
      label: "label.tan",
      value: data?.tan || "-",
      placeholder: "label.enter_tan",
      isMandatory: true,
    },
    {
      key: "pan",
      label: "label.pan",
      value: data?.pan || "-",
      placeholder: "label.enter_pan",
      isMandatory: true,
    },
    {
      key: "poNumber",
      label: "label.po_number",
      value: data?.po_number || "-",
      placeholder: "label.enter_po_number",
      isMandatory: true,
    },
    {
      key: "address_for_hard_copy",
      label: "label.address_for_hard_copy",
      value: data?.address_for_hard_copy || "-",
      placeholder: "label.enter_address_for_hard_copy",
      isMandatory: true,
    },
    {
      key: "totaltdsNumber",
      label: "label.total_tds_number",
      value: data?.total_tds_added || "-",
      placeholder: "label.enter_total_tds_number",
      isMandatory: true,
      isEditable: false,
    },
    {
      key: "final_amount",
      label: "label.final_amount",
      value: data?.final_amount || "-",
      placeholder: "label.select_final_amount",
      isMandatory: true,
      isEditable: false,
    },
  ];
};
