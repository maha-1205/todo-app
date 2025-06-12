import { useReducer, useState } from "react";
import Card, { type todo } from "./card";
import Task from "./addtask";;
import { todoReducer } from "../reducer/todoReducer";


export default function TodoCard() {



    let [category, setCategory] = useState(localStorage.getItem("category") ?? "work")
    let [todoList, dispatch] = useReducer(todoReducer, undefined, () => {
        const local = localStorage.getItem("tasks");
        return local ? JSON.parse(local) : { work: [], personal: [] };
    })
    let [task, setTask] = useState(false)



    function changeCategory(category: string) {
        localStorage.setItem("category", category)
        setCategory(category)
    }
    function isCompleted(id: string) {
        dispatch({ id, type: 'completeTask', category })
    }

    function changeTitle(title: string, id: string) {
        dispatch({ id, title, type: 'changeTitle', category })

    }
    function deleteCard(id: string) {
        dispatch({ id, type: 'deleteCard', category })

    }

    function addTask(title: string) {
        dispatch({ title, type: 'addtask', category })
        setTask(false)
    }
    return (
        <>
            <div className="w-3xl">
                <div className="flex justify-between">
                    <button onClick={() => setTask(true)} className="bg-violet-500">Add Task</button>
                    <div className="rounded w-fit h-fit bg-violet-500 p-2 text-lg">
                        <label className="rounded m-auto" htmlFor="category" ></label>
                        <select className="border-none" id="category" name="category" onChange={(e) => changeCategory(e.target.value.toString())} value={category}>
                            <option className="text-black" value="work">Work</option>
                            <option className="text-black" value="personal">personal</option>
                        </select>
                    </div>
                </div>
                <div className="mt-2 w-xl">{task ? <Task addtask={addTask}></Task> : null}</div>

                <div className="bg-gray-200 p-2 mt-2 rounded-xl">
                    {todoList[category]?.length > 0 && todoList[category].map((item: todo) => <Card deleteCard={deleteCard} changeTitle={changeTitle} isCompleted={isCompleted} key={item.id} data={item} ></Card>)}
                </div>
            </div>
        </>
    )
}