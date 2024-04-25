import { useEffect, useState } from "react";
import {
  DOCUMENT_TYPE,
  benefits_key,
  document_keys_with_label,
} from "../../../constants/constants";

export const addDocumentField = [
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
  const [editDocumentIndex, setEditDocumentIndex] = useState(-1);
  const [isFormValid, setIsFormValid] = useState(false);
  const [documentDetail, setDocumentDetail] = useState(null);
  const [isInitialDataAdded, setIsInitialDataAdded] = useState(false);
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

  useEffect(() => {
    if (!isInitialDataAdded && requiredDocumentDetails?.length > 0) {
      setIsInitialDataAdded(true);
      setMultiDocumentDetail([...requiredDocumentDetails]);
    }
  }, [isInitialDataAdded, requiredDocumentDetails]);

  const onClickAddDocument = (cellID) => {
    setDocumentDetail({ cellID });
    setAddDocumentModal(true);
  };

  const validateForm = () => {
    const isDocumentNameValid =
      documentDetail?.benefits_details &&
      documentDetail?.benefits_details !== "";
    const isDocumentTypeValid =
      documentDetail?.benefits_amount && documentDetail?.benefits_amount !== "";

    setIsFormValid(
      (isDocumentNameValid && isDocumentTypeValid && true) || false
    );
  };

  const onClickAddDocumentCancelButton = () => {
    setAddDocumentModal(false);
    setEditDocumentModal(false);
    setDocumentDetail(null);
    setEditDocumentIndex(-1);
  };

  const handleMultiRowDocumentDetails = (propertyName, value, id) => {
    setMultiDocumentDetail((prevDetail) => {
      const updatedDetail = prevDetail.map((item, index) => {
        if (item.label === propertyName && index == id) {
          return { ...item, value: value, isError: null, error: null };
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
    const { benefits_details, benefits_amount, cellID } = documentDetail;

    if (editDocumentIndex !== -1) {
      const updatedDocumentDetails = requiredDocumentDetails.map((item) => {
        if (item.cellID === cellID) {
          switch (item.key) {
            case "benefits_details":
              return { ...item, value: benefits_details };
            case "benefits_amount":
              return { ...item, value: benefits_amount };
            default:
              return item;
          }
        }
        return item;
      });

      setRequiredDocumentDetails([...updatedDocumentDetails]);
    } else {
      let newData = addDocumentField?.map((doc) => {
        let val;
        if (doc?.key === "benefits_details") {
          val = benefits_details;
        } else if (doc.key === "benefits_amount") {
          val = benefits_amount;
        }
        return {
          ...doc,
          cellID,
          value: val,
        };
      });
      setRequiredDocumentDetails((prev) => [...prev, ...newData]);
    }
    setDocumentDetail(null);
    setIsFormValid(false);
    setEditDocumentIndex(-1);
    setEditDocumentModal(false);
    setAddDocumentModal(false);
  };

  const onClickDeleteDocument = (cellID) => {
    setRequiredDocumentDetails((prev) =>
      prev.filter((doc) => doc.cellID !== cellID)
    );
  };

  const onCLickEditDocument = (cellID) => {
    const documentToEdit = requiredDocumentDetails.find(
      (doc) => doc.cellID === cellID
    );

    if (documentToEdit) {
      setDocumentDetail({
        benefits_details:
          requiredDocumentDetails.find(
            (item) => item.cellID === cellID && item.key === "benefits_details"
          )?.value || "",
        benefits_amount:
          requiredDocumentDetails.find(
            (item) => item.cellID === cellID && item.key === "benefits_amount"
          )?.value || "",
        cellID: cellID,
      });
      setEditDocumentIndex(cellID);
    }
  };

  return {
    addDocumentModal,
    addDocumentField,
    multiDocumentDetail,
    setMultiDocumentDetail,
    documentDetail,
    editDocumentModal: editDocumentIndex > -1,
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
