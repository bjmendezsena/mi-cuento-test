import { Typography, Card, CardContent, Chip, Box } from "@mui/material";
import type { Task } from "@/modules/tasks";

export interface TaskCardProps {
  task: Task;
}

export const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
          }}
        >
          <Typography variant='h5' gutterBottom>
            # {task.priority}
          </Typography>
          <Typography variant='h5' gutterBottom>
            {task.name}
          </Typography>
        </Box>
        <Typography color='text.secondary' paragraph>
          {task.description}
        </Typography>
        <Chip
          label={task.status}
          color={task.status === "PENDING" ? "primary" : "error"}
          size='small'
        />
      </CardContent>
    </Card>
  );
};
