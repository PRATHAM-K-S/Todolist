import React from "react";
import { useId } from "react";
import { forwardRef } from "react";

const Input = ({label,type='text',className='',...props},ref) => {
    const id = useId()
  return (
    <div className="w-full flex flex-col">
        {label && <label htmlFor={id}>{label}</label>}
        <input id={id} type={type} className={`py-1 px-4 rounded-md ${className}`} {...props}/>
    </div>
  );
};

export default forwardRef(Input);
