import {
  TaskId,
  TaskTitle,
  TaskDueDate,
  TaskPriority,
  TaskStatus,
  TaskDescription,
  TaskStatusValue,
} from "./value-objects";

export type TaskObject = {
  id: string;
  name: string;
  description: string;
  dueDate: string;
  priority: number;
  status: TaskStatusValue;
};

export class Task {
  constructor(
    public readonly id: TaskId,
    public title: TaskTitle,
    public description: TaskDescription,
    public dueDate: TaskDueDate,
    public priority: TaskPriority,
    public status: TaskStatus
  ) {}

  public get isOverdue(): boolean {
    return this.status.isOverdue;
  }

  public static create(
    id: TaskId,
    name: TaskTitle,
    description: TaskDescription,
    dueDate: TaskDueDate,
    priority: TaskPriority
  ): Task {
    const status = TaskStatus.create(dueDate);
    return new Task(id, name, description, dueDate, priority, status);
  }

  public update(
    name: TaskTitle,
    description: TaskDescription,
    dueDate: TaskDueDate,
    priority: TaskPriority
  ): void {
    this.title = name;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.status = TaskStatus.create(dueDate);
  }

  public toJSON(): TaskObject {
    return {
      id: this.id.value,
      name: this.title.value,
      description: this.description.value,
      dueDate: this.dueDate.value,
      priority: this.priority.value,
      status: this.status.value,
    };
  }

  public toPrimitives(): TaskObject {
    return {
      id: this.id.value,
      name: this.title.value,
      description: this.description.value,
      dueDate: this.dueDate.value,
      priority: this.priority.value,
      status: this.status.value,
    };
  }
}

export interface TasksFilters {
  status?: TaskStatusValue;
  sortBy?: keyof Omit<TaskObject, "id" | "description" | "status">;
  sortOrder?: "asc" | "desc";
}
