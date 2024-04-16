import React, { useContext, useState } from "react";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";

import MultiColumn from "../../core/layouts/MultiColumn";

import CommonText from "../../components/CommonText";
import CustomCell from "../../components/CustomCell/";
import TouchableImage from "../../components/TouchableImage";
import SearchView from "../../components/SearchView";
import { SideBarContext } from "../../globalContext/sidebar/sidebarProvider";
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
      <CustomCell
        onPress={toggleSwitch}
        title={"AddDesignation"}
        isLeft
        isSvg
        leftSource={AddIcon}
        style={styles.customCellStyle}
        textStyle={styles.customCellTextStyle}
      />
    </View>
  );
}

export default DashboardView;
