import React, { usetitleRef, useState, useRef } from "react";
import appwriteDataService from "../appwrite/services/database";
import { useDispatch } from "react-redux";
import { increment } from "../store/features/todolListSlice";

const Todo = ({ title, description, id }) => {
  const titleRef = useRef();
  const descRef = useRef();
  const editRef = useRef();
  const [todoTitle, setTodoTitle] = useState(title);
  const [todoDescription, setTodoDescription] = useState(description);
  const [saveBtn, setSaveBtn] = useState(false);
  const dispatch = useDispatch();

  const handleEdit = () => {
    setSaveBtn((prev) => !prev);
    titleRef.current.readOnly = false;
    descRef.current.readOnly = false;
    titleRef.current.focus();
  };

  const handleSave = async () => {
    const data = await appwriteDataService.updateTodos(titleRef.current.id, {
      title: titleRef.current.value,
      description: descRef.current.value,
    });
    if (data) {
      dispatch(increment());
      setSaveBtn((prev) => !prev);
      titleRef.current.readOnly = true;
    descRef.current.readOnly = true;
    }
  };

  return (
    <div className="w-full bg-black text-white h-[9rem] px-4 rounded-md my-2">
      <div className="absolute flex flex-col">
        <input
          value={todoTitle}
          className="text-xl font-semibold mt-4 bg-transparent outline-none"
          ref={titleRef}
          readOnly
          id={id}
          placeholder="Todo title"
          onChange={(e) => setTodoTitle(e.target.value)}
        />
        <input
          value={todoDescription}
          ref={descRef}
          placeholder="Description"
          onChange={(e) => setTodoDescription(e.target.value)}
          className="text-xs mt-2 font-light outline-none bg-transparent"
          readOnly
        />
      </div>
      <div className="flex gap-1 relative top-24">
        {!saveBtn && (
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-sm text-xs px-5 py-1 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            ref={editRef}
            onClick={handleEdit}
          >
            Edit
          </button>
        )}
        {saveBtn && (
          <button
            type="button"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-sm text-xs px-5 py-1 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={handleSave}
          >
            Save
          </button>
        )}
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
