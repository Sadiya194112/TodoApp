<template>
  <div class="container">
    <h1>To-Do List</h1>
    <div id="app">
      <div>
        <TodoItem />
      </div>
    </div>
  </div>
</template>

<script>
import TodoItem from "./components/TodoItem.vue";

export default {
  components: {
    TodoItem,
  },
  data(){
    
  }
};
</script>

<style scoped>
.container {
  width: 90rem;
  margin: auto;
  background-color: white;
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);
}

h1 {
  text-align: center;
  margin-top: 0;
}
</style>
