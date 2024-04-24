import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { document_keys } from "../../../constants/constants";

const useAddDocument = ({ requiredDocumentDetails, setRenderJobDetails }) => {
  const [addDocumentModal, setAddDocumentModal] = useState(false);
  const [editDocumentModal, setEditDocumentModal] = useState();
  const [editDocumentIndex, setEditDocumentIndex] = useState();
  const [isFormValid, setIsFormValid] = useState(false);
  const [documentDetail, setDocumentDetail] = useState({
    documentName: "",
    documentType: "",
    copiesNumber: null,
  });
  const intl = useIntl();

  useEffect(() => {
    if (editDocumentModal) {
      setDocumentDetail({
        documentName: documentDetail.documentName,
        documentType: documentDetail.documentType,
        copiesNumber: documentDetail.copiesNumber,
      });
    }
  }, []);

  useEffect(() => {
    validateForm();
  }, [documentDetail]);

  const onClickAddDocument = () => {
    setAddDocumentModal(true);
  };

  const validateForm = () => {
    const isDocumentNameValid = documentDetail.documentName.trim() !== "";
    const isDocumentTypeValid = documentDetail.documentType.trim() !== "";
    const isCopiesNumberValid =
      (documentDetail.documentType !== "Both" &&
        documentDetail.documentType !== "Photocopies") ||
      (documentDetail.copiesNumber && documentDetail.copiesNumber > 0);
    setIsFormValid(
      (isDocumentNameValid && isDocumentTypeValid && isCopiesNumberValid) ||
        false
    );
  };

  const onClickAddDocumentCancelButton = () => {
    setAddDocumentModal(false);
    setEditDocumentModal(false);
    setDocumentDetail({
      documentName: "",
      documentType: "",
      copiesNumber: null,
    });
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
    // Todo: Fix Logic for mobile
    // if (editDocumentModal && editDocumentIndex !== -1) {
    //   setRequiredDocumentDetails((prev) => {
    //     const updatedList = [...prev];
    //     updatedList[editDocumentIndex] = { ...documentDetail };
    //     return updatedList;
    //   });
    // } else {
    //   setRequiredDocumentDetails((prev) => [...prev, { ...documentDetail }]);
    // }
    // setDocumentDetail({
    //   documentName: "",
    //   documentType: "",
    //   copiesNumber: null,
    // });
    // setIsFormValid(false);
    // setEditDocumentIndex(-1);
    // setEditDocumentModal(false);
    // setAddDocumentModal(false);
  };

  const onClickDeleteDocument = (index) => {
    // Todo: Fix Logic for mobile
    // setRequiredDocumentDetails((prev) => prev.filter((_, i) => i !== index));
  };

  const onCLickEditDocument = (index) => {
    const documentToEdit = requiredDocumentDetails[index];
    if (documentToEdit) {
      setDocumentDetail({
        documentName: documentToEdit.documentName,
        documentType: documentToEdit.documentType,
        copiesNumber: documentToEdit.copiesNumber,
      });
      setEditDocumentIndex(index);
    }
    setEditDocumentModal(true);
  };

  return {
    addDocumentModal,
    documentDetail,
    editDocumentModal,
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
