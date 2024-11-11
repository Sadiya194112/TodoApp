<template>
  <form @submit.prevent="addTodo">
    <input
      class="todo-input"
      type="text"
      placeholder="Enter a new task"
      v-model="task"
    />
  </form>

  <div class="buttons">
    <button @click="fetchTodos">Fetch Todos!</button>
    <button @click="clearCompleted">Clear Completed</button>
    <button @click="showPending">Show Pending</button>
    <button @click="showCompleted">Show Completed</button>
  </div>

  <div v-if="displayedTodos.length">
    <div v-for="(todo, index) in displayedTodos" :key="todo.id">
      {{ (currentPage - 1) * perPage + index + 1 }}. {{ todo.todo }} - {{ todo.completed ? 'Completed' : 'Pending' }}
    </div>
  </div>

  <div v-if="pages.length" class="pagination">
    <button
      v-for="page in pages"
      :key="page"
      @click="changePage(page)"
      :class="{ active: currentPage === page }">
      {{ page }}
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      task: "",
      newId: 0,
      todoArr: [],
      totalTodos: 0,


      perPage: 10,
      currentPage: 1,
      pages: [],
    };
  },
  methods: {
    addTodo() {
      this.$store.dispatch("addTodo", this);
      this.newId++;
      this.task = "";
    },

    async fetchTodos() {
      const URL = "https://dummyjson.com/todos";
      try {
        const response = await fetch(URL);
        const data = await response.json();
        const todos = data.todos;

        this.todoArr = todos;
        this.totalTodos = todos.length;
        
        console.log(this.totalTodos)

        this.setPages();

      } catch (error) {
        console.error("Error fetching todos!", error);
      }
    },

    clearCompleted() {
      this.todoArr = this.todoArr.filter(todo => !todo.completed);
      this.$store.dispatch("clearCompleted");

      this.totalTodos = this.todoArr.length;
      this.setPages();
    },

    showPending() {
      this.todoArr = this.todoArr.filter(todo => !todo.completed);
      this.$store.dispatch("showPending");

      this.totalTodos = this.todoArr.length;
      this.setPages();
    },

    showCompleted() {
      this.todoArr = this.todoArr.filter(todo => todo.completed);
      this.$store.dispatch("showCompleted");

      this.totalTodos = this.todoArr.length;
      this.setPages();
    },


    setPages() {
      this.pages = [];
      const numOfPages = Math.ceil(this.totalTodos / this.perPage);
      for (let i = 1; i <= numOfPages; i++) {
        this.pages.push(i);
      }
    },

    changePage(page) {  //take page number set it to current
      this.currentPage = page;
    },
  },

  computed: {
    displayedTodos() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = this.currentPage * this.perPage;
      return this.todoArr.slice(start, end);
    },
  },

  mounted() {
    this.fetchTodos();
  },
};
</script>

<style scoped>
.todo-input {
  font-family: "Open Sans", sans-serif;
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  outline: none;
  border-radius: 0.25rem;
  border-style: none;
  border: solid 1px lightgray;
  box-sizing: border-box;
}

.buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

button {
  padding: 0.5rem 0.5rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #f0f0f0;
}

.pagination {
  margin-top: 1rem;
}

.pagination button {
  padding: 0.8rem;
  margin-right: 0.5rem;
}

.pagination button.active {
  font-weight: bold;
  color: white;
  background-color: #007bff;
}
</style>
