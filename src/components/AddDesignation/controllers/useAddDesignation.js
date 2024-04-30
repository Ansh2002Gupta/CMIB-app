import { useEffect, useState } from "react";
import { designation_key } from "../../../constants/constants";

export const addDesignationField = (options, data) => [
  {
    cellID: 1,
    key: designation_key.DESIGNATION_DETAILS,
    label: "label.designation",
    placeholder: "label.designation",
    isDropdown: true,
    isMandatory: true,
    valueField: "id",
    value: "",
    options: options?.map((option) =>
      createModuleOptions(option, data, "designation", "designation")
    ),
  },
  {
    cellID: 1,
    key: designation_key.NUMBER_OF_VACANCIES,
    label: "label.no_of_vacancy",
    placeholder: "label.enter_no_of_vacancies",
    isMandatory: true,
    value: "",
    isNumeric: true,
  },
  {
    cellID: 1,
    isButton: true,
    isAdd: true,
  },
];

export const createModuleOptions = (
  module,
  contact,
  labelKey = "label",
  valueKey = "value"
) => {
  return {
    id: module?.id,
    label: module[labelKey],
    name: module[labelKey],
    value: module[valueKey],
    isSelected: contact?.includes(module[valueKey]),
    selectedIndex: null,
  };
};

const useAddDesignation = ({
  requiredDocumentDetails,
  setRequiredDocumentDetails,
  options,
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
        designation_details: documentDetail.designation_details,
        number_of_vacancies: documentDetail.number_of_vacancies,
      });
    }
  }, []);

  const [multiDocumentDetail, setMultiDocumentDetail] = useState([
    ...addDesignationField(),
  ]);

  useEffect(() => {
    const templateData = addDesignationField(options, requiredDocumentDetails);
    setMultiDocumentDetail(templateData);
  }, [options]);

  useEffect(() => {
    if (!isInitialDataAdded && requiredDocumentDetails?.length > 0) {
      setIsInitialDataAdded(true);
      setMultiDocumentDetail([...requiredDocumentDetails]);
    }
  }, [isInitialDataAdded, requiredDocumentDetails]);

  useEffect(() => {
    validateForm();
  }, [documentDetail]);

  const onClickAddDocument = (cellID) => {
    setAddDocumentModal(true);
    setDocumentDetail({
      cellID,
    });
  };

  const validateForm = () => {
    const isDocumentNameValid =
      documentDetail?.designation_details &&
      documentDetail?.designation_details !== "";
    const isDocumentTypeValid =
      documentDetail?.number_of_vacancies &&
      documentDetail?.number_of_vacancies !== "";

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
    const updatedDetail = multiDocumentDetail.map((item, index) => {
      if (item.label === propertyName && index == id) {
        return { ...item, value: value, isError: null, error: null };
      }
      return item;
    });

    setRequiredDocumentDetails([...updatedDetail]);
    setMultiDocumentDetail([...updatedDetail]);
  };

  const handleDocumentDetailChange = (propertyName, value) => {
    setDocumentDetail((prevDetail) => ({
      ...prevDetail,
      [propertyName]: value,
    }));
  };

  const onClickAddDocumentSaveButton = () => {
    const { designation_details, number_of_vacancies, cellID } = documentDetail;

    if (editDocumentIndex !== -1) {
      const updatedDocumentDetails = requiredDocumentDetails.map((item) => {
        if (item.cellID === cellID) {
          switch (item.key) {
            case "designation_details":
              return { ...item, value: designation_details };
            case "number_of_vacancies":
              return { ...item, value: number_of_vacancies };
            default:
              return item;
          }
        }
        return item;
      });

      setRequiredDocumentDetails([...updatedDocumentDetails]);
    } else {
      let newData = addDesignationField(options, requiredDocumentDetails)?.map(
        (doc) => {
          let val;
          if (doc?.key === "designation_details") {
            val = designation_details;
          } else if (doc.key === "number_of_vacancies") {
            val = number_of_vacancies;
          }
          return {
            ...doc,
            cellID,
            value: val,
          };
        }
      );
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
      const designationDetailItem = requiredDocumentDetails.find(
        (item) => item.cellID === cellID && item.key === "designation_details"
      );
      setDocumentDetail({
        designation_details:
          designationDetailItem?.options?.find(
            (data) => String(data?.id) === String(designationDetailItem.value)
          )?.id || "",
        number_of_vacancies:
          requiredDocumentDetails.find(
            (item) =>
              item.cellID === cellID && item.key === "number_of_vacancies"
          )?.value || "",
        cellID: cellID,
      });
      setEditDocumentIndex(cellID);
    }
  };

  return {
    addDocumentModal,
    addDocumentField: addDesignationField(options, requiredDocumentDetails),
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

export default useAddDesignation;
