import React, { useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";

import TwoColumn from "../../core/layouts/TwoColumn/TwoColumn";

import CommonText from "../CommonText";
import CustomImage from "../CustomImage";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import { PLACE_OF_POSTING } from "../../constants/constants";
import images from "../../images";
import styles from "./EditDeleteAction.style";

const EditDeleteAction = ({
  bottomLeftText,
  bottomRightText,
  customContainerStyle,
  isCategory,
  onEditDocument,
  onDeleteDocument,
  requiredPostingPlaceDetail,
  topText,
  bottomView,
}) => {
  const intl = useIntl();
  const [isCategoriesVisible, setIsCategoriesVisible] = useState(false);
  const toggleCategories = () => {
    setIsCategoriesVisible((prevState) => !prevState);
  };

  const entries = requiredPostingPlaceDetail
    ? Object.entries(requiredPostingPlaceDetail)
    : [];

  return (
    <>
      <TwoColumn
        style={{ ...styles.mainView, ...customContainerStyle }}
        leftSection={
          <View style={styles.leftSectionStyle}>
            <CommonText customTextStyle={styles.topTextStyle}>
              {topText}
            </CommonText>
            {!bottomView ? (
              <View style={styles.textViewStyle}>
                <View style={styles.middleDotView}>
                  {bottomLeftText ? (
                    <CommonText customTextStyle={styles.bottomLeftTextStyle}>
                      {bottomLeftText}
                    </CommonText>
                  ) : (
                    <></>
                  )}
                  {!isCategory || bottomLeftText ? (
                    <View style={styles.middleDotStyle} />
                  ) : (
                    <></>
                  )}
                </View>
                {!isCategory ? (
                  <CommonText customTextStyle={styles.bottomRightTextStyle}>
                    {bottomRightText}
                  </CommonText>
                ) : (
                  <></>
                )}
                {isCategory ? (
                  <CustomTouchableOpacity onPress={toggleCategories}>
                    <CommonText
                      customContainerStyle={styles.customContainerStyle}
                      customTextStyle={styles.catrgoryTextStyle}
                      fontWeight="600"
                    >
                      {intl.formatMessage({ id: "label.categories" })}
                    </CommonText>
                    <CustomImage
                      source={
                        isCategoriesVisible
                          ? images.iconUpArrow
                          : images.iconDownArrow
                      }
                      style={styles.iconDownArrowStyle}
                    />
                  </CustomTouchableOpacity>
                ) : null}
              </View>
            ) : (
              bottomView
            )}
          </View>
        }
        isLeftFillSpace
        rightSection={
          (onEditDocument || onDeleteDocument) && (
            <View style={styles.rightSectionStyle}>
              {onEditDocument && (
                <CustomTouchableOpacity onPress={onEditDocument}>
                  <CustomImage
                    source={images.iconEditBlue}
                    style={styles.iconEditStyle}
                  />
                </CustomTouchableOpacity>
              )}
              {onDeleteDocument && (
                <CustomTouchableOpacity onPress={onDeleteDocument}>
                  <CustomImage
                    source={images.iconTrash}
                    style={styles.iconDeleteStyle}
                  />
                </CustomTouchableOpacity>
              )}
            </View>
          )
        }
      />
      {isCategoriesVisible ? (
        <CommonText customTextStyle={styles.categoriesText}>
          {entries
            .filter(
              ([key, _]) =>
                key.toLowerCase() !== PLACE_OF_POSTING.TOTAL &&
                key !== PLACE_OF_POSTING.POSTING_PLACE &&
                key !== "cellID"
            )
            .map(([key, value]) => `${key.toUpperCase()}: ${value}`)
            .join("   ·  ")}
        </CommonText>
      ) : (
        <></>
      )}
    </>
  );
};

EditDeleteAction.defaultProps = {
  bottomLeftText: "",
  bottomRightText: "",
  customContainerStyle: {},
  isCategory: false,
  onEditDocument: () => {},
  onDeleteDocument: () => {},
  requiredPostingPlaceDetail: null,
  topText: "",
};

EditDeleteAction.propTypes = {
  bottomLeftText: PropTypes.string,
  bottomRightText: PropTypes.string,
  customContainerStyle: PropTypes.object,
  isCategory: PropTypes.bool,
  onEditDocument: PropTypes.func,
  onDeleteDocument: PropTypes.func,
  requiredPostingPlaceDetail: PropTypes.object,
  topText: PropTypes.string,
};

export default EditDeleteAction;
