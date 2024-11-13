import { createStore } from 'vuex';

export default createStore({
  state: {
    todos: JSON.parse(localStorage.getItem('todos')) || [],
    temp: [],
    pending: [],
    comp: [],
  },

  getters: {
    getTodos: state => state.todos,
  },

  mutations: {
    addTodo: (state, id) => {
      const newTask = {
        id: id.newId,
        task: id.task,
        completed: false,
      };
      if(newTask.task.trim().length !== 0)
        state.todos.unshift(newTask);
      localStorage.setItem('todos', JSON.stringify(state.todos))
    },

    toggleTodo: (state, id) => {
      const item = state.todos.find(todo => todo.id === id);
      if (item) {
        item.completed = !item.completed;
      }
      localStorage.setItem('todos', JSON.stringify(state.todos))
    },

    deleteTodo: (state, id) => {
      const index = state.todos.findIndex(todo => todo.id === id);
      if (index !== -1) {
        state.todos.splice(index, 1);
        localStorage.setItem('todos', JSON.stringify(state.todos));
      }
    },

    all: state => {
      // state.todos = state.todos.filter(todo => !todo.completed);
      localStorage.setItem('todos', JSON.stringify(state.todos))
    },

    clearAll: state => {
      state.todos = [];
      localStorage.setItem('todos', JSON.stringify(state.todos))
    },

    showPending: state => {
      state.temp = state.todos

      state.todos = state.todos.filter(todo => todo.completed);
      localStorage.setItem('todos', JSON.stringify(state.todos));

      state.todos = state.temp

      state.todos = state.todos.filter(todo => !todo.completed);
      localStorage.setItem('todos', JSON.stringify(state.todos));

    },
    showCompleted: state => {
      state.temp = state.todos

      state.todos = state.todos.filter(todo => !todo.completed);
      localStorage.setItem('todos', JSON.stringify(state.todos));

      state.todos = state.temp
      state.todos = state.todos.filter(todo => todo.completed)
      localStorage.setItem('todos', JSON.stringify(state.todos));

    },

  },

  actions: {
    addTodo({ commit }, id) {
      commit("addTodo", id);
    },

    toggleTodo({ commit }, id) {
      commit("toggleTodo", id);
    },

    deleteTodo({ commit }, id) {
      commit("deleteTodo", id);
    },

    all({ commit }) {
      commit("all");
    },

    showPending({ commit }) {
      commit("showPending");
    },
    showCompleted({ commit }) {
      commit("showCompleted");
    },
  },
});
