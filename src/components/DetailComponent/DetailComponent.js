import React from "react";
import PropTypes from "prop-types";
import { View, Text } from "@unthinkable/react-core-components";
import style from "./DetailComponent.style";

const DetailComponent = ({ details }) => {
  return (
    <View style={style.container}>
      {details.map((detail, index) => (
        <View style={style.detailItem}>
          <View style={style.titleContainer}>
            <Text style={style.titleStyle}>{detail.title}</Text>
            <Text style={style.starStyle}> *</Text>
          </View>

          <Text style={style.valueStyle}>{detail.value}</Text>
        </View>
      ))}
    </View>
  );
};

DetailComponent.propTypes = {
  details: PropTypes.array.isRequired,
};

export default DetailComponent;
