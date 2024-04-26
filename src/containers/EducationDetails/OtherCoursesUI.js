import React from "react";
import { View, ScrollView } from "@unthinkable/react-core-components";
import { useIntl } from "react-intl";
import { useTheme } from "@unthinkable/react-theme";
import DetailCard from "../../components/DetailCard";
import SaveCancelButton from "../../components/SaveCancelButton";
import getStyles from "./OtherCourses.style";
const OtherCoursesUI = ({
  isEditable,
  other_courses,
  handleOtherCoursesBlur,
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
          details={other_courses}
          headerId={intl.formatMessage({
            id: "label.other_courses",
          })}
          isEditProfile={isEditable}
          handleChange={onChangeValue(other_courses)}
          handleBlur={handleOtherCoursesBlur}
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

export default OtherCoursesUI;
