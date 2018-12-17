import axios from 'axios'
//single axios instance for our entire app
const apiClient = axios.create({
  //base URL for all calls to use
  baseURL: 'http://localhost:3000',
  withCredentials: false,
  //for authentication & config
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getEvents(perPage, page) {
    //calls http://localhost:3000/events
    return apiClient.get('/events?_limit' + perPage + '&_page' + page)
  },
  //gets an id to tell our api server which event to fetch
  getEvent(id) {
    return apiClient.get('/events/' + id)
  },
  postEvent(event) {
    return apiClient.post('/events/', event) //will add to our json DB
  }
}
