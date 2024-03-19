import { useState } from "react";
import {
  Row,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";
import CommonText from "../CommonText";
import styles from "./FormTab.style";
const FormTab = ({ tabs }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  return (
    <View style={styles.container}>
      <Row gap={12}>
        {tabs.map((tab, index) => {
          const { label } = tab;
          return (
            <TouchableOpacity
              onPress={() => setActiveTabIndex(index)}
              key={index}
              style={{
                ...styles.itemContainer,
                ...(index === activeTabIndex ? styles.activeItemContainer : {}),
              }}
            >
              <CommonText
                fontWeight={"500"}
                customTextStyle={{
                  ...styles.itemText,
                  ...(index === activeTabIndex ? styles.activeItemText : {}),
                }}
              >
                {label}
              </CommonText>
            </TouchableOpacity>
          );
        })}
      </Row>
      {tabs[activeTabIndex].component}
    </View>
  );
};

export default FormTab;
