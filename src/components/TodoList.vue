<template>
  <div>
    <v-container>
      <v-list v-if="paginatedTasks.length" class="mt-5">
        <!-- Filtering based on 'All', 'Completed', and 'Pending' -->
        <div v-if="filter === 'All'">
          <v-list-item-group>
            <v-list-item v-for="(item, index) in paginatedTasks" :key="index">
              <v-list-item-content>
                <v-row align="center" justify="space-between">
                  <v-row align="center" no-gutters style="flex: 1;">
                    <v-col cols="auto">
                      <v-checkbox
                        v-model="item.completed"
                        color="success"
                        :label="item.title"
                        :class="{'text-decorate': item.completed}"
                      ></v-checkbox>
                    </v-col>
                  </v-row>

                  <v-col cols="auto">
                    <v-btn icon @click.stop="deleteTask(index)" color="red" size="35px">
                      <v-icon size="20px">mdi-delete</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </div>

        <!-- Filtered for 'Completed' tasks -->
        <div v-else-if="filter === 'Completed'">
          <v-list-item-group>
            <v-list-item v-for="(item, index) in paginatedTasks" :key="index">
              <v-list-item-content>
                <v-row align="center" justify="space-between">
                  <v-row align="center" no-gutters style="flex: 1;">
                    <v-col cols="auto">
                      <v-checkbox
                        v-model="item.completed"
                        color="success"
                        :label="item.title"
                        :class="{'text-decorate': item.completed}"
                      ></v-checkbox>
                    </v-col>
                  </v-row>

                  <v-col cols="auto">
                    <v-btn icon @click.stop="deleteTask(index)" color="red" size="35px">
                      <v-icon size="20px">mdi-delete</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </div>

        <!-- Filtered for 'Pending' tasks -->
        <div v-else-if="filter === 'Pending'">
          <v-list-item-group>
            <v-list-item v-for="(item, index) in paginatedTasks" :key="index">
              <v-list-item-content>
                <v-row align="center" justify="space-between">
                  <v-row align="center" no-gutters style="flex: 1;">
                    <v-col cols="auto">
                      <v-checkbox
                        v-model="item.completed"
                        color="success"
                        :label="item.title"
                        :class="{'text-decorate': item.completed}"
                      ></v-checkbox>
                    </v-col>
                  </v-row>

                  <v-col cols="auto">
                    <v-btn icon @click.stop="deleteTask(index)" color="red" size="35px">
                      <v-icon size="20px">mdi-delete</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </div>

        <!-- Pagination Controls -->
        <v-row justify="center" class="mt-5">
          <v-pagination v-model="currentPage" :length="totalPages" circle color="primary"></v-pagination>
        </v-row>
      </v-list>
    </v-container>
  </div>
</template>

<script>
export default {
  props: {
    filter: {
      type: String,
      default: 'All'
    }
  },
  data() {
    return {
      tasks: [],
      currentPage: 1,
      itemsPerPage: 5,
    };
  },
  mounted() {
    this.fetchTasks();
  },
  computed: {
    tasks_comp() {
      return this.$store.getters['taskList/getTasks'];
    },
    filteredTasks() {
      const allTasks = this.tasks_comp; // Get both fetched and manually added tasks

      if (this.filter === 'All') {
        return allTasks;
      } else if (this.filter === 'Completed') {
        return allTasks.filter(task => task.completed);
      } else if (this.filter === 'Pending') {
        return allTasks.filter(task => !task.completed);
      }
      return [];
    },
    paginatedTasks() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredTasks.slice(start, end); // Paginate based on filtered tasks
    },
    totalPages() {
      return Math.ceil(this.filteredTasks.length / this.itemsPerPage);
    },
  },
  watch: {
    tasks_comp: {
      handler(newVal) {
        this.tasks = [...newVal]; // Update tasks whenever the store changes
      },
      deep: true,
      immediate: true
    },
  },
  methods: {
    fetchTasks() {
      fetch('https://jsonplaceholder.typicode.com/todos?_limit=30')
        .then(response => response.json())
        .then(json => {
          let tasksFromLocalStorage = [];
          if (window.localStorage.getItem('localTasks')) {
            tasksFromLocalStorage = JSON.parse(window.localStorage.getItem('localTasks'));
          }

          const allTasks = [...json, ...tasksFromLocalStorage]; // Merge fetched and local tasks
          this.$store.commit('taskList/addTask', allTasks); // Store in Vuex
        })
        .catch((err) => {
          console.log('Error fetching tasks:', err);
        });
    },
    deleteTask(index) {
      this.tasks.splice(index, 1);
      this.$store.commit('taskList/deleteTask', index);
    },
    changeStatus(index) {
      this.$store.commit('taskList/changeStatus', index);
    }
  },
};
</script>

<style scoped>
.text-decorate {
  text-decoration: line-through;
}
</style>
