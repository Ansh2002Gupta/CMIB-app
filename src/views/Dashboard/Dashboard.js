import React, { useState } from "react";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../../components/CommonText";
import RangeSlider from "../../components/RangeSlider";
import styles from "./dashboard.style";
import JobProfileTab from "../JobProfile";
import images from "../../images";
import SearchView from "../../components/SearchView";
import TouchableImage from "../../components/TouchableImage";

const MIN_VALUE = 0;
const MAX_VALUE = 100; // Created for demo purposes , therefore not defining them in the constant.js file
// Just ignore this file as just to test custom component
function DashboardView() {
  const intl = useIntl();
  const [range, setRange] = useState({ max: MAX_VALUE, min: MIN_VALUE });

  const dataList = ["Apple", "Banana", "Orange", "Mango", "Pineapple", "Grape"];
  const FilterIcon = images.iconFilter;
  const MoreIcon = images.iconMore;
  const AddIcon = images.iconAdd;

  const toggleSwitch = () => {
   // setIsEnabled((previousState) => !previousState);
  };

  const handleAddDesignation = () => {
   // setIsEnabled((previousState) => !previousState);
  };

  const handleSearchResults = (filteredData) => {};

  const searchData = [
    {
      content: <SearchView data={dataList} onSearch={handleSearchResults} />,
      style: {},
      isFillSpace: true,
    },
    {
      content: (
        <TouchableImage
          source={FilterIcon}
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
          isSelector={true}
          parentStyle={styles.imageParentStyle}
        />
      ),
      style: {},
      isFillSpace: false,
    },
  ];

  const [selectBoxState, setSelectBoxState] = useState([
    {
      isSelected: false,
      label: "Ca Jobs",
      name: "Ca Jobs",
      selectedIndex: null,
      value: "Ca Jobs",
    },
    {
      isSelected: false,
      label: "Nqca",
      name: "Nqca",
      selectedIndex: null,
      value: "Nqca",
    },
  ]);

  const handleModuleSelection = (updatedSelectedItems) => {
    const updatedState = selectBoxState.map((item) => {
      if (item.value === updatedSelectedItems) {
        if (item.isSelected) {
          item.isSelected = false;
        } else {
          item.isSelected = true;
        }
        return item;
      }
      return item;
    });
    setSelectBoxState(updatedState);
  };
  return (<JobProfileTab/>)
  return (
    <View style={styles.container}>
      <CommonText customTextStyle={styles.header}>
        {intl.formatMessage({ id: "label.dashboard" })}
      </CommonText>
      <RangeSlider
        label="Yrs"
        max={MAX_VALUE}
        min={MIN_VALUE}
        onChange={(obj) => {
          console.log(obj);
        }}
        step={5}
        {...{ range, setRange }}
      />
    </View>
  );
}

export default DashboardView;
