import React, { useState, useImperativeHandle, useEffect, useRef } from "react";
import { View } from "@unthinkable/react-core-components";

import CardComponent from "../../../components/CardComponent";
import CommonText from "../../../components/CommonText";
import CustomTextInput from "../../../components/CustomTextInput";
import styles from "./JobPreferenceDetails.style";
import { formatDate } from "../../../utils/util";

function convertTo12HourFormat(data) {
  const convertTime = (time) => {
      let [hours, minutes] = time.split(':');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12; // Convert 00 hours to 12 for 12 AM
      return `${parseInt(hours)}:${minutes} ${ampm}`;
  };

  const startTime12Hour = convertTime(data.start_time);
  const endTime12Hour = convertTime(data.end_time);

  return `${startTime12Hour} to ${endTime12Hour}`;
}

const MockInterview = (
  { intl, isWebView, isViewMode = false, onValidationChange = () => {}, mockCenters, slotsData = [], handleMockCentreSelection },
  ref
) => {
  //states
  const [center, setCenter] = useState("");
  const [slot, setSlot] = useState("");
  const [mockCentreList, setMockCentreList] = useState([]);
  const [slotDropDownData, setSlotDropDownData] = useState([]);
  const selectedSlot = useRef({});

  useImperativeHandle(ref, () => ({
    getState: () => {
      return {
        mock_interview_date: {
          name: center,
          mock_interview_id: center,
          schedule_date: selectedSlot?.current?.schedule_date,
          start_time: selectedSlot?.current?.start_time,
          end_time: selectedSlot?.current?.end_time,
        }
      };
    },
  }));

  //Lifecycle
  useEffect(() => {
    onValidationChange(center.length > 0 && slot.length > 0);
  }, [center, slot, onValidationChange]);

  useEffect(() => {
    if (mockCenters) {
      let mocks = mockCenters?.map((item, index) => {
        return {
          label: item?.centre_name,
          value: item?.id
        }
      })
      setMockCentreList(mocks);
    }
  }, [mockCenters])

  useEffect(() => {
    if (slotsData) {
      let data = slotsData.map((item, index) => {
        return {
          label: convertTo12HourFormat(item),
          data: item?.id,
        }
      })
      setSlotDropDownData(data);
    }
  }, [slotsData])

  const handleMockCentre = (mockId) => {
    setCenter(mockId);
    handleMockCentreSelection(mockId);
    setSlot('');
  }

  const handleSlotSelection = (sId) => {
    setSlot(sId);
    selectedSlot.current = slotsData.filter((item, index) => item.id == sId);
  }

  console.log("setSlotsData", slotsData)
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
          options={mockCentreList}
          label={intl.formatMessage({ id: "label.center" })}
          onChangeValue={handleMockCentre}
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
          options={slotDropDownData}
          onChangeValue={handleSlotSelection}
          value={slot}
        />
      </View>
      <View></View>
    </CardComponent>
  );
};

export default React.forwardRef(MockInterview);
