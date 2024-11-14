
const taskList = {
  namespaced: true,
  state: {
    tasks: [],
  },

  getters: {
    getTasks: (state) => state.tasks,
  },

  mutations: {
    addTask(state, task){
      if(task.length){
        state.tasks.push(...task)
      }
      else{
        if(localStorage.getItem('myTasks')){
          let temp = localStorage.getItem('myTasks')
          temp = JSON.parse(temp)
          localStorage.setItem('myTasks', JSON.stringify(temp))
        }
        else{
          localStorage.setItem('myTasks', JSON.stringify([task]))
        }
        state.tasks.push(task)
      }
    },

    toggleTodo: (state, id) => {
      const item = state.tasks.find(todo => todo.id === id);
      if (item) {
        item.completed = !item.completed;
      }
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },

    deleteTask(state, index){
      if(localStorage.getItem('localTasks')){
        let temp = localStorage.getItem('localTasks')
        temp = JSON.parse(temp)
        let found = temp.findIndex((el) => {
          return el.todo === state.tasks[index].todo
        })
        let arr = JSON.parse(JSON.stringify(temp))
        if (found > -1){
          arr.splice(found, 1)
        }
        localStorage.setItem('localTasks', JSON.stringify(arr))
      }
      state.tasks.splice(index, 1)
    },

    // all: state => {
    //   // state.todos = state.todos.filter(todo => !todo.completed);
    //   localStorage.setItem('todos', JSON.stringify(state.todos))
    // },

    // clearAll: state => {
    //   state.todos = [];
    //   localStorage.setItem('todos', JSON.stringify(state.todos))
    // },

    // showPending: state => {
    //   state.temp = state.todos

    //   state.todos = state.todos.filter(todo => todo.completed);
    //   localStorage.setItem('todos', JSON.stringify(state.todos));

    //   state.todos = state.temp

    //   state.todos = state.todos.filter(todo => !todo.completed);
    //   localStorage.setItem('todos', JSON.stringify(state.todos));

    // },
    // showCompleted: state => {
    //   state.temp = state.todos

    //   state.todos = state.todos.filter(todo => !todo.completed);
    //   localStorage.setItem('todos', JSON.stringify(state.todos));

    //   state.todos = state.temp
    //   state.todos = state.todos.filter(todo => todo.completed)
    //   localStorage.setItem('todos', JSON.stringify(state.todos));

    // },

  },

  actions: {
    // addTodo({ commit }, id) {
    //   commit("addTodo", id);
    // },

    toggleTodo({ commit }, id) {
      commit("toggleTodo", id);
    },

    // deleteTodo({ commit }, id) {
    //   commit("deleteTodo", id);
    // },

    // all({ commit }) {
    //   commit("all");
    // },

    // showPending({ commit }) {
    //   commit("showPending");
    // },
    // showCompleted({ commit }) {
    //   commit("showCompleted");
    // },
  },
}
export default taskList

