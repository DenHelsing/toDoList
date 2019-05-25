import React from 'react';
import ReactDOM from 'react-dom';
import "./search-panel.css"

const SearchPanel = ({changed, searchValue}) => {
    const searchStyle = {
        fontSize : "20px"
    }

    return (
            <input
                className="search-input" 
                placeholder="search" 
                style={searchStyle} 
                value={searchValue}
                onChange={(e) => changed(e.target.value)}
                />
        );
};

export default SearchPanel;