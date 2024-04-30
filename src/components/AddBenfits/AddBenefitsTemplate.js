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
import { OTHER_BENEFIT_HEADING, benefits_key } from "../../constants/constants";
import commonStyles from "../../theme/styles/commonStyles";
import getStyles from "./AddBenefits.style";

const AddBenefitsTemplate = ({
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
}) => {
  const intl = useIntl();
  const { isWebView } = useIsWebView();
  const theme = useTheme();
  const styles = getStyles(theme);

  function mapDocuments(dataArray) {
    const groupedData = {};
    dataArray.forEach((item) => {
      if (!groupedData[item.cellID]) {
        groupedData[item.cellID] = {};
      }
      switch (item.key) {
        case "benefits_details":
          groupedData[item.cellID].benefits_details = item.value;
          break;
        case "benefits_amount":
          groupedData[item.cellID].benefits_amount = item.value;
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
            {item?.benefits_details || "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("10%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
            {item?.benefits_amount || "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("10%"),
        isFillSpace: true,
      },
    ];
  };

  const dataArr = Object.values(
    requiredDocumentDetails.reduce((acc, item) => {
      if (!acc[item.cellID]) acc[item.cellID] = {};
      const group = acc[item.cellID];
      if (item.key === "benefits_details") {
        group.benefits_details = item.value ?? "-";
      } else if (item.key === "benefits_amount") {
        group.benefits_amount = item.value;
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
        {intl.formatMessage({
          id: "label.other_Benefits",
        })}
      </CommonText>
      {isWebView ? (
        <CustomMultiRowTextInput
          customCardStyle={styles.multiRowTextStyle}
          isEditProfile={isEditable}
          startRowTemplate={addDocumentField}
          gridTemplate={multiDocumentDetail}
          setGridTemplate={setMultiDocumentDetail}
          numColsInARow={3}
          handleValueChange={({ index, propertyName, value }) => {
            handleMultiRowDocumentDetails(propertyName, value, index);
          }}
          customWebContainerStyle={styles.customWebContainerStyle}
          getColoumConfigs={getColoumConfigs}
          tableData={nonEditableData}
          tableHeading={OTHER_BENEFIT_HEADING}
        />
      ) : (
        <>
          {dataArr.map((item, index) => {
            return (
              <View>
                <View
                  style={
                    index !== 0
                      ? { ...styles.documentBorderStyle }
                      : { ...styles.notBorderStyle }
                  }
                ></View>
                <EditDeleteAction
                  topText={item?.benefits_details}
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
                      {`${item?.benefits_amount ?? "-"} INR`}
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
                id: "label.addBenefit",
              })}
              onPress={() => onClickAddDocument(dataArr.length + 1)}
            />
          )}
        </>
      )}
      {(addDocumentModal || editDocumentModal) && (
        <ModalWithTitleButton
          enableBottomButton
          isRightDisabled={!isFormValid}
          heading={
            addDocumentModal
              ? intl.formatMessage({
                  id: "label.addBenefit",
                })
              : intl.formatMessage({
                  id: "label.editBenefit",
                })
          }
          leftLabelTxt={intl.formatMessage({
            id: "label.cancel",
          })}
          headerTextStyle={{ marginBottom: 12 }}
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
          <View>
            <CustomTextInput
              customStyle={styles.documentNameInput}
              label={intl.formatMessage({
                id: "label.benefit_details",
              })}
              placeholder={intl.formatMessage({
                id: "label.enter_benefit_details",
              })}
              isMandatory
              value={documentDetail?.[benefits_key.BENEFITS_DETAILS] || ""}
              onChangeText={(val) =>
                handleDocumentDetailChange(benefits_key.BENEFITS_DETAILS, val)
              }
            />
            <CustomTextInput
              customStyle={styles.documentNameInput}
              label={intl.formatMessage({
                id: "label.amount",
              })}
              placeholder={intl.formatMessage({
                id: "label.enter_amount",
              })}
              isNumeric
              isMandatory
              value={documentDetail?.[benefits_key.BENEFITS_AMOUNT] || ""}
              onChangeText={(val) =>
                handleDocumentDetailChange(benefits_key.BENEFITS_AMOUNT, val)
              }
            />
          </View>
        </ModalWithTitleButton>
      )}
    </View>
  );
};

AddBenefitsTemplate.propTypes = {
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

AddBenefitsTemplate.defaultProps = {
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

export default AddBenefitsTemplate;
