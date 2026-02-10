export default function Task({task, onClear}) {
    return (
        <div className="h-20 px-5 flex items-center bg-gray-100">
            <div className="grow">{task.text}</div>
            <button className=""
                onClick={() => onClear(task.id)}>
                Clear
            </button>
        </div>
    )
}