import React from "react";
import { useIntl } from "react-intl";
import { useTheme } from "@unthinkable/react-theme";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import CustomDropdown from "../CustomDropdown";
import Pagination from "../Pagination/Pagination";
import useIsWebView from "../../hooks/useIsWebView";
import images from "../../images";
import getStyles from "./PaginationFooter.style";

const PaginationFooter = ({
  currentPage,
  handlePageChange,
  handleRowPerPageChange,
  indexOfFirstRecord,
  indexOfLastRecord,
  rowsLimit,
  rowsPerPage,
  siblingCount,
  totalcards,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);
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
            placeholder={rowsPerPage}
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
          cardsPerPage: rowsPerPage,
          currentPage,
          handlePageChange,
          prevNextBtnstyles: isWebView
            ? styles.previousButtonWeb
            : styles.previousButton,
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
  rowsPerPage: 10,
  siblingCount: 1,
  totalcards: 0,
};

PaginationFooter.propTypes = {
  currentPage: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  handleRowPerPageChange: PropTypes.func.isRequired,
  indexOfFirstRecord: PropTypes.number.isRequired,
  indexOfLastRecord: PropTypes.number.isRequired,
  rowsLimit: PropTypes.array.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  siblingCount: PropTypes.number.isRequired,
  totalcards: PropTypes.number.isRequired,
};

export default PaginationFooter;
