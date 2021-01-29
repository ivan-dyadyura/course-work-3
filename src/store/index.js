import { createStore } from 'vuex'

export default createStore({
  state: {
    tasks: []
  },
  getters: {
    activeTask (state) {
      let result = 0
      state.tasks.find((task) => {
        if (task.status === 'active') {
          result++
        }
      })

      return result
    },
    tasks (state) {
      return state.tasks
    }
  },
  mutations: {
    changeTasks (state, payload) {
      state.tasks = payload
    }
  },
  actions: {
    async loadContent (context) {
      try {
        const res = await fetch('https://coursework-3-d4de3-default-rtdb.firebaseio.com/tasks.json').then(response => response.json())

        const result = Object.keys(res).map(key => {
          return {
            id: key,
            ...res[key]
          }
        })
        context.commit('changeTasks', result)
      } catch (e) {
        console.log(e)
      }
    }
  },
  modules: {}
})
