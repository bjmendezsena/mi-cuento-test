import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import {
  Form,
  InputController,
  DateController,
  InputNumberController,
} from "@/components";
import { useCreateTask } from "@/modules/tasks";
import { formatDate } from "@/utils";
import type { CreateTaskDto } from "@/modules/tasks";

const FORMAT_DATE = "yyyy-MM-dd";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddTaskModal: React.FC<AddTaskModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { mutate: createTask, isPending: isLoading } = useCreateTask();

  const handleSubmit = ({
    dueDate,
    priority,
    ...rest
  }: Omit<CreateTaskDto, "dueDate" | "priority"> & {
    dueDate: Date;
    priority: string;
  }) => {
    const dto: CreateTaskDto = {
      ...rest,
      dueDate: formatDate(dueDate, FORMAT_DATE),
      priority: Number(priority),
    };
    createTask(dto, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Add New Task
          <IconButton onClick={onClose} size='small'>
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>

      <Form
        onSubmit={handleSubmit}
        options={{
          mode: "onChange",
        }}
      >
        {({ control, formState }) => {
          return (
            <Box>
              <DialogContent
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              >
                <InputController
                  rules={{
                    required: "This field is required",
                  }}
                  control={control}
                  id='name'
                  label='Title'
                />
                <InputController
                  control={control}
                  id='description'
                  label='Description'
                  rules={{
                    required: "This field is required",
                  }}
                />
                <DateController
                  control={control}
                  id='dueDate'
                  label='Date'
                  rules={{
                    required: "This field is required",
                  }}
                />
                <InputNumberController
                  control={control}
                  id='priority'
                  label='Priority'
                  min={0}
                  max={5}
                  rules={{
                    required: "This field is required",
                  }}
                />
              </DialogContent>

              <DialogActions>
                <Button onClick={onClose} color='inherit'>
                  Cancel
                </Button>
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  disabled={!formState.isValid}
                  loading={isLoading}
                >
                  Add Task
                </Button>
              </DialogActions>
            </Box>
          );
        }}
      </Form>
    </Dialog>
  );
};
