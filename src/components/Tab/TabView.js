import { useState } from "react";
import {
  Row,
  ScrollView,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";
import CommonText from "../CommonText";
import styles from "./TabView.style";

export const TabView = ({ tabs, renderHeader }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {renderHeader && renderHeader()}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Row gap={24} style={styles.tabsContainer}>
            {tabs.map((tab, index) => {
              const { label } = tab;
              let isActive = index === activeTabIndex;
              return (
                <TouchableOpacity
                  onPress={() => setActiveTabIndex(index)}
                  key={index}
                  style={{
                    ...styles.itemContainer,
                    ...(isActive ? styles.activeItemContainer : {}),
                  }}
                >
                  <CommonText
                    fontWeight={isActive ? "600" : "500"}
                    customTextStyle={{
                      ...styles.itemText,
                      ...(isActive ? styles.activeItemText : {}),
                    }}
                  >
                    {label}
                  </CommonText>
                </TouchableOpacity>
              );
            })}
          </Row>
        </ScrollView>
      </View>
      {tabs[activeTabIndex].component}
    </View>
  );
};

