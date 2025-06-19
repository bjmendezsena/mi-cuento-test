import { Edit } from "@mui/icons-material";
import { useMemo } from "react";
import {
  Typography,
  Card,
  CardContent,
  Chip,
  Box,
  IconButton,
} from "@mui/material";
import type { Task } from "@/modules/tasks";
import { formatDate, parseDate } from "@/utils";

export interface TaskCardProps {
  task: Task;
  onEdit: () => void;
}

export const TaskCard = ({ task, onEdit }: TaskCardProps) => {
  const formatedDate = useMemo(() => {
    const parsedDate = parseDate(task.dueDate, "yyyy-MM-dd");
    return formatDate(parsedDate, "dd MMM yyyy");
  }, [task.dueDate]);
  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Typography variant='h5' gutterBottom>
            {task.name}
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignContent: "center",
            }}
          >
            <Typography
              variant='h6'
              sx={{
                alignSelf: "center",
              }}
            >
              Priority: {task.priority}
            </Typography>
            <IconButton onClick={onEdit}>
              <Edit />
            </IconButton>
          </Box>
        </Box>
        <Typography color='text.secondary'>{formatedDate}</Typography>
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
