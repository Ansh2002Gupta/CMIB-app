import React, { useState } from "react";
import { useIntl } from "react-intl";
import {
  Text,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";

import CommonText from "../../components/CommonText";
// Just ignore this file as just to test custom component
import SearchView from "../../components/SearchView/SearchView";
import MultiColumn from "../../core/layouts/MultiColumn/MultiColumn";
import Stepper from "../../components/Stepper";
import TouchableImage from "../../components/TouchableImage/TouchableImage";
import images from "../../images";

import styles from "./dashboard.style";

function DashboardView() {
  const intl = useIntl();

  const handleSearchResults = (filteredData) => {
    console.log(filteredData);
  };

  const dataList = ["Apple", "Banana", "Orange", "Mango", "Pineapple", "Grape"];
  const FilterIcon = images.iconFilter;
  const MoreIcon = images.iconMore;

  const columnConfigs = [
    {
      content: <SearchView data={dataList} onSearch={handleSearchResults} />,
      style: {},
      isFillSpace: true,
    },
    {
      content: (
        <TouchableImage
          source={FilterIcon}
          disabled={true}
          parentStyle={styles.imageParentStyle}
        />
      ),
      style: {},
      isFillSpace: false,
    },
    {
      content: (
        <TouchableImage
          source={MoreIcon}
          disabled={false}
          parentStyle={styles.imageParentStyle}
        />
      ),
      style: {},
      isFillSpace: false,
    },
  ];

  const steps = [
    "User details",
    "Payment",
    "Booking confirmation",
    "Random",
    "One more step",
  ];
  const [activeStep, setActiveStep] = useState(0);

  return (
    <View style={styles.container}>
      {/* TODO: Added the stepper code to let the team test it; Will remove once it is tested on mobile */}
      <View style={{ width: "100%" }}>
        <Stepper
          {...{
            activeStep,
            steps,
          }}
        />

        <View style={{ padding: "20px" }}>
          {activeStep !== 0 && (
            <TouchableOpacity onPress={() => setActiveStep(activeStep - 1)}>
              <Text>Previous</Text>
            </TouchableOpacity>
          )}
          {activeStep !== steps.length - 1 && (
            <TouchableOpacity onPress={() => setActiveStep(activeStep + 1)}>
              <Text>Next</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <CommonText
        customTextStyle={styles.header}
        title={intl.formatMessage({ id: "label.dashboard" })}
      />
      <MultiColumn columns={columnConfigs} />
    </View>
  );
}

export default DashboardView;
