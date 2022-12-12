import { React, useState, useEffect } from "react";
import { Button, TextField, Box, FormControl, IconButton, InputLabel, List, MenuItem, Select, Grid, Container } from '@mui/material';
import axios from 'axios'
import { number } from "prop-types";
import { Typography } from '@mui/material';
import PropTypes from "prop-types";
import "./profPage.scss"
import ProfessorRatingsComponent from "../ratings/profRatingsComponent";

function avgGpaProf(data, prof_name) {
    let toreturn = 0;
    for (let i = 0; i < data.length; i++) {
        let sectionL = data[i].sections;
        for (let j = 0; j < sectionL.length; j++) {
            if (sectionL[j].profName === prof_name) {
                toreturn = sectionL[j].avgGPA;
            }
        }
    }
    return toreturn
}

function transformProfessorData(data) {
    let output = {};
    output["profId"] = data["_id"];
    output["profName"] = data["name"];
    
    let courseData = [];
    for (let i = 0; i < data.courses.length; i++) {
        let course = data.courses[i];
        courseData.push({
            "term": course["term"],
            "year": course["year"],
            "courseId": course["_id"],
            "courseName": course["name"],
            "subject": course["subject"],
            "number": course["number"]
        })
    }
    output["courseData"] = courseData;

    return output;
}

export default function ProfPage(props) {
    //All possible states being used
    const [profData, updateProfData] = useState({});
    const [reviewData, changeReviewData] = useState([]);
    const [isDataInit, changeDataInit] = useState(false);
    const [avgRating, changeAvgRating] = useState(0);

    // Data fetching using our API through axios and loading into state variables to be used throughout the page
    useEffect(() => {
        const fetch_prof_data = async function() {
            // Get Prof data 
            const profUrl = `https://graderu.herokuapp.com/api/v1/professors?name=${props.profName}`;
            const {data: {
                data: results
            }} = await axios.get(profUrl);
            updateProfData(transformProfessorData(results[0]));

            const reviewUrl = `https://graderu.herokuapp.com/api/v1/reviews?professor=${results[0]["_id"]}`
            const {
                data: {
                    data: reviewArr
                }
            } = await axios.get(reviewUrl);

            changeReviewData(reviewArr);
            changeDataInit(true);
        };
        fetch_prof_data();
    }, []);

    useEffect(() => {
        let sum = 0;
        let num = 0;
        reviewData.forEach((val) => {
            sum += val.rating;
            num += 1;
        });

        num = (num == 0) ? 1 : num;
        changeAvgRating(Math.floor(sum / num));
    }, [reviewData]);
    // List components and functions to be used here 
    function CourseItem(props) {
        const [avgGPA, updateGPA] = useState(0.0)

        useEffect(() => {
            const fetch_course_data = async function() {
                //API calls 
                const url = `https://graderu.herokuapp.com/api/v1/courses?subject=${props.data.subject}&year=${props.data.year}&term=${props.data.term}&number=${props.data.number}`
                const {data: {
                    data: results
                }} = await axios.get(url);

                updateGPA(avgGpaProf(results, props.profName))
            }
            fetch_course_data()
        }, []);

      return (
            <div className = "row">
                    <div className = "column left">
                        <h5>{props.data.subject}{props.data.number}</h5>
                    </div>
                    <div className = "column middle">
                        <h5>{props.data.name}</h5>
                    </div>
                    <div className = "column right">
                        <h5>{props.data.term}{props.data.year}</h5>
                    </div>
                    <div className = "column last">
                        <h5>{avgGPA}</h5>
                    </div>
            </div>
        );
    }

    return !isDataInit ? (<></>) : (
        <Container className="profPage">
            <Box sx={{mt: 5}}>
                <Typography variant="h3">{`Professor Name: ${props.profName}`}</Typography>
                <Typography variant="h5">{`Average Rating: ${avgRating}`}</Typography>
                <Box>
                    <div className="row">
                        <div className="column left">
                            <h2>Course Code</h2>
                        </div>
                        <div className="column middle">
                            <h2>Course Name</h2>
                        </div>
                        <div className="column right">
                            <h2>Semester</h2>
                        </div>
                        <div className="column last">
                            <h2>Average GPA</h2>
                        </div>
                    </div>
                    <div>
                        {profData.courseData.map((val, idx) =>
                            <CourseItem data={val} key={idx} profName={props.profName}/>
                        )}
                    </div>
                </Box>
                <Box>
                    <ProfessorRatingsComponent profData={profData} reviewList={reviewData}></ProfessorRatingsComponent>
                </Box>
            </Box>
        </Container>
    );
};


ProfPage.propTypes = {
    profName: PropTypes.string.isRequired
}