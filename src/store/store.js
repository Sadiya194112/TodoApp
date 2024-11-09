import { createStore } from 'vuex';

export default createStore({
  state: {
    todos: JSON.parse(localStorage.getItem('todos')) || []
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

    clearCompleted: state => {
      state.todos = state.todos.filter(todo => !todo.completed);
      localStorage.setItem('todos', JSON.stringify(state.todos))
    },

    clearAll: state => {
      state.todos = [];
      localStorage.setItem('todos', JSON.stringify(state.todos))
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

    // Action to clear completed tasks
    clearCompleted({ commit }) {
      commit("clearCompleted");
    },

    // Action to clear all tasks
    clearAll({ commit }) {
      commit("clearAll");
    },
  },
});
