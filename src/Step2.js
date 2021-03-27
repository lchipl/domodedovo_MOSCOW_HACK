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

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required("Обязательное поле для заполнения"),
  lastName: yup
    .string()
    .required("Обязательное поле для заполнения"),
});

export const Step2 = () => {
  const { setValues, data } = useData();
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm({
    defaultValues: { firstName: data.firstName, lastName: data.lastName },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    history.push("./step3");
    setValues(data);
  };

  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
         Step 1
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          ref={register}
          id="firstName"
          type="text"
          label="Рейс"
          name="firstName"
          error={!!errors.firstName}
          helperText={errors?.firstName?.message}
        />
        <Input
          ref={register}
          id="lastName"
          type="text"
          label="Место встречи"
          name="lastName"
          error={!!errors.lastName}
          helperText={errors?.lastName?.message}
        />
        <Input
          ref={register}
          id="lastName"
          type="text"
          label="Время"
          name="lastName"
          error={!!errors.lastName}
          helperText={errors?.lastName?.message}
        />
        <PrimaryButton>Дальше</PrimaryButton>
      </Form>
    </MainContainer>
  );
};
