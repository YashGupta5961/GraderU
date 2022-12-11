import { Button, FormControl, FormHelperText, Input, InputLabel, MenuItem, Rating, Select } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

function handleTextChange(e, changeError, changeTextValue, changeTooltipMessage) {
    changeTextValue(e.target.value);
    if (e.target.value.length === 0 || e.target.value.length > 240) {
        changeError(true);
        if (e.target.value.length > 240) {
            changeTooltipMessage(`Max character limit is 240. Current Length: ${e.target.value.length}`);
        } else {
            changeTooltipMessage('Min character limit is 1');
        }
    } else {
        changeError(false);
    }
}

function handleSubmitReview(reviewDispatcher, filterField, filterId, constantField, constantId, ratings, text, closePopup) {
    // Generate output packet
    let packet = {};
    packet[filterField] = filterId;
    packet[constantField] = constantId;
    packet['rating'] = ratings;
    packet['text'] = text;

    // Send it to the dispatcher
    reviewDispatcher(packet, 'create');
    closePopup();
}

export default function CreateReviewComponent(props) {
    // States for things
    const [rating, changeRatingValue] = useState(5);
    const [textValue, changeTextValue] = useState('');
    const [error, changeError] = useState(true);
    const [tooltipMessage, changeTooltipMessage] = useState('Min character limit is 1');

    // States for each of the dropdown
    const [filterValue, changeFilterValue] = useState('');
    const [termYearValue, changeTermYearValue] = useState('');

    // Dropdown lists for each of the filters
    const [filterDropdownList, changeFilterDropdownList] = useState([]);
    const [termYearDropdownList, changeTermYearDropdownList] = useState([]);

    // Update main filter dropdown list
    useEffect(() => {
        let tempList = []
        props.filterList.forEach((val, idx) => {
            tempList.push(
                <MenuItem value={val['_id']} key={idx}>
                    {val.name}
                </MenuItem>
            );
        });
        changeFilterDropdownList(tempList);
    }, [props.filterList]);

    // Update year and term dropdown
    useEffect(() => {
        let termYearList = [];
        
        for (const val in props.filterList) {
            if (val['_id'] === filterValue) {
                val.terms.forEach((data, idx) => {
                    termYearList.push(
                        <MenuItem value={data['_id']} key={idx}>
                            {`${data.term}-${data.year}`}
                        </MenuItem>
                    );
                });
                break;
            }
        };

        // Update Dropdowns
        changeTermYearDropdownList(termYearList);
    }, [filterValue]);

    let tooltip = (error === true) ? (<FormHelperText>{tooltipMessage}</FormHelperText>) : (<></>);
    return (
        <>
            <div className="createReviewHeadingDiv">
                <h1>Write a Review!</h1>
            </div>
            <div className="createReviewToolsDiv">
                <Rating value={rating} onChange={(_, newValue) => {
                    if (newValue !== null) {
                        changeRatingValue(newValue);
                    }
                }}/>
                <FormControl className="createFilterFormControl">
                    <InputLabel>{`Choose ${props.filterField}`}</InputLabel>
                    <Select
                        label={`Choose ${props.filterField}`}
                        value={filterValue}
                        onChange={(e) => {
                            changeFilterValue(e.target.value)
                        }}
                        autoWidth
                    >
                        {filterDropdownList}
                    </Select>
                </FormControl>
                <FormControl className="createYearTermFormControl">
                    <InputLabel>{`Choose Term-Year`}</InputLabel>
                    <Select
                        label={`Choose Term-Year`}
                        value={termYearValue}
                        onChange={(e) => {
                            changeTermYearValue(e.target.value)
                        }}
                        autoWidth
                    >
                        {termYearDropdownList}
                    </Select>
                </FormControl>
            </div>
            <div className="createReviewTextBoxDiv">
                <FormControl variant="standard" error={error}>
                    <InputLabel>Enter Review</InputLabel>
                    <Input
                        value={textValue}
                        onChange={(e) => {handleTextChange(e, changeError, changeTextValue, changeTooltipMessage)}}
                        multiline
                        fullWidth
                    />
                    {tooltip}
                </FormControl>
            </div>
            <div className="createReviewSubmitButtonDiv">
                <Button disabled={error} onClick={handleSubmitReview(props.reviewDispatcher, props.filterField, termYearValue, props.constantField, filterValue, rating, textValue, props.closePopup)}>
                    Submit
                </Button>
            </div>
        </>
    );
}

CreateReviewComponent.propTypes = {
    filterField: PropTypes.string.isRequired,
    constantField: PropTypes.string.isRequired,
    filterList: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        terms: PropTypes.arrayOf(PropTypes.shape({
            _id: PropTypes.string.isRequired,
            year: PropTypes.number.isRequired,
            term: PropTypes.number.isRequired
        })).isRequired
    })).isRequired,
    reviewDispatcher: PropTypes.func.isRequired,
    closePopup: PropTypes.func.isRequired
}
