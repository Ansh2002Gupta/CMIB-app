import React, { useState } from "react";
import { useIntl } from "react-intl";
import { useTheme } from "@unthinkable/react-theme";
import PropTypes from "prop-types";
import { Platform, View } from "@unthinkable/react-core-components";

import ActionPairButton from "../ActionPairButton";
import CustomModal from "../CustomModal";
import CustomTextInput from "../CustomTextInput";
import { MESSAGE_MAX_LENGTH } from "../../constants/constants";
import getStyles from "./AddTicketModal.style";

const isIos = Platform.OS.toLowerCase() === "ios";

const AddTicketModal = ({
  onPressButtonOne,
  onPressButtonTwo,
  queryTypeData,
}) => {
  const intl = useIntl();
  const theme = useTheme();
  const styles = getStyles(theme);
  const [enterQuery, setEnterQuery] = useState("");
  const [queryType, setQueryType] = useState();

  return (
    <>
      <CustomModal headerText={intl.formatMessage({ id: "label.addTicket" })}>
        <View style={isIos ? styles.mobContainer : {}}>
          <CustomTextInput
            isDropdown
            label={intl.formatMessage({ id: "label.query_type" })}
            placeholder={intl.formatMessage({
              id: "label.select",
            })}
            options={queryTypeData}
            valueField="id"
            labelField="name"
            value={queryType}
            onChangeValue={(val) => {
              setQueryType(val);
            }}
          />
          <CustomTextInput
            label={intl.formatMessage({ id: "label.enterQuery" })}
            placeholder={intl.formatMessage({
              id: "label.enterQuery",
            })}
            value={enterQuery}
            onChangeText={(val) => {
              setEnterQuery(val);
            }}
            isMultiline
            maxLength={MESSAGE_MAX_LENGTH}
          />
          <ActionPairButton
            onPressButtonTwo={() => {
              onPressButtonTwo(queryType, enterQuery);
              setEnterQuery("");
              setQueryType();
            }}
            onPressButtonOne={onPressButtonOne}
            isButtonTwoGreen
            isDisabled={!queryType || !enterQuery}
            buttonOneText={intl.formatMessage({ id: "label.cancel" })}
            buttonTwoText={intl.formatMessage({ id: "label.add" })}
          ></ActionPairButton>
        </View>
      </CustomModal>
    </>
  );
};

AddTicketModal.propTypes = {
  onPressButtonOne: PropTypes.func.isRequired,
  onPressButtonTwo: PropTypes.func.isRequired,
  queryTypeData: PropTypes.array.isRequired,
};

export default AddTicketModal;
