import axios from 'axios'

const COMMENT_API_BASE_URL = "http://localhost:8080/api/comments";

class CommentService {

    getComments() {
        return axios.get(COMMENT_API_BASE_URL);
    }
        
    addComment(comment) {
        return axios.post(COMMENT_API_BASE_URL, comment);
    }

    getComment(commentId) {
        return axios.get(COMMENT_API_BASE_URL + "/" + commentId);
    }
}

export default new CommentService()