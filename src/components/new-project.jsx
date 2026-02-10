import { useState } from "react";

export default function NewProject({onNewProjectCancel, onProjectSave}) {
    const formFields = ['title', 'description', 'date'];
    const [formData, setFormData] = useState(
        formFields.reduce((acc, f) => Object.assign(acc, {[f]: ''}), {})
    );
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split("T")[0];

    function handleformChange(value, field) {
        setFormData(prevValue => ({...prevValue, [field]: value}));
    }

    return (
        <div className="h-full w-[90%] p-5 flex flex-col justify-center gap-5">
            <form action="submit" onSubmit={() => onProjectSave(formData)} className="flex flex-col gap-5">
            <div className="flex justify-end">
                <button className="h-11 w-24 rounded-lg  text-stone-800"
                    onClick={onNewProjectCancel}>
                    Cancel
                </button>
                <button className="h-11 w-24 rounded-lg  bg-stone-800 text-stone-300"
                    onSubmit={() => onProjectSave(formData)}>
                    Save
                </button>
            </div>

                {
                    formFields.map(field => 
                        <div key={field} className="flex flex-col gap-1">
                            <label htmlFor={field} className="font-medium uppercase" >
                                {field === 'date' ? 'due date' : field}
                            </label>
                            <input required
                                type={field}
                                id={field}
                                min={field === 'date' ? minDate : null}
                                className="min-h-9 bg-stone-300 focus:border-b-2 focus:border-stone-800 focus:outline-none"
                                onChange={(event) => handleformChange(event.target.value, field)}
                                />
                        </div>
                    )
                }
            </form>
        </div>
    )
}