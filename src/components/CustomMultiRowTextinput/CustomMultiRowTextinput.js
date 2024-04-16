import React, { useState } from "react";
import PropTypes from "prop-types";

import DetailCard from "../DetailCard/DetailCard";

const CustomMultiRowTextInput = ({
  customCardStyle,
  startRowHeaderList,
  startRowTemplate,
  gridTemplate,
  setGridTemplate,
  headerId,
  handleValueChange,
  numColsInARow = 4,
}) => {
  const handleChange = (_, inputValue, changedCellID) => {
    handleValueChange(_, inputValue, changedCellID);
  };

  const handleAddNewRow = (cellID) => {
    const newRowID = cellID + 1;
    const newRowTemplate = startRowTemplate.map((cell, index) => {
      return {
        ...cell,
        cellID: newRowID,
        isAdd: true,
      };
    });

    const newGridTemplate = gridTemplate.map((cell) => {
      return cell.cellID === cellID ? { ...cell, isAdd: false } : { ...cell };
    });
    setGridTemplate([...newGridTemplate, ...newRowTemplate]);
  };

  const handleDeleteRow = (cellID) => {
    const newGridTemplate = gridTemplate.filter(
      (cell) => cell.cellID !== cellID
    );
    setGridTemplate([...newGridTemplate]);
  };
  return (
    <DetailCard
      customCardStyle={customCardStyle}
      cols={numColsInARow}
      details={gridTemplate}
      footerId={"label.mandatory"}
      handleChange={handleChange}
      headerId={headerId}
      isEditProfile={true}
      onAdd={handleAddNewRow}
      onDelete={handleDeleteRow}
      tableHeaderList={startRowHeaderList}
    />
  );
};
CustomMultiRowTextInput.defaultProps = {
  startRowHeaderList: [],
  startRowTemplate: [],
  headerId: "",
};
CustomMultiRowTextInput.propTypes = {
  startRowHeaderList: PropTypes.array,
  startRowTemplate: PropTypes.array,
  headerId: PropTypes.string,
};
export default CustomMultiRowTextInput;
