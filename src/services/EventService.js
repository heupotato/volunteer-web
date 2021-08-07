import axios from 'axios'

const EVENT_API_BASE_URL = "http://localhost:8080/api/projects";

class EventService {
    getEvents() {
        return axios.get(EVENT_API_BASE_URL);
    }
        
    createEvent(event) {
        return axios.post(EVENT_API_BASE_URL, event);
    }

    getEvent(eventID) {
        return axios.get(EVENT_API_BASE_URL + "/" + eventID);
    }

    deleteEvent(eventID){
        return axios.delete(EVENT_API_BASE_URL + "/" + eventID); 
    }

    updateEvent(eventID, newEvent){
        return axios.put(EVENT_API_BASE_URL + "/" + eventID, newEvent); 
    }

    /*
    * Thiếu API cho top most favourite events 
    */
}

export default new EventService()