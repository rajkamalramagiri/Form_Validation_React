import "./App.css";

import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useForm } from "react-hook-form";

function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    alert("clciked");
  };

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      {/* basic text field */}
      <TextField
        variant="outlined"
        {...register("example", { required: "input madatory" })}
        error={(errors.example?.message && true) || false}
        helperText={errors.example?.message || ""}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={(errors.example?.message && true) || false}
      >
        Primary
      </Button>
    </form>
  );
}

export default App;
