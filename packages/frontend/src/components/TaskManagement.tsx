/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Add as AddIcon } from "@mui/icons-material";
import { Skeleton, Container, Box, Typography, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { FormType, TaskFormModal } from "@/components/TaskFormModal";
import { useDisclose } from "@/hooks";
import {
  useGetTasks,
  TaskCard,
  TaskFilter,
  useCreateTask,
  useUpdateTask,
} from "@/modules/tasks";
import type {
  CreateOrUpdateTaskDto,
  ITasksFilters,
  Task,
} from "@/modules/tasks";
import { formatDate } from "@/utils";

const FORMAT_DATE = "yyyy-MM-dd";

export const TaskManagement: React.FC = () => {
  const [formType, setFormType] = useState<FormType>(FormType.Create);

  const [editingTask, setEditingTask] = useState<Task>();
  const { isOpen, onClose, onOpen } = useDisclose({
    onClose: () => {
      setFormType(FormType.Create);
      setEditingTask(undefined);
    },
  });
  const form = useForm<ITasksFilters>();

  const { mutate: createTask, isPending: isCreating } = useCreateTask();
  const { mutate: updateTask, isPending: isUpdating } = useUpdateTask();

  const handleSubmit = ({ dueDate, priority, status: _, ...rest }: Task) => {
    const dto: CreateOrUpdateTaskDto = {
      ...rest,
      dueDate: formatDate(dueDate, FORMAT_DATE),
      priority: Number(priority),
    };
    if (formType === FormType.Edit) {
      updateTask(
        {
          ...dto,
          id: editingTask?.id || "",
        },
        {
          onSuccess: () => {
            onClose();
          },
        }
      );
      return;
    }
    createTask(dto, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const filters = form.watch();

  const { data: tasks = [], isFetching: isLoading } = useGetTasks({
    filters,
  });

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.100" }}>
      <Box sx={{ bgcolor: "primary.main", boxShadow: 3, mb: 3 }}>
        <Container>
          <Box
            sx={{
              py: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant='h4' component='h1' sx={{ color: "white" }}>
              Task Management System
            </Typography>
            <Button
              variant='contained'
              color='success'
              startIcon={<AddIcon />}
              onClick={onOpen}
            >
              Add Task
            </Button>
          </Box>
        </Container>
      </Box>

      <Container
        sx={{
          py: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
        maxWidth='xl'
      >
        <TaskFilter form={form} filters={filters} />
        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => (
              <Skeleton
                variant='rectangular'
                sx={{
                  width: "100%",
                  height: 100,
                  borderRadius: 2,
                }}
                key={index}
              />
            ))
          : tasks.map((task) => (
              <TaskCard
                onEdit={() => {
                  setEditingTask(task);
                  setFormType(FormType.Edit);
                  onOpen();
                }}
                task={task}
                key={task.id}
              />
            ))}
      </Container>

      <TaskFormModal
        onSubmit={handleSubmit}
        isOpen={isOpen}
        onClose={onClose}
        isLoading={isCreating || isUpdating}
        defaultTask={editingTask}
        type={formType}
      />
    </Box>
  );
};
