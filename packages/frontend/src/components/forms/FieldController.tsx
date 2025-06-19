import type { ControllerFieldState } from "react-hook-form";
import { FormHelperText, FormControl } from "@mui/material";

export interface FieldControllerProps {
  children: React.ReactNode;
  fieldState: ControllerFieldState;
  isRequired?: boolean;
}

export const FieldController = ({
  children,
  fieldState,
  isRequired,
}: FieldControllerProps) => {
  const { invalid } = fieldState;
  const message = fieldState?.error?.message;
  return (
    <FormControl fullWidth error={invalid} required={isRequired}>
      {children}
      {message && <FormHelperText error={!!message}>{message}</FormHelperText>}
    </FormControl>
  );
};
