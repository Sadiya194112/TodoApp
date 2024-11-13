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

</template>


<script>

export default({
  data(){
    return {
      title: ''
    }
  },
  methods: {
    addTask(){
      let task = {
        title: this.title,
        completed: false,
      }
      this.$store.commit('store/addTask', task)
      this.title = ""
    }
  }
})
</script>
