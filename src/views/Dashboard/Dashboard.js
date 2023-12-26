import React from "react";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../../components/CommonText";
// Just ignore this file as just to test custom component
import SearchView from "../../components/SearchView/SearchView";
import MultiColumn from "../../core/layouts/MultiColumn/MultiColumn";
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
          disabled
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
      <MultiColumn columns={columnConfigs} />
    </View>
  );
}

export default DashboardView;
