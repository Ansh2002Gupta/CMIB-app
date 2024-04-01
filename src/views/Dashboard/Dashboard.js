import React, { useState } from "react";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";

import AddDesignation from "../../containers/AddDesignation/AddDesignation";
import CommonText from "../../components/CommonText";
import CustomCell from "../../components/CustomCell/";
import DetailCard from "../../components/DetailCard/DetailCard";
import MultiColumn from "../../core/layouts/MultiColumn";
import SearchView from "../../components/SearchView";
import TouchableImage from "../../components/TouchableImage";
import images from "../../images";
import styles from "./dashboard.style";
import JobProfileTab from "../JobProfile";

// Just ignore this file as just to test custom component
function DashboardView() {
  const intl = useIntl();
  const [isEnabled, setIsEnabled] = useState(false);

  const dataList = ["Apple", "Banana", "Orange", "Mango", "Pineapple", "Grape"];
  const FilterIcon = images.iconFilter;
  const MoreIcon = images.iconMore;
  const AddIcon = images.iconAdd;

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };

  const handleAddDesignation = () => {
    setIsEnabled((previousState) => !previousState);
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

  return (
    <View style={styles.container}>
      <CommonText customTextStyle={styles.header}>
        {intl.formatMessage({ id: "label.dashboard" })}
      </CommonText>
      <DetailCard
        isEditProfile
        isColumnVariableWidth
        handleMultiSelect={handleModuleSelection}
        details={[
          [
            {
              label: "Test",
              isLink: true,
              value: "Dummy Dummy Dummy Dummy Dummy Dummy Dummy Dummy Dummy ",
            },
            {
              label: "Test",
              isLink: true,
              value: "Dummy Dummy Dummy Dummy Dummy Dummy Dummy Dummy Dummy ",
            },
          ],
          [
            {
              label: "Test",
              isLink: true,
              value: "Dummy Dummy Dummy Dummy Dummy Dummy Dummy Dummy Dummy ",
              width: 2, // Can be 1, 2 or 3 (1 for 100%, 2 for 75% and 3 for 33%)
            },
            {
              label: "label.module",
              value: [],
              showBadgeLabel: true,
              isMandatory: true,
              isMultiSelect: true,
              isDropdown: true,
              placeholder: "label.select_module",
              defaultValues: [],
              options: selectBoxState,
              isSingleMutliSelect: true,
            },
          ],
          [
            {
              label: "Test",
              isLink: true,
              value: "Dummy Dummy Dummy Dummy Dummy Dummy Dummy Dummy Dummy ",
            },
            {
              label: "Test",
              isLink: true,
              value: "Dummy Dummy Dummy Dummy Dummy Dummy Dummy Dummy Dummy ",
            },
            {
              label: "Test",
              isLink: true,
              value: "Dummy Dummy Dummy Dummy Dummy Dummy Dummy Dummy Dummy ",
            },
          ],
        ]}
      />
      <DetailCard
        isEditProfile
        details={[
          {
            label: "Test",
            isLink: true,
          },
          {
            label: "Test",
            isLink: true,
          },
          {
            label: "Test",
            isLink: true,
          },
        ]}
      />
    </View>
  );
}

export default DashboardView;
