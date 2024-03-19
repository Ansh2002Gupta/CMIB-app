import React from "react";
import { View, ScrollView } from "@unthinkable/react-core-components";
import { useIntl } from "react-intl";
import style from "./OtherCourses.style";
import DetailCard from "../../components/DetailCard";
import SaveCancelButton from "./SaveCancelButton";
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

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={style.contentContainerStyle}
    >
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
    </ScrollView>
  );
};

export default OtherCoursesUI;
