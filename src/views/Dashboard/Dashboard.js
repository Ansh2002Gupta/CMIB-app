import React, { useState } from "react";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";

import AddDesignation from "../../containers/AddDesignation/AddDesignation";
import CommonText from "../../components/CommonText";
import CustomCell from "../../components/CustomCell/";
import SearchView from "../../components/SearchView";
import MultiColumn from "../../core/layouts/MultiColumn";
import TouchableImage from "../../components/TouchableImage";
import images from "../../images";
import styles from "./dashboard.style";

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

  const handleCancelButton = () => {
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
      <CommonText
        customTextStyle={styles.header}
        title={intl.formatMessage({ id: "label.dashboard" })}
      />
      <MultiColumn columns={searchData} />
      <CustomCell
        onPress={toggleSwitch}
        title={"AddDesignation"}
        isLeft={true}
        isSvg={true}
        leftSource={AddIcon}
        style={styles.customCellStyle}
        textStyle={styles.customCellTextStyle}
      />
      {isEnabled && <AddDesignation handleCancelButton={handleCancelButton} />}
    </View>
  );
}

export default DashboardView;
