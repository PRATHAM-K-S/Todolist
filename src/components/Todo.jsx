import React, { usetitleRef, useState, useRef } from "react";
import appwriteDataService from "../appwrite/services/database";
import { useDispatch } from "react-redux";
import { increment } from "../store/features/todolListSlice";
import Loader from "./Loader";

const Todo = ({ title, description, id, status }) => {
  const titleRef = useRef();
  const descRef = useRef();
  const [todoTitle, setTodoTitle] = useState(title);
  const [todoDescription, setTodoDescription] = useState(description);
  const [saveBtn, setSaveBtn] = useState(false);
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [completed, setCompleted] = useState(status);

  const handleEdit = () => {
    setSaveBtn((prev) => !prev);
    titleRef.current.readOnly = false;
    descRef.current.readOnly = false;
    titleRef.current.focus();
  };

  const handleSave = async () => {
    setError("");
    setSaveLoading(true);
    try {
      const data = await appwriteDataService.updateTodos(titleRef.current.id, {
        title: titleRef.current.value,
        description: descRef.current.value,
      });
      if (data) {
        dispatch(increment());
        setSaveBtn((prev) => !prev);
        titleRef.current.readOnly = true;
        descRef.current.readOnly = true;
        setSaveLoading(false);
      }
    } catch (error) {}
  };

  const handleDelete = async () => {
    setError("");
    setDeleteLoading(true);
    try {
      const data = await appwriteDataService.deleteTodo(titleRef.current.id);
      if (data) {
        dispatch(increment());
        setDeleteLoading(false);
      }
    } catch (error) {
      setError(error);
    }
  };

  const handleCompleted = async () => {
    setCompleted((prev) => !prev);
    try {
      const result = await appwriteDataService.updateTodos(
        titleRef.current.id,
        { status: !completed }
      );
      if (result) {
        console.log(result);
        dispatch(increment());
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="w-full bg-black text-white h-[9rem] px-4 rounded-md my-2 flex justify-between items-start">
      <div className="w-3/5">
        <div className="flex flex-col">
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
        <div className="flex gap-1 mt-8">
          {!saveBtn && (
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-sm text-xs px-5 py-1 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={handleEdit}
            >
              Edit
            </button>
          )}
          {saveBtn && (
            <button
              type="button"
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-sm text-xs px-5 py-1 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 flex gap-2 items-center"
              onClick={handleSave}
            >
              Save
              {saveLoading && (
                <Loader width="w-3" height="h-3" fillColor="fill-white" />
              )}
            </button>
          )}
          <button
            type="button"
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-sm text-xs px-5 py-1 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 flex gap-2 items-center"
            onClick={handleDelete}
          >
            Delete{" "}
            {deleteLoading && (
              <Loader width="w-3" height="h-3" fillColor="fill-white" />
            )}
          </button>
        </div>
      </div>
      <div className="flex flex-col text-xs gap-16 items-end mt-4">
        <input
          onChange={handleCompleted}
          type="checkbox"
          className="accent-green-500 appearance-auto mt-2"
          checked={completed}
        />
        <p className="mt-1">
          {completed ? (
            <span className="text-emerald-500">Completed</span>
          ) : (
            <span className="text-orange-300">Not completed</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default Todo;
