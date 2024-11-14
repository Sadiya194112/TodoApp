<template>

  <v-text-field
      label="Enter a new task"
      background-color="grey darken-3"
      flat
      type="text">
      <template #append>
          <v-btn color="secondary" type="submit">Add</v-btn>
      </template>
  </v-text-field>
  <!-- <v-form   " >
    <v-text-field

      v-model="title"
      label="Enter a new task"
      :rules="rules.required"
    >
  </v-text-field>
  <v-btn @click="showPending" color="warning">Show Pending</v-btn>

  </v-form> -->

  <div class="button">
    <v-row align="center" justify="center">
      <v-col cols="auto">
        <Buttons @click="fetchTodos" text="Fetch"></Buttons>
      </v-col>
      <v-col cols="auto">
        <Buttons @click="pendingTask" text="Pending" :dark="true"></Buttons>
      </v-col>
      <v-col cols="auto">
        <Buttons @click="completedTask" text="Completed"></Buttons>
      </v-col>
      <v-col cols="auto">
        <Buttons @click="allTask" text="All" :dark="true"></Buttons>
      </v-col>
    </v-row>
  </div>


  <v-container >
    <v-row no-gutters  v-for="(todo, index) in displayedTodos" :key="index">
      <v-col :cols="8">
        <v-card class="d-flex align-center" outlined>
        <v-checkbox class="pt-5 checkbox" v-model = "todo.completed" color="success" @click.stop="deleteTask(index)"></v-checkbox><span class="text-h6 delete">{{ todo.todo }} </span>
        </v-card>
      </v-col>

      <v-col :cols="3">
        <v-card class="d-flex align-center justify-center" outlined>
          <span class="text-h6 pa-8 "  @click.stop="deleteTodo(todo.id)">  <v-icon icon="fa fa-close" /></span>
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
import Buttons from './ButtonItem.vue'
export default {
  components: {
    TodoList,
    Buttons,
  },

  data() {
    return {
      rules: {
        required: [value => !!value || "Required"]
      },
      title: '',

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
    addTask() {
      let task = {
        title: this.title,
        completed: false,
      }
      this.$store.commit('taskList/addTask', task)
      this.title = ""
    },

    // async fetchTodos() {
    //   const URL = "https://dummyjson.com/todos";
    //   try {
    //     const response = await fetch(URL);
    //     const data = await response.json();
    //     const todos = data.todos;

    //     this.todoArr = todos;
    //     this.totalTodos = todos.length;

    //     // console.log(this.totalTodos)

    //     this.setPages();

    //   } catch (error) {
    //     console.error("Error fetching todos!", error);
    //   }
    // },

    fetchTodos(){
      console.log("Todos are Fetched!")
    },

    completedTask(){
      console.log("Task Completed!")
    },
    pendingTask(){
      console.log("Pending Tasks")
    },
    allTask(){
      console.log("All Tasks")
    },

    deleteTask(index){
      this.tasks.splice(index,1)
      this.$store.commit(this.deleteTask, index)
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

.checkbox .delete {
  text-decoration: line-through;
  color: #8a1010;
}

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
