# Vue Todo App

This is a simple Vue.js Todo application that allows users to:<br>
- Add tasks manually.<br>
- Fetch random tasks from a public API.<br>
- Mark tasks as completed.<br>
- Clear completed tasks (separately for fetched tasks and manually added tasks).<br>

## Prerequisites

- **Node.js**: Ensure that you have Node.js installed.<br>
- **npm**: It comes installed with Node.js. If you're using `yarn` instead of `npm`, the commands can be adjusted accordingly.<br>

## Installation <br>

1. **Clone the repository**: <br>

    git clone "your-repository-url"
    cd "project-directory"


2. **Install dependencies**:<br>
    Run the following command to install the project dependencies:<br>
    npm install <br>

3. **Run the development server**:<br>
    After the dependencies are installed, you can start the development server with: <br>
    npm run dev <br>

    You should now see your Vue Todo application running! <br>

## Commands

- **npm run dev**: Starts the development server.<br>
- **npm run build**: Builds the app for production.<br>

## Project Structure

- **src/components**: Contains Vue components like `TodoItem.vue`. <br>
- **src/store**: Contains the Vuex store for managing the state of the todos.  <br>
- **public/index.html**: The main HTML file. <br>
- **src/main.js**: The entry point for the Vue app. <br>
  
## Additional Information

- The project uses Vuex for state management and handles the todo tasks with manual and fetched items. <br>
- The todos are saved in `localStorage` so that they persist across page reloads. <br>
