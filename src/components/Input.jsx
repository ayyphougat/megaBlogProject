import { useId } from "react"
import React from 'react'

const Input = React.forwardRef(function Input(
    {
        label,
        type="text",
        className="",
        ...props
    },ref
) {
    const  id = useId()
    return (
     <div>
        {
            label && <label htmlFor={id} className={`inline-block mb-1 pl-1 font-semibold ${className}`}>
                {label}
                </label>
        }

        <input type={type}
        ref={ref}
        id="id"
        className={`px-3 py-2 rounded-lg bg-slate-800 text-slate-100 outline-none focus:bg-gray-900 duration-200 border border-slate-100 w-full ${className}`}
        {...props}
        />
     </div>   
    )
})

export default Input