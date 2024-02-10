import { useState } from "react";
import { useIntl } from "react-intl";

import { EDUCATIONAL_DETAIL_TABS } from "../../../../constants/constants";

const useEducationalDetails = () => {
  const intl = useIntl();
  const educationalTabList = EDUCATIONAL_DETAIL_TABS.map((tab) => ({
    id: tab.id,
    title: intl.formatMessage({ id: tab.title }),
  }));
  const [selectedTab, setSelectedTab] = useState(educationalTabList[0]);

  const onChangeTab = (index) => {
    setSelectedTab(educationalTabList[index]);
  };

  return {
    educationalTabList,
    intl,
    onChangeTab,
    selectedTab,
  };
};

export default useEducationalDetails;
