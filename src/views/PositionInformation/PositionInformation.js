import { View } from "@unthinkable/react-core-components";
import React from "react";
import { FormTabs } from "../../components/Tab";
import usePositionInformation from "./controller/usePositionInformation";
import PositionInformationUI from "./PositionInformationUI";

const Temp = () => {
  return <View></View>;
};

const PositionInformation = () => {
  const positionInformation = usePositionInformation();

  return (
    <View>
      <FormTabs
        tabs={[
          {
            label: "Education Details",
            component: <Temp />,
          },
          {
            label: "Exams",
            component: <Temp />,
          },
          {
            label: "Other Courses",
            component: <Temp />,
          },
        ]}
      />
      <PositionInformationUI {...positionInformation} />
    </View>
  );
};

export default PositionInformation;
