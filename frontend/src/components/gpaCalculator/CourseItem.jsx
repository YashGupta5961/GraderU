import React from "react";
import PropTypes from "prop-types";
import "../gpaCalculator/styles/courseItem.scss"
import curve from "../gpaCalculator/styles/bellcurve.png" 
import { Slider } from '@mui/material';

export default function CourseItem(props) {  
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




// CourseItem.propTypes = {
//     data: PropTypes.shape({
//         course_name: PropTypes.string.isRequired,
//         course_gpa: PropTypes.string.isRequired,
//     }).isRequired
// }