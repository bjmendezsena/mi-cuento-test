/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import type { UseFormReturn } from "react-hook-form";
import { TaskStatus, type ITasksFilters } from "@/modules/tasks";

export interface ITaskFilterProps {
  filters?: ITasksFilters;
  form: UseFormReturn<ITasksFilters, any, ITasksFilters>;
}

export const TaskFilter = ({ filters, form }: ITaskFilterProps) => {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardContent>
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            value={filters?.status}
            label='Status'
            onChange={(e) => {
              const statusMap: Record<string, TaskStatus> = {
                PENDING: TaskStatus.PENDING,
                OVERDUE: TaskStatus.OVERDUE,
              };
              const status = statusMap[e.target.value];

              form.setValue("status", status);
            }}
          >
            <MenuItem value=''>All Status</MenuItem>
            <MenuItem value='PENDING'>Pending</MenuItem>
            <MenuItem value='OVERDUE'>Overdue</MenuItem>
          </Select>
        </FormControl>
      </CardContent>
    </Card>
  );
};
