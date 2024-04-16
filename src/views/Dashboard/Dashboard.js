import React, { useState, useRef, useContext } from "react";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";

import AddDesignation from "../../containers/AddDesignation/AddDesignation";
import CommonText from "../../components/CommonText";
import ConfirgurableList from "../../components/ConfigurableList";
import CustomCell from "../../components/CustomCell/";
import MultiColumn from "../../core/layouts/MultiColumn";
import SearchView from "../../components/SearchView";
import TouchableImage from "../../components/TouchableImage";
import images from "../../images";
import useIsWebView from "../../hooks/useIsWebView";

import { TwoRow } from "../../core/layouts";

import CAJobsDashboard from "../CAJobsDashboard";
import IconHeader from "../../components/IconHeader/IconHeader";
import ScheduleInterviewModal from "../../containers/ScheduleInterviewModal/ScheduleInterviewModal";
import { moduleKeys } from "../../constants/sideBarHelpers";
import { SideBarContext } from "../../globalContext/sidebar/sidebarProvider";
import styles from "./dashboard.style";

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
function DashboardView() {
  const intl = useIntl();
  let isMultiSelect = true;
  const [isEnabled, setIsEnabled] = useState(false);
  const [menuOptions, setMenuOptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const { isWebView } = useIsWebView();
  const [sideBarState] = useContext(SideBarContext);
  const { selectedModule } = sideBarState;

  const dataList = ["Apple", "Banana", "Orange", "Mango", "Pineapple", "Grape"];
  const FilterIcon = images.iconFilter;
  const MoreIcon = images.iconMore;
  const AddIcon = images.iconAdd;

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };

  const handleSearchResults = (filteredData) => {};

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
      <CommonText customTextStyle={styles.header}>
        {intl.formatMessage({ id: "label.dashboard" })}
      </CommonText>
      <MultiColumn columns={searchData} />
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
      <CustomCell
        onPress={toggleSwitch}
        title={"AddDesignation"}
        isLeft
        isSvg
        leftSource={AddIcon}
        style={styles.customCellStyle}
        textStyle={styles.customCellTextStyle}
      />
      <View style={styles.container}>
        <TwoRow
          topSection={
            isWebView && (
              <IconHeader
                hasIconBar
                headerText={intl.formatMessage({ id: "label.dashboard" })}
                intl={intl}
              />
            )
          }
          isBottomFillSpace
          bottomSection={
            <>
              {moduleKeys.CA_JOBS_KEY === selectedModule?.key ? (
                <CAJobsDashboard />
              ) : null}
            </>
          }
        ></TwoRow>
      </View>
      {/*  uncomment this to see modals */}
      {/* <ViewInterviewDetails /> */}
      {/* <ScheduleInterviewModal /> */}
    </View>
  );
}

export default DashboardView;
