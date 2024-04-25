import React, { forwardRef } from "react";
import CustomScrollView from "../CustomScrollView";
import { View } from "@unthinkable/react-core-components";

const CustomFlatList = forwardRef(
  (
    {
      data = [],
      numColumns,
      columnWrapperStyle,
      renderItem,
      keyExtractor,
      ListHeaderComponent,
      ListFooterComponent,
      renderNewItem,
      ...props
    },
    ref
  ) => {
    if (!renderItem) {
      return null;
    }
    const renderComponent = numColumns ? (
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {data.map((item, index) => {
          let key = keyExtractor ? keyExtractor(item, index) : index;
          return (
            <View key={key} style={{ width: `${100 / numColumns}%` }}>
              {renderItem({ item, index })}
            </View>
          );
        })}
      </View>
    ) : (
      data.map((item, index) => {
        let key = keyExtractor ? keyExtractor(item, index) : index;
        return <View key={key}>{renderItem({ item, index })}</View>;
      })
    );
    return (
      <CustomScrollView {...props} ref={ref}>
        {ListHeaderComponent && typeof ListHeaderComponent === "function"
          ? ListHeaderComponent()
          : null}
        {renderComponent}
        {renderNewItem && renderNewItem()}
        {ListFooterComponent && typeof ListFooterComponent === "function"
          ? ListFooterComponent()
          : null}
      </CustomScrollView>
    );
  }
);

export default CustomFlatList;
