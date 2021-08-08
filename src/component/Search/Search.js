import  React, { useState, useEffect} from "react";
import EventService from "../../services/EventService";
import searchService from "../../services/search.service";
import SearchResult from "./SearchResult";

function Search() 
{
    var favouritesIDs = []
    const [eventIDs, setEventIDs] = useState([]);
    
    const [state, setState] = useState({
        eventName: "",
    });
    useEffect(() => {
        console.log('useEffect has been called!');
        const queryParams = new URLSearchParams(window.location.search);
        const value = queryParams.get('value');
        if (value == null) {
            EventService.getEvents().then(response => {
                var listUser = response.data;
                let ids = listUser.map(element => element.id);
                setEventIDs(ids);
              })
            .finally();
        }
        else {
            searchService.getSearchResult(value).then(response => {
                var listEvent = response.data;
                let ids = listEvent.map(element => element.id);
                setEventIDs(ids);
                console.log(eventIDs);
              })
            .finally()
        }
      }, []);

      Object.values(eventIDs).forEach(x => favouritesIDs.push(x));
      
    const handleSubmit = () => {
        
    }

    const handleInputChanged = (event) => {
        setState({
          eventName: event.target.value
        });
      }
    return (
        <div style={{marginBottom:'30px'}}>
            <div className="blank"></div>
            <h2 id="title" style={{textAlign:'center'}}>Trang tìm kiếm</h2>
            <form class="d-flex search">
                <input class="form-define me-2 border-success" type="search" name="value" placeholder="Search..." aria-label="Search"
                onChange={event => handleInputChanged(event)} />
                <button class="btn btn-success" style={{marginLeft:'300px',position:'absolute', paddingLeft:'20px',paddingRight:'20px', marginTop:'14px'}} type="submit"
                onClick={handleSubmit()} >Search</button>
            </form>
            <div hidden={localStorage.getItem('setState') == null}>
            <SearchResult listIDs = {favouritesIDs}></SearchResult>
            </div>
        </div>
    ); 
}
export default Search; 
