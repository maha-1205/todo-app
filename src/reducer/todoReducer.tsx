import type { todo } from "../components/card"
type todoReducerAction =
    | { type: 'completeTask'; category: string; id: string }
    | { type: 'changeTitle'; category: string; id: string; title: string }
    | { type: 'deleteCard', category: string; id: string }
    | { type: 'addtask'; category: string; title: string }

type TodoState = {
    [category: string]: todo[];
};
function updateState(state: TodoState, category: string, newTodo: todo[]) {
    let updated = { ...state, [category]: newTodo }
    localStorage.setItem("tasks", JSON.stringify(updated))
    return updated

}
export const todoReducer = (state: TodoState, action: todoReducerAction) => {
    switch (action.type) {
        case 'completeTask': {
            let newTodo = state[action.category].map((item: todo) => {
                if (item.id == action.id) return {
                    ...item,
                    isCompleted: !item.isCompleted
                }

                else
                    return item

            })
            return updateState(state, action.category, newTodo)
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
            return updateState(state, action.category, newTodo)
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
            let newTodo = [...state[action.category], task]
            return updateState(state, action.category, newTodo)
        }
        default: {
            throw Error('Unknown action: ' + (action as any).type);
        }

    }
}