import { AggregateRoot } from "@/shared/domain";
import {
  TaskId,
  TaskName,
  TaskDueDate,
  TaskPriority,
  TaskStatus,
} from "./value-objects";

export class Task extends AggregateRoot {
  constructor(
    public readonly id: TaskId,
    public name: TaskName,
    public dueDate: TaskDueDate,
    public priority: TaskPriority,
    public status: TaskStatus
  ) {
    super();
  }

  public get isOverdue(): boolean {
    return this.status.isOverdue;
  }

  public static create(
    id: TaskId,
    name: TaskName,
    dueDate: TaskDueDate,
    priority: TaskPriority
  ): Task {
    const status = TaskStatus.create(dueDate);
    return new Task(id, name, dueDate, priority, status);
  }

  public update(
    name: TaskName,
    dueDate: TaskDueDate,
    priority: TaskPriority
  ): void {
    this.name = name;
    this.dueDate = dueDate;
    this.priority = priority;
    this.status = TaskStatus.create(dueDate);
  }

  public toPrimitives() {
    return {
      id: this.id.value,
      name: this.name.value,
      dueDate: this.dueDate.value,
      priority: this.priority.value,
      status: this.status.value,
    };
  }
}
