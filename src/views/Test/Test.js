import React from "react";
import { useIntl } from "react-intl";
// import { View, Text } from "@unthinkable/react-core-components";
import { SafeAreaView } from 'react-native';

import styles from "./test.style";
import SearchView from "../../components/SearchView/SearchView";

function DashboardView() {
  const intl = useIntl();
  const dataList = ['Apple', 'Banana', 'Orange', 'Mango', 'Pineapple', 'Grape'];
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SearchView data={dataList} />
    </SafeAreaView>
  );
}

export default DashboardView;
