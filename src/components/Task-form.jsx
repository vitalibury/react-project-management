import { useRef } from "react";

export default function TaskForm({onAdd}) {
    const taskRef = useRef();

    return (
        <form className="flex gap-6" >
            <input type="text"
                className=" w-80 focus:outline-slate-600"
                ref={taskRef}
                required />
            <button className="capitalize" onClick={() => onAdd(taskRef.current.value)}>
                add task
            </button>
        </form>
    );
}