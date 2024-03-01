import React from "react";
import PropTypes from "prop-types";

import CardComponent from "../../components/CardComponent/CardComponent";
import DetailComponent from "../../components/DetailComponent";

import style from "./DetailCard.style";

const DetailCard = ({
  customCardStyle,
  customContainerStyle,
  details,
  handleChange,
  handleSwitchChange,
  headerId,
  index,
  isActive,
  isEditProfile,
  isRow,
  isShowSwitch,
  otherDetails,
}) => {
  return (
    <CardComponent customStyle={{ ...style.cardStyle, ...customCardStyle }}>
      <DetailComponent
        customContainerStyle={
          isRow
            ? { ...style.customStyle, ...customContainerStyle }
            : { ...customContainerStyle }
        }
        details={details}
        handleChange={handleChange}
        handleSwitchChange={handleSwitchChange}
        headerText={headerId}
        index={index}
        isActive={isActive}
        isEditable={isEditProfile}
        isShowSwitch={isShowSwitch}
      />
      {!!otherDetails && (
        <DetailComponent
          details={otherDetails}
          isEditable={isEditProfile}
          handleChange={handleChange}
        />
      )}
    </CardComponent>
  );
};

DetailCard.defaultProps = {
  customCardStyle: {},
  customContainerStyle: {},
  details: [],
  handleChange: () => {},
  handleSwitchChange: () => {},
  headerId: "",
  isActive: false,
  isEditProfile: false,
  isRow: false,
  isShowSwitch: false,
  otherDetails: [],
};

DetailCard.propTypes = {
  customCardStyle: PropTypes.object,
  customContainerStyle: PropTypes.object,
  details: PropTypes.array,
  handleChange: PropTypes.func,
  handleSwitchChange: PropTypes.func,
  headerId: PropTypes.string,
  index: PropTypes.number,
  isActive: PropTypes.bool,
  isEditProfile: PropTypes.bool,
  isRow: PropTypes.bool,
  isShowSwitch: PropTypes.bool,
  otherDetails: PropTypes.array,
};

export default DetailCard;
