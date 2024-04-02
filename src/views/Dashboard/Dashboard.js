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
  return (
    <View style={styles.container}>
      <CommonText customTextStyle={styles.header}>
        {intl.formatMessage({ id: "label.dashboard" })}
      </CommonText>
      <DetailCard
        isEditProfile
        isColumnVariableWidth
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
