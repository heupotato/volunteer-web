import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';
const API_URL_ADMIN = 'http://localhost:8080/api/admin/';
class UserService {
 

  getEditUser(id) {
    return axios.get(API_URL + 'edit/' + id, { headers: authHeader() });
  }
  getUser(id) {
    return axios.get(API_URL_ADMIN + 'edit/' + id, { headers: authHeader() });
  }
  getUserAll() {
    return axios.get(API_URL_ADMIN + 'all', { headers: authHeader() });
  }
  postEditUser(name,email,phone,date,address,avatar,id) {
    return axios.post(API_URL + 'edit/' + id, {
      name,
      email,
      phone,
      date,
      address,
      avatar
    }, { headers: authHeader() }
   );
  }
  postUser(active,id) {
    return axios.post(API_URL_ADMIN + 'edit/' + id, {
      active
    }, { headers: authHeader() }
   );
  }
  postUpdatePassword(oldPassword,newPassword,password,id) {
    return axios.post(API_URL + 'password/' + id, {
     oldPassword,
     newPassword,
     password
    }, { headers: authHeader() }
   );
  }
} 

export default new UserService();