import AddIcon from '@mui/icons-material/Add';
import { Box, FormControl, IconButton, InputLabel, List, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import PropTypes from "prop-types";
import { useEffect, useId, useState } from 'react';
import ReviewItem from './reviewItem';
import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';
import './styles/styles.scss';
import ProfCreateReviewComponent from './profCreateReview';

export default function ProfessorRatingsComponent(props) {
    // Create local state variables
    // This maintains the state for the selected value in the select dropdown
    const [filterValue, changeFilterValue] = useState('');

    // This maintains the filtered reviews, which are generated based on the filterValue state
    const [filteredReviews, changeFilteredReviews] = useState([]);

    // This stores the enteries for the filtered dropdown menu
    const [filterDropdownList, changeFilterDropdownList] = useState([]);

    // Store all the course reviews
    const [courseReviews, changeCourseReviews] = useState(props.reviewList);

    const [createReviewData, changeCreateReviewData] = useState([]);


    // Store modal data
    const modalId = useId();
    const modalDiv = document.getElementById(modalId);

    async function generateNewReviews(update_type, packet, id) {
        if (update_type === 'create') {
            let url = `https://graderu.herokuapp.com/api/v1/reviews`;
            const {
                data: {
                    status: statusVal,
                    data: dataValue
                }
            } = await axios.post(url, packet);

            if (statusVal === "success") {
               // Time to update local state
               let newCourseReview = courseReviews; 
               newCourseReview.push(dataValue);
               changeCourseReviews(newCourseReview);
            }
        } else if (update_type === 'update') {
            let url = `https://graderu.herokuapp.com/api/v1/reviews/${id}`;
            const {
                data: {
                    status: statusVal,
                    data: dataValue
                }
            } = await axios.patch(url, packet);

            if (statusVal === "success") {
                // Time to update local state
                let newCourseReview = courseReviews; 
                for (let i = 0; i < newCourseReview.length; i++) {
                    if (newCourseReview[i]["_id"] === dataValue["_id"]) {
                        newCourseReview[i] = dataValue;
                        changeCourseReviews(newCourseReview);
                        break;
                    }
                }
            }
        }
    }

    function addButtonClick() {
        modalDiv.style.display = "block";
    }

    window.onclick = function(event) {
        if (event.target === modalDiv) {
            modalDiv.style.display = "none";
        }
    }
    // useEffect Hooks to generate state items
    // Generate filtered dropdown based on props
    useEffect(() => {
        let tempList = []
        props.profData.courseData.forEach((val, idx) => {
            tempList.push(
                <MenuItem value={val.courseId} key={idx}>
                    {`${val.subject}${val.number}: ${val.term} ${val.year}`}
                </MenuItem>
            );
        });
        changeFilterDropdownList(tempList);
    }, [props.profData]);

    useEffect(() => {
        let mapval = new Map();
        props.profData.courseData.forEach((val) => {
            let key = `${val.subject} ${val.number}`;
            if (mapval.has(key)) {
                mapval.get(key).courseData.push({
                    courseId: val.courseId,
                    term: val.term,
                    year: val.year
                });
            } else {
                mapval.set(key, {
                    subject: val.subject,
                    number: val.number,
                    courseData: [{
                        courseId: val.courseId,
                        term: val.term,
                        year: val.year
                    }]
                });
            }
        });

        changeCreateReviewData(Array.from(mapval.values()));
    }, [props.profData.courseData])

    // Generate filtered reviews based on filterValue
    useEffect(() => {
        if (filterValue !== '') {
            let filteredReviews = []
            courseReviews.forEach((value, idx) => {
                if (value['course'] === filterValue) {
                    filteredReviews.push(
                        <ReviewItem data={value} key={idx} reviewDataDispatcher={generateNewReviews} profData={[props.profData]}/>
                    )
                }
            });
            changeFilteredReviews(filteredReviews);
        } else {
            changeFilteredReviews(courseReviews.map((value, idx) => {
                return (
                    <ReviewItem data={value} key={idx} reviewDataDispatcher={generateNewReviews} profData={[props.profData]}/>
                );
            }));
        }
    }, [filterValue, courseReviews]);

    // Return Ratings component
    return (
    <>
        <Box className="ratingsComponent">
            <Box className="ratingsButtonsDiv">
                <IconButton aria-label="addReview" className='ratingsAddButton' onClick={addButtonClick}>
                    <AddIcon />
                </IconButton>
                <FormControl className="ratingsFormControl">
                    <InputLabel>{`Filter by Course`}</InputLabel>
                    <Select
                        label={`Filter by Course`}
                        value={filterValue}
                        onChange={(e) => {
                            changeFilterValue(e.target.value);
                        }}
                        autoWidth
                    >
                        {filterDropdownList}
                    </Select>
                </FormControl>
            </Box>
            <Box className='createModal' id={modalId}>
                <Box className='ratingsCreateReview' sx={{
                    backgroundColor: 'primary.background',
                    borderRadius: 5
                }}>
                    <ProfCreateReviewComponent 
                        reviewDispatcher={generateNewReviews}
                        filterList={createReviewData}
                        filterField={'course'}
                        constantField={'professor'}
                    />
                </Box> 
            </Box>
            <Box>
                <List>
                    {filteredReviews}
                </List>
            </Box>
        </Box>
    </>);
};

// Define prop types for RatingsComponent
ProfessorRatingsComponent.propTypes = {
    profData: PropTypes.shape({
        profName: PropTypes.string,
        profId: PropTypes.string,
        courseData: PropTypes.arrayOf(PropTypes.shape({
            courseId: PropTypes.string,
            term: PropTypes.string,
            year: PropTypes.number, 
            subject: PropTypes.string,
            number: PropTypes.number,
        }))
    }),
    reviewList: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        likes: PropTypes.arrayOf(PropTypes.string.isRequired),
        dislikes: PropTypes.arrayOf(PropTypes.string.isRequired),
        professor: PropTypes.string.isRequired,
        course: PropTypes.string.isRequired,
    }).isRequired),
}