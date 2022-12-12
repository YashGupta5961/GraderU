import { React, useState, useEffect } from "react";
import { Button, TextField, Box, FormControl, IconButton, InputLabel, List, MenuItem, Select, Grid, Container, CssBaseline } from '@mui/material';
import axios from 'axios'
import { Typography } from '@mui/material';
import GraphComponent from "../Graph/graph.jsx"
import "./styles/styles.scss";
import CourseRatingsComponent from "../ratings/courseRatingsComponent.jsx";
import { useSearchParams } from "react-router-dom";

function transformCourseData(data) {
    let mainData = new Map();
    let reviewData = [];
    let faqData = [];

    for (let courseIdx = 0; courseIdx < data.length; courseIdx++) {
      let course = data[courseIdx];
      reviewData = reviewData.concat(course["reviews"]);
      faqData = faqData.concat(course["faqs"]);

      for (let sectionIdx = 0; sectionIdx < course["sections"].length; sectionIdx++) {
        let section = course["sections"][sectionIdx];
        if (mainData.has(section["professor"]) === true) {
          mainData.get(section["professor"])["courseData"].push({
                courseId: course["_id"],
                term: course["term"],
                year: course["year"],
                number: course["number"],
                subject: course["subject"],
                distribution: section["distribution"],
                profName: section["profName"]
              });
        } else {
          mainData.set(section["professor"], {
            profId: section["professor"],
            profName: section["profName"],
            courseData: [
              {
                courseId: course["_id"],
                term: course["term"],
                year: course["year"],
                number: course["number"],
                subject: course["subject"],
                distribution: section["distribution"],
                profName: section["profName"]
              }
            ]
          });
        }
      }
    }
    return [Array.from(mainData.values()), reviewData, faqData];
}

export default function CoursePage(props) {
    const [data, setdata] = useState();
    const [profFilterValue, changeProfFilterValue] = useState('');
    const [profFilterDropdown, changeProfFilterDropdown] = useState([]);
    const [yearTermFilterValue, changeYearTermFilterValue] = useState('');
    const [yearTermFilterDropdown, changeYearTermFilterDropdown] = useState([]);
    const [isDataInit, changeInitState] = useState(false);
    const [reviewData, changeReviewData] = useState([]);
    const [faqData, changeFaqData] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const numberParam = searchParams.get('number');
    const subjectParam = searchParams.get('subject');

    useEffect(() => {
        const fetch_data = async function() {
            const url = `https://graderu.herokuapp.com/api/v1/courses?subject=${subjectParam}&number=${numberParam}`
            const {data: {
                data: results
            }} = await axios.get(url);

            let [mainData, newReviewData, newfaqData] = transformCourseData(results);

            setdata(mainData);
            changeFaqData(newfaqData);
            changeReviewData(newReviewData);

            changeInitState(true);
        };
        fetch_data();
    }, [subjectParam, numberParam]);

    useEffect(() => {
        if (!isDataInit) return;
        let defaultVal = '';
        changeProfFilterDropdown(data.map((val, idx) => {
            if (idx === 0) defaultVal = val.profId;
            return <MenuItem value={val.profId} key={idx}>
                {val.profName}
            </MenuItem>;
        }));
        changeProfFilterValue(defaultVal);
    }, [data]);
    
    useEffect(() => {
        if (!isDataInit) return;
        for (let i = 0; i < data.length; i++) {
            if (data[i].profId === profFilterValue) {
                let defaultVal = '';
                changeYearTermFilterDropdown(data[i].courseData.map((val, idx) => {
                    if (idx === 0) defaultVal = val;
                    return <MenuItem value={val} key={idx}>
                        {`${val.term} ${val.year}`}
                    </MenuItem>;
                }));
                changeYearTermFilterValue(defaultVal);               
            }
        }
    }, [profFilterValue]);
    
    return !isDataInit ? (<></>) : (
        <Container component="main" className="CoursePage" sx={{
            backgroundColor: 'primary.background',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'}}>
            {/* <CssBaseline /> */}
            <Box sx={{
                // backgroundColor: 'primary.background',
                mt: 5
            }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                        <FormControl className="courseProfessorDropdown">
                            <InputLabel>{`Filter by Professor`}</InputLabel>
                            <Select
                                label={`Filter by Professor`}
                                value={profFilterValue}
                                onChange={(e) => {
                                    changeProfFilterValue(e.target.value);
                                }}
                                autoWidth
                            >
                                {profFilterDropdown}
                            </Select>
                        </FormControl>
                        <FormControl className="courseYearTermDropdown">
                            <InputLabel>{`Filter by Year & Term`}</InputLabel>
                            <Select
                                label={`Filter by Year & Term`}
                                value={yearTermFilterValue}
                                onChange={(e) => {
                                    changeYearTermFilterValue(e.target.value);
                                }}
                                autoWidth
                            >
                                {yearTermFilterDropdown}
                            </Select>
                        </FormControl>
                    </Box>
                    <GraphComponent data={yearTermFilterValue}/>
                </Box>
                <Box>
                    <Typography sx={{m: 30}}> Import FAQ Component here</Typography>
                </Box>
                <Box>
                    <CourseRatingsComponent profData={data} reviewList={reviewData}/>
                </Box>
            </Box>
        </Container>
    );
};
