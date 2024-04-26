import React from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { useTheme } from "@unthinkable/react-theme";
import { View } from "@unthinkable/react-core-components";

import AddIconText from "../AddIconText";
import CustomMultiRowTextInput from "../CustomMultiRowTextinput";
import CommonText from "../CommonText";
import CustomTextInput from "../CustomTextInput";
import EditDeleteAction from "../EditDeleteAction/EditDeleteAction";
import useIsWebView from "../../hooks/useIsWebView";
import ModalWithTitleButton from "../ModalWithTitleButton";
import {
  ADD_DESIGNATION_HEADING,
  designation_key,
} from "../../constants/constants";
import { extractValueDropdown } from "../../utils/util";
import { createModuleOptions } from "./controllers/useAddDesignation";
import commonStyles from "../../theme/styles/commonStyles";
import getStyles from "./AddDesignation.style";

const AddDesignationTemplate = ({
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
  options,
}) => {
  const intl = useIntl();
  const { isWebView } = useIsWebView();
  const theme = useTheme;
  const styles = getStyles(theme);
  function mapDocuments(dataArray) {
    const groupedData = {};
    Array.isArray(dataArray) &&
      dataArray.forEach((item) => {
        if (!groupedData[item.cellID]) {
          groupedData[item.cellID] = {};
        }
        switch (item.key) {
          case "designation_details":
            groupedData[item.cellID].designation_details =
              extractValueDropdown(item);
            break;
          case "number_of_vacancies":
            groupedData[item.cellID].number_of_vacancies =
              extractValueDropdown(item);
            break;
        }
      });
    const result = Object.keys(groupedData).map((key) => {
      return groupedData[key];
    });
    return result;
  }

  const nonEditableData = mapDocuments(requiredDocumentDetails);

  const getColoumConfigs = (item, isHeading) => {
    const tableStyle = isHeading
      ? commonStyles.tableHeadingText
      : commonStyles.cellTextStyle();
    return [
      {
        content: (
          <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
            {item?.designation_details || "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("20%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
            {item?.number_of_vacancies || "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("20%"),
        isFillSpace: true,
      },
    ];
  };

  const dataArr = Object.values(
    requiredDocumentDetails.reduce((acc, item) => {
      if (!acc[item.cellID]) acc[item.cellID] = {};
      const group = acc[item.cellID];

      if (item.key === "designation_details") {
        group.designation_details = item.value ?? "-";
      } else if (item.key === "number_of_vacancies") {
        group.number_of_vacancies = item.value;
      } else {
        group.cellID = item.cellID;
      }

      return acc;
    }, {})
  );

  return (
    <View>
      <CommonText
        fontWeight="600"
        customTextStyle={styles.detailDocumentRequiredText}
      >
        {`${intl.formatMessage({
          id: "label.designation",
        })}s`}
      </CommonText>
      {isWebView ? (
        <CustomMultiRowTextInput
          customCardStyle={styles.multiRowTextStyle}
          isEditProfile={isEditable}
          startRowTemplate={addDocumentField}
          gridTemplate={multiDocumentDetail}
          setGridTemplate={setMultiDocumentDetail}
          numColsInARow={3}
          handleValueChange={({ propertyName, value, index }) => {
            handleMultiRowDocumentDetails(propertyName, value, index);
          }}
          customContainerStyle={styles.customContainerStyle}
          customWebContainerStyle={styles.customWebContainerStyle}
          getColoumConfigs={getColoumConfigs}
          tableData={nonEditableData}
          tableHeading={ADD_DESIGNATION_HEADING}
        />
      ) : (
        <>
          {nonEditableData.map((item, index) => {
            return (
              <View>
                <View
                  style={
                    index !== 0
                      ? { ...styles.documentBorderStyle }
                      : { ...styles.notBorderStyle }
                  }
                />
                <EditDeleteAction
                  topText={item?.designation_details}
                  onDeleteDocument={
                    isEditable
                      ? () => {
                          onClickDeleteDocument(item.cellID);
                        }
                      : null
                  }
                  onEditDocument={
                    isEditable
                      ? () => {
                          onCLickEditDocument(item.cellID);
                        }
                      : null
                  }
                  bottomView={
                    <CommonText customTextStyle={styles.bottomText}>
                      {intl.formatMessage(
                        { id: "label.formatVacancies" },
                        { value: item?.number_of_vacancies }
                      )}
                    </CommonText>
                  }
                />
              </View>
            );
          })}
          {isEditable && (
            <AddIconText
              customViewStyle={styles.customAddIconTextStyle}
              label={intl.formatMessage({
                id: "label.add_designation",
              })}
              onPress={() => onClickAddDocument(dataArr.length + 1)}
            />
          )}
        </>
      )}
      {(addDocumentModal || editDocumentModal) && (
        <ModalWithTitleButton
          enableBottomButton
          isRightDisabled={!Boolean(isFormValid)}
          headerTextStyle={{ marginBottom: 12 }}
          heading={
            addDocumentModal
              ? intl.formatMessage({
                  id: "label.add_designation",
                })
              : intl.formatMessage({
                  id: "label.edit_designation",
                })
          }
          leftLabelTxt={intl.formatMessage({
            id: "label.cancel",
          })}
          rightLabelTxt={
            addDocumentModal
              ? intl.formatMessage({
                  id: "label.add",
                })
              : intl.formatMessage({
                  id: "label.edit",
                })
          }
          customStyles={styles.customModalStyle}
          onClickLeftButton={onClickAddDocumentCancelButton}
          onClickRightButton={onClickAddDocumentSaveButton}
        >
          <CustomTextInput
            isDropdown
            customStyle={styles.documentNameInput}
            label={intl.formatMessage({
              id: "label.add_designation",
            })}
            placeholder={intl.formatMessage({
              id: "label.designation",
            })}
            isMandatory
            valueField="id"
            value={documentDetail?.designation_details || ""}
            options={options?.map((option) =>
              createModuleOptions(option, [], "designation", "designation")
            )}
            onChangeValue={(data) => {
              handleDocumentDetailChange(
                designation_key.DESIGNATION_DETAILS,
                data
              );
            }}
          />
          <CustomTextInput
            customStyle={styles.documentNameInput}
            label={intl.formatMessage({
              id: "label.noOfVacancy",
            })}
            placeholder={intl.formatMessage({
              id: "label.noOfVacancy",
            })}
            isNumeric
            isMandatory
            value={documentDetail?.number_of_vacancies || ""}
            onChangeText={(val) =>
              handleDocumentDetailChange(
                designation_key.NUMBER_OF_VACANCIES,
                val
              )
            }
          />
        </ModalWithTitleButton>
      )}
    </View>
  );
};

AddDesignationTemplate.propTypes = {
  addDocumentModal: PropTypes.bool.isRequired,
  documentDetail: PropTypes.shape({
    documentName: PropTypes.string,
    documentType: PropTypes.string,
    copiesNumber: PropTypes.number,
  }).isRequired,
  editDocumentModal: PropTypes.bool.isRequired,
  handleDocumentDetailChange: PropTypes.func.isRequired,
  onClickAddDocument: PropTypes.func.isRequired,
  onClickAddDocumentCancelButton: PropTypes.func.isRequired,
  onClickAddDocumentSaveButton: PropTypes.func.isRequired,
  onClickDeleteDocument: PropTypes.func.isRequired,
  onCLickEditDocument: PropTypes.func.isRequired,
  requiredDocumentDetails: PropTypes.arrayOf(
    PropTypes.shape({
      documentName: PropTypes.string,
      documentType: PropTypes.string,
      copiesNumber: PropTypes.number,
    })
  ).isRequired,
};

AddDesignationTemplate.defaultProps = {
  addDocumentModal: false,
  documentDetail: {
    documentName: "",
    documentType: "",
    copiesNumber: 0,
  },
  editDocumentModal: false,
  handleDocumentDetailChange: () => {},
  onClickAddDocument: () => {},
  onClickAddDocumentCancelButton: () => {},
  onClickAddDocumentSaveButton: () => {},
  onClickDeleteDocument: () => {},
  onCLickEditDocument: () => {},
  requiredDocumentDetails: [],
};

export default AddDesignationTemplate;
