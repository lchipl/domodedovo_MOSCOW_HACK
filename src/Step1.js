import React from "react";
import { useHistory } from "react-router-dom";
import { useData } from "./DataContext";
import Typography from "@material-ui/core/Typography";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import { PrimaryButton } from "./components/PrimaryButton";
import { MainContainer } from "./components/MainContainer";
import { Form } from "./components/Form";
import { Input } from "./components/Input";
import * as yup from "yup";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";

const schema = yup.object().shape({
  // firstName: yup
  //   .string()
  //   .matches(/^([^0-9]*)$/, "First name should not contain numbers")
  //   .required("Обязательное поле для заполнения"),
  // lastName: yup
  //   .string()
  //
  //   .required("Обязательное поле для заполнения"),
});

export const Step1 = () => {
  const { setValues, data } = useData();
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm({
    defaultValues: { direction: data.direction, date: data.date },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    history.push("./step2");
    setValues(data);
  };

  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
         Step 1
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/*<FormControl variant="outlined" style={{width: '100%'}}>*/}
        {/*<InputLabel id="demo-simple-select-outlined-label">Направление</InputLabel>*/}
        {/*<Select*/}
        {/*    ref={register}*/}
        {/*    labelId="demo-simple-select-outlined-label"*/}
        {/*    id="demo-simple-select-outlined"*/}
        {/*    // value={direction}*/}
        {/*    // onChange={handleChange}*/}
        {/*    label="Направление"*/}
        {/*>*/}
        {/*  /!*<MenuItem value="">*!/*/}
        {/*  /!*  <em>None</em>*!/*/}
        {/*  /!*</MenuItem>*!/*/}
        {/*  <MenuItem value="out">Отлёт</MenuItem>*/}
        {/*  <MenuItem value="in">Прилёт</MenuItem>*/}
        {/*</Select>*/}
        {/*</FormControl>*/}
        <Input
          ref={register}
          id="direction"
          type="text"
          label="Направление"
          name="direction"
          error={!!errors.direction}
          helperText={errors?.direction?.message}
        />
        <Input
          ref={register}
          id="lastName"
          type="text"
          label="Дата Рейса"
          name="date"
          error={!!errors.date}
          helperText={errors?.date?.message}
        />
        <PrimaryButton>Дальше</PrimaryButton>
      </Form>
    </MainContainer>
  );
};
