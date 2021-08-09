import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/registrations/';

class RegisterProject{
    //xem user dang ki bao nhieu su kien
    getRegisterProject(id) {
        return axios.get(API_URL + 'user/' + id);
    }
    //kiem tra user dang ki project chua
    // id la id_project
    // user la id_user
    getCheckRegister(id,user){
        return axios.get(API_URL + id + '/' + user);
    }
    // get all register cua project
    getAllRegisterProject(id){
        return axios.get(API_URL+ 'all/' + id);
    }
     //xoa dang ki su kien cua project
    // id la id_project
    // user la id_user
    //deleteRegister(id,user){
    //    return axios.delete(API_URL + id + '/' + user, { headers: authHeader() });
    //}

}
export default new RegisterProject();