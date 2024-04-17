import React, { useState, useRef, useContext } from "react";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../../components/CommonText";
import ConfirgurableList from "../../components/ConfigurableList";
import styles from "./Dummy.style";

const dummyDataItems1 = [
  {
    id: 0,
    name: "Assistant Operation Manager",
  },
  {
    id: 1,
    name: "Assistant Finance Manager",
  },
  {
    id: 2,
    name: "Finance Manager",
  },
  {
    id: 3,
    name: "Operation Manager",
  },
  {
    id: 4,
    name: "Senior Accountant",
  },
  {
    id: 5,
    name: "testing6",
  },
  {
    id: 6,
    name: "testing7",
  },
  {
    id: 7,
    name: "testing8",
  },
  {
    id: 8,
    name: "testing9",
  },
];

const dummyDataItems2 = [
  {
    id: 0,
    name: "Allahabad",
  },
  {
    id: 1,
    name: "Bombay",
  },
  {
    id: 2,
    name: "Chennai",
  },
  {
    id: 3,
    name: "Delhi",
  },
  {
    id: 4,
    name: "Etawah",
  },
  {
    id: 5,
    name: "Gandhinagar",
  },
  {
    id: 6,
    name: "Kanpur",
  },
  {
    id: 7,
    name: "Allahabad-2",
  },
  {
    id: 8,
    name: "Allahabad-3",
  },
  {
    id: 9,
    name: "Allahabad-4",
  },
  {
    id: 10,
    name: "Abcdefghjijk;kdkfjsldkfjlksdjflksdjflkasddjkjdlskfjldskjflksdjflksjdlkfjsldkjflskdjlfk12",
  },
];

// Just ignore this file as just to test custom component
function Dummy() {
  const intl = useIntl();
  let isMultiSelect = true;
  const [menuOptions, setMenuOptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleDelete = ({ itemToBeDeletedId, prevState }) => {
    prevState.current = prevState.current.filter(
      (item) => item.id !== itemToBeDeletedId
    );
    setSelectedOptions((prev) => [
      ...prev.filter((itemID) => itemID !== itemToBeDeletedId),
    ]);
    if (searchQuery.length > 0) {
      const queryList = menuOptions.filter(
        (item) => item.id !== itemToBeDeletedId
      );
      setMenuOptions([...queryList]);
    } else {
      setMenuOptions([...prevState.current]);
    }
  };

  const handlePress = (selectedItemID) => {
    if (isMultiSelect) {
      if (selectedOptions.includes(selectedItemID)) {
        const newSelectedOptions = selectedOptions.filter(
          (id) => id !== selectedItemID
        );
        setSelectedOptions(newSelectedOptions);
      } else setSelectedOptions((prev) => [...prev, selectedItemID]);
    } else setSelectedOptions([selectedItemID]);
  };

  const handleAdd = () => {};

  return (
    <View style={styles.container}>
      <CommonText customTextStyle={styles.header}>
        {intl.formatMessage({ id: "label.dashboard" })}
      </CommonText>
      <ConfirgurableList
        onAdd={handleAdd}
        onDelete={handleDelete}
        onPress={handlePress}
        items={dummyDataItems2}
        {...{
          menuOptions,
          searchQuery,
          selectedOptions,
          setMenuOptions,
          setSearchQuery,
        }}
        title="Centres"
      />
    </View>
  );
}

export default Dummy;
