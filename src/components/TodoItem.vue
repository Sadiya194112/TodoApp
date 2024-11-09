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
      <button @click="clearAll">Clear All</button>
  </div>

  <div class="pending">
    <span>Pending Tasks:</span>
  </div>

  <div v-if="todo_ar.length">
    <div v-for="(todo, index) in todo_ar" :key="todo.id">
      {{ index + 1 }}. {{ todo.todo }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      task: "",
      newId: 0,
      todo_ar: [],
      totalTodos: 0,
    };
  },
  methods: {
    addTodo() {
      this.$store.dispatch("addTodo", this);
      this.newId++;
      this.task = "";
    },

    // inProgress(task) {
    //   return !this.isCompleted(task);
    // },
    // isCompleted(task) {
    //   return task.completed;
    // },

    async fetchTodos() {
      const URL = "https://dummyjson.com/todos";
      try {
        const response = await fetch(URL);
        const data = await response.json();
        const todos = data.todos;

        this.totalTodos = todos.length;

        if(this.totalTodos >= 10){
          const start = Math.floor(Math.random() * (this.totalTodos - 10));
          this.todo_ar = todos.slice(start, start + 10);
        }else{
          this.todo_ar = todos;
        }
      } catch (error) {
        console.error("Error fetching todos!", error);
      }
    },
    clearCompleted(){
      this.todo_ar = this.todo_ar.filter(todo => !todo.completed);
      this.$store.dispatch("clearCompleted");

    },
    clearAll(){
      this.todo_ar = [];
      this.$store.dispatch("clearAll");
    },
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

/* Layout for buttons */
.buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}


button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #f0f0f0;
}

.pending {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

div {
  margin-top: 1rem;
}
</style>
