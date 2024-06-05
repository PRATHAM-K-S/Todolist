import React from "react";
import { Button, Container, Input } from "../components";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import appwriteDataService from "../appwrite/services/database";

const Home = () => {
  const { control, handleSubmit } = useForm();
  const userData = useSelector((state)=>state.auth.userData)
  // {console.log(userData)}
  const addTodo = async(...data) => {
    // console.log({...data[0],status:false,userId:userData.$id});
    await appwriteDataService.createTodo({...data[0],status:false,userId:userData.$id})
  };
  return (
    <Container className="px-8 md:px-0 mx-auto sm:max-w-2xl lg:max-w-4xl">
      <form
        onSubmit={handleSubmit(addTodo)}
        className="border-2 border-black py-4 w-full rounded-md"
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

export default Home;
