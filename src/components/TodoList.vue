<template>
  <div>
    <v-container >
    <v-row no-gutters  v-for="(todo, index) in tasks" :key="index"
      :class="{ completed: todo.completed}"
      class="task"
      @click="toggleTodo(todo.id)"
    >
      <v-col v-for="n in 2" :key="n" :cols="n === 1 ? 8:4">
        <v-card
        class="pa-2"
        title
        outlined
        >
          <span class="task-text" v-if="n === 1"> {{ todo.task }} </span>
          <span class="delete" v-else>  <v-icon icon="fa fa-close" @click.stop="deleteTask(index)"/></span>
        </v-card>
      </v-col>

    </v-row>
  </v-container>

  </div>
</template>

<script>

export default {

  data(){
    return {
      tasks: [],
    }
  },

  computed: {
    tasks_comp() {
      return this.$store.getters['taskList/getTasks'];
    }
  },
  watch: {
    tasks_comp: {
      handler(newVal){
        this.tasks = [...newVal]
      },
      deep: true,
      immediate: true
    },
  },
  methods: {
    toggleTodo(id) {
      this.$store.dispatch("toggleTodo", id);
    },
    deleteTask(index) {
      this.tasks.splice(index,1)
      this.$store.commit('taskList/deleteTask', index)
    },
  },
};
</script>

<style scoped>
.tasks {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.task {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  margin: 4px 0;
  background-color: #f4f4f4;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.task:hover {
  background-color: #e0e0e0;
}

.task-text {
  flex: 1;
}

.completed .task-text {
  text-decoration: line-through;
  color: #8a1010;
}

.completed {
  background-color: #d3e4cd;
}

.delete {
  color: red;
  font-weight: bold;
  cursor: pointer;
  margin-left: 8px;
}
</style>
