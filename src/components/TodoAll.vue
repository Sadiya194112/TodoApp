<template>
  <div>
    <v-container>
      <v-list v-if="tasks_comp.length" class="mt-5">
        <div v-if="filter === 'All'">
            <v-list-item-group>
              <v-list-item v-for="(item, index) in filteredTasks" :key="index">
                <v-list-item-content>
                  <v-row align="center" justify="space-between">
                    <v-row align="center" no-gutters style="flex: 1;">
                      <v-col cols="auto">
                        <v-checkbox
                          v-model = "item.completed"
                          color = "success"
                          :label = "item.title"
                          :class="{'text-decorate': item.completed}"
                          >
                        </v-checkbox>
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

        <div v-else-if="filter === 'Completed'">
          <v-list-item-group>
            <v-list-item v-for="(item, index) in filteredTasks" :key="index">
              <v-list-item-content>
                <v-row align="center" justify="space-between">
                    <v-row align="center" no-gutters style="flex: 1;">
                      <v-col cols="auto">
                        <v-checkbox
                          v-model = "item.completed"
                          color = "success"
                          :label = "item.title"
                          :class="{'text-decorate': item.completed}"
                          >
                        </v-checkbox>
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

        <div v-else-if="filter === 'Pending'">
          <v-list-item-group>
            <v-list-item v-for="(item, index) in filteredTasks" :key="index">
              <v-list-item-content>
                <v-row align="center" justify="space-between">
                    <v-row align="center" no-gutters style="flex: 1;">
                      <v-col cols="auto">
                        <v-checkbox
                          v-model = "item.completed"
                          color = "success"
                          :label = "item.title"
                          :class="{'text-decorate': item.completed}"
                          >
                        </v-checkbox>
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
    }
  },

  mounted() {
    this.fetchTasks()
  },
  computed: {
    tasks_comp() {
      return this.$store.getters['taskList/getTasks'];
    },
    filteredTasks() {
    if (this.filter === 'All') {
      return this.tasks_comp;
    } else if (this.filter === 'Completed') {
      return this.tasks_comp.filter(task => task.completed);
    } else if (this.filter === 'Pending') {
      return this.tasks_comp.filter(task => !task.completed);
    }
    return [];
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
    fetchTasks(){
        fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
        .then(response => response.json())
        .then(json => {
          json = JSON.parse(JSON.stringify(json))
          if(window.localStorage.getItem('localTasks')){
            let temp = JSON.parse(window.localStorage.getItem('localTasks'))
            json.push(...temp)
          }
          this.$store.commit('taskList/addTask', json)
        })
        .then(() => {
          this.tasks = JSON.parse(JSON.stringify(this.$store.getters['taskList/getTasks']))
        })
        .catch((err) => {
          console.log('err', err)
        })
    },
    deleteTask(index) {
      this.tasks.splice(index,1)
      this.$store.commit('taskList/deleteTask', index)
    },
    changeStatus(index){
      this.$store.commit('taskList/changeStatus', index)
    }
  },
};
</script>

<style scoped>
.text-decorate {
  text-decoration: line-through;
}
</style>
