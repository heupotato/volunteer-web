import axios from 'axios';

const API_URL = 'api/test/search';
class SearchService {
 
  getSearchResult(name) {
    return axios.get(API_URL + '?eventName=' + name);
  }
  
} 

export default new SearchService();