import { useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

export const TaskFilter = () => {
  const [statusFilter, setStatusFilter] = useState<"PENDING" | "OVERDUE" | "">(
    ""
  );

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
        <Typography variant='h6' gutterBottom>
          Filters
        </Typography>
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            label='Status'
            onChange={(e) =>
              setStatusFilter(e.target.value as "PENDING" | "OVERDUE" | "")
            }
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
