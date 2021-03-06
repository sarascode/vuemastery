import EventService from '@/services/EventService.js'
export const namespaced = true

export const state = {
  event_total: 0,
  events: [],
  event: {}
}

export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event)
  },
  SET_EVENTS(state, events) {
    state.events = events
  },
  EVENT_TOTAL(state, total) {
    state.event_total = total
  },
  SET_EVENT(state, event) {
    state.event = event
  }
}

export const getters = {
  activeTodosCount: (state, getters) => {
    return state.todos.length - getters.doneTodos.length
    //total todos- the todos that are done
    //opt 2: state.todos.filter(todo => !todo.done).length
  },
  getEventById: state => id => {
    return state.events.find(event => event.id === id)
    //find the event/todo where the event/todo id is equal to id
  }
}

export const actions = {
  //takes commit from the context object and the payload
  createEvent({ commit, dispatch }, event) {
    return EventService.postEvent(event)
      .then(() => {
        commit('ADD_EVENT', event)
        const notification = {
          type: 'success',
          message: 'Your event has been created'
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was a problem creating your event: ' + error.message
        }
        dispatch('notification/add', notification, { root: true })
        throw error
      })
  },
  fetchEvents({ commit, dispatch }, { perPage, page }) {
    EventService.getEvents(perPage, page)
      .then(response => {
        commit('EVENT_TOTAL', response.headers['x-total-count'])
        commit('SET_EVENTS', response.data)
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was a problem fetching events: ' + error.message
        }
        dispatch('notification/add', notification, { root: true })
      })
  },
  fetchEvent({ commit, getters, dispatch }, id) {
    var event = getters.getEventById(id)
    if (event) {
      commit('SET_EVENT', event)
    } else {
      EventService.getEvent(id)
        .then(response => {
          commit('SET_EVENT', response.data)
        })
        .catch(error => {
          const notification = {
            type: 'error',
            message: 'There was a problem fetching event: ' + error.message
          }
          dispatch('notification/add', notification, { root: true })
        })
    }
  }
}
