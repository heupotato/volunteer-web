import axios from 'axios';


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
    //da tinh diem trung binh
    getAllVoteProject(){
        return axios.get(API_URL + 'like');
    }
    //da tinh diem trung binh
    getAllVoteLeader(){
        return axios.get(API_URL + 'like/' +'user/');
    }
    //project la` id_project 
    //user la id_user
    postVote(project,user,vote_project,vote_user){
        return axios.post(API_URL, {
            project,
            user,
            vote_project,
            vote_user
        })
    }

}