<template>
  <div>
    <ul class="tasks">
      <li
        v-for="todo in todos"
        :key="todo.id"
        :class="{ completed: todo.completed }"
        class="task"
        @click="toggleTodo(todo.id)"
      >
        <span class="task-text">{{ todo.task }}</span>
        <span class="delete" @click.stop="deleteTodo(todo.id)">ⓧ</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    todos() {
      return this.$store.getters.getTodos;
    },
  },
  methods: {
    toggleTodo(id) {
      this.$store.dispatch("toggleTodo", id);
    },
    deleteTodo(id) {
      this.$store.dispatch("deleteTodo", id);
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
  color: #000000;
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
