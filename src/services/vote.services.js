import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/vote/';

class VoteService{
    //chua tinh diem trung binh

    getVoteProject(id) {

        return axios.get(API_URL + id);

    }

    //chua tinh diem trung binh

    getVoteLeader(id){

        return axios.get(API_URL + 'user/' + id);

    }
     //get all diem project
     getAllProject(){
        return axios.get(API_URL + 'like/' );
    }

    //get diem project theo id
    getAllVoteProject(id){
        return axios.get(API_URL + 'like/' + id);
    }
    //get diem leader theo id 
    getAllVoteLeader(id){
        return axios.get(API_URL + 'like/user/' + id);
    }
    //project la` id_project 
    //user la id_user
    postVote(project,user,vote_project,vote_user){
        return axios.post(API_URL, {
            project,
            user,
            vote_project,
            vote_user
        }), { headers: authHeader() }
    }

}
export default new VoteService();