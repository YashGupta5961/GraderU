import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { CssBaseline } from "@mui/material";
import React, { useState } from "react";
import HomeScreenProfItem from "../../components/homeScreen/homeScreenProfItem";
import HomeScreenCourseItem from "../../components/homeScreen/homeScreenCourseItem";
import "./homeScreen.css";
import Header from "../../components/header/header";

function HomeScreen() {
    const [data, setData] = useState({ data: [] });
    const [searchInput, setSearchInput] = useState("");
    const [filter, setFilter] = React.useState("Professor");
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState("");

    const handleChangeSearch = (event) => {
        event.preventDefault();
        setSearchInput(event.target.value);
    };

    const handleProfAPICall = async (name) => {
        setIsLoading(true);
        try {
            const response = await fetch(
                "https://graderu.herokuapp.com/api/v1/professors?name=" + name,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }

            const result = await response.json();

            setData(result);
        } catch (err) {
            setErr(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCourseAPICall = async (input) => {
        setIsLoading(true);
        try {
            const words = input.split(" ");
            const response = await fetch(
                "https://graderu.herokuapp.com/api/v1/courses?subject=" +
                words[0] +
                "&number=" +
                words[1],
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }

            const result = await response.json();

            setData(result);
        } catch (err) {
            setErr(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && event.target.value !== "") {
            if (filter === "Professor") {
                setSearchInput(event.target.value);
                handleProfAPICall(event.target.value);
                console.log("Professor Search");
            } else if (filter === "Course") {
                setSearchInput(event.target.value);
                handleCourseAPICall(event.target.value);
                console.log("Course Search");
            }
        }
    };

    const handleChangeFilter = (event) => {
        setFilter(event.target.value);
        setData({ data: [] });
    };

    return (
        <div>
            <Header />
            <Container
                className="homescreen-container"
                sx={{
                    backgroundColor: "primary.background",
                    display: "flex",
                    flexDirection: "column",
                    paddingBottom: "100%",
                }}
            >
                <div className="homescreen-search" >
                    <TextField
                        id="search-bar"
                        className="homescreen-searchbox"
                        variant="outlined"
                        placeholder={
                            filter === "Professor" ? "Caesar, Matthew..." : "CS 374..."
                        }
                        onChange={handleChangeSearch}
                        onKeyDown={handleKeyDown}
                    />

                    <div className="homescreen-search-params">
                        <FormControl>
                            <InputLabel id="home-search-filter-label">Search Filter</InputLabel>
                            <Select
                                labelId="home-search-filter-label"
                                id="demo-simple-select"
                                value={filter}
                                label="Search Filter"
                                className="homescreen-filters"
                                onChange={handleChangeFilter}
                            >
                                <MenuItem value={"Professor"}>Professor</MenuItem>
                                <MenuItem value={"Course"}>Course</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>

                {filter === "Professor" ? (
                    <div
                        className="homescreen-results"
                        style={
                            data.data.length > 0
                                ? {
                                    border: "3px solid black",
                                    boxShadow: "5px 5px",
                                    overflowY: "scroll",
                                }
                                : {}
                        }
                    >
                        <ul className="homescreen-results-list">
                            {data.data.map((item) => (
                                <li key={item._id}>
                                    <HomeScreenProfItem name={item.name} />
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div
                        className="homescreen-results"
                        style={
                            data.data.length > 0
                                ? {
                                    border: "3px solid black",
                                    boxShadow: "5px 5px",
                                    overflowY: "scroll",
                                }
                                : {}
                        }
                    >
                        <div className="homescreen-results-list">
                            {
                                data.data.length > 0 ? (
                                    <HomeScreenCourseItem data={data.data[0]} />
                                ): (<div/>)
                            }

                            {/* <HomeScreenCourseItem data={data.data[0]} /> */}
                            {/* {data.data.map((item) => (
                                <li key={item._id}>
                                    <HomeScreenCourseItem data={item} />
                                </li>
                            ))} */}
                        </div>
                    </div>
                )}
            </Container>
        </div>
    );
}

export default HomeScreen;
