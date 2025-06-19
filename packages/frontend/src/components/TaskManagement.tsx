import { Add as AddIcon } from "@mui/icons-material";
import { Container, Box, Typography, Button } from "@mui/material";
import { AddTaskModal } from "@/components/AddTaskModal";
import { useDisclose } from "@/hooks";
import { useGetTasks, TaskCard, TaskFilter } from "@/modules/tasks";

export const TaskManagement: React.FC = () => {
  const { data: tasks = [] } = useGetTasks();
  const { isOpen, onClose, onOpen } = useDisclose();

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
        sx={{ py: 4, display: "flex", flexDirection: "column", gap: 2 }}
        maxWidth='xl'
      >
        <TaskFilter />
        {tasks.map((task) => (
          <TaskCard task={task} key={task.id} />
        ))}
      </Container>

      <AddTaskModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};
