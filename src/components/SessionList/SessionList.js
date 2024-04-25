import React, { useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { useTheme } from "@unthinkable/react-theme";
import { FlatList, Platform, View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import CustomButton from "../CustomButton";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import SearchView from "../SearchView";
import images from "../../images";
import getStyles from "./SessionList.style";

const SessionList = ({
  onPressBack,
  onSelectItem,
  selectedSession,
  sessionList,
}) => {
  const [searchList, setSearchList] = useState(sessionList);
  const theme = useTheme();
  const styles = getStyles(theme);
  const intl = useIntl();
  const platformSpecificProps = Platform.select({
    web: {},
    default: {
      numberOfLines: 1,
      ellipsizeMode: "tail",
    },
  });

  const renderItem = ({ item: session }) => (
    <CustomTouchableOpacity
      key={session.id}
      style={styles.listItem(selectedSession.id === session.id)}
      onPress={() => onSelectItem(session)}
    >
      <CommonText
        customTextProps={platformSpecificProps}
        customTextStyle={styles.text(selectedSession.id === session.id)}
        fontWeight={selectedSession.id === session.id ? "600" : "500"}
      >
        {session.label}
      </CommonText>
    </CustomTouchableOpacity>
  );

  const onSearchSession = (filteredList) => {
    setSearchList(filteredList);
  };

  const handleSearching = (query) => {
    return sessionList.filter((session) => {
      return session.label.toLowerCase().includes(query);
    });
  };

  return (
    <>
      <View style={styles.row}>
        <CustomButton
          iconLeft={{
            leftIconSource: images.iconBackArrow,
            leftIconAlt: "Left arrow",
          }}
          onPress={onPressBack}
          style={styles.backBtnStyles}
        />
        <SearchView
          data={sessionList}
          onSearch={onSearchSession}
          customInputStyle={styles.searchInput}
          customParentStyle={styles.searchParent}
          customSearchCriteria={handleSearching}
        />
      </View>
      {!!searchList?.length ? (
        <FlatList
          data={searchList}
          keyExtractor={(session) => session.id}
          renderItem={renderItem}
        />
      ) : (
        <CommonText
          customContainerStyle={styles.noResultContainer}
          customTextStyle={styles.text(true)}
        >
          {intl.formatMessage({ id: "label.no_results_found" })}
        </CommonText>
      )}
    </>
  );
};

SessionList.propTypes = {
  onPressBack: PropTypes.func.isRequired,
  onSelectItem: PropTypes.func.isRequired,
  selectedSession: PropTypes.object.isRequired,
  sessionList: PropTypes.array.isRequired,
};

export default SessionList;
