import React, { useState, useRef, useContext } from "react";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../../components/CommonText";
import CustomCell from "../../components/CustomCell/";
import MultiColumn from "../../core/layouts/MultiColumn";
import SearchView from "../../components/SearchView";
import TouchableImage from "../../components/TouchableImage";
import images from "../../images";
import useIsWebView from "../../hooks/useIsWebView";

import { TwoRow } from "../../core/layouts";

import CAJobsDashboard from "../CAJobsDashboard";
import IconHeader from "../../components/IconHeader/IconHeader";
import { moduleKeys } from "../../constants/sideBarHelpers";
import { SideBarContext } from "../../globalContext/sidebar/sidebarProvider";
import styles from "./dashboard.style";

// Just ignore this file as just to test custom component
function DashboardView() {
  const intl = useIntl();
  const [isEnabled, setIsEnabled] = useState(false);
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
