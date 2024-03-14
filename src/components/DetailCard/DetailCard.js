import React from "react";
import PropTypes from "prop-types";

import CardComponent from "../../components/CardComponent/CardComponent";
import DetailComponent from "../../components/DetailComponent";
import useIsWebView from "../../hooks/useIsWebView";
import style from "./DetailCard.style";

const DetailCard = ({
  customCardStyle,
  customContainerStyle,
  details,
  handleBlur,
  handleChange,
  handleSwitchChange,
  handleMultiSelect,
  hasActionButton,
  headerId,
  index,
  isActive,
  isEditProfile,
  isRow,
  isShowSwitch,
  onPressActionButton,
  otherDetails,
}) => {
  const { isWebView } = useIsWebView();
  return (
    <CardComponent customStyle={{ ...style.cardStyle, ...customCardStyle }}>
      <DetailComponent
        customContainerStyle={{
          ...(isRow ? style.customStyle : {}),
          ...customContainerStyle,
        }}
        details={details}
        handleBlur={handleBlur}
        handleChange={handleChange}
        handleMultiSelect={handleMultiSelect}
        handleSwitchChange={handleSwitchChange}
        hasActionButton={isWebView && hasActionButton}
        headerText={headerId}
        index={index}
        isActive={isActive}
        isEditable={isEditProfile}
        isInputDisable={isShowSwitch && !isActive}
        isShowSwitch={isShowSwitch}
        onPressActionButton={onPressActionButton}
      />
      {!!otherDetails && (
        <DetailComponent
          details={otherDetails}
          handleBlur={handleBlur}
          handleChange={handleChange}
          hasActionButton={!isWebView && hasActionButton}
          index={index}
          isEditable={isEditProfile}
          isInputDisable={isShowSwitch && !isActive}
          onPressActionButton={onPressActionButton}
        />
      )}
    </CardComponent>
  );
};

DetailCard.defaultProps = {
  customCardStyle: {},
  customContainerStyle: {},
  details: [],
  handleBlur: () => {},
  handleChange: () => {},
  handleSwitchChange: () => {},
  hasActionButton: false,
  headerId: "",
  isActive: false,
  isEditProfile: false,
  isRow: false,
  isShowSwitch: false,
  onPressActionButton: () => {},
  otherDetails: [],
};

DetailCard.propTypes = {
  customCardStyle: PropTypes.object,
  customContainerStyle: PropTypes.object,
  details: PropTypes.array,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  handleSwitchChange: PropTypes.func,
  hasActionButton: PropTypes.bool,
  headerId: PropTypes.string,
  index: PropTypes.number,
  isActive: PropTypes.bool,
  isEditProfile: PropTypes.bool,
  isRow: PropTypes.bool,
  isShowSwitch: PropTypes.bool,
  onPressActionButton: PropTypes.func,
  otherDetails: PropTypes.array,
};

export default DetailCard;
