import { React, useState, useEffect } from "react";
import axios from "axios";

const App = (props) => {
  const [inputVal, setInputVal] = useState("");
  const [tasks, setTasks] = useState([]);

  const getTodos = function () {
    axios
      .get("/api/v1/tasks")
      // .then((res) => setTasks(res.data.data.data))
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const addTodo = function () {
    axios
      .post("/api/v1/tasks", { action: inputVal })
      .then((res) => setTasks([...tasks, res.data.data.data]))
      .catch((err) => console.log(err));
  };

  const deleteTodo = function (todoId) {
    axios
      .delete(`/api/v1/tasks/${todoId}`)
      .then((res) => {
        const filteredTodos = tasks.filter((task) => task._id !== todoId);
        setTasks(filteredTodos);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getTodos();
  }, []);

  const todoList = tasks.map((task) => (
    <li key={task._id}>
      <span>{task.action}</span>
      <button onClick={() => deleteTodo(task._id)}>Delete</button>
    </li>
  ));

  return (
    <div>
      <h1>ToDo</h1>
      <input
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
      ></input>
      <button onClick={() => addTodo()}>Add ToDo</button>
      <ul>{todoList}</ul>
    </div>
  );
};

export default App;
