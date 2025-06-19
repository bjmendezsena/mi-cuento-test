/* eslint-disable @typescript-eslint/ban-ts-comment */
import { DatePicker } from "@mui/x-date-pickers";
import type { FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";
import type { FieldControllerProps } from "./FieldController";
import { FieldController } from "./FieldController";
import type { FieldBaseControllerProps } from "./types";
import type { DatePickerProps } from "@mui/x-date-pickers/DatePicker";

export interface DateControllerProps<T extends FieldValues>
  extends FieldBaseControllerProps<T>,
    Omit<FieldControllerProps, "fieldState" | "children">,
    Omit<DatePickerProps, keyof FieldBaseControllerProps<T> | "label"> {
  label?: string;
}

export const DateController = <T extends FieldValues>({
  control,
  id,
  label,
  rules,
  ...props
}: DateControllerProps<T>) => {
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
            <DatePicker
              {...field}
              {...props}
              label={label}
              slotProps={{
                textField: {
                  error: invalid,
                },
              }}
            />
          </FieldController>
        );
      }}
    />
  );
};
