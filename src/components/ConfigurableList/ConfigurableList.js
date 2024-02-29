import React, { useEffect, useRef, useState } from "react";
import {TextInput, View, Image} from '@unthinkable/react-core-components';
import PropTypes from "prop-types";

import classes from "../../theme/styles/CssClassProvider";
import CommonText from "../CommonText";
import CustomImage from "../CustomImage";
import CustomTextInput from "../CustomTextInput";
import images from "../../images";
import styles from "./ConfigurableListStyle";
import TouchableImage from "../TouchableImage";

const ConfigurableList = ({title, items}) => {
    const {iconAdd, iconSearch, iconTrash} = images;
    const mainListPrevState = useRef([]);
    const [mainList, setMainList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(()=>{
        mainListPrevState.current = items;
        setMainList(items);
    }, []);

    useEffect(()=>{
        if(searchQuery?.length > 0){
           handleSearch(searchQuery); 
        }
        else{
            setMainList([...mainListPrevState.current]);
        }
    }, [searchQuery]);

    const handleDelete = (itemID) => {
        mainListPrevState.current = mainListPrevState.current.filter((item)=>item.id !== itemID);
        if(searchQuery.length > 0){
            const queryList = mainList.filter((item)=>item.id !== itemID);
            setMainList([...queryList]);
        }
        else{
            setMainList([...mainListPrevState.current]);
        }
    }

    const handleSearch = (query) => {
        const queryList = fetchData(query);
        setMainList(queryList);
    }
    
    const handleTextChange = (newText) => {
        const regex = /^[A-Za-z ]*$/;
        if (regex.test(newText)) {
            setSearchQuery(newText);
        }
    }

    const fetchData = (query) => {
        const list = mainListPrevState.current.filter((item)=>item.name.toLowerCase().includes(query.toLowerCase()));
        return list;
    }

    return (
        <View style={styles.outerContainer}>
            <View style={styles.componentContainer}>
                <View style={styles.header}>
                    <View style={styles.titleStyles}>{title}</View>
                    <TouchableImage
                        source={iconAdd}
                        parentStyle={styles.addIcon}
                        onPress={null}
                    />
                </View>
                    <View style={styles.outerSearchWrapper}>
                        <CustomTextInput style={styles.searchInput}
                        placeholder="Search" value={searchQuery} onChangeText={(newText)=>handleTextChange(newText)} />
                        <CustomImage style={styles.iconSearch} source={iconSearch} />
                    </View>

                <View style={styles.section}>
                    <View style={styles.itemsWrapper}>
                        {
                            mainList?.length > 0 && mainList.map((item)=>(
                                <View key={item.id} className={classes["configrableList__item"]} style={styles.itemContainer}>
                                <View style={styles.item}>{item.name}</View>
                                <TouchableImage 
                                    source={iconTrash} style={styles.trashIcon} onPress={()=>handleDelete(item.id)}
                                />
                                </View>
                            ))
                        }
                        {
                            mainList.length === 0 && (
                                <View style={styles.messageContainer}>
                                    <CommonText customTextStyle={styles.message}>
                                        No {title} has been selected. Click '+' to add {title}.
                                    </CommonText>
                                </View>
                            )
                        }
                    </View>
                </View>
            </View>
        </View>
    );
}

ConfigurableList.defaultProps = {
    title: 'DefaultTitle',
    items: [],
};

ConfigurableList.protoTypes = {
    title: PropTypes.string,
    items: PropTypes.array,
};

export default ConfigurableList;