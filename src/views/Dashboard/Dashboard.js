import React, { useContext, useState } from "react";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";
import { TwoRow } from "../../core/layouts";

import CAJobsDashboard from "../CAJobsDashboard";
import JobProfileTab from "../JobProfile";
import ScheduleInterviewModal from "../../containers/ScheduleInterviewModal/ScheduleInterviewModal";
import IconHeader from "../../components/IconHeader/IconHeader";
import TouchableImage from "../../components/TouchableImage";
import useSaveLogo from "../../services/apiServices/hooks/CompanyLogo/useSaveLogoAPI";
import useDeleteLogo from "../../services/apiServices/hooks/CompanyLogo/useDeleteLogoAPI";
import { moduleKeys } from "../../constants/sideBarHelpers";
import images from "../../images";
import styles from "./dashboard.style";
import useIsWebView from "../../hooks/useIsWebView";
import { SideBarContext } from "../../globalContext/sidebar/sidebarProvider";
import SearchView from "../../components/SearchView";

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

  const handleAddDesignation = () => {
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
  return <JobProfileTab />;
}

export default DashboardView;
