import React, { useState } from "react";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../../components/CommonText";

import AddDesignation from "../../containers/AddDesignation/AddDesignation";
import SearchView from "../../components/SearchView/SearchView";
import MultiColumn from "../../core/layouts/MultiColumn/MultiColumn";
import TouchableImage from "../../components/TouchableImage/TouchableImage";
import images from "../../images";

import styles from "./dashboard.style";
import CustomCell from "../../components/CustomCell/CustomCell";

// Just ignore this file as just to test custom component

function DashboardView() {
  const intl = useIntl();

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  }
  const handleCancelButton = () => {
    setIsEnabled(previousState => !previousState);
  };

  const handleSearchResults = (filteredData) => {
    // console.log(filteredData);
  };

  const dataList = ["Apple", "Banana", "Orange", "Mango", "Pineapple", "Grape"];
  const FilterIcon = images.iconFilter;
  const MoreIcon = images.iconMore;
  const AddIcon = images.iconAdd;

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
      <MultiColumn columns={searchData}  />
      <CustomCell
        onPress={toggleSwitch}
        title={"AddDesignation"}
        isLeft={true}
        isSvg={true}
        leftSource={AddIcon}
        style={{justifyContent :'flex-start',padding:14,backgroundColor:'#F2F4FC',borderColor :'#F2F4FC'}}
        textStyle={{ fontSize: 14,fontWeight: "600", color : '#00137E', lineHeight : 20 , marginLeft: 8 }}
      />
      {isEnabled &&<AddDesignation handleCancelButton={handleCancelButton} /> }
    </View>
  );
}

export default DashboardView;
