export default function Sidebar({projects, activeProject, onProjectAdd, onProjectSelect}) {
    return (
        <aside className="w-[30%] flex flex-col justify-end">
            <div className="h-[95%] pt-24 px-10 flex flex-col gap-8 items-start bg-[#3b2f2f] bg-stone-800 rounded-tr-xl">
                <p className="text-stone-50 text-2xl capitalize">
                    <strong>YOUR PROJECTS</strong>
                </p>

                <button className="h-11 w-32 p-2 bg-stone-700 text-stone-200 rounded"
                    onClick={onProjectAdd}>
                    +Add Project
                </button>

                <ul id="project-list" className=" self-stretch">
                    {projects.map(p => {
                        const classSet = `h-11 px-3 flex items-center rounded list-none ${p.id === activeProject?.id ? 'text-stone-100 bg-stone-600' : 'text-stone-400 hover:bg-stone-700'}`
                        return <li key={p.id} className={classSet} onClick={() => onProjectSelect(p)}>
                            <span className="capitalize overflow-x-hidden whitespace-nowrap text-ellipsis">{p.title}</span>
                        </li>
                    })}
                </ul>
            </div>
        </aside>
    )
}