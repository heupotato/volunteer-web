import axios from 'axios';
import authHeader from './auth-header';

const EVENT_API_BASE_URL = "http://localhost:8080/api/test/projects";

class EventService {
    getEvents() {
        return axios.get(EVENT_API_BASE_URL);
    }
        
    createEvent(event) {
        console.log(authHeader());
        return axios.post(EVENT_API_BASE_URL, event, { headers: authHeader() });
    }

    getEvent(eventID) {
        return axios.get(EVENT_API_BASE_URL + "/" + eventID);
    }

    deleteEvent(eventID){
        return axios.delete(EVENT_API_BASE_URL + "/" + eventID, { headers: authHeader() }); 
    }

    updateEvent(eventID, newEvent){
        return axios.put(EVENT_API_BASE_URL + "/" + eventID, newEvent, { headers: authHeader() }); 
    }

    /*
    * API lấy tất cả event do host tổ chức 
    */
    getHostEvent(userID){
        return axios.get(EVENT_API_BASE_URL + "/user/" + userID); 
    }

    /*
    * Thiếu API cho top most favourite events 
    */
}

export default new EventService()