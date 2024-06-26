import React from "react";
import { useIntl } from "react-intl";
import { useTheme } from "@unthinkable/react-theme";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";
import { useWindowDimensions } from "@unthinkable/react-theme/src/useWindowDimensions";

import CommonText from "../CommonText";
import CustomButton from "../CustomButton";
import images from "../../images";
import { DOTS } from "../../constants/constants";
import getStyles from "./Pagination.style";

const range = (start, end) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};
function Pagination(props) {
  const {
    cardsPerPage,
    currentPage,
    handlePageChange,
    prevNextBtnstyles,
    siblingCount,
    totalcards,
    containerStyle,
  } = props;
  const intl = useIntl();
  const theme = useTheme();
  const styles = getStyles(theme);
  const windowDimensions = useWindowDimensions();
  const showbuttonText = windowDimensions.width >= 900;

  const totalPages = totalcards ? Math.ceil(totalcards / cardsPerPage) : 1;

  const paginationRange = () => {
    const totalPageNumbers = siblingCount + 5;
    if (totalPageNumbers >= totalPages) {
      return range(1, totalPages);
    }
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);
      return [...leftRange, DOTS, totalPages];
    }
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(totalPages - rightItemCount + 1, totalPages);
      return [firstPageIndex, DOTS, ...rightRange];
    }
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  };
  const previousPageHandler = () => {
    if (currentPage <= 1) {
      return;
    }
    handlePageChange(currentPage - 1);
  };
  const nextPageHandler = () => {
    if (currentPage === lastPage) {
      return;
    }
    handlePageChange(currentPage + 1);
  };
  const paginate = (number) => {
    if (+currentPage === +number) {
      return;
    }
    handlePageChange(number);
  };
  if (totalPages && currentPage > totalPages) {
    handlePageChange(1);
  }
  const lastPage = paginationRange()[paginationRange().length - 1];
  if (!totalPages) {
    return <></>;
  }
  return (
    <View style={{ ...styles.pagination, ...containerStyle }}>
      <CustomButton
        style={prevNextBtnstyles}
        onPress={previousPageHandler}
        disabled={currentPage <= 1}
        disabledStyle={styles.disabled}
        iconLeft={{
          isLeftIconNotSvg: false,
          leftIconSource: images.iconArrowLeft,
        }}
      >
        {showbuttonText && (
          <CommonText customTextStyle={styles.previousText}>
            {intl.formatMessage({ id: "label.previous" })}
          </CommonText>
        )}
      </CustomButton>
      <View style={styles.paginationRange}>
        {paginationRange().map((page, idx) => {
          const activePage = currentPage === page;
          const activeButton = activePage
            ? styles.activeButton
            : styles.inActiveButton;
          const activeText = activePage
            ? styles.activeText
            : styles.inActiveText;
          if (page === DOTS) {
            return (
              <CommonText key={idx} style={styles.dotsStyles}>
                {DOTS}
              </CommonText>
            );
          }
          return (
            <CustomButton
              style={activeButton}
              key={idx}
              onPress={() => paginate(page)}
              disabled={!totalcards}
              disabledStyle={styles.disabled}
            >
              <CommonText customTextStyle={activeText}>{page}</CommonText>
            </CustomButton>
          );
        })}
      </View>
      <CustomButton
        style={prevNextBtnstyles}
        onPress={nextPageHandler}
        disabledStyle={styles.disabled}
        disabled={currentPage === lastPage}
        iconRight={{
          isRightIconNotSvg: true,
          rightIconSource: images.iconArrowRightBlack,
        }}
      >
        {showbuttonText && (
          <CommonText customTextStyle={styles.previousText}>
            {intl.formatMessage({ id: "label.next" })}
          </CommonText>
        )}
      </CustomButton>
    </View>
  );
}

Pagination.defaultProps = {
  cardsPerPage: 10,
  currentPage: 1,
  handlePageChange: () => {},
  prevNextBtnstyles: {},
  siblingCount: 1,
  totalcards: 0,
};
Pagination.propTypes = {
  cardsPerPage: PropTypes.number,
  currentPage: PropTypes.number,
  handlePageChange: PropTypes.func,
  prevNextBtnstyles: PropTypes.object,
  siblingCount: PropTypes.number,
  totalcards: PropTypes.number,
};
export default Pagination;
