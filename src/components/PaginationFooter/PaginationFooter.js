import React from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import CustomDropdown from "../CustomDropdown";
import Pagination from "../Pagination/Pagination";
import useIsWebView from "../../hooks/useIsWebView";
import images from "../../images";
import styles from "./PaginationFooter.style";

const PaginationFooter = ({
  currentPage,
  handlePageChange,
  handleRowPerPageChange,
  indexOfFirstRecord,
  indexOfLastRecord,
  rowsLimit,
  rowsToShow,
  siblingCount,
  totalcards,
}) => {
  const { isWebView } = useIsWebView();
  const intl = useIntl();
  return (
    <View
      style={isWebView ? styles.paginationFooterWeb : styles.paginationFooter}
    >
      <View style={isWebView ? styles.rowsPerPageWeb : styles.rowsPerPage}>
        <View style={styles.rowsPerPageWeb}>
          <CommonText customTextStyle={styles.rowsPerPageText}>
            {intl.formatMessage({ id: "label.rows_per_page" })}
          </CommonText>
          <CustomDropdown
            options={rowsLimit}
            onSelect={handleRowPerPageChange}
            placeholder={rowsToShow}
            dropdownIcon={images.iconArrowDown}
          />
        </View>
        {!isWebView && (
          <CommonText customTextStyle={styles.rowsPerPageText}>
            {`${indexOfFirstRecord} - ${indexOfLastRecord} of ${totalcards}`}
          </CommonText>
        )}
      </View>
      <Pagination
        {...{
          cardsPerPage: rowsToShow,
          currentPage,
          handlePageChange,
          prevNextBtnstyles:isWebView ? styles.previousButtonWeb : styles.previousButton,
          siblingCount,
          totalcards,
          }}
      />
    </View>
  );
};

PaginationFooter.defaultProps = {
  currentPage: 1,
  handlePageChange: () => {},
  handleRowPerPageChange: () => {},
  indexOfFirstRecord: 0,
  indexOfLastRecord: 0,
  rowsLimit: [],
  rowsToShow: 10,
  siblingCount:1,
  totalcards: 0,
};

PaginationFooter.propTypes = {
  currentPage: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  handleRowPerPageChange: PropTypes.func.isRequired,
  indexOfFirstRecord: PropTypes.number.isRequired,
  indexOfLastRecord: PropTypes.number.isRequired,
  rowsLimit: PropTypes.array.isRequired,
  rowsToShow: PropTypes.number.isRequired,
  siblingCount: PropTypes.number.isRequired,
  totalcards: PropTypes.number.isRequired,
};

export default PaginationFooter;
