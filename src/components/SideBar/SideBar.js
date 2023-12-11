import React, { useState } from "react";
import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "@unthinkable/react-core-components";

import ButtonComponent from "../CommonText/CommonText";
import images from "../../images";
import styles from "./SideBar.style";

const SideBar = ({ items }) => {
  const [showList, setShowList] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const renderSubItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.subList,
        selectedItemId === item.id && {
          backgroundColor: "rgba(255, 255, 255, 0.08)",
        },
      ]}
      onPress={() => setSelectedItemId(item.id)}
    >
      <ButtonComponent
        customTextStyle={styles.subListText}
        title={item.title}
      />
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <View>
      <TouchableOpacity
        style={[
          styles.list,
          selectedItemId === item.id && {
            backgroundColor: "rgba(255, 255, 255, 0.08)",
          },
        ]}
        onPress={() => setSelectedItemId(item.id)}
      >
        <ButtonComponent customTextStyle={styles.listText} title={item.title} />
      </TouchableOpacity>
      {/* Render subitems if any */}
      {item.subitems && (
        <FlatList
          data={item.subitems}
          renderItem={renderSubItem}
          keyExtractor={(subitem) => subitem.id}
        />
      )}
    </View>
  );

  return (
    <View>
      <Image source={images.iconCMIBPortal} />
      <View style={styles.textImageView}>
        <TouchableOpacity>
          <ButtonComponent
            customTextStyle={styles.moduleText}
            title={"Choose a module"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowList(!showList)}>
          {showList ? (
            <Image source={images.iconArrowUp} />
          ) : (
            <Image source={images.iconArrowDown} />
          )}
        </TouchableOpacity>
      </View>

      {showList ? (
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          // contentContainerStyle={styles.contentContainerStyle}
        />
      ) : null}
    </View>
  );
};

export default SideBar;
