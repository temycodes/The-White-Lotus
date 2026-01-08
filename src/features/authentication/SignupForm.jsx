import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useSignUp from "./useSignUp";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { mutateSignUp, pendingSignUp } = useSignUp();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  function onData({ fullName, email, password }) {
    mutateSignUp(
      { fullName, email, password },
      {
        onSettled: reset,
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onData)}>
      <FormRow label='Full name' error={errors?.fullName?.message}>
        <Input type='text' id='fullName' {...register("fullName", { required: "this field is required" })} />
      </FormRow>

      <FormRow label='Email address' error={errors?.email?.message}>
        <Input
          type='email'
          id='email'
          disabled={pendingSignUp}
          {...register("email", {
            required: "this field is required",
            pattern: { value: /\S+@\S+\.\S+/, message: "Enter a valid email" },
          })}
        />
      </FormRow>

      <FormRow label='Password (min 8 characters)' eerror={errors?.password?.message}>
        <Input
          type='password'
          id='password'
          disabled={pendingSignUp}
          {...register("password", {
            required: "this field is required",
            minLength: {
              value: 8,
              message: "Password should be at least 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow label='Re-enter password' error={errors?.passwordConfirm?.message}>
        <Input
          type='password'
          id='passwordConfirm'
          disabled={pendingSignUp}
          {...register("passwordConfirm", {
            required: "this field is required",
            validate: (value) => value === getValues().password || "password does not match",
          })}
        />
      </FormRow>

      <FormRow>
        <Button variation='secondary' type='reset' onClick={reset}>
          Cancel
        </Button>
        <Button disabled={pendingSignUp}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
