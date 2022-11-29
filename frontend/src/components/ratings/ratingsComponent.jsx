import AddIcon from '@mui/icons-material/Add';
import { FormControl, IconButton, InputLabel, List, MenuItem, Select } from '@mui/material';
import PropTypes from "prop-types";
import { useEffect, useState } from 'react';
import ReviewItem from './reviewItem';

export default function RatingsComponent(props) {
    const [filterValue, changeFilterValue] = useState('');
    const [reviews, changeReviews] = useState([])

    let menuList = props.filterList.map((val, idx) => {
        return (
            <MenuItem value={val} key={idx}>
                {val}
            </MenuItem>
        );
    });

    useEffect(() => {
        if (filterValue !== '') {
            let filteredReviews = []
            props.reviewData.forEach((value, idx) => {
                if (value[props.filterField] === filterValue) {
                    filteredReviews.push(
                        <ReviewItem data={value} key={idx}/>
                    )
                }
            });
            changeReviews(filteredReviews);
        } else {
            changeReviews(props.reviewData.map((value, idx) => {
                return (
                    <ReviewItem data={value} key={idx}/>
                );
            }));
        }
    }, [filterValue]);

    return (
    <>
        <div className="ratingsComponent">
            <div className="ratingsButtonsDiv">
                <IconButton aria-label="add" size="medium">
                    <AddIcon fontSize="inherit"/>
                </IconButton>
                <FormControl className="ratingsFormControl">
                    <InputLabel>{`Filter by ${props.filterName}`}</InputLabel>
                    <Select
                        label={`Filter by ${props.filterName}`}
                        value={filterValue}
                        onChange={(e) => {
                            changeFilterValue(e.target.value)
                        }}
                        autoWidth
                    >
                        {menuList}
                    </Select>
                </FormControl>
            </div>
            <div>
                <List>
                    {reviews}
                </List>
            </div>
        </div>
    </>);
};

// Define prop types for RatingsComponent
RatingsComponent.propTypes = {
    filterName: PropTypes.string.isRequired,
    filterList: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    filterField: PropTypes.string.isRequired,
    reviewData: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        likes: PropTypes.number.isRequired,
        dislikes: PropTypes.number.isRequired,
        professor: PropTypes.string.isRequired,
        courseName: PropTypes.string.isRequired,
        courseCode: PropTypes.number.isRequired,
    })).isRequired
}