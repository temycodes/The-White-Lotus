import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { createCabin } from "../../services/apiCabins";
import FormRow from "../../ui/FormRow";

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;

  const queryClient = useQueryClient();

  // mutation for creating a cabin in the database and uploading image to storage
  const { mutate, isPending } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("Successfully Created a Cabin");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  // for submitting the form data (newCabin)
  function onFormSubmit(data) {
    console.log(data);
    mutate({ ...data, image: data.image?.[0] });
  }

  // for handling errors from formState fn
  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onFormSubmit, onError)}>
      <FormRow label='Cabin name' errors={errors?.name?.message}>
        <Input
          type='text'
          disabled={isPending}
          id='name'
          {...register("name", {
            required: "required value",
          })}
        />
      </FormRow>

      <FormRow label='Maximum capacity' errors={errors?.maxCapacity?.message}>
        <Input
          type='number'
          disabled={isPending}
          id='maxCapacity'
          {...register("maxCapacity", {
            required: "required value",
            min: {
              value: 1,
              message: "capacity must be atleast 1",
            },
          })}
        />
      </FormRow>

      <FormRow label='Regular price' errors={errors?.regularPrice?.message}>
        <Input
          type='number'
          disabled={isPending}
          id='regularPrice'
          {...register("regularPrice", {
            required: "required value",
          })}
        />
      </FormRow>

      <FormRow label='Discount' errors={errors?.discount?.message}>
        <Input
          type='number'
          disabled={isPending}
          id='discount'
          defaultValue={0}
          {...register("discount", {
            required: "required value",
            validate: (value) =>
              Number(value) <= Number(getValues().regularPrice) || "Discount should be lower than the price",
          })}
        />
      </FormRow>

      <FormRow label='Description' errors={errors?.description?.message}>
        <Textarea
          id='description'
          disabled={isPending}
          defaultValue=''
          {...register("description", {
            required: "required value",
          })}
        />
      </FormRow>

      <FormRow label='Cabin photo'>
        <FileInput
          id='image'
          accept='image/*'
          {...register("image", {
            required: "required value",
          })}
        />
      </FormRow>

      <FormRow>
        <Button variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button disabled={isPending}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
