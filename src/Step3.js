import React from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import { useData } from "./DataContext";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import { PrimaryButton } from "./components/PrimaryButton";
import { MainContainer } from "./components/MainContainer";
import { Form } from "./components/Form";
import { Input } from "./components/Input";
import * as yup from "yup";
import { parsePhoneNumberFromString } from 'libphonenumber-js'


const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email should have correct format")
    .required("Корректное значени @mail ru/com"),
});

const normalizePhoneNumber = (value) => {
  const phoneNumber = parsePhoneNumberFromString(value)
  if(!phoneNumber){
    return value
  }

  return (
    phoneNumber.formatInternational() 
  );
};

export const Step3 = () => {
  const { setValues, data } = useData();
  const history = useHistory();
  const { register, handleSubmit, watch, errors } = useForm({
    defaultValues: {
      email: data.email,
      hasPhone: data.hasPhone,
      phoneNumber: data.phoneNumber,
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const hasPhone = watch("hasPhone");

  const onSubmit = (data) => {
    history.push("./result");
    setValues(data);
  };

  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
         Step 3
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          ref={register}
          id="email"
          type="email"
          label="Email"
          name="email"
          error={!!errors.email}
          helperText={errors?.email?.message}
          required
        />

        
        
          <Input
            ref={register}
            id="phoneNumber"
            type="tel"
            label="Номер телефона"
            name="phoneNumber"
            onChange={(event) => {
              event.target.value = normalizePhoneNumber(event.target.value);
            }}
          />
        
        <PrimaryButton>Next</PrimaryButton>
      </Form>
    </MainContainer>
  );
};
