import React from "react";
import { useIntl } from "react-intl";

import SearchView from "../../components/SearchView/SearchView";
import MultiColumn from "../../core/layouts/MultiColumn/MultiColumn";
import TouchableImage from "../../components/TouchableImage/TouchableImage";
import images from "../../images";
import styles from "./test.style";

function DashboardView() {
  const intl = useIntl();
  const dataList = ['Apple', 'Banana', 'Orange', 'Mango', 'Pineapple', 'Grape'];
  const FilterIcon = images.iconFilter;
  const MoreIcon = images.iconMore;

   const handleSearchResults = (filteredData) => {
    console.log(filteredData);
  };

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
      <MultiColumn columns={columnConfigs} style={styles.container} />
  );
}

export default DashboardView;
