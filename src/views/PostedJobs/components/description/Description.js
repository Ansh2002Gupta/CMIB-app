import React from "react";
import { View } from "@unthinkable/react-core-components";
import { useTheme } from "@unthinkable/react-theme";

import CommonText from "../../../../components/CommonText";
import CustomTextEditor from "../../../../components/CustomTextEditor";
import getStyles from "./styles";

const Description = ({ data, title, description, style }) => {
  const theme = useTheme();
  const styles = getStyles(theme);

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
      <CommonText customTextStyle={styles.headerTextStyle} fontWeight={"600"}>
        {title}
      </CommonText>
      <CustomTextEditor
        value={description}
        disabled
        quilStyle={styles.quilStyle}
        quillContainerStyle={styles.quillContainerStyle}
      />
      {data?.map((item) => renderContent(item))}
    </View>
  );
};

export default Description;
