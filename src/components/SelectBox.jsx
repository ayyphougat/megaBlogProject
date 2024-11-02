import { useId } from "react";
import React from "react";
import { forwardRef } from "react";

function SelectBox({ label, options, className = "", ...props }, ref) {
  const id = useId();
  return <div>
    {label && <label htmlFor={id} className="font-semibold">{label}</label>}
    <select id={id} className={`px-3 py-2 rounded-lg bg-slate-800 text-slate-100 outline-none focus:bg-gray-900 duration-200 border border-gray-900 w-full ${className}`} {...props}  ref={ref}>
        {
            options?.map((option) => (
                <option value="option"  key={option}>
                    {option}
                </option>
            ))
        }


    </select>
    </div>;
}


export default forwardRef(SelectBox);
