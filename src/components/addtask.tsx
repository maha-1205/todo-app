import { useState } from "react"

export default function Task({ addtask }: { addtask: (name: string) => void }) {
    const [name, setName] = useState('')
    return (
        <>
            <div className="bg-gray-200 p-3 rounded-xl flex flex-row">
                <input className="text-black w-full border-1 rounded-xl focus:border-1 bg-white" value={name} onChange={(e) => setName(e.target.value)}></input>
                <button onClick={() => addtask(name)} className="bg-violet-500 ml-3">Add</button>
            </div>
        </>
    )
}