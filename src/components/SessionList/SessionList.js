import React, { useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { FlatList, Platform } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import SearchView from "../SearchView";
import styles from "./SessionList.style";

const SessionList = ({ onSelectItem, selectedSession, sessionList }) => {
  const [searchList, setSearchList] = useState(sessionList);
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
      <SearchView
        data={sessionList}
        onSearch={onSearchSession}
        customInputStyle={styles.searchInput}
        customParentStyle={styles.searchParent}
        customSearchCriteria={handleSearching}
      />
      {!!searchList.length ? (
        <FlatList
          data={searchList}
          keyExtractor={(session) => session.id}
          renderItem={renderItem}
        />
      ) : (
        <CommonText 
        customContainerStyle={styles.noResultContainer}
        customTextStyle={styles.text(true)}>
          {intl.formatMessage({ id: "label.no_results_found" })}
        </CommonText>
      )}
    </>
  );
};

SessionList.propTypes = {
  onSelectItem: PropTypes.func.isRequired,
  selectedSession: PropTypes.object.isRequired,
  sessionList: PropTypes.array.isRequired,
};

export default SessionList;
