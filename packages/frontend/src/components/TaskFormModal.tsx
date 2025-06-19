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
import type { Task } from "@/modules/tasks";

export enum FormType {
  Create = "create",
  Edit = "edit",
}

interface TaskFormModalProps {
  type: FormType;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: Task) => void;
  isLoading?: boolean;
  defaultTask?: Task;
}

export const TaskFormModal: React.FC<TaskFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  defaultTask,
  type,
}) => {
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
        onSubmit={onSubmit}
        options={{
          mode: "onChange",
          defaultValues: defaultTask,
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
                  {type === FormType.Create ? "Add Task" : "Update Task"}
                </Button>
              </DialogActions>
            </Box>
          );
        }}
      </Form>
    </Dialog>
  );
};
