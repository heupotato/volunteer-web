import axios from 'axios'

const EVENT_API_BASE_URL = "http://localhost:8080/api/projects";

class EventService {
    getEvent() {
        return axios.get(EVENT_API_BASE_URL);
    }
        
    createEvent(event) {
        return axios.post(EVENT_API_BASE_URL, event);
    }

    getEventId(eventId) {
        return axios.get(EVENT_API_BASE_URL + "/" + eventId);
    }
}

export default new EventService()