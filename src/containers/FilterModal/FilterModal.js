import React, { useState } from "react";
import { useIntl } from "react-intl";
import {  View } from "@unthinkable/react-core-components";

import { ThreeRow, TwoColumn } from "../../core/layouts";

import ActionPairButton from "../../components/ActionPairButton";
import CommonText from "../../components/CommonText";
import CustomModal from "../../components/CustomModal";
import CustomTouchableOpacity from "../../components/CustomTouchableOpacity";
import useIsWebView from "../../hooks/useIsWebView";
import images from "../../images";
import styles from "./FilterModal.style";

import CheckBox from "../../components/CheckBox/CheckBox";
import CustomImage from "../../components/CustomImage";

const FilterModal = ({ onPressIconCross }) => {
  const [selected, setSelected] = useState(false);

  const onClickOnButton = () => {
    setSelected((prev) => !prev);
  };
  const intl = useIntl();
  const { isWebView } = useIsWebView();

  const RenderCheckButton = ({ title, isLeftArrow = false }) => {
    return (
      <View style={styles.renderCheckButton}>
        <CheckBox
          title={title}
          isSelected={selected}
          handleCheckbox={onClickOnButton}
          id={"1"}
        />
        {isLeftArrow && (
          <CustomImage
            source={images.iconArrowRight}
            style={styles.arrowRight}
          />
        )}
      </View>
    );
  };

  return (
    <CustomModal
      customInnerContainerStyle={styles.customerInnerContainerStyle}
    >
      <ThreeRow
        topSection={
          <View style={styles.headerSection}>
            <CommonText fontWeight={"600"} customTextStyle={styles.headerText}>
              Filters
            </CommonText>
            <CustomTouchableOpacity>
              <CommonText customTextStyle={styles.clearAll} isunderLine>
                Clear all
              </CommonText>
            </CustomTouchableOpacity>
          </View>
        }
        middleSectionStyle={styles.middleSectionStyle}
        middleSection={
          <TwoColumn
            leftSection={
              <>
                <RenderCheckButton title={"Status"} isLeftArrow={true} />
                <RenderCheckButton title={"Query Type"} />
              </>
            }
            leftSectionStyle={styles.leftSection}
            rightSectionStyle={styles.rightSection}
            rightSection={
              <View>
                <RenderCheckButton title={"Pending"} />
                <RenderCheckButton title={"In Progress"} />
                <RenderCheckButton title={"Closed"} />
              </View>
            }
          />
        }
        bottomSection={
          <View
            style={
              isWebView ? styles.bottomSection : styles.bottomSectionMobile
            }
          >
            {isWebView && <View style={{ width: "50%" }} />}
            <ActionPairButton
              buttonOneText={intl.formatMessage({ id: "label.cancel" })}
              buttonTwoText={intl.formatMessage({ id: "label.show_result" })}
              displayLoader={false}
              isButtonTwoGreen
              onPressButtonOne={onPressIconCross}
              onPressButtonTwo={() => {}}
            />
          </View>
        }
      />
    </CustomModal>
  );
};

export default FilterModal;
