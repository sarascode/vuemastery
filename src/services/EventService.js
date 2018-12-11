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
  getEvents() {
    //calls http://localhost:3000/events
    return apiClient.get('/events')
  },
  //gets an id to tell our api server which event to fetch
  getEvent(id) {
    return apiClient.get('/events/' + id)
  }
}
