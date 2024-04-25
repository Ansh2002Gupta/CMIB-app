import React, { useState, useImperativeHandle, useEffect } from "react";
import { View } from "@unthinkable/react-core-components";

import CardComponent from "../../../components/CardComponent";
import CommonText from "../../../components/CommonText";
import CustomTextInput from "../../../components/CustomTextInput";
import styles from "./JobPreferenceDetails.style";
import { YEARS } from "../../../constants/constants";
import { formatDate } from "../../../utils/util";

const MockInterview = (
  { intl, isWebView, isViewMode = false, onValidationChange = () => {} },
  ref
) => {
  //states
  const [center, setCenter] = useState("");
  const [slot, setSlot] = useState("");

  useImperativeHandle(ref, () => ({
    getState: () => {
      return {
        name: center,
        mock_interview_id: center,
        schedule_date: formatDate(slot, "MM/DD/YYYY"),
        start_time: "09:30:00",
        end_time: "10:00:00",
      };
    },
  }));

  //Lifecycle
  useEffect(() => {
    onValidationChange(center.length > 0 && slot.length > 0);
  }, [center, slot, onValidationChange]);

  return (
    <CardComponent customStyle={styles.cardContainer}>
      <CommonText customTextStyle={styles.titleText} fontWeight={"600"}>
        {intl.formatMessage({ id: "label.mockInterviewSlots" })}
      </CommonText>
      <View style={isWebView ? styles.gridView : styles.gap}>
        <CustomTextInput
          isViewMode={isViewMode}
          viewText={center}
          isMandatory={!isViewMode}
          customStyle={styles.textInputContainer(isWebView)}
          isPaddingNotRequired
          placeholder={intl.formatMessage({ id: "label.center" })}
          isDropdown
          options={YEARS}
          label={intl.formatMessage({ id: "label.center" })}
          onChangeValue={setCenter}
          value={center}
        />
        <CustomTextInput
          isViewMode={isViewMode}
          viewText={slot}
          isMandatory={!isViewMode}
          customStyle={styles.textInputContainer(isWebView)}
          isPaddingNotRequired
          placeholder={intl.formatMessage({ id: "label.selectHobbies" })}
          label={intl.formatMessage({ id: "label.slot" })}
          isDropdown
          options={YEARS}
          onChangeValue={setSlot}
          value={slot}
        />
      </View>
      <View></View>
    </CardComponent>
  );
};

export default React.forwardRef(MockInterview);
