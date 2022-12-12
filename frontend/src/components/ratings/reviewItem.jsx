import { ListItem, ListItemAvatar, ListItemText, Rating, ToggleButton, ToggleButtonGroup } from "@mui/material";
import PropTypes from "prop-types";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import FaceIcon from '@mui/icons-material/Face';
import { useEffect, useState } from "react";

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
    const totalLength = (props.data["likes"].length + props.data["dislikes"].length) === 0 ? 1 : props.data["likes"].length + props.data["dislikes"].length;
    const likeDislikeRatio = Math.floor((props.data["likes"].length / totalLength) * 100);

    let profName = '';
    let courseTerm = '';
    let courseYear = '';

    for (let i = 0; i < props.profData.length; i++) {
        let val = props.profData[i];
        if (val["profId"] === props.data.professor) {
            for (let j = 0; j < val.courseData.length; j++) {
                let course = val.courseData[j];
                if (course["courseId"] === props.data.course) {
                    profName = val["profName"];
                    courseTerm = course["term"];
                    courseYear = course["year"];
                    break;
                }
            }
            break;
        } 
    }

    const getUserId = async function () {
        const {
            data: {
                data: {
                    _id: userId
                }
            }
        } = await axios.get(`https://graderu.herokuapp.com/api/v1/users/me`);
        return userId;
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
                primary={`Professor: ${profName} Term: ${courseTerm} ${courseYear}`}
                secondary={props.data.text}
            />
            <div>
                <ListItemText primary={`${likeDislikeRatio}% liked this`} />
                <ToggleButtonGroup exclusive value={likeDislikeButton} onChange={(_, newValue) => {
                    // Normalize value
                    let tempValue = (newValue === null) ? 0 : newValue;

                    // Send it to the dispatcher. State will be updated using useEffect hook.
                    props.reviewDataDispatcher('update', {like: tempValue}, props.data["_id"]);
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
    profData: PropTypes.arrayOf(PropTypes.shape({
        profName: PropTypes.string,
        profId: PropTypes.string,
        courseData: PropTypes.arrayOf(PropTypes.shape({
            courseId: PropTypes.string,
            term: PropTypes.string,
            year: PropTypes.number
        }))
    })),
    reviewDataDispatcher: PropTypes.func.isRequired
}