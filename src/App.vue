<template>
  <div class="container">
    <h1>To-Do List</h1>
    <div id="app">
      <div>
        <TodoItem />

        <div class="button">
          <v-row align="center" justify="center">
              <ButtonItem @click="filter = 'All'" :text="text[1]" :dark="true"></ButtonItem>
              <ButtonItem @click="filter = 'Completed'" :text="text[2]"></ButtonItem>
              <ButtonItem @click="filter = 'Pending'" :text="text[3]" :dark="true"></ButtonItem>
          </v-row>
        </div>

        <!-- Pass the filter prop to TodoList -->
        <TodoList :filter="filter" />
      </div>
    </div>
  </div>
</template>

<script>
import TodoItem from "./components/TodoItem.vue";
import ButtonItem from './components/ButtonItem.vue';
import TodoList from "./components/TodoList.vue";

export default {
  name: 'App',

  components: {
    TodoItem,
    ButtonItem,
    TodoList
  },

  data() {
    return {
      filter: 'All',
      text: ["Fetch", "All", "Completed", "Pending"],
    };
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
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
