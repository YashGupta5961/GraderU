import { React, useState, useEffect } from "react";
import { Button, TextField, Box, FormControl, IconButton, InputLabel, List, MenuItem, Select, Grid, Container } from '@mui/material';
import axios from 'axios'
import { number } from "prop-types";
import { Typography } from '@mui/material';
import "./profPage.scss"

function avgGpaProf(data, prof_name) {
  let toreturn = 0;
  for (let i = 0; i < data.length; i++) {
      let sectionL = data[i].sections
      for(let j = 0; j < sectionL.length; j++) {
          if(sectionL[j].profName == prof_name) {
              toreturn = sectionL[j].avgGPA
          }
      }
  }
  
  return toreturn
}

export default function ProfPage(props) {
    //All possible states being used
    const [coursesTaught, updateCoursesTaught] = useState([])

    // Data fetching using our API through axios and loading into state variables to be used throughout the page
    useEffect(() => {
        const fetch_prof_data = async function() {
        //API calls 
        // const url = `https://graderu.herokuapp.com/api/v1/professors?name=${props.profName}`
        const url = `https://graderu.herokuapp.com/api/v1/professors?name=Miller, Andrew E`
        const {data: {
          data: results
        }} = await axios.get(url);

        updateCoursesTaught(results[0].courses)
      }
      
      fetch_prof_data()

    },[]);

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

        let profName = "Miller, Andrew E"
        updateGPA(avgGpaProf(results, profName))
        }
      
        fetch_course_data()

      },[]);

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

  return (

    <Container className="profPage">
      <Box sx={{mt: 5}}>
        <Typography variant="h3">Professor Name</Typography>
          <Typography variant="h5">AVERAGE RATING: </Typography>
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
                {coursesTaught.map((e) =>
                  <div><CourseItem data={e}/></div>
                )}
              </div>
          </Box>
          <Box>
              <Typography sx={{m: 30}}> Import Ratings Component here</Typography>
          </Box>
      </Box>
    </Container>

  );
};


// ProfPage.propTypes = {
//     profName: PropTypes.string.isRequired
// }


