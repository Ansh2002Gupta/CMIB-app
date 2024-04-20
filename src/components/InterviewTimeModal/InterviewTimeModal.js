import React, { useState } from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { Platform, View } from "@unthinkable/react-core-components";

import ActionPairButton from "../ActionPairButton";
import CommonText from "../CommonText";
import CustomModal from "../CustomModal";
import TimeSlotLabel from "../TimeSlotLabel/TimeSlotLabel";
import styles from "./InterviewTimeModal.styles";

const isIos = Platform.OS.toLowerCase() === "ios";

const apiDataForInterviewDateSlots = [
  {
    id: 0,
    date: "18th March",
    time: "5:30 PM",
    mode: "Face 2 Face",
  },
  {
    id: 1,
    date: "18th March",
    time: "5:30 PM",
    mode: "Face 2 Face",
  },
  {
    id: 2,
    date: "18th March",
    time: "5:30 PM",
    mode: "Face 2 Face",
  },
  {
    id: 3,
    date: "18th March",
    time: "5:30 PM",
    mode: "Face 2 Face",
  },
  {
    id: 4,
    date: "18th March",
    time: "5:30 PM",
    mode: "Face 2 Face",
  },
];

const InterviewTimeModal = ({
  data,
  setShowInterviewTimeModal,
  onPressButtonOne,
  onPressButtonTwo,
}) => {
  const intl = useIntl();
  const [enterQuery, setEnterQuery] = useState("");
  const [queryType, setQueryType] = useState();
  const [selectedDateLabelID, setSelectedDateLabelID] = useState(null);

  const handleSelection = (dateObj) => {
    setSelectedDateLabelID(dateObj?.id);
  };

  return (
    <>
      <CustomModal
        headerText={intl.formatMessage({
          id: "label.select_interview_time_slot",
        })}
        isIconCross
        onPressIconCross={() => setShowInterviewTimeModal((prev) => !prev)}
      >
        <View style={isIos ? styles.mobContainer : styles.webContainer}>
          <View>
            <CommonText customTextStyle={[styles.footerText]} fontWeight="500">
              Congratulations on being shortlisted! Select a suitable interview
              time from the options below:
            </CommonText>
          </View>
          <View style={styles.dateLabelsContainer}>
            {apiDataForInterviewDateSlots.map((dateObj) => (
              <TimeSlotLabel
                key={dateObj?.id}
                dataObj={dateObj}
                onSelect={handleSelection}
                {...{ selectedDateLabelID }}
              />
            ))}
          </View>
          <ActionPairButton
            onPressButtonTwo={() => {}}
            onPressButtonOne={() => {}}
            isButtonTwoGreen
            isDisabled={null}
            buttonOneText={intl.formatMessage({ id: "label.cancel" })}
            buttonTwoText={intl.formatMessage({ id: "label.confirm" })}
            customStyles={{
              buttonOneStyle: styles.cancelButton,
              buttonTwoStyle: styles.confirmButton,
              buttonOneContainerStyle: styles.cancelButtonContainer,
              buttonTwoContainerStyle: styles.confirmButtonContainer,
              customContainerStyle: styles.actionButtonContainer,
            }}
          ></ActionPairButton>
        </View>
      </CustomModal>
    </>
  );
};

InterviewTimeModal.propTypes = {
  onPressButtonOne: PropTypes.func.isRequired,
  onPressButtonTwo: PropTypes.func.isRequired,
  queryTypeData: PropTypes.array.isRequired,
};

export default InterviewTimeModal;
