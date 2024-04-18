import { useEffect, useState } from "react";
import {
  DOCUMENT_TYPE,
  benefits_key,
  document_keys_with_label,
} from "../../../constants/constants";

const addDocumentField = [
  {
    cellID: 1,
    key: benefits_key.BENEFITS_DETAILS,
    label: "label.benefit_details",
    placeholder: "label.enter_benefit_details",
    value: "",
    isMandatory: true,
  },
  {
    cellID: 1,
    key: benefits_key.BENEFITS_AMOUNT,
    label: "label.amount",
    placeholder: "label.enter_amount",
    value: "",
    isMandatory: true,
    isNumeric: true,
  },
  {
    cellID: 1,
    isButton: true,
    isAdd: true,
  },
];

const useAddBenefit = ({
  requiredDocumentDetails,
  setRequiredDocumentDetails,
}) => {
  const [addDocumentModal, setAddDocumentModal] = useState(false);
  const [editDocumentModal, setEditDocumentModal] = useState();
  const [editDocumentIndex, setEditDocumentIndex] = useState();
  const [isFormValid, setIsFormValid] = useState(false);
  const [documentDetail, setDocumentDetail] = useState({
    benefitsDetails: "",
    benefitAmount: "",
  });

  useEffect(() => {
    if (editDocumentModal) {
      setDocumentDetail({
        benefitsDetails: documentDetail.benefitsDetails,
        benefitAmount: documentDetail.benefitAmount,
      });
    }
  }, []);

  const [multiDocumentDetail, setMultiDocumentDetail] = useState([
    ...addDocumentField,
  ]);

  useEffect(() => {
    validateForm();
  }, [documentDetail]);

  const onClickAddDocument = () => {
    setAddDocumentModal(true);
  };

  const validateForm = () => {
    const isDocumentNameValid = documentDetail.benefitsDetails.trim() !== "";
    const isDocumentTypeValid = documentDetail.benefitAmount.trim() !== "";

    setIsFormValid(
      (isDocumentNameValid && isDocumentTypeValid && true) || false
    );
  };

  const onClickAddDocumentCancelButton = () => {
    setAddDocumentModal(false);
    setEditDocumentModal(false);
    setDocumentDetail({
      benefitsDetails: "",
      benefitAmount: "",
    });
  };

  const handleMultiRowDocumentDetails = (propertyName, value, id) => {
    setMultiDocumentDetail((prevDetail) => {
      const updatedDetail = prevDetail.map((item, index) => {
        if (item.label === propertyName && index == id) {
          return { ...item, value: value };
        }
        return item;
      });

      setRequiredDocumentDetails([...updatedDetail]);
      return updatedDetail;
    });
  };

  const handleDocumentDetailChange = (propertyName, value) => {
    setDocumentDetail((prevDetail) => ({
      ...prevDetail,
      [propertyName]: value,
    }));
  };

  const onClickAddDocumentSaveButton = () => {
    if (editDocumentModal && editDocumentIndex !== -1) {
      setRequiredDocumentDetails((prev) => {
        const updatedList = [...prev];
        updatedList[editDocumentIndex] = { ...documentDetail };
        return updatedList;
      });
    } else {
      setRequiredDocumentDetails((prev) => [...prev, { ...documentDetail }]);
    }
    setDocumentDetail({
      benefitsDetails: "",
      benefitAmount: "",
    });
    setIsFormValid(false);
    setEditDocumentIndex(-1);
    setEditDocumentModal(false);
    setAddDocumentModal(false);
  };

  const onClickDeleteDocument = (index) => {
    setRequiredDocumentDetails((prev) => prev.filter((_, i) => i !== index));
  };

  const onCLickEditDocument = (index) => {
    const documentToEdit = requiredDocumentDetails[index];
    if (documentToEdit) {
      setDocumentDetail({
        benefitsDetails: documentToEdit.benefitsDetails,
        benefitAmount: documentToEdit.benefitAmount,
      });
      setEditDocumentIndex(index);
    }
    setEditDocumentModal(true);
  };

  return {
    addDocumentModal,
    addDocumentField,
    multiDocumentDetail,
    setMultiDocumentDetail,
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

export default useAddBenefit;
