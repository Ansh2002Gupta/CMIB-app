import React, { useState } from "react";
import { useIntl } from "react-intl";
import { useTheme } from "@unthinkable/react-theme";
import PropTypes from "prop-types";
import { Platform, View } from "@unthinkable/react-core-components";

import ActionPairButton from "../../components/ActionPairButton";
import CommonText from "../../components/CommonText";
import CustomModal from "../../components/CustomModal";
import TimeSlotLabel from "../../components/TimeSlotLabel/TimeSlotLabel";
import Spinner from "../../components/Spinner";
import getStyles from "./InterviewTimeModal.styles";

const isIos = Platform.OS.toLowerCase() === "ios";

const InterviewTimeModal = ({
  data,
  setShowInterviewTimeModal,
  confirmSelection,
  isLoading,
  isError,
  isPatching,
}) => {
  const intl = useIntl();
  const theme = useTheme();
  const styles = getStyles(theme);
  data = !!data ? data : [];
  const webProps = Platform.OS === "web" ? { size: "xs" } : {};
  const [selectedDateLabel, setSelectedDateLabel] = useState(
    data[0]?.primary?.is_accepted
      ? { id: data[0]?.id, isPrimary: true, mode: data[0]?.primary?.type }
      : data[0]?.alternate?.is_accepted
      ? { id: data[0]?.id, isPrimary: false, mode: data[0]?.alternate?.type }
      : null
  );

  const handleSelection = (labelInfo) => {
    setSelectedDateLabel(labelInfo);
  };

  return (
    <CustomModal
      headerText={intl.formatMessage({
        id: "label.select_interview_time_slot",
      })}
      isIconCross
      onPressIconCross={() => setShowInterviewTimeModal(false)}
    >
      <View style={isIos ? styles.mobContainer : styles.webContainer}>
        <View>
          <CommonText customTextStyle={[styles.footerText]} fontWeight="500">
            {intl.formatMessage({ id: "label.shortlisted_congratulations" })}
          </CommonText>
        </View>
        <View style={styles.dateLabelsContainer}>
          {isLoading ? (
            <Spinner thickness={3} color={""} {...webProps} />
          ) : !!data?.length ? (
            <>
              <TimeSlotLabel
                labelId={data[0]?.id}
                dataObj={data[0]}
                onSelect={handleSelection}
                selectedDateLabel={selectedDateLabel}
              />
              {!!data[0]?.alternate && (
                <TimeSlotLabel
                  labelId={data[0]?.id}
                  dataObj={data[0]}
                  onSelect={handleSelection}
                  selectedDateLabel={selectedDateLabel}
                  showPrimary={false}
                />
              )}
            </>
          ) : (
            <View style={styles.noSchedulesTextContainer}>
              <CommonText customTextStyle={styles.noSchedulesText}>
                {isError
                  ? intl.formatMessage({ id: "label.some_error_occured" })
                  : intl.formatMessage({ id: "label.no_schedule_found" })}
              </CommonText>
            </View>
          )}
        </View>
        {!!data?.length > 0 ? (
          <ActionPairButton
            onPressButtonOne={() => setShowInterviewTimeModal(false)}
            onPressButtonTwo={() => {
              confirmSelection(selectedDateLabel);
            }}
            isButtonTwoGreen
            isDisabled={
              !!selectedDateLabel
                ? !selectedDateLabel || isPatching
                : !data[0].primary?.is_accepted &&
                  !data[0].alternate?.is_accepted
            }
            buttonOneText={intl.formatMessage({ id: "label.cancel" })}
            buttonTwoText={intl.formatMessage({ id: "label.confirm" })}
            customStyles={{
              buttonOneStyle: styles.cancelButton,
              buttonTwoStyle: styles.confirmButton,
              buttonOneContainerStyle: styles.cancelButtonContainer,
              buttonTwoContainerStyle: styles.confirmButtonContainer,
              customContainerStyle: styles.actionButtonContainer,
            }}
            displayLoader={isPatching}
            isButtonOneDisabled={isPatching}
          ></ActionPairButton>
        ) : (
          <></>
        )}
      </View>
    </CustomModal>
  );
};

InterviewTimeModal.propTypes = {
  setShowInterviewTimeModal: PropTypes.func.isRequired,
};

export default InterviewTimeModal;
