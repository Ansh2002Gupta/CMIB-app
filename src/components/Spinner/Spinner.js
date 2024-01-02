import React from "react";
import PropTypes from "prop-types";

import styles from "./Spinner.module.css";

const Spinner = ({ color, size, thickness }) => {
  const getLoaderSize = () => {
    switch (size) {
      case "xs":
        return styles["lds-ring-x-small"];
      case "sm":
        return styles["lds-ring-small"];
      case "md":
        return styles["lds-ring-medium"];
      case "lg":
        return styles["lds-ring-large"];
      case "xl":
        return styles["lds-ring-x-large"];
      default:
        return styles["lds-ring-x-normal"];
    }
  };

  const addStyle = () => {
    let stylesObj = {};
    if (color) {
      stylesObj = {
        borderColor: `${color} transparent transparent transparent`,
      };
    }
    if (thickness) {
      stylesObj = { ...stylesObj, ...{ borderWidth: thickness } };
    }
    return stylesObj;
  };

  return (
    // Reason for not using View: View is adding some default styles which were not required for the Spinner on web. Shouldn't be a problem as we already have a separate file for the react-native
    <div className={`${getLoaderSize()} ${styles["lds-ring"]}`}>
      {Array.from(Array(4)).map((item, idx) => (
        <div key={idx} style={addStyle()}></div>
      ))}
    </div>
  );
};

Spinner.defaultProps = {
  color: "",
  thickness: 6,
};

Spinner.propTypes = {
  color: PropTypes.string,
  thickness: PropTypes.number,
};

export default Spinner;
