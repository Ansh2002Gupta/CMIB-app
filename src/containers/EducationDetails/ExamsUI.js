import { View, ScrollView } from "@unthinkable/react-core-components";
import React from "react";
import { useTheme } from "@unthinkable/react-theme";
import { useIntl } from "react-intl";
import DetailCard from "../../components/DetailCard";
import SaveCancelButton from "../../components/SaveCancelButton";
import getStyles from "./Exams.style";
const ExamsUI = ({
  isEditable,
  ca_foundation,
  ca_inter,
  ca_final,
  handleFinalDetailBlur,
  handleFoundationDetailBlur,
  handleInternDetailBlur,
  onChangeValue,
  onClickSave,
  onClickCancel,
  isLoading,
  isValidAllFields,
}) => {
  const intl = useIntl();
  const theme = useTheme();
  const style = getStyles(theme);

  return (
    <View style={style.contentContainerStyle}>
      <View style={style.innerContainerStyle}>
        <DetailCard
          details={ca_foundation}
          headerId={intl.formatMessage({
            id: "label.ca_foundation",
          })}
          isEditProfile={isEditable}
          handleChange={onChangeValue(ca_foundation)}
          handleBlur={handleFoundationDetailBlur}
        />
        <DetailCard
          details={ca_inter}
          headerId={intl.formatMessage({
            id: "label.ca_inter",
          })}
          isEditProfile={isEditable}
          handleChange={onChangeValue(ca_inter)}
          handleBlur={handleInternDetailBlur}
        />
        <DetailCard
          details={ca_final}
          headerId={intl.formatMessage({
            id: "label.ca_final_exam",
          })}
          isEditProfile={isEditable}
          handleChange={onChangeValue(ca_final)}
          handleBlur={handleFinalDetailBlur}
        />
      </View>
      <SaveCancelButton
        isEditable={isEditable}
        isLoading={isLoading}
        onClickSave={onClickSave}
        onClickCancel={onClickCancel}
        isValidAllFields={isValidAllFields}
      />
    </View>
  );
};

export default ExamsUI;
