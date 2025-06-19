/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { TextFieldProps } from "@mui/material";
import { TextField } from "@mui/material";
import type { FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";
import type { FieldControllerProps } from "./FieldController";
import { FieldController } from "./FieldController";
import type { FieldBaseControllerProps } from "./types";

export interface InputControllerProps<T extends FieldValues>
  extends FieldBaseControllerProps<T>,
    Omit<FieldControllerProps, "fieldState" | "children">,
    Omit<
      TextFieldProps,
      keyof FieldBaseControllerProps<T> | "secureTextEntr" | "label"
    > {
  label?: string;
}

export const InputController = <T extends FieldValues>({
  control,
  id,
  label,
  rules,
  ...props
}: InputControllerProps<T>) => {
  return (
    <Controller
      control={control}
      name={id}
      rules={rules}
      render={({ field, fieldState }) => {
        const { invalid } = fieldState;
        const isRequired =
          //@ts-ignore
          !!rules?.["required"] || !!rules?.validate?.["required"];

        return (
          <FieldController fieldState={fieldState} isRequired={isRequired}>
            <TextField {...field} {...props} label={label} error={invalid} />
          </FieldController>
        );
      }}
    />
  );
};
