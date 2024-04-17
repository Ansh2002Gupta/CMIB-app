import { useEffect, useState } from "react";
import {
  DOCUMENT_TYPE,
  document_keys,
  document_keys_with_label,
} from "../../../constants/constants";

const addDocumentField = [
  {
    cellID: 1,
    key: document_keys.DOCUMENT_NAME,
    label: "label.document_name",
    placeholder: "label.select_document_name",
    value: "",
  },
  {
    cellID: 1,
    id: 1,
    includeAllKeys: true,
    key: document_keys.DOCUMENT_TYPE,
    label: "label.document_type",
    placeholder: "label.select_document_type",
    isDropdown: true,
    labelField: "label",
    valueField: "value",
    options: DOCUMENT_TYPE,
    value: "",
  },
  {
    cellID: 1,
    key: document_keys.NUMBER_OF_COPIES,
    label: "label.no_of_copies",
    placeholder: "label.select_no_of_copies",
    value: "",
    isNumeric: true,
  },
  {
    cellID: 1,
    isButton: true,
    isAdd: true,
  },
];

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

  useEffect(() => {
    if (editDocumentModal) {
      setDocumentDetail({
        documentName: documentDetail.documentName,
        documentType: documentDetail.documentType,
        copiesNumber: documentDetail.copiesNumber,
      });
    }
    // setRenderJobDetails((prev) => ({
    //   ...prev,
    //   required_docs: [...addDocumentField],
    // }));
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

  const handleMultiRowDocumentDetails = ({
    propertyName,
    value,
    id,
    cellID,
  }) => {
    setRenderJobDetails((prevDetail) => {
      const updatedDetail = prevDetail?.required_docs?.map((item) => {
        if (item.label === propertyName && item.cellID === cellID) {
          return { ...item, value: value };
        }
        return item;
      });
      return { ...prevDetail, required_docs: updatedDetail };
    });
  };

  const handleDocumentDetailChange = (propertyName, value) => {
    setDocumentDetail((prevDetail) => ({
      ...prevDetail,
      [propertyName]: value,
    }));
  };

  const onClickAddDocumentSaveButton = () => {
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
    addDocumentField,
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
