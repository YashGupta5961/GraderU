import AddIcon from '@mui/icons-material/Add';
import { FormControl, IconButton, InputLabel, List, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import PropTypes from "prop-types";
import { useEffect, useState, useRef } from 'react';
import ReviewItem from './reviewItem';
import Popup from 'reactjs-popup';
import CreateReviewComponent from './createReview';
import 'reactjs-popup/dist/index.css';

export default function CourseRatingsComponent(props) {
    // Create local state variables
    // This maintains the state for the selected value in the select dropdown
    const [filterValue, changeFilterValue] = useState('');

    // This maintains the filtered reviews, which are generated based on the filterValue state
    const [filteredReviews, changeFilteredReviews] = useState([]);

    // This stores the enteries for the filtered dropdown menu
    const [filterDropdownList, changeFilterDropdownList] = useState([]);

    // This maintains the professor list
    const [professorData, changeProfessorData] = useState([]);

    // Declare forward ref for the popup component
    const popupRef = useRef();
    const closeObj = () => popupRef.current.close();

    // useEffect Hooks to generate state items
    // Generate professor list
    useEffect(() => {
        // For all professors, generate a menu item
        const getProfessors = async function() {
            let professorList = new Map();
            
            // Iterate through all professors and generate a menu item
            props.reviewData.forEach(async (val) => {
                let profId = val['professor'];
                if (professorList.has(profId)) {
                    let oldValue = professorList.get(profId);
                    oldValue['terms'].push({
                        _id: val['_id'],
                        term: val['term'],
                        year: val['year']
                    });
                    professorList.set(profId, oldValue);
                } else {
                    const url = `https://graderu.herokuapp.com/api/v1/professors/${profId}`;
                    const {
                        data: {
                            data: {
                                name: profName
                            }
                        }
                    } = await axios.get(url);

                    professorList.set(profId, {
                        _id: profId,
                        name: profName,
                        terms: [
                            {
                                _id: val['_id'],
                                term: val['term'],
                                year: val['year']
                            }
                        ]
                    });
                }
            });
            console.log(professorList);
            // Change professor data
            changeProfessorData(Array.from(professorList.values()));
        };
        getProfessors();
    }, [props.reviewData]);

    // Generate filtered dropdown based on props
    useEffect(() => {
        let tempList = []
        professorData.forEach((val, idx) => {
            tempList.push(
                <MenuItem value={val} key={idx}>
                    {val}
                </MenuItem>
            );
        });
        changeFilterDropdownList(tempList);
    }, [professorData]);

    // Generate filtered reviews based on filterValue
    useEffect(() => {
        if (filterValue !== '') {
            let filteredReviews = []
            props.reviewData.forEach((value, idx) => {
                if (value['professor'] === filterValue) {
                    filteredReviews.push(
                        <ReviewItem data={value} key={idx} reviewDataDispatcher={props.reviewDataDispatcher}/>
                    )
                }
            });
            changeFilteredReviews(filteredReviews);
        } else {
            changeFilteredReviews(props.reviewData.map((value, idx) => {
                return (
                    <ReviewItem data={value} key={idx} reviewDataDispatcher={props.reviewDataDispatcher}/>
                );
            }));
        }
    }, [filterValue, props.reviewData]);

    // Return Ratings component
    return (
    <>
        <div className="ratingsComponent">
            <div className="ratingsButtonsDiv">
                <CreateReviewComponent 
                    closePopup={() => true}
                    reviewDispatcher={props.reviewDataDispatcher}
                    filterList={professorData}
                    filterField={'professor'}
                    constantField={'course'}
                />
                <FormControl className="ratingsFormControl">
                    <InputLabel>{`Filter by Professor`}</InputLabel>
                    <Select
                        label={`Filter by Professor`}
                        value={filterValue}
                        onChange={(e) => {
                            changeFilterValue(e.target.value)
                        }}
                        autoWidth
                    >
                        {filterDropdownList}
                    </Select>
                </FormControl>
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
    reviewData: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        likes: PropTypes.arrayOf(PropTypes.string.isRequired),
        dislikes: PropTypes.arrayOf(PropTypes.string.isRequired),
        professor: PropTypes.string.isRequired,
        course: PropTypes.string.isRequired,
    })).isRequired,
    // Function needs to support updating reviews
    // Update review (needs _id, update json)
    reviewDataDispatcher: PropTypes.func.isRequired
}