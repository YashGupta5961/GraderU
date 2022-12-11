import { ListItem, ListItemAvatar, ListItemText, Rating, ToggleButton, ToggleButtonGroup } from "@mui/material";
import PropTypes from "prop-types";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import FaceIcon from '@mui/icons-material/Face';
import { useEffect, useState } from "react";
import axios from "axios";

function stringSearch(array, str) {
    if (array === null || array === undefined) return -1;

    let len = array.length - 1;
    let m = 0;
    while (m <= len) {
        let k = (len + m) >> 1;
        let cmp_val = str.localeCompare(array[k]);
        if (cmp_val < 0) {
            m = k - 1;
        } else if (cmp_val > 0) {
            m = k + 1;
        } else {
            return k;
        }
    }
    return -m - 1;
}
export default function ReviewItem(props) {
    const [likeDislikeButton, changeLikeDislikeValue] = useState(null);
    const likeDislikeRatio = Math.floor(props.data.likes.length / (props.data.likes.length + props.data.dislikes.length) * 100);
    const getUserId = async function () {
        // const {
        //     data: {
        //         data: {
        //             _id: userId
        //         }
        //     }
        // } = await axios.get(`https://graderu.herokuapp.com/api/v1/users/me`);
        // return userId;
        return "638fff1a51b4f01dd0bfef48";
    };

    useEffect(() => {
        const searchIds = async function() {
            let userId = await getUserId();
            let like_out = stringSearch(props.data.likes, userId);
            if (like_out >= 0) {
                changeLikeDislikeValue(1);
            } else {
                let dislike_out = stringSearch(props.data.dislikes, userId);
                if (dislike_out >= 0) {
                    changeLikeDislikeValue(-1);
                } else {
                    changeLikeDislikeValue(null);
                }
            }
        };
        searchIds();
    }, [props.data.likes, props.data.dislikes]);

    return (
        <>
        <ListItem alignItems="flex-start">
            <div>
                <ListItemAvatar>
                    <FaceIcon/>
                </ListItemAvatar>
                <Rating value={props.data.rating} readOnly/>
            </div>
            <ListItemText 
                primary={`Professor: ${props.data.professor} Course: ${props.data.courseName} ${props.data.courseCode}`}
                secondary={props.data.text}
            />
            <div>
                <ListItemText primary={`${likeDislikeRatio}% liked this`} />
                <ToggleButtonGroup exclusive value={likeDislikeButton} onChange={(_, newValue) => {
                    // Normalize value
                    let tempValue = (newValue === null) ? 0 : newValue;

                    // Send it to the dispatcher. State will be updated using useEffect hook.
                    props.reviewDataDispatcher({_id: props.data._id, action: 'update', payload: {like: tempValue}});
                }}>
                    <ToggleButton value={1}><ThumbUpIcon/></ToggleButton>
                    <ToggleButton value={-1}><ThumbDownIcon/></ToggleButton>
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
        author: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        likes: PropTypes.arrayOf(PropTypes.string.isRequired),
        dislikes: PropTypes.arrayOf(PropTypes.string.isRequired),
        professor: PropTypes.string.isRequired,
        course: PropTypes.string.isRequired,
    }).isRequired,
    // Function needs to support updating reviews
    // Update review (needs _id, update json)
    reviewDataDispatcher: PropTypes.func.isRequired
}