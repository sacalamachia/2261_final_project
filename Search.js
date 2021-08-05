import React from 'react';

const Search = ({value, onSearch}) => (
    <div>
        <label htmlFor="searchInput">Search any cuisine...  : </label>
        <input id="searchInput" type="text" value={value} onChange={onSearch} />
    </div>
);  


export default Search;