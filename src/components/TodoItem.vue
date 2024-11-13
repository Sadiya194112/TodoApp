<template>
  <v-form @submit.prevent="addTodo">
    <v-text-field
      v-model="task"
      label="Enter a new task"
      :rules="rules.required"
    ></v-text-field>
  </v-form>

  <div class="button">
    <v-row align="center" justify="center">
      <v-col cols="auto">
        <v-btn @click="fetchTodos" color="primary" >Fetch Todos!</v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn @click="clearCompleted" color="success">Clear Completed</v-btn>
      </v-col>

      <v-col cols="auto">
        <v-btn @click="showPending" color="warning">Show Pending</v-btn>
      </v-col>

      <v-col cols="auto">
        <v-btn @click="showCompleted" color="info">Show Completed</v-btn>
      </v-col>
    </v-row>
  </div>


  <v-container >
    <v-row no-gutters  v-for="(todo, index) in displayedTodos" :key="index">
      <v-col v-for="n in 2" :key="n" :cols="n === 1 ? 8:4">
        <v-card
        class="pa-2"
        title
        outlined
        >
          <span class="text-h6" v-if="n === 1"> {{ (currentPage - 1) * perPage + index + 1 }}. {{ todo.todo }} </span>
          <span class="text-h6" v-else> {{ todo.completed ? 'Completed' : 'Pending' }}</span>
        </v-card>
      </v-col>

    </v-row>
  </v-container>

  <TodoList />


  <div v-if="pages.length" class="pagination">
    <v-btn
      v-for="page in pages"
      :key="page"
      @click="changePage(page)"
      :class="{ active: currentPage === page }">
      {{ page }}
    </v-btn>
  </div>
</template>

<script>
import TodoList from './TodoList.vue';
export default {
  components: {
    TodoList,
  },
  data() {
    return {
      rules: {
        required: [value => !!value || "Required"]
      },

      task: "",
      newId: 0,
      todoArr: [],
      tempArr: [],
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
      this.tempArr = this.todoArr
      this.todoArr = this.todoArr.filter(todo => todo.completed);
      this.totalTodos = this.todoArr.length;
      this.setPages();

      this.todoArr = this.tempArr
      this.todoArr = this.todoArr.filter(todo => !todo.completed)
      this.$store.dispatch("showPending");
    },

    showCompleted() {
      this.tempArr = this.todoArr
      this.todoArr = this.todoArr.filter(todo => !todo.completed);
      this.totalTodos = this.todoArr.length;
      this.setPages();

      this.todoArr = this.tempArr
      this.todoArr = this.todoArr.filter(todo => todo.completed)

      this.$store.dispatch("showCompleted");


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

.pagination {
  margin-top: 1rem;
}

.pagination button {
  padding: 0.3rem;
  margin-right: 0.5rem;
}

.pagination button.active {
  font-weight: bold;
  color: white;
  background-color: #007bff;
}
</style>
