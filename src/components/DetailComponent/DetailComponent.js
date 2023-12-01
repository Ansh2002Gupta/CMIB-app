import React from "react";
import PropTypes from "prop-types";
import { View, Text } from "@unthinkable/react-core-components";
import style from "./DetailComponent.style";

const DetailComponent = ({ details, headerText }) => {
  return (
    <View>
      {headerText && <Text style={style.headerText}>{headerText}</Text>}
      {details.map((detail, index) => (
        <View style={style.detailItem}>
          <View style={style.titleContainer}>
            <Text style={style.titleStyle}>{detail.title}</Text>
            <Text style={style.starStyle}> *</Text>
          </View>

          <Text style={[style.valueStyle, detail.isLink && style.linkStyle]}>
            {detail.value}
          </Text>
        </View>
      ))}
    </View>
  );
};

DetailComponent.propTypes = {
  details: PropTypes.array.isRequired,
  headerText: PropTypes.string.isRequired,
};

export default DetailComponent;
