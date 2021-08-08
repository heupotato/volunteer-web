import  React from "react";
import ThumbnailSearch from './ThumbnailSearch';

function SearchResult(props) 
{
    var favouritesIDs = props.listIDs;

    var listFavourites = favouritesIDs.map((favouritesID) =>
    <div style={{marginRight: '30px', display:'inline-block'}}>
        <ThumbnailSearch id={favouritesID} ></ThumbnailSearch>
        <div className="blank"></div>
    </div>
    )

    return (
        <div>
            <div style={{marginLeft: '20px'}}>
                {listFavourites}
            </div>
        </div>
    ); 
}
export default SearchResult; 
