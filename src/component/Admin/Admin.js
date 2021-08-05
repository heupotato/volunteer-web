import React from "react";
import ThumbnailAdmin from './ThumbnailAdmin'
import { Link } from 'react-router-dom'
function Search(props) {
  var favouritesIDs = [1,2,3,4,5,6,7,8,9,10]
    const listFavourites = favouritesIDs.map((favouritesID) =>
        <div>
            <ThumbnailAdmin id={favouritesID} ></ThumbnailAdmin>
        </div>
    )
    return (
        <div class="col-lg-9 mt-4 mt-lg-0" style={{marginLeft:"200px"}}>
                <div class="row" >
                    <div class="col-md-12">
                        <div class="user-dashboard-info-box table-responsive mb-0 bg-white p-4 shadow-sm">
                            {listFavourites}
                        </div>
                    </div>
                </div>
            </div>
        
    ); 
}
export default Search;