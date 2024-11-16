<template>
  <v-container>
    <v-text-field
        v-model="title"
        label="Enter a new task"
        background-color="grey darken-3"
        flat
        style="width: 1000px"
        type="text">
        <template #append>
            <v-btn @click="addTask" color="secondary" type="submit">Add</v-btn>
        </template>
    </v-text-field>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      id: 0,
    };
  },
  methods: {
    addTask() {
      if (this.title.trim() === '') return;

      let task = {
        id: this.id,
        title: this.title,
        completed: false,
      };

      this.$store.commit('taskList/addTask', task);

      this.title = "";
      this.id++;
    },
  }
};
</script>

<style scoped>
</style>
