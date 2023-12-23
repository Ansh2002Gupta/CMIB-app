import React,{useState} from "react";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../../components/CommonText";

import AddDesignation from "../../containers/AddDesignation/AddDesignation"
import SearchView from "../../components/SearchView/SearchView";
import MultiColumn from "../../core/layouts/MultiColumn/MultiColumn";
import TouchableImage from "../../components/TouchableImage/TouchableImage";
import images from "../../images";


import styles from "./dashboard.style";

// Just ignore this file as just to test custom component

function DashboardView() {
  const intl = useIntl();


  const handleSearchResults = (filteredData) => {
    console.log(filteredData);
  };

  const dataList = ['Apple', 'Banana', 'Orange', 'Mango', 'Pineapple', 'Grape'];
  const FilterIcon = images.iconFilter;
  const MoreIcon = images.iconMore;

  const columnConfigs = [
    {
      content: (<SearchView data={dataList}  onSearch={handleSearchResults}/>),
      style: {},
      isFillSpace: true,
    },
    {
      content: <TouchableImage source={FilterIcon} disabled={true} parentStyle={styles.imageParentStyle} />,
      style: {},
      isFillSpace: false,
    },
    {
      content: <TouchableImage source={MoreIcon} disabled={false} parentStyle={styles.imageParentStyle} />,
      style: {},
      isFillSpace: false,
    },
  ];

  return (
    <View style={styles.container}>
      {/* <CommonText
        customTextStyle={styles.header}
        title={intl.formatMessage({ id: "label.dashboard" })}
      /> */}
        {/* <MultiColumn columns={columnConfigs}  /> */}

        <AddDesignation />
   
    </View>
  );
}

export default DashboardView;
