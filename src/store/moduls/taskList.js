
const taskList = {
  namespaced: true,
  state: {
    tasks: [],
  },

  getters: {
    getTasks: (state) => state.tasks,
  },

  mutations: {
    addTask(state, task){
      if(task.length){
        state.tasks.push(...task)
      }
      else{
        if(localStorage.getItem('myTasks')){
          //temp contains the array of tasks retrieved from localStorage/browser
          let temp = localStorage.getItem('myTasks')
          temp = JSON.parse(temp)
          localStorage.setItem('localTasks', JSON.stringify(temp))
        }
        else{
          localStorage.setItem('localTasks', JSON.stringify([task]))
        }
        state.tasks.push(task)
      }
    },

    changeStatus(state, index){
      state.tasks[index].completed = !state.tasks[index].completed

      if(localStorage.getItem('localTasks')){
        let temp = localStorage.getItem('localTasks')
        temp = JSON.parse(temp)

        //Looks for the task in localStorage that matches the task in state.tasks[index]
        let found = temp.findIndex((el)=> {
          return el.title === state.tasks[index].title
        })
        let arr = JSON.parse(JSON.stringify(temp))  //Creates a deep copy
        if(found > -1){
          arr[found].completed = !arr[found].completed;
        }
        localStorage.setItem('localTasks', JSON.stringify(arr))
      }
    },

    deleteTask(state, index){
      if(localStorage.getItem('localTasks')){
        let temp = localStorage.getItem('localTasks')
        temp = JSON.parse(temp)
        let found = temp.findIndex((el) => {
          return el.todo === state.tasks[index].todo
        })
        let arr = JSON.parse(JSON.stringify(temp))
        if (found > -1){
          arr.splice(found, 1)
        }
        localStorage.setItem('localTasks', JSON.stringify(arr))
      }
      state.tasks.splice(index, 1)
    },
  },

}
export default taskList

