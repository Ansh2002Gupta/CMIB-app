import { View } from "@unthinkable/react-core-components";
import React from "react";
import CommonText from "../../../../components/CommonText";
import styles from "./styles";
import CustomTextEditor from "../../../../components/CustomTextEditor";

const Description = ({ data, title, description, style }) => {
  const renderContent = (item) => {
    const { header, content, type } = item;
    let descriptionContent = null;

    if (type === "points") {
      descriptionContent = content.map((value) => {
        return (
          <View style={styles.pointsContainer}>
            <View style={styles.bulletDot} />
            <CommonText>{value}</CommonText>
          </View>
        );
      });
    } else {
      descriptionContent = <CommonText>{content}</CommonText>;
    }

    return (
      <View style={styles.contentContainer}>
        {header && (
          <CommonText customTextStyle={styles.sectionHeaderTextStyle}>
            {header}
          </CommonText>
        )}
        {descriptionContent}
      </View>
    );
  };

  return (
    <View style={[styles.container, style]}>
      <CommonText customTextStyle={styles.headerTextStyle}>{title}</CommonText>
      <CustomTextEditor
        value={description}
        disabled
        quilStyle={styles.quilStyle}
      />
      {data?.map((item) => renderContent(item))}
    </View>
  );
};

export default Description;
