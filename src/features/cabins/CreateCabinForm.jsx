import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import useCreateCabin from "./useCreateCabin";
import useEditcabin from "./useEditcabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  // destructure id from cabinToEdit to determine if it's an edit session
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  // formState contains an object of all errors from the form
  const { errors } = formState;

  const { createMutate, isCreatePending } = useCreateCabin();

  const { editMutate, isEditPending } = useEditcabin();

  // for submitting the form data (newCabin)
  function onFormSubmit(data) {
    // check if image is a string (existing image path) or a File object (newly uploaded image)
    const image = typeof data.image === "string" ? data.image : data.image?.[0];

    if (isEditSession)
      editMutate(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createMutate(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }

  // for handling errors from formState fn
  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onFormSubmit, onError)} type={onCloseModal ? "modal" : "regular"}>
      <FormRow label='Cabin name' errors={errors?.name?.message}>
        <Input
          type='text'
          disabled={isCreatePending || isEditPending}
          id='name'
          {...register("name", {
            required: "required value",
          })}
        />
      </FormRow>

      {/* FormRow is a  */}
      <FormRow label='Maximum capacity' errors={errors?.maxCapacity?.message}>
        <Input
          type='number'
          disabled={isCreatePending || isEditPending}
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
          disabled={isCreatePending || isEditPending}
          id='regularPrice'
          {...register("regularPrice", {
            required: "required value",
          })}
        />
      </FormRow>

      <FormRow label='Discount' errors={errors?.discount?.message}>
        <Input
          type='number'
          disabled={isCreatePending || isEditPending}
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
            required: isEditSession ? false : "required value",
          })}
        />
      </FormRow>

      <FormRow>
        <Button variation='secondary' type='reset' onClick={() => onCloseModal?.()}>
          Cancel
        </Button>
        <Button disabled={isCreatePending || isEditPending}>{isEditSession ? "Update cabin" : "Add cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
