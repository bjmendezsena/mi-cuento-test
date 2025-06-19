import type { FormHTMLAttributes } from "react";
import type {
  UseFormReturn,
  SubmitHandler,
  UseFormProps,
  FieldValues,
} from "react-hook-form";
import { useForm } from "react-hook-form";

interface FormProps<TFormValues extends FieldValues>
  extends Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit" | "children"> {
  onSubmit: SubmitHandler<TFormValues>;
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
  options?: UseFormProps<TFormValues>;
  id?: string;
}

export const Form = <
  TFormValues extends FieldValues = Record<string, unknown>
>({
  onSubmit,
  children,
  options,
  id,
}: FormProps<TFormValues>) => {
  const methods = useForm<TFormValues>(options);
  return (
    <form onSubmit={methods.handleSubmit(onSubmit)} id={id}>
      {children(methods)}
    </form>
  );
};
