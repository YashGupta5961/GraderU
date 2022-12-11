import { React, useState, useEffect } from "react";
import { Button, TextField, Box, FormControl, IconButton, InputLabel, List, MenuItem, Select, Grid, Container } from '@mui/material';
import "./styles/gpaPage.scss";
import "../gpaCalculator/styles/courseItem.scss"
import curve from "../gpaCalculator/styles/bellcurve.png" 
import { Slider } from '@mui/material';
import axios from 'axios'
import { number } from "prop-types";
// import CourseItem from "./CourseItem.jsx"

export default function GpaPage(props) {

    const [coursesAdded, changeCoursesAdded] = useState([])
    const [avgGPA, changeAvgGPA] = useState(0.0)
    const [courseInput, setCourseInput] = useState('')
    const [numberInput, setNumberInput] = useState('') 
    const [SearchDisabled, updateSearchDisabled] = useState(true)
    const [ButtonDisabled, updateButtonDisabled] = useState(true)
    const [prof, setProf] = useState('None Selected')
    const [dataLoaded, changeDataLoaded] = useState([])
    const [courseMap, updateCourseMap] = useState(new Map())
    const [professors, updateProfessors] = useState([])

    /* This function takes in the grade distribution array and the average array 
    to return an array of all the quartiles for a class*/
    function quartileCalc(array1, aveg) {
      let studentarr = []
      const gpa = [4.0, 4.0, 3.7, 3.3, 3.0, 3.7, 2.3, 2.0, 1.7, 1.3, 1.0, 0.7, 0.0]
      for (let i = 0; i < array1.length; i++) {
          for(let j = 0; j < array1[i]; j++) {
              studentarr.push(gpa[i])
          }
      }
      
      let std1 = studentarr.map((k)=>{
          return (k - aveg) ** 2
      })
     
      let sum = std1.reduce((acc, curr)=> acc + curr, 0);
    
      let variance = sum / std1.length
      
      let standardD = variance**(1/2)
      
      let firstQuartile = aveg - 0.675*standardD
      let middleQuartile = aveg
      let thridQuartile = aveg + 0.675*standardD
      
      const quartileArr = [0, firstQuartile, middleQuartile, thridQuartile, 4.0]
      return quartileArr;
  }

  /* This function takes in a list of all sections and every professor of a class and return 
  a map with the key as the professor for that class and the value as the average gpa distribution 
  for the course for that particular professor */
  
  function gpaPerProf(data) {
      let profGpaMap = new Map()
      for (let i = 0; i < data.length; i++) {
          let sectionL = data[i].sections
          for(let j = 0; j < sectionL.length; j++) {
              //console.log(sectionL[j].profName)
              let distribuition = sectionL[j].distribution
              let aveg = sectionL[j].avgGPA
              
              let newquartiles = quartileCalc(distribuition, aveg)
              
              if (profGpaMap.has(sectionL[j].profName) === false) {
                  profGpaMap.set(sectionL[j].profName, newquartiles)
              } else {
                  let currentquartile = profGpaMap.get(sectionL[j].profName)
                  let combinedQuartile = []
                  for(let m = 0; m < currentquartile.length; m++) {
                      combinedQuartile[m] = currentquartile[m] + newquartiles[m]
                  }
                  combinedQuartile = combinedQuartile.map((k)=>{
                          return k/2
                  })
                  profGpaMap.set(sectionL[j].profName, combinedQuartile)
              }
          }
      }
      return profGpaMap
      // console.log(profGpaMap)
  }

  /* This function takes in the professor map and returns a list of dictionary with each dictionary 
  in the form 
  {
    value: {professor name},
    label: {professor name}
  } for the drop down menu */ 
  function profprofmap(map_) {
    let result = []
    for (let key of map_.keys()) {
        let mp2 = new Map();
        mp2.set("value", key);
        mp2.set("label", key);
        result.push(mp2)
    }
    return result;
}

    useEffect(() => {
      const fetch_data = async function() {
        const url = `https://graderu.herokuapp.com/api/v1/courses?subject=${courseInput}&number=${numberInput}`
        const {data: {
          data: results
        }} = await axios.get(url);
        // console.log(results)
        changeDataLoaded(results)
        updateCourseMap(gpaPerProf(results))
        updateProfessors(profprofmap(courseMap))
      }
      if(courseInput.length >= 2 && numberInput.length === 3){
        fetch_data()
      }
    },[courseInput, numberInput]);

    useEffect(() => {
      console.log(dataLoaded)
      console.log(courseMap)
      console.log(professors)
    }, [courseMap, dataLoaded, professors])
    
    // console.log(dataLoaded)
    

    

  // let course_distribution_map = gpaPerProf(dataLoaded)
  // console.log(course_distribution_map)

  // let professors = profprofmap(course_distribution_map)
  // console.log(professors)


  // const professors = [ 
  //     {
  //       value: 'Jeff',
  //       label: 'Jeff'
  //     },
  //     {
  //       value: 'Kani',
  //       label: 'Kani',
  //     }
  //   ];

    let displayCourses = [
      {
        course_name: 'CS409',
        course_gpa: '3.8'
      },
      {
        course_name: 'CS225',
        course_gpa: '4.0'
      }
    ]

    

    function CourseItem(props) {  
      return (
          <div className = "entry">
                  <div className = "col left" id = "course_name">
                      <h2>{props.data.course_name}</h2>
                  </div>
                  <div className = "col middle" id="course_gpa">
                      <h2>{props.data.course_gpa}</h2>
                  </div>
                  <div className = "col right" id="course_curve">
                      <img className = "curve" src = {curve} />
                      <Slider size="small" track={false} valueLabelDisplay="auto"
                      defaultValue={50}
                      step={25}
                      marks
                      min={0}
                      max={100}/>
                  </div>
                  <div className = "col last" id="course_curve">
                      <h2> Your GPA </h2>
                  </div>
        </div>
      );
    }

    const handleProfChange = (event) => {
      setProf(event.target.value);
    };

    const handleCourseChange = (event) => {
      setCourseInput(event.target.value);
    };

    const handleNumberChange = (event) => {
      setNumberInput(event.target.value);
    };

    function addCourse(){
      let currCourse = ((courseInput.replace(/\s/g, '' )).toUpperCase) + numberInput

    }

    useEffect(() => {
      if(courseInput.length >= 2 && numberInput.length == 3){
        updateSearchDisabled(false)
        updateButtonDisabled(false)
      }
      else {
        updateSearchDisabled(true)
        updateButtonDisabled(true)
      }
    }, [courseInput, numberInput]); 

  return (
    <div className="gpaPage">
      {/* <h5 id="description">
        Use this grade calculator to calculate your predicted GPA for a semester. Add in the courses your are currently taking
        with the professor teaching it this semester...............
      </h5> */}
      <br></br>
      <h1 id="pred">Your Predicted GPA is:</h1>
      <h1 id="GPAVal"> 4.0 </h1>
      
    <TextField id="course-search" label="Search Course" placeholder="(e.g. CS)" type="search" variant="outlined" 
                helperText="Entry must be at minimum a length of 2" onChange={handleCourseChange}/>  
    <br></br><br></br>
    <TextField id="number-search" label="Search Number" placeholder="(e.g. 409)" type="search" variant="outlined" 
                helperText = "Entry must be a number of length 3" onChange={handleNumberChange}/>  
    <br></br><br></br>
    <TextField  disabled={SearchDisabled} id="prof-search" select label="Professor"
          value={prof} 
          onChange={handleProfChange}
          SelectProps={{
            native: true,
          }}
          helperText="Please select Professor"
        >
          {professors.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
    <br></br><br></br>
    <Button disabled={ButtonDisabled} variant="contained" onClick={addCourse}> ADD COURSE </Button>

      <div className="row">
        <div className="column left">
            <h2>Courses</h2>
        </div>
        <div className="column middle">
            <h2>Course GPA</h2>
        </div>
        <div className="column right">
            <h2>Grade Distribution</h2>
        </div>
        <div className="column last">
            <h2>Your GPA</h2>
        </div>
      </div>
      <div>{displayCourses.map((e) =>
          <div><CourseItem data={e} key={e} value={e}/></div>
        )}
      </div>
    </div>

    


  );
};

// Gpa.PropTypes = {
    
//     gpaData: PropTypes.arrayOf(PropTypes.shape({
//         _id: PropTypes.string.isRequired,
//         name: PropTypes.string.isRequired,
//         avgGPA: PropTypes.number.isRequired,
//         graph: PropTypes.string.isRequired,
//     })).isRequired
// }


