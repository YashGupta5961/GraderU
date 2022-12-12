import React from "react";
import { useNavigate } from "react-router-dom";
import "./homeScreenItem.css";

function HomeScreenCourseItem(props) {
  const navigate = useNavigate();
  return (
    <div
      className="homescreen-search-item-container"
      onClick={() =>
        navigate(
          `/courses?subject=${props.data.subject}&number=${props.data.number}`
        )
      }
    >
      <p>
        {props.data.subject} {props.data.number} - {props.data.name} (
        {props.data.term} {props.data.year})
      </p>
    </div>
  );
}

export default HomeScreenCourseItem;
