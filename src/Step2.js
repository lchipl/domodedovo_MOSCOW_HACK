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
import Button from "@material-ui/core/Button";

const schema = yup.object().shape({
  // firstName: yup
  //   .string()
  //   .required("Обязательное поле для заполнения"),
  // lastName: yup
  //   .string()
  //   .required("Обязательное поле для заполнения"),
});

export const Step2 = () => {
  const { setValues, data } = useData();
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm({
    defaultValues: { flight: data.flight, meeting_place: data.meeting_place, time: data.time },
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
         Step 2
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          ref={register}
          id="firstName"
          type="text"
          label="Рейс"
          name="flight"
          error={!!errors.flight}
          helperText={errors?.flight?.message}
        />
        <Input
          ref={register}
          id="lastName"
          type="meeting_place"
          label="Место встречи"
          name="meeting_place"
          error={!!errors.meeting_place}
          helperText={errors?.meeting_place?.message}
        />
        <Input
          ref={register}
          id="time"
          type="text"
          label="Время"
          name="time"
          error={!!errors.time}
          helperText={errors?.time?.message}
        />
        <PrimaryButton>Дальше</PrimaryButton>
        <Button onClick={() => history.push("./")}>Назад</Button>
      </Form>
    </MainContainer>
  );
};
