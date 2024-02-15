import React, { useState } from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";

import CustomModal from "../CustomModal";
import CustomTextInput from "../CustomTextInput";
import ActionPairButton from "../ActionPairButton";

const AddTicketModal = ({
  onPressButtonOne,
  onPressButtonTwo,
  queryTypeData,
}) => {
  const intl = useIntl();
  const [enterQuery, setEnterQuery] = useState("");
  const [queryType, setQueryType] = useState();

  return (
    <>
      <CustomModal headerText={intl.formatMessage({ id: "label.addTicket" })}>
        <View>
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
          />
          <ActionPairButton
            onPressButtonTwo={() => {
              onPressButtonTwo(queryType, enterQuery);
              setEnterQuery("");
              setQueryType();
            }}
            onPressButtonOne={onPressButtonOne}
            isButtonTwoGreen
            isDisabled={!enterQuery || !queryType}
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
