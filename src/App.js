import React from "react";
import { useForm } from "react-hook-form";

export default function App() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  console.log("error", errors);
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("email", {
          required: "email requierd",
          pattern: {
            value: /^\S+@\S+$/i,
            message: "This is not a valid email",
          },
        })}
      />
      <span>{errors.email.message}</span>

      <input {...register("lastName", { required: true })} />
      {errors.lastName && "Last name is required"}

      <input type="submit" />
    </form>
  );
}
