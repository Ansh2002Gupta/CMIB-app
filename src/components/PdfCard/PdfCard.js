import React from "react";
import { useIntl } from "react-intl";
import { Linking, View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import CustomImage from "../CustomImage";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import images from "../../images";
import { getValidUrl } from "../../utils/util";
import styles from "./PdfCard.styles";

const PdfCard = ({ pdfUrl }) => {
  const intl = useIntl();

  return (
    <View style={styles.container}>
      <CustomImage
        alt="Pdf"
        height={50}
        Icon={images.pdfIcon}
        isSvg
        source={images.pdfIcon}
        style={styles.pdfImage}
        width={50}
      />
      <CustomTouchableOpacity
        onPress={() => {
          Linking.openURL(getValidUrl(pdfUrl), "_blank");
        }}
        style={styles.linkBtn}
      >
        <CommonText customTextStyle={styles.pdfLink} fontWeight="600">
          {intl.formatMessage({ id: "label.viewPdf" })}
        </CommonText>
        <CustomImage
          alt="Right diagonal arrow"
          Icon={images.rightDiagonalArrow}
          isSvg
          source={images.rightDiagonalArrow}
          style={styles.arrowIconStyles}
        />
      </CustomTouchableOpacity>
    </View>
  );
};

export default PdfCard;
