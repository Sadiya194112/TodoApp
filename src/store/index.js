import { createStore } from "vuex";
import taskList from "./moduls/taskList";


const store =createStore({
  modules: {
    taskList,
  },
})

export default store;
