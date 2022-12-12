import React from 'react'
import './homeScreenItem.css'

function HomeScreenCourseItem(props) {
    console.log(props)
    return (
        <div className='homescreen-search-item-container'>
            <p>{props.data.subject} {props.data.number} - {props.data.name} ({props.data.term} {props.data.year})</p>
        </div>
    )
}

export default HomeScreenCourseItem