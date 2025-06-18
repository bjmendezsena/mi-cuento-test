import { ValueObject } from "@/shared/domain";
import { TaskDueDate } from "@/task/domain";

export enum TaskStatusValue {
  PENDING = "PENDING",
  OVERDUE = "OVERDUE",
}

export class TaskStatus extends ValueObject<TaskStatusValue> {
  constructor(value: TaskStatusValue) {
    super(value);
  }

  static create(dueDate: TaskDueDate): TaskStatus {
    const status = dueDate.isOverdue()
      ? TaskStatusValue.OVERDUE
      : TaskStatusValue.PENDING;
    return new TaskStatus(status);
  }

  get isOverdue(): boolean {
    return this.value === TaskStatusValue.OVERDUE;
  }

  get isPending(): boolean {
    return this.value === TaskStatusValue.PENDING;
  }
}
