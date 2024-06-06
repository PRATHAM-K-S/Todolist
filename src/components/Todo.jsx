import React, { useRef } from "react";

const Todo = ({ title, description, id }) => {
  const ref = useRef();
  return (
    <div className="w-full bg-black text-white h-[9rem] px-4 rounded-md my-2">
      <div className="absolute flex flex-col">
        <input
          value={title}
          className="text-xl font-semibold mt-4 bg-transparent outline-none"
          ref={ref}
          readOnly
          id={id}
        />
        <input
          value={description}
          className="text-xs mt-2 font-light outline-none bg-transparent"
          readOnly
        />
      </div>
      <div className="flex gap-1 relative top-24">
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-sm text-xs px-5 py-1 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Edit
        </button>
        <button
          type="button"
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-sm text-xs px-5 py-1 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Todo;
