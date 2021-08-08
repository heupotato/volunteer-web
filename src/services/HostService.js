import axios from 'axios'

const HOST_API_BASE_URL = "api/hosts";

class HostService {

    getHostId(hostId) {
        return axios.get(HOST_API_BASE_URL + "/" + hostId);
    }
}

export default new HostService()