import React from "react";
import PropTypes from "prop-types";
import { View, Text } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import CustomButton from "../CustomButton";
import images from "../../images";
import styles from "./Pagination.style";

export const DOTS = "...";

const range = (start, end) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

function Pagination(props) {
  const {
    cardsPerPage,
    totalCards,
    setCurrentPage,
    currentPage,
    pageStyles,
    customPageBtnStyles,
    customSelectedPageStyles,
    prevNextBtnstyles,
    siblingCount = 1,
    isWebView,
  } = props;

  const totalPages = totalCards ? Math.ceil(totalCards / cardsPerPage) : null;

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
    setCurrentPage(currentPage - 1);
  };

  const nextPageHandler = () => {
    setCurrentPage(currentPage + 1);
  };

  const paginate = (number) => {
    if (+currentPage === +number) {
      return;
    }
    setCurrentPage(number);
  };

  if (totalPages && currentPage > totalPages) {
    setCurrentPage(currentPage - 1);
  }

  const lastPage = paginationRange()[paginationRange().length - 1];

  if (!totalPages) {
    return <View />;
  }

  return (
    <View style={styles.pagination}>
      <CustomButton
        style={prevNextBtnstyles}
        onPress={previousPageHandler}
        disabled={currentPage <= 1}
        iconLeft={{
          isLeftIconNotSvg: false,
          leftIconSource: images.iconArrowLeft,
        }}
      >
        <CommonText
          title={isWebView ? "Previous" : ""}
          customTextStyle={styles.previousText}
        />
      </CustomButton>
      <View style={styles.paginationRange}>
        {paginationRange().map((page, idx) => {
          if (page === DOTS) {
            return (
              <Text key={idx} style={{ marginHorizontal: 5 }}>
                {DOTS}
              </Text>
            );
          }
          return (
            <CustomButton
              style={
                currentPage === page
                  ? styles.activeButton
                  : styles.inActiveButton
              }
              key={idx}
              onPress={() => paginate(page)}
            >
              <CommonText
                title={page}
                customTextStyle={
                  currentPage === page ? styles.activeText : styles.inActiveText
                }
              />
            </CustomButton>
          );
        })}
      </View>

      <CustomButton
        style={prevNextBtnstyles}
        onPress={nextPageHandler}
        disabled={currentPage === lastPage}
        iconRight={{
          isRightIconNotSvg: true,
          rightIconSource: images.iconArrowRightBlack,
        }}
      >
        <CommonText
          title={isWebView ? "Next" : ""}
          customTextStyle={styles.previousText}
        />
      </CustomButton>
    </View>
  );
}

Pagination.propTypes = {
  cardsPerPage: PropTypes.number,
  totalCards: PropTypes.number,
  setCurrentPage: PropTypes.func,
  currentPage: PropTypes.number,
  pageStyles: PropTypes.object,
  customPageBtnStyles: PropTypes.object,
  customSelectedPageStyles: PropTypes.object,
  prevNextBtnstyles: PropTypes.object,
  siblingCount: PropTypes.number,
  isWebView: PropTypes.bool,
};

export default Pagination;
