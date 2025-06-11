import editIcon from '../assets/edit.svg'
import deleteIcon from '../assets/delete.svg'
import { useState } from 'react'
export default function Card({ data, isCompleted, changeTitle, deleteCard }: { data: todo, isCompleted: (id: string) => void, changeTitle: (title: string, id: string) => void, deleteCard: (id: string) => void }) {
    let [edit, setEdit] = useState(false)
    let [name, setName] = useState(data.title)
    function changeEdit() {
        setEdit(!edit)
    }
    let font = `text-black font-bold ${data.isCompleted ? 'line-through' : ''}`

    function onSave(name: string, id: string) {
        changeTitle(name, id)
        setEdit(!edit)
    }

    return (
        <>
            <div className="bg-white flex justify-between p-3 m-2 rounded-2xl">
                <div className='flex'>
                    <input className="w-9 h-9 m-auto rounded-3xl " type='checkbox' checked={data.isCompleted} onChange={() => isCompleted(data.id)}></input>
                    <div className=' flex flex-col items-start ml-2'>
                        <div className='flex flex-row'>
                            {edit ? <input className="text-black w-auto border-4 focus:border-4" value={name} onChange={(e) => setName(e.target.value)}></input> : <h4 className={font}>{data.title}</h4>}
                            {edit ? <button className='bg-pink-400 p-2 ml-1' onClick={() => onSave(name, data.id)}>Save</button> : null}
                        </div>

                        <span className='text-gray-500'>{data.createdOn}</span>
                    </div>
                </div>

                <div>
                    <button onClick={changeEdit} className='bg-gray-100 mr-2 p-4'><img className='bg-gray-100 w-6 h-6' src={editIcon} alt='edit icon' /></button>
                    <button onClick={() => deleteCard(data.id)} className='bg-gray-100 p-4'><img className='bg-gray-100 w-6 h-6' src={deleteIcon} alt='delete icon' /></button>
                </div>


            </div>
        </>
    )
}


export type todo = {
    id: string,
    title: string,
    isCompleted: boolean,
    createdOn: string,
    category: string
}