import { View } from "@unthinkable/react-core-components";
import React from "react";
import { FormTabs } from "../../components/Tab";
import usePositionInformation from "./controller/usePositionInformation";
import PositionInformationUI from "./PositionInformationUI";

const PositionInformation = ({ centerId, companyId }) => {
  const positionInformation = usePositionInformation({ centerId, companyId });
  const { positionTabs } = positionInformation;
  
  return (
    <View>
      {positionTabs.length > 0 && (
        <FormTabs
          tabs={positionTabs.map((item) => {
            return {
              label: item?.designation,
              component: (
                <PositionInformationUI
                  {...{ ...positionInformation, data: item }}
                />
              ),
            };
          })}
        />
      )}
    </View>
  );
};

export default PositionInformation;
