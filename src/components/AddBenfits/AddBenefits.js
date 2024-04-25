import React from "react";

import AddBenefitsTemplate from "./AddBenefitsTemplate.js";
import useAddBenefit from "./controllers/useAddBenefit.js";

const AddBenefits = ({
  isEditable,
  requiredDocumentDetails,
  setRequiredDocumentDetails,
}) => {
  const {
    addDocumentModal,
    documentDetail,
    multiDocumentDetail,
    setMultiDocumentDetail,
    addDocumentField,
    editDocumentModal,
    handleDocumentDetailChange,
    isFormValid,
    handleMultiRowDocumentDetails,
    onClickAddDocument,
    onClickAddDocumentCancelButton,
    onClickAddDocumentSaveButton,
    onClickDeleteDocument,
    onCLickEditDocument,
  } = useAddBenefit({ requiredDocumentDetails, setRequiredDocumentDetails });

  return (
    <AddBenefitsTemplate
      {...{
        addDocumentModal,
        documentDetail,
        isEditable,
        multiDocumentDetail,
        setMultiDocumentDetail,
        addDocumentField,
        editDocumentModal,
        handleDocumentDetailChange,
        handleMultiRowDocumentDetails,
        isFormValid,
        onClickAddDocument,
        onClickAddDocumentCancelButton,
        onClickAddDocumentSaveButton,
        onClickDeleteDocument,
        onCLickEditDocument,
        requiredDocumentDetails,
      }}
    />
  );
};

export default AddBenefits;
