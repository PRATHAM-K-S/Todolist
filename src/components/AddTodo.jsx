import React from "react";
import { Button, Container, Input } from "./";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import appwriteDataService from "../appwrite/services/database";
import { addTodos, increment } from "../store/features/todolListSlice";

const AddTodo = () => {
  const { control, handleSubmit, reset } = useForm();
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  // {console.log(userData)}
  const addTodo = async (...data) => {
    // console.log({...data[0],status:false,userId:userData.$id});
    const todoData = await appwriteDataService.createTodo({
      ...data[0],
      status: false,
      userId: userData.$id,
    });
    reset({ title: "", description: "" });
    // console.log(todoData);
    if (todoData) {
      dispatch(increment());
    }
  };
  return (
    <Container className="px-6 md:px-0 mx-auto sm:max-w-2xl lg:max-w-4xl">
      <form
        onSubmit={handleSubmit(addTodo)}
        className="border-2 border-black py-8 w-full rounded-md"
      >
        <div className="flex items-center mx-4">
          <Controller
            render={({ field }) => (
              <Input
                type="text"
                placeholder="Todo title"
                className="outline-none text-md font-semibold px-0"
                {...field}
              />
            )}
            name="title"
            rules={{ required: true }}
            control={control}
            defaultValue=""
          />
          <Button type="submit" className="text-xs w-1/3">
            Add Todo
          </Button>
        </div>
        <Controller
          render={({ field }) => (
            <Input
              type="text"
              placeholder="Description"
              className="outline-none text-xs mx-5 rounded-none px-0 py-1 mt-4 border-b"
              {...field}
            />
          )}
          name="description"
          control={control}
          defaultValue=""
        />
      </form>
    </Container>
  );
};

export default AddTodo;
