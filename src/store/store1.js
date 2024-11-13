const taskList = {
  state: {
    tasks: [],
  },

  getters: {
    getTasks: state => state.tasks,
  },

  mutations: {
    addTask(state, task){
      if(task.length){
        state.tasks.push(task)
      }
      else{
        if(localStorage.getItem('myTasks')){
          let temp = localStorage.getItem('myTasks')
          temp = JSON.parse(temp)
          temp.push(task)
        }
      }
    }
  }
}

export default taskList
