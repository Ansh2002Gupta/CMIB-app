import React, { useState } from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";

import DetailCard from "../DetailCard/DetailCard";
import styles from "./CustomMultiRowTextinput.style";
import { document_keys } from "../../constants/constants";
import CustomTable from "../CustomTable";

const CustomMultiRowTextInput = ({
  customWebContainerStyle,
  customCardStyle,
  startRowHeaderList,
  startRowTemplate,
  gridTemplate,
  setGridTemplate,
  isEditProfile = true,
  setObjectGridTemplate,
  tableData,
  getColoumConfigs,
  renderFooterComponenet,
  tableHeading,
  headerId,
  footerId,
  handleValueChange,
  numColsInARow = 4,
  customContainerStyle,
}) => {
  const intl = useIntl();
  const handleChange = (label, inputValue, index, id, changedCellID) => {
    handleValueChange({
      propertyName: label,
      value: inputValue,
      id,
      cellID: changedCellID,
      index,
    });
  };

  const isEmptyCellPresent = () => {
    let wasThereEmptyCell = false;
    const updatedGridTemplate = gridTemplate.map((cell) => {
      if (!cell.isButton && !cell.value) {
        wasThereEmptyCell = true;
        return {
          ...cell,
          isError: true,
          error: intl.formatMessage({ id: "label.error.cannot_be_empty" }),
        };
      }
      return { ...cell, isError: null, error: null };
    });
    !!setObjectGridTemplate
      ? setObjectGridTemplate([...updatedGridTemplate])
      : setGridTemplate([...updatedGridTemplate]);
    return wasThereEmptyCell;
  };

  const handleAddNewRow = (cellID) => {
    if (isEmptyCellPresent()) return;
    const newRowID = cellID + 1;
    const newRowTemplate = startRowTemplate?.map((cell, index) => {
      return {
        ...cell,
        cellID: newRowID,
        isAdd: true,
      };
    });

    const newGridTemplate = gridTemplate.map((cell) => {
      return cell.cellID === cellID ? { ...cell, isAdd: false } : { ...cell };
    });
    !!setObjectGridTemplate
      ? setObjectGridTemplate([...newGridTemplate, ...newRowTemplate])
      : setGridTemplate([...newGridTemplate, ...newRowTemplate]);
  };

  const handleDeleteRow = (cellID) => {
    const newGridTemplate = gridTemplate.filter(
      (cell) => cell.cellID !== cellID
    );
    !!setObjectGridTemplate
      ? setObjectGridTemplate([...newGridTemplate])
      : setGridTemplate([...newGridTemplate]);
  };

  return isEditProfile ? (
    <DetailCard
      customCardStyle={customCardStyle}
      cols={numColsInARow}
      details={gridTemplate}
      footerId={footerId ?? "label.one_mandatory"}
      handleChange={handleChange}
      headerId={headerId}
      isRow={false}
      isEditProfile={isEditProfile}
      onAdd={handleAddNewRow}
      customErrorViewStyle={styles.detailErrorViewStyle}
      onDelete={handleDeleteRow}
      tableHeaderList={startRowHeaderList}
      customContainerStyle={{
        ...styles.customContainerStyle,
        ...customContainerStyle,
      }}
      customWebContainerStyle={{
        ...styles.customWebContainerStyle,
        ...customWebContainerStyle,
      }}
    />
  ) : (
    <CustomTable
      {...{
        customTableStyle: styles.customTableStyle,
        showSearchBar: false,
        currentRecords: tableData,
        data: tableData,
        getColoumConfigs,
        isShowPagination: false,
        isHeading: true,
        tableHeading: tableHeading,
        isRenderFooterComponent: true,
        renderFooterComponenet,
      }}
    />
  );
};
CustomMultiRowTextInput.defaultProps = {
  startRowHeaderList: [],
  startRowTemplate: [],
  headerId: "",
  getColoumConfigs: () => {},
};
CustomMultiRowTextInput.propTypes = {
  startRowHeaderList: PropTypes.array,
  startRowTemplate: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  headerId: PropTypes.string,
  getColoumConfigs: PropTypes.func,
};
export default CustomMultiRowTextInput;
