import React, { useState } from "react";
import { FlatList } from "@unthinkable/react-core-components";
import PropTypes from "prop-types";

import CustomTouchableOpacity from "../CustomTouchableOpacity";
import ResponsiveTextTruncate from "../ResponsiveTextTruncate/ResponsiveTextTruncate";
import SearchView from "../SearchView";
import styles from "./SessionList.style"

const SessionList = ({ sessionList, onSelectItem, selectedSession }) => {

    const [searchList, setSearchList] = useState(sessionList);

    const renderItem = ({ item: session }) => (
        <CustomTouchableOpacity
            key={session.id}
            style={styles.listItem(selectedSession === session)}
            onPress={() => onSelectItem(session)}>
            <ResponsiveTextTruncate
                text={session.label}
                maxLength={40}
                style={styles.text(selectedSession === session)}
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
    sessionList: PropTypes.array.isRequired,
    onSelectItem: PropTypes.func.isRequired,
    selectedSession: PropTypes.object.isRequired,
};

export default SessionList;
