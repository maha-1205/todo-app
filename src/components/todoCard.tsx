import { useState } from "react";
import Card, { type todo } from "./card";
import Task from "./addtask";
import { v4 as uuidv4 } from 'uuid';


export default function TodoCard() {
    let data = localStorage.getItem("tasks")
    let array = []
    if (data) {
        array = JSON.parse(data) ?? []
    }

    let [todoList, setTodoList] = useState(array)
    console.log("1", todoList)
    let [task, setTask] = useState(false)

    function isCompleted(id: string) {
        let newTodo = todoList.map((item: todo) => {
            if (item.id == id) {
                return {
                    ...item,
                    isCompleted: !item.isCompleted
                }
            }
            else
                return item

        })
        localStorage.setItem("tasks", JSON.stringify(newTodo))
        setTodoList(newTodo)
    }

    function changeTitle(title: string, id: string) {
        let newTodo = todoList.map((item: todo) => {
            if (item.id == id) {
                return {
                    ...item,
                    title: title,
                    isCompleted: false
                }
            }
            else
                return item
        })
        console.log("new todo", newTodo)
        localStorage.setItem("tasks", JSON.stringify(newTodo))
        setTodoList(newTodo)

    }
    function deleteCard(id: string) {
        let newTodo = todoList.filter((item: todo) => item.id != id)
        localStorage.setItem("tasks", JSON.stringify(newTodo))
        setTodoList(newTodo)

    }

    function addTask(title: string) {
        let date = new Date()

        let task = {
            id: uuidv4(),
            title: title,
            isCompleted: false,
            createdOn: date.toDateString(),
            category: 'Work'
        }
        let newTodo = [...todoList, task]
        localStorage.setItem("tasks", JSON.stringify(newTodo))
        setTodoList(newTodo)
        setTask(false)
    }
    return (
        <>
            <div className="w-3xl">
                <div className="flex justify-between">
                    <button onClick={() => setTask(true)} className="bg-violet-500">Add Task</button>
                    <button className="bg-gray-500">Filter</button>
                </div>
                <div className="mt-2 w-xl">{task ? <Task addtask={addTask}></Task> : null}</div>

                <div className="bg-gray-200 p-2 mt-2 rounded-xl">
                    {todoList?.length > 0 && todoList.map((item: todo) => <Card deleteCard={deleteCard} changeTitle={changeTitle} isCompleted={isCompleted} key="item.id" data={item} ></Card>)}
                </div>



            </div>
        </>
    )
}