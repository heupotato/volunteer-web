import  React, { Component, useState } from "react";
import Thumbnail from '../component/Thumbnail'; 
import ReactDOM from 'react-dom';

function Favourites() 
{
    var favouritesIDs = [1,2,3,4,5,6,7,8,9,10,11,12]
    //gọi API lấy top 12 ID event được yêu thích nhất 
    const listFavourites = favouritesIDs.map((favouritesID) =>
        <div style={{marginRight: '30px', display:'inline-block'}}>
            <Thumbnail id={favouritesID} ></Thumbnail>
            <div className="blank"></div>
        </div>
    )
    return (
        <div>
            <div className="blank"></div>
            <h2 style={{fontStyle: 'italic', marginLeft: '20px'}}>Các bài viết được yêu thích nhất...</h2>
            <div className="blank"></div>
            <div style={{marginLeft: '20px'}}>
                {listFavourites}
            </div>
            
        </div>
    ); 
}

export default Favourites; 