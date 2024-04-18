import { useEffect, useState } from "react";
import { designation_key } from "../../../constants/constants";

const addDocumentField = [
  {
    cellID: 1,
    key: designation_key.DESIGNATION_DETAILS,
    label: "label.designation",
    placeholder: "label.enter_designationName",
    isDropdown: true,
    value: "",
  },
  {
    cellID: 1,
    key: designation_key.NUMBER_OF_VACANCIES,
    label: "label.no_of_vacancy",
    placeholder: "label.enter_no_of_vacancies",
    value: "",
    isNumeric: true,
  },
  {
    cellID: 1,
    isButton: true,
    isAdd: true,
  },
];

const useAddDesignation = ({
  requiredDocumentDetails,
  setRequiredDocumentDetails,
}) => {
  const [addDocumentModal, setAddDocumentModal] = useState(false);
  const [editDocumentModal, setEditDocumentModal] = useState();
  const [editDocumentIndex, setEditDocumentIndex] = useState();
  const [isFormValid, setIsFormValid] = useState(false);
  const [documentDetail, setDocumentDetail] = useState({
    designationTitle: "",
    numberOfVacancies: "",
  });

  useEffect(() => {
    if (editDocumentModal) {
      setDocumentDetail({
        designationTitle: documentDetail.designationTitle,
        numberOfVacancies: documentDetail.numberOfVacancies,
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
    const isDocumentNameValid = documentDetail.designationTitle.trim() !== "";
    const isDocumentTypeValid = documentDetail.numberOfVacancies.trim() !== "";

    setIsFormValid(
      (isDocumentNameValid && isDocumentTypeValid && true) || false
    );
  };

  const onClickAddDocumentCancelButton = () => {
    setAddDocumentModal(false);
    setEditDocumentModal(false);
    setDocumentDetail({
      designationTitle: "",
      numberOfVacancies: "",
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
      designationTitle: "",
      numberOfVacancies: "",
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
        designationTitle: documentToEdit.designationTitle,
        numberOfVacancies: documentToEdit.numberOfVacancies,
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

export default useAddDesignation;
