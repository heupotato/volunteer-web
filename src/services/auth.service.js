import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
		      localStorage['role'] = response.data.role;
          localStorage['id'] = response.data.id;
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("id");
	  localStorage.removeItem("role");
    localStorage.removeItem("currentUser"); 
    localStorage.removeItem("checkUpdateEvent");
  }

  register(name,username, email, password,phone,gender,date,role) {
    return axios.post(API_URL + "signup", {
      name,
      username,
      email,
      password,
      phone,
      gender,
      date,
      role
    });
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();