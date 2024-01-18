import React, { useState } from "react";
import PropTypes from "prop-types";
import { FlatList } from "@unthinkable/react-core-components";

import CustomTouchableOpacity from "../CustomTouchableOpacity";
import ResponsiveTextTruncate from "../ResponsiveTextTruncate/ResponsiveTextTruncate";
import SearchView from "../SearchView";
import styles from "./SessionList.style"

const SessionList = ({ onSelectItem, selectedSession, sessionList }) => {
    const [searchList, setSearchList] = useState(sessionList);

    const renderItem = ({ item: session }) => (
        <CustomTouchableOpacity
            key={session.id}
            style={styles.listItem(selectedSession.id === session.id)}
            onPress={() => onSelectItem(session)}>
            <ResponsiveTextTruncate
                text={session.label}
                maxLength={40}
                style={styles.text(selectedSession.id === session.id)}
            />
        </CustomTouchableOpacity>
    );

    const onSearchSession = filteredList => {
        setSearchList(filteredList);
    }

    const handleSearching = query => {
        return sessionList.filter((session) => {
            return session.label.toLowerCase().includes(query);
        });
    }

    return (
        <>
            <SearchView
                data={sessionList}
                onSearch={onSearchSession}
                customInputStyle={styles.searchInput}
                customParentStyle={styles.searchParent}
                searchLogic={handleSearching}
            />
            <FlatList
                data={searchList}
                keyExtractor={(session) => session.id}
                renderItem={renderItem}
            />
        </>
    );
};

SessionList.propTypes = {
    onSelectItem: PropTypes.func.isRequired,
    selectedSession: PropTypes.object.isRequired,
    sessionList: PropTypes.array.isRequired,
};

export default SessionList;
