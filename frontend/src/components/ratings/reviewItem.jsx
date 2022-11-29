import { ListItem, ListItemAvatar, ListItemText, Rating, ToggleButton, ToggleButtonGroup } from "@mui/material";
import PropTypes from "prop-types";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import FaceIcon from '@mui/icons-material/Face';
import { useEffect, useState } from "react";

export default function ReviewItem(props) {
    const [rating, updateRating] = useState(0);
    const [likeDislikeButton, changeLikeDislikeValue] = useState(0)

    useEffect(() => {
        updateRating(props.data.rating);
    }, [props.data.rating]);
    
    return (
        <>
        <ListItem alignItems="flex-start">
            <div>
                <ListItemAvatar>
                    <FaceIcon/>
                </ListItemAvatar>
                <Rating value={rating} onChange={(_, newValue) => {
                    updateRating(newValue);
                }}/>
            </div>
            <div>
                <ListItemText primary="% liked this" />
                <ToggleButtonGroup exclusive value={likeDislikeButton} onChange={(_, newValue) => {
                    changeLikeDislikeValue(newValue);
                }}>
                    <ToggleButton value={0}><ThumbUpIcon/></ToggleButton>
                    <ToggleButton value={1}><ThumbDownIcon/></ToggleButton>
                </ToggleButtonGroup>
            </div>
        </ListItem>
        </>
    );
}

// Define prop types for RatingsComponent
ReviewItem.propTypes = {
    data: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        likes: PropTypes.number.isRequired,
        dislikes: PropTypes.number.isRequired,
        professor: PropTypes.string.isRequired,
        courseName: PropTypes.string.isRequired,
        courseCode: PropTypes.number.isRequired,
    }).isRequired
}