import { useState } from "react";

export default function TaskForm({onAdd}) {
    const [taskText, setTaskText] = useState('');

    return (
        <form className="flex gap-6" >
            <input type="text"
                className=" w-80 focus:outline-slate-600"
                onChange={(event) => setTaskText(() => event.target.value)}
                required />
            <button className="capitalize" onClick={() => onAdd(taskText)}>
                add task
            </button>
        </form>
    );
}