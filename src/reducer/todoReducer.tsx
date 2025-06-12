import type { todo } from "../components/card"
export const todoReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'completeTask': {
            let newTodo = state[action.category].map((item: todo) => {
                if (item.id == action.id) {
                    return {
                        ...item,
                        isCompleted: !item.isCompleted
                    }
                }
                else
                    return item

            })
            localStorage.setItem("tasks", JSON.stringify({ ...state, [action.category]: newTodo }))
            return { ...state, [action.category]: newTodo }
        }
        case 'changeTitle': {
            let newTodo = state[action.category].map((item: todo) => {
                if (item.id == action.id) {
                    return {
                        ...item,
                        title: action.title,
                        isCompleted: false
                    }
                }
                else
                    return item
            })
            localStorage.setItem("tasks", JSON.stringify({ ...state, [action.category]: newTodo }))
            return { ...state, [action.category]: newTodo }
        }
        case 'deleteCard': {
            let newTodo = state[action.category].filter((item: todo) => item.id != action.id)
            localStorage.setItem("tasks", JSON.stringify({ ...state, [action.category]: newTodo }))
            return { ...state, [action.category]: newTodo }
        }
        case 'addtask': {
            let date = new Date()
            let task = {
                id: Date.now().toString(36),
                title: action.title,
                isCompleted: false,
                createdOn: date.toDateString(),
                category: action.category
            }
            console.log("category", action.category, state, state[action.category])
            let newTodo = [...state[action.category], task]
            localStorage.setItem("tasks", JSON.stringify({ ...state, [action.category]: newTodo }))
            return { ...state, [action.category]: newTodo }
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }

    }
}