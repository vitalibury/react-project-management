import Task from "./Task";
import TaskForm from "./Task-form";

export default function ProjectView({project, onTaskAdd, onTaskDelete, onDelete, onCancel}) {
    const {title, date, description, tasks} = project;

    return (
        <div className="h-full p-7 pr-32 flex flex-col justify-center gap-5">
            <header className="flex justify-between">
                <div className="text-3xl capitalize font-semibold">{title}</div>
                <div className="flex gap-5">
                    <button onClick={onCancel}>
                        Cancel
                    </button>
                    <button onClick={onDelete}>
                        Delete
                    </button>
                </div>
            </header>
            <p className="text-stone-500">{date}</p>
            <section className="description">
                {description}
            </section>
            <hr />
            <section className="tasks flex flex-col gap-5">
                <div className="text-2xl capitalize font-semibold">Tasks</div>
                <TaskForm onAdd={onTaskAdd} />
                {
                    tasks.length
                        ? tasks.map(t => <Task key={t.id} task={t} onClear={() => onTaskDelete(t.id)} />)
                        : <div className=" text-lg">No tasks created yet.</div>
                }
            </section>

        </div>
    )
}