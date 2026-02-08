export default function NoProjectView({onProjectAdd}) {
    return (
        <div className="h-full flex justify-center items-center">
            <div className="flex flex-col items-center gap-5">
                <img src="src/assets/no-projects.png"
                    alt="No project picture"
                    className="w-20 h-20" />
                <h3 className="capitalize text-2xl font-bold text-stone-600">No roject selected</h3>
                <p className="text-stone-400 text-lg font-medium">Select a project or get started with a new one</p>
                <button className="h-11 w-44 bg-stone-800 text-stone-300 text-lg rounded-lg"
                    onClick={onProjectAdd}>
                    Create new project
                </button>
            </div>
        </div>
    )
}   