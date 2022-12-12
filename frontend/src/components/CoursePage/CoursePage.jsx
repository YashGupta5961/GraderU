import { React, useState, useEffect } from "react";
import { Button, TextField, Box, FormControl, IconButton, InputLabel, List, MenuItem, Select, Grid, Container } from '@mui/material';
import axios from 'axios'
import { Typography } from '@mui/material';
import GraphComponent from "../Graph/graph.jsx"
import * as ok from "./output.json";

function conversion(data){

}

export default function CoursePage(props) {
    const[data, setdata] = useState()
    const[graphData, setGraphData] = useState({
        "courseId": "638851848ea935100c4226ae",
        "term": "Fall",
        "year": 2011,
        "number": 408,
        "subject": "ECE",
        "name": "Applied Parallel Programming",
        "distribution": [
            8,
            12,
            0,
            6,
            3,
            3,
            1,
            0,
            0,
            0,
            0,
            0,
            2
        ],
        "profName": "Hwu, Wen-Mei W"
    })

    useEffect(() => {
        const fetch_data = async function() {
        //    const url = `https://graderu.herokuapp.com/api/v1/courses?subject=${props.subject}&year=${props.year}&term=${props.term}&number=${props.number}`
          const url = `https://graderu.herokuapp.com/api/v1/courses?subject=CS&year=2021&term=Spring&number=374`
          const {data: {
            data: results
          }} = await axios.get(url);
          // console.log(results)

          setdata(conversion(results))

        }
        
        fetch_data()
        
    },[]);

    
    return (

        <Container className="CoursePage" sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'}}>
        <Box sx={{mt: 5}}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <GraphComponent data={graphData}/>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    <h5>Professor drop down</h5>
                    <h5>Semester drop down</h5>
                </Box>
            </Box>
            <Box>
                <Typography sx={{m: 30}}> Import FAQ Component here</Typography>
            </Box>
            <Box>
                <Typography sx={{m: 30}}> Import Ratings Component here</Typography>
            </Box>
        </Box>
        </Container>

    );
};


// CoursePage.propTypes = {
//     subject: PropTypes.string.isRequired,
//     number: PropTypes.number.isRequried,
//     term: PropTypes.string.isRequired,
//     year: PropTypes.string.isRequired
// }


