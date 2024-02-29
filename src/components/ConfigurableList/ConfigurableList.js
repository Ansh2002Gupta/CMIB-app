import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";

import './ConfigurableList.css';
import TextInput from "../TextInput/TextInput.js";
import plus from '../../assets/images/plus.png';
import trash from '../../assets/images/trash.png';
import search from '../../assets/images/search.png';


const ConfigurableList = ({title, items}) => {
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

    const fetchData = (query) => {
        const list = mainListPrevState.current.filter((item)=>item.name.toLowerCase().includes(query.toLowerCase()));
        return list;
    }

    return (
        <div className="outerContainer">
            <div className="componentContainer">
                <div className="header">
                    <div className="titleStyles">{title}</div>
                    <button className="buttonStyles"><img src={plus} alt="add icon here" className="addIcon"/></button>
                </div>
                    <div className="searchContainer">
                        <input value={searchQuery} className="searchInput" placeholder="Search" onChange={(event)=>setSearchQuery(event.target.value)}/>
                        <img className="searchIcon" src={search} alt="search icon here" />
                    </div>
                <div className="section">
                    <div className="itemOuterContainer">
                        {
                            mainList?.length > 0 && mainList.map((item)=>(
                                <div key={item.id} className="itemContainer">
                                <div className="item">{item.name}</div>
                                <button className="buttonStyles" onClick={()=>handleDelete(item.id)}>
                                    <img src={trash} className="trashIcon"/>
                                </button>
                                </div>
                            ))
                        }
                        {
                            mainList.length === 0 && (
                                <div className="messageContainer">
                                    <h2 className="message">
                                        No {title} has been selected. Click '+' to add {title}.
                                    </h2>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

ConfigurableList.defaultProps = {
};

ConfigurableList.protoTypes = {
};

export default ConfigurableList;