import React, {useEffect, useState} from "react";
import ThumbnailAdmin from './ThumbnailAdmin'
import { Link } from 'react-router-dom'
import UserService from "../../services/user.service"
import userService from "../../services/user.service";

function Search(props) {
    var favouritesIDs = []
    const [userIDs, setUserIDs] = useState([]);
    useEffect(async () => {
        console.log('useEffect has been called!');
        await userService.getUserAll().then(response => {
            var listUser = response.data;
            let ids = listUser.map(element => element.id);
            setUserIDs(ids);
          })
        .finally()
      }, []);
      
    Object.values(userIDs).forEach(x => favouritesIDs.push(x));

    const listUser = favouritesIDs.map((favouritesID) =>
        <div>
            <ThumbnailAdmin id={favouritesID} ></ThumbnailAdmin>
        </div>
    )
    return (
        <div class="col-lg-9 mt-4 mt-lg-0" style={{marginLeft:"200px"}}>
                <div class="row" >
                    <div class="col-md-12">
                        <div class="user-dashboard-info-box table-responsive mb-0 bg-white p-4 shadow-sm">
                            {listUser}
                        </div>
                    </div>
                </div>
            </div>
        
    ); 
}
export default Search;