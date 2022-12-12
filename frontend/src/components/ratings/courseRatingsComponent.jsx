import AddIcon from '@mui/icons-material/Add';
import { FormControl, IconButton, InputLabel, List, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import PropTypes from "prop-types";
import { useEffect, useId, useState } from 'react';
import ReviewItem from './reviewItem';
import Popup from 'reactjs-popup';
import CreateReviewComponent from './createReview';
// import 'reactjs-popup/dist/index.css';
import './styles/styles.scss';

export default function CourseRatingsComponent(props) {
    // Create local state variables
    // This maintains the state for the selected value in the select dropdown
    const [filterValue, changeFilterValue] = useState('');

    // This maintains the filtered reviews, which are generated based on the filterValue state
    const [filteredReviews, changeFilteredReviews] = useState([]);

    // This stores the enteries for the filtered dropdown menu
    const [filterDropdownList, changeFilterDropdownList] = useState([]);

    // Store all the course reviews
    const [courseReviews, changeCourseReviews] = useState([]);

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
        if (event.target == modalDiv) {
            modalDiv.style.display = "none";
        }
    }
    // useEffect Hooks to generate state items
    // Get all reviews
    useEffect(() => {
        const getReviews = async function() {
            let tempReviewList = [];
            for (let i = 0; i < props.reviewList.length; i++) {
                let val = props.reviewList[i];
                const {
                    data: {
                        data: reviewData
                    }
                } = await axios.get(`https://graderu.herokuapp.com/api/v1/reviews/${val}`);
                tempReviewList.push(reviewData);
            }
            changeCourseReviews(tempReviewList);
        };
        if (courseReviews.length == 0) getReviews();
    }, [props.reviewList]);

    // Generate filtered dropdown based on props
    useEffect(() => {
        let tempList = []
        props.profData.forEach((val, idx) => {
            tempList.push(
                <MenuItem value={val.profId} key={idx}>
                    {val.profName}
                </MenuItem>
            );
        });
        changeFilterDropdownList(tempList);
    }, [props.profData]);

    // Generate filtered reviews based on filterValue
    useEffect(() => {
        if (filterValue !== '') {
            let filteredReviews = []
            courseReviews.forEach((value, idx) => {
                if (value['professor'] === filterValue) {
                    filteredReviews.push(
                        <ReviewItem data={value} key={idx} reviewDataDispatcher={generateNewReviews} profData={props.profData}/>
                    )
                }
            });
            changeFilteredReviews(filteredReviews);
        } else {
            changeFilteredReviews(courseReviews.map((value, idx) => {
                return (
                    <ReviewItem data={value} key={idx} reviewDataDispatcher={generateNewReviews} profData={props.profData}/>
                );
            }));
        }
    }, [filterValue, courseReviews]);

    // Return Ratings component
    return (
    <>
        <div className="ratingsComponent">
            <div className="ratingsButtonsDiv">
                <IconButton aria-label="addReview" className='ratingsAddButton' onClick={addButtonClick}>
                    <AddIcon />
                </IconButton>
                <FormControl className="ratingsFormControl">
                    <InputLabel>{`Filter by Professor`}</InputLabel>
                    <Select
                        label={`Filter by Professor`}
                        value={filterValue}
                        onChange={(e) => {
                            changeFilterValue(e.target.value);
                        }}
                        autoWidth
                    >
                        {filterDropdownList}
                    </Select>
                </FormControl>
            </div>
            <div className='createModal' id={modalId}>
                <div className='ratingsCreateReview'>
                    <CreateReviewComponent 
                        reviewDispatcher={generateNewReviews}
                        filterList={props.profData}
                        filterField={'professor'}
                        constantField={'course'}
                    />
                </div> 
            </div>
            <div>
                <List>
                    {filteredReviews}
                </List>
            </div>
        </div>
    </>);
};

// Define prop types for RatingsComponent
CourseRatingsComponent.propTypes = {
    profData: PropTypes.arrayOf(PropTypes.shape({
        profName: PropTypes.string,
        profId: PropTypes.string,
        courseData: PropTypes.arrayOf(PropTypes.shape({
            courseId: PropTypes.string,
            term: PropTypes.string,
            year: PropTypes.number
        }))
    })),
    reviewList: PropTypes.arrayOf(PropTypes.string),
}