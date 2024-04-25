import { TextInput, View } from "@unthinkable/react-core-components";
import React, { useState } from "react";
import CustomModal from "../../../components/CustomModal";
import CommonText from "../../../components/CommonText";
import colors from "../../../assets/colors";
import CustomTextInput from "../../../components/CustomTextInput";
import CustomToggleComponent from "../../../components/CustomToggleComponent";
import CustomButton from "../../../components/CustomButton";
const UpdateTestResultModal = ({
  item = "",
  setIsModal,
  isMarked = false,
  onSubmit,
}) => {
  let mappedObject = {
    heading: "Update Written Test Results",
    submitText: "Update",
  };
  if (isMarked) {
    mappedObject = {
      heading: "Mark Candidates as Offered",
      submitText: "Mark",
    };
  }
  const [selectedToggle, setSelectedToogle] = useState(0);

  return (
    <View style={{ padding: 24 }}>
      <CustomModal>
        <CommonText
          customTextStyle={{
            color: colors.black,
            fontSize: 20,
            marginRight: 16,
            width: "100%",
          }}
          fontWeight={"600"}
        >
          {mappedObject.heading}
        </CommonText>
        <CustomTextInput
          value={item.application_id}
          customTextInputOuterContainer={{ marginTop: 16 }}
        />
        {!isMarked && (
          <CustomToggleComponent
            label={"Written Test Result"}
            options={["Passed", "Failed"]}
            value={selectedToggle}
            isMandatory
            customToggleStyle={{ marginTop: 16 }}
            onValueChange={(item) => {
              setSelectedToogle(item);
            }}
          />
        )}
        <View style={{ flexDirection: "row", marginTop: 24 }}>
          <CustomButton
            style={{ width: 400 }}
            onPress={() => {
              setIsModal && setIsModal(false);
            }}
          >
            Cancel
          </CustomButton>
          <CustomButton
            style={{ width: 400, marginLeft: 16 }}
            withGreenBackground
            onPress={() => {
              onSubmit(item, selectedToggle, isMarked);
            }}
          >
            {mappedObject.submitText}
          </CustomButton>
        </View>
      </CustomModal>
    </View>
  );
};
export default UpdateTestResultModal;
