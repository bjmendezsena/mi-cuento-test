import {
  TaskDueDate,
  TaskPriority,
  TaskTitle,
  TaskId,
  TaskStatusValue,
  Task,
  TaskDescription,
} from "@/task/domain";

describe("Task", () => {
  const createValidTask = () => {
    const id = TaskId.create();
    const name = TaskTitle.create("Test Task");
    const now = new Date();
    now.setDate(now.getDate() + 1);
    const futureDate = `${now.getFullYear()}-${
      now.getMonth() + 1
    }-${now.getDate()}`;
    const description = TaskDescription.create("Test Task Description");
    const dueDate = TaskDueDate.create(futureDate);
    const priority = TaskPriority.create(1);

    return Task.create(id, name, description, dueDate, priority);
  };

  it("should create a pending task when due date is in the future", () => {
    const task = createValidTask();
    expect(task.status.value).toBe(TaskStatusValue.PENDING);
    expect(task.isOverdue).toBeFalsy();
  });

  it("should create an overdue task when due date is in the past", () => {
    const id = TaskId.create();
    const name = TaskTitle.create("Test Task");

    const description = TaskDescription.create("Test Task Description");
    const now = new Date();
    now.setDate(now.getDate() - 1);
    const pastDate = `${now.getFullYear()}-${
      now.getMonth() + 1
    }-${now.getDate()}`;
    const dueDate = TaskDueDate.create(pastDate);
    const priority = TaskPriority.create(1);

    const task = Task.create(id, name, description, dueDate, priority);
    expect(task.status.value).toBe(TaskStatusValue.OVERDUE);
    expect(task.isOverdue).toBeTruthy();
  });

  it("should update task properties correctly", () => {
    const task = createValidTask();
    const newName = TaskTitle.create("Updated Task");

    const now = new Date();
    now.setDate(now.getDate() + 1);
    const newFutureDate = `${now.getFullYear()}-${
      now.getMonth() + 1
    }-${now.getDate()}`;
    const newDescription = TaskDescription.create("Updated Task Description");
    const newDueDate = TaskDueDate.create(newFutureDate);
    const newPriority = TaskPriority.create(5);

    task.update(newName, newDescription, newDueDate, newPriority);

    expect(task.title.value).toBe("Updated Task");
    expect(task.description.value).toBe("Updated Task Description");
    expect(task.priority.value).toBe(5);
  });

  it("should convert to primitives correctly", () => {
    const task = createValidTask();
    const primitives = task.toPrimitives();

    expect(primitives).toHaveProperty("id");
    expect(primitives).toHaveProperty("name");
    expect(primitives).toHaveProperty("dueDate");
    expect(primitives).toHaveProperty("priority");
    expect(primitives).toHaveProperty("status");
  });
});
