import axios from 'axios'

const COMMENT_API_BASE_URL = "http://localhost:8080/api/comments";

class CommentService {

    // getComment() {
    //     return axios.get(COMMENT_API_BASE_URL);
    // }
        
    // addComment(comment) {
    //     return axios.post(COMMENT_API_BASE_URL, comment);
    // }

    // getCommentId(commentId) {
    //     return axios.get(COMMENT_API_BASE_URL + "/" + commentId);
    // }

    addComment(comment, eventId) {
        return axios.post(COMMENT_API_BASE_URL + "/" + "event/" + eventId, comment, {headers: authHeader() });
    }

    getAllCommentsOfEvent(eventId) {
        return axios.get(COMMENT_API_BASE_URL + "/" + eventId);
    }
}


export default new CommentService()