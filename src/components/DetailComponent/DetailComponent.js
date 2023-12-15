import React from "react";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import style from "./DetailComponent.style";

const DetailComponent = ({ details, headerText }) => {
  return (
    <View>
      {!!headerText && (
        <CommonText customTextStyle={style.headerText} title={headerText} />
      )}
      {details?.map((detail, index) => (
        <View key={index}>
          <View style={style.titleContainer}>
            <CommonText
              title={detail.title}
              customTextStyle={style.titleStyle}
            />
            <CommonText title=" *" customTextStyle={style.starStyle} />
          </View>
          <CommonText
            title={detail.value}
            customTextStyle={[
              style.valueStyle,
              detail.isLink && style.linkStyle,
            ]}
          />
        </View>
      ))}
    </View>
  );
};

DetailComponent.propTypes = {
  details: PropTypes.array.isRequired,
  headerText: PropTypes.string,
};

export default DetailComponent;
