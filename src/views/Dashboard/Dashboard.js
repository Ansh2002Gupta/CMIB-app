import React, { useState } from "react";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";

import AddDesignation from "../../containers/AddDesignation/AddDesignation";
import CommonText from "../../components/CommonText";
import ConfirgurableList from "../../components/ConfigurableList";
import CustomCell from "../../components/CustomCell/";
import images from "../../images";
import MultiColumn from "../../core/layouts/MultiColumn";
import SearchView from "../../components/SearchView";
import styles from "./dashboard.style";
import TouchableImage from "../../components/TouchableImage";

const dummyDataItems1 = [
  {
    id: 0,
    name: "Assistant Operation Manager",
  },
  {
    id: 1,
    name: "Assistant Finance Manager",
  },
  {
    id: 2,
    name: "Finance Manager",
  },
  {
    id: 3,
    name: "Operation Manager",
  },
  {
    id: 4,
    name: "Senior Accountant",
  },
  {
    id: 5,
    name: "testing6",
  },
  {
    id: 6,
    name: "testing7",
  },
  {
    id: 7,
    name: "testing8",
  },
  {
    id: 8,
    name: "testing9",
  },
];

const dummyDataItems2 = [
  {
    id: 0,
    name: "Allahabad",
  },
  {
    id: 1,
    name: "Bombay",
  },
  {
    id: 2,
    name: "Chennai",
  },
  {
    id: 3,
    name: "Delhi",
  },
  {
    id: 4,
    name: "Etawah",
  },
  {
    id: 5,
    name: "Gandhinagar",
  },
  {
    id: 6,
    name: "Kanpur",
  },
];

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
      <MultiColumn columns={searchData} />
      <ConfirgurableList title="Designation" items={dummyDataItems1} />
      <CustomCell
        onPress={toggleSwitch}
        title={"AddDesignation"}
        isLeft
        isSvg
        leftSource={AddIcon}
        style={styles.customCellStyle}
        textStyle={styles.customCellTextStyle}
      />
      {isEnabled && <AddDesignation resultCallback={handleAddDesignation} />}
    </View>
  );
}

export default DashboardView;
