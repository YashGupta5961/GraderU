import React from 'react'
import './homeScreenItem.css'

function HomeScreenSearchItem(props) {
    return (
        <div className='homescreen-search-item-container'>
            <p>{props.name}</p>
        </div>
    )
}

export default HomeScreenSearchItem