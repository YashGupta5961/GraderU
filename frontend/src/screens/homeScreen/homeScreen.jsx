import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Select from '@mui/material/Select';
import React, { useState } from 'react';

import HomeScreenSearchItem from '../../components/homeScreen/homeScreenSearchItem';
import './homeScreen.css';

const data = [
    { name: "Belgium", continent: "Europe" },
    { name: "India", continent: "Asia" },
    { name: "Bolivia", continent: "South America" },
    { name: "Ghana", continent: "Africa" },
    { name: "Japan", continent: "Asia" },
    { name: "Canada", continent: "North America" },
    { name: "New Zealand", continent: "Australasia" },
    { name: "Italy", continent: "Europe" },
    { name: "South Africa", continent: "Africa" },
    { name: "China", continent: "Asia" },
    { name: "Paraguay", continent: "South America" },
    { name: "Usa", continent: "North America" },
    { name: "France", continent: "Europe" },
    { name: "Botswana", continent: "Africa" },
    { name: "Spain", continent: "Europe" },
    { name: "Senegal", continent: "Africa" },
    { name: "Brazil", continent: "South America" },
    { name: "Denmark", continent: "Europe" },
    { name: "Mexico", continent: "South America" },
    { name: "Australia", continent: "Australasia" },
    { name: "Tanzania", continent: "Africa" },
    { name: "Bangladesh", continent: "Asia" },
    { name: "Portugal", continent: "Europe" },
    { name: "Pakistan", continent: "Asia" }
];

function HomeScreen() {
    const [searchInput, setSearchInput] = useState("");

    const [filter, setFilter] = React.useState('All');
    const [sort, setSort] = React.useState('Ascending');

    const handleChangeSearch = (event) => {
        event.preventDefault();
        setSearchInput(event.target.value);
        console.log(event.target.value);
    }

    // if (searchInput.length > 0) {
    //     data.filter((item) => {
    //         return item.name.match(searchInput);
    //     });
    // }

    const handleChangeFilter = (event) => {
        setFilter(event.target.value);
    };

    const handleChangeSort = (event) => {
        setSort(event.target.value);
    };

    const filteredData = data.filter((el) => {
        if (searchInput === '') {
            return undefined;
        } else {
            return el.name.toLowerCase().match(searchInput.toLowerCase());
        }
    })

    return (
        <Container className="homescreen-container"
            sx={{
                backgroundColor: "primary.background",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <div className="homescreen-search">
                <TextField
                    id="search-bar"
                    className="homescreen-searchbox"
                    variant="outlined"
                    placeholder="Search..."
                    onChange={handleChangeSearch}
                />

                <div className="homescreen-search-params">
                    <FormControl>
                        <InputLabel id="home-search-filter-label">Search Filter</InputLabel>
                        <Select
                            labelId="home-search-filter-label"
                            id="demo-simple-select"
                            value={filter}
                            label="Search Filter"
                            className='homescreen-filters'
                            onChange={handleChangeFilter}
                        >
                            <MenuItem value={"All"}>All</MenuItem>
                            <MenuItem value={"Professor"}>Professor</MenuItem>
                            <MenuItem value={"Course"}>Course</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl>
                        <InputLabel id="home-search-sort-label">Sort By</InputLabel>
                        <Select
                            labelId="home-search-sort-label"
                            id="home-search-sort"
                            value={sort}
                            label="Sort By"
                            className='homescreen-filters'
                            onChange={handleChangeSort}
                        >
                            <MenuItem value={"Ascending"}>Ascending</MenuItem>
                            <MenuItem value={"Descending"}>Descending</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>

            <div className="homescreen-results"
                style={
                    filteredData.length > 0 ? {
                        border: "3px solid black",
                        boxShadow: "5px 5px",
                    } : {}
                }
            >
                <ul className="homescreen-results-list">
                    {filteredData.map((item) => (
                        <li key={item.name} >
                            <HomeScreenSearchItem name={item.name} />
                        </li>
                    ))}

                </ul>
            </div>
        </Container>
    )
}

export default HomeScreen