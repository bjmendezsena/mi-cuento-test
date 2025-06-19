/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { TextFieldProps } from "@mui/material";
import { TextField } from "@mui/material";
import type { FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";
import type { FieldControllerProps } from "./FieldController";
import { FieldController } from "./FieldController";
import type { FieldBaseControllerProps } from "./types";

export interface InputNumberControllerProps<T extends FieldValues>
  extends FieldBaseControllerProps<T>,
    Omit<FieldControllerProps, "fieldState" | "children">,
    Omit<TextFieldProps, keyof FieldBaseControllerProps<T> | "type"> {
  label?: string;
  min?: number;
  max?: number;
}

export const InputNumberController = <T extends FieldValues>({
  control,
  id,
  label,
  rules,
  min,
  max,
  ...props
}: InputNumberControllerProps<T>) => {
  return (
    <Controller
      control={control}
      name={id}
      rules={{
        ...rules,
        validate: {
          number: (value: string) => {
            const numberValue = Number(value);
            if (isNaN(numberValue)) {
              return "Must be a valid number";
            }
            if (min !== undefined && numberValue < min) {
              return `Must be greater than or equal to ${min}`;
            }
            if (max !== undefined && numberValue > max) {
              return `Must be less than or equal to ${max}`;
            }
            return true;
          },
        },
      }}
      render={({ field, fieldState }) => {
        const { invalid } = fieldState;
        const isRequired =
          //@ts-ignore
          !!rules?.["required"] || !!rules?.validate?.["required"];

        return (
          <FieldController fieldState={fieldState} isRequired={isRequired}>
            <TextField
              {...field}
              {...props}
              type='number'
              label={label}
              error={invalid}
              inputProps={{
                ...props.inputProps,
                min,
                max,
              }}
            />
          </FieldController>
        );
      }}
    />
  );
};
