import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { document_keys } from "../../../constants/constants";

function mapDocuments(dataArray) {
  const groupedData = {};
  Array.isArray(dataArray) &&
    dataArray.forEach((item) => {
      if (!groupedData[item.cellID]) {
        groupedData[item.cellID] = {};
      }
      switch (item.key) {
        case "document_name":
          groupedData[item.cellID].doc_name = item.value;
          break;
        case "document_type":
          groupedData[item.cellID].doc_type = item.value;
          break;
        case "no_of_copies":
          groupedData[item.cellID].no_of_copies = item.value;
        case "cellID":
          groupedData[item.cellID].cellID = item.cellID;
          break;
      }
    });
  const result = Object.keys(groupedData).map((key) => {
    return groupedData[key];
  });
  return result;
}

const useAddDocument = ({
  requiredDocumentDetails,
  setRenderJobDetails,
  addDocumentField,
}) => {
  const [addDocumentModal, setAddDocumentModal] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const nonEditableData = mapDocuments(requiredDocumentDetails);
  const [documentDetail, setDocumentDetail] = useState(null);
  const intl = useIntl();

  const onClickAddDocument = (cellID) => {
    setAddDocumentModal(true);
    setDocumentDetail((prev) => ({
      ...prev,
      cellID: cellID,
    }));
  };

  const onClickAddDocumentCancelButton = () => {
    setAddDocumentModal(false);
    setDocumentDetail(null);
  };

  const handleMultiRowDocumentDetails = ({ propertyName, value, cellID }) => {
    setRenderJobDetails((prevDetail) => {
      const updatedDocs = prevDetail?.required_docs?.map((doc) => {
        if (doc.cellID === cellID) {
          if (doc.label === propertyName) {
            const isError = !value;
            const error = isError
              ? intl.formatMessage({ id: "label.error.cannot_be_empty" })
              : null;
            return { ...doc, value: value, isError: isError, error: error };
          } else if (
            doc.label === "label.no_of_copies" &&
            propertyName === "label.document_type"
          ) {
            const isEditable = value !== "original";
            return {
              ...doc,
              isEditable: isEditable,
              isError: false,
              error: null,
              value: isEditable ? value : 0,
            };
          }
        }
        return doc;
      });

      return { ...prevDetail, required_docs: updatedDocs };
    });
  };

  const handleDocumentDetailChange = (propertyName, value) => {
    setDocumentDetail((prevDetail) => ({
      ...prevDetail,
      [propertyName]: value,
    }));
  };

  const onClickAddDocumentSaveButton = () => {
    const { doc_name, doc_type, no_of_copies, cellID } = documentDetail;
    let newData = addDocumentField?.map((doc) => {
      let val;
      if (doc?.key === "document_type") {
        val = doc_type;
      } else if (doc.key === "document_name") {
        val = doc_name;
      } else {
        val = no_of_copies;
      }
      return {
        ...doc,
        cellID,
        value: val,
      };
    });

    const updatedDocumentDetails = requiredDocumentDetails.map((item) => {
      if (item.cellID === cellID) {
        switch (item.key) {
          case "document_name":
            return { ...item, value: doc_name };
          case "document_type":
            return { ...item, value: doc_type };
          case "no_of_copies":
            return { ...item, value: no_of_copies };
          default:
            return item;
        }
      }
      return item;
    });

    setRenderJobDetails((prev) => ({
      ...prev,
      required_docs: [...updatedDocumentDetails, ...newData],
    }));
    setDocumentDetail(null);
    setAddDocumentModal(false);
  };

  const onClickDeleteDocument = (cellID) => {
    setRenderJobDetails((prevDetail) => {
      const filteredDocs = prevDetail?.required_docs?.filter(
        (doc) => doc.cellID !== cellID
      );
      return { ...prevDetail, required_docs: filteredDocs };
    });
  };

  const onCLickEditDocument = (cellID) => {
    const documentToEdit = requiredDocumentDetails.find(
      (doc) => doc.cellID === cellID
    );

    if (documentToEdit) {
      setDocumentDetail({
        doc_name:
          requiredDocumentDetails.find(
            (item) => item.cellID === cellID && item.key === "document_name"
          )?.value || "",
        doc_type:
          requiredDocumentDetails.find(
            (item) => item.cellID === cellID && item.key === "document_type"
          )?.value || "",
        no_of_copies:
          requiredDocumentDetails.find(
            (item) => item.cellID === cellID && item.key === "no_of_copies"
          )?.value || "",
        cellID: cellID,
      });
    }
  };

  return {
    nonEditableData,
    addDocumentModal,
    documentDetail,
    editDocumentModal: documentDetail,
    handleMultiRowDocumentDetails,
    handleDocumentDetailChange,
    isFormValid,
    onClickAddDocument,
    onClickAddDocumentCancelButton,
    onClickAddDocumentSaveButton,
    onClickDeleteDocument,
    onCLickEditDocument,
    requiredDocumentDetails,
  };
};

export default useAddDocument;
