import { React, useState, useEffect } from "react";
import api from "./api";
import './App.css';

import HomeScreen from "./screens/homeScreen/homeScreen";

const App = (props) => {
    const [inputVal, setInputVal] = useState("");
    const [tasks, setTasks] = useState([]);

    const getTodos = function () {
        api
            .get("/tasks")
            .then((res) => setTasks(res.data.data.data))
            .catch((err) => console.log(err));
    };

    const addTodo = function () {
        api
            .post("/tasks", { action: inputVal })
            .then((res) => {
                setTasks([...tasks, res.data.data.data]);
                setInputVal("");
            })
            .catch((err) => console.log(err));
    };

    const deleteTodo = function (todoId) {
        api
            .delete(`/tasks/${todoId}`)
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
        // <div>
        //   <h1>ToDo</h1>
        //   <input
        //     value={inputVal}
        //     onChange={(e) => setInputVal(e.target.value)}
        //   ></input>
        //   <button onClick={() => addTodo()}>Add ToDo</button>
        //   <ul>{todoList}</ul>
        // </div>
        <div className="app-container">
            <div className="app-header">
                <div className="header-row-1">
                    <div className="app-header-title">
                        <img className="logo" src='https://cryptologos.cc/logos/cosmos-atom-logo.png' alt="logo" />
                        <p>GraderU</p>
                    </div>

                    <button className="app-header-profile-btn" >
                        <img className="profile-img" src="https://www.nicepng.com/png/full/202-2024580_png-file-profile-icon-vector-png.png" alt="profile-button" />
                    </button>
                </div>

                <div className="app-header-btns">
                    <button className="home-btn">Home</button>
                    <button className="calculator-btn">Grade Calculator</button>
                </div>
            </div>

            <HomeScreen />
        </div>
    );
};

export default App;
