import React from "react";
import { useIntl } from "react-intl";
import { Linking, View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import CustomImage from "../CustomImage";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import images from "../../images";
import { getFileExtension, getValidUrl } from "../../utils/util";
import styles from "./PdfCard.styles";

const getFileTypeLabel = (ext) => {
  let extObj = {
    doc: "label.viewDoc",
    docx: "label.viewDoc",
    ppt: "label.viewPPT",
    pptx: "label.viewPPT",
    pdf: "label.viewPdf",
  };

  return extObj[ext] ? extObj[ext] : "label.view";
};

const getDocIcon = (ext) => {
  let extObj = {
    doc: images.iconDoc,
    docx: images.iconDoc,
    ppt: images.iconPPT,
    pptx: images.iconPPT,
    pdf: images.iconPDF,
  };
  return extObj[ext] ? extObj[ext] : images.iconDocument;
};

const PdfCard = ({ pdfUrl }) => {
  const intl = useIntl();
  const icon = getDocIcon(getFileExtension({ fileName: pdfUrl }));

  return (
    <View style={styles.container}>
      <CustomImage
        alt="Pdf"
        height={50}
        Icon={icon}
        isSvg
        source={icon}
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
          {intl.formatMessage({
            id: getFileTypeLabel(getFileExtension({ fileName: pdfUrl })) ?? "",
          })}
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
