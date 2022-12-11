import React from 'react'
import './homeScreenSearchItem.css'

function HomeScreenSearchItem(props) {
    return (
        <div className='homescreen-search-item-container'>
            <p>{props.name}</p>
        </div>
    )
}

export default HomeScreenSearchItem