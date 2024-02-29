import React from "react";
import PropTypes from "prop-types";

import CardComponent from "../../components/CardComponent/CardComponent";
import DetailComponent from "../../components/DetailComponent";

import style from "./DetailCard.style";

const DetailCard = ({
  customCardStyle,
  details,
  handleChange,
  headerId,
  isEditProfile,
  isRow,
  otherDetails,
}) => {
  return (
    <CardComponent customStyle={{ ...style.cardStyle, ...customCardStyle }}>
      <DetailComponent
        customContainerStyle={isRow ? style.customStyle : {}}
        details={details}
        headerText={headerId}
        isEditable={isEditProfile}
        handleChange={handleChange}
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
  details: [],
  handleChange: () => {},
  headerId: "",
  isEditProfile: false,
  isRow: false,
  otherDetails: [],
};

DetailCard.propTypes = {
  customCardStyle: PropTypes.object,
  details: PropTypes.array,
  handleChange: PropTypes.func,
  headerId: PropTypes.string,
  isEditProfile: PropTypes.bool,
  isRow: PropTypes.bool,
  otherDetails: PropTypes.array,
};

export default DetailCard;
