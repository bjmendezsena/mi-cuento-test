import {
  TaskDueDate,
  TaskPriority,
  TaskName,
  TaskId,
  TaskStatusValue,
  Task,
} from "@/task/domain";

describe("Task", () => {
  const createValidTask = () => {
    const id = TaskId.create();
    const name = TaskName.create("Test Task");
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    const dueDate = TaskDueDate.create(futureDate);
    const priority = TaskPriority.create(1);

    return Task.create(id, name, dueDate, priority);
  };

  it("should create a pending task when due date is in the future", () => {
    const task = createValidTask();
    expect(task.status.value).toBe(TaskStatusValue.PENDING);
    expect(task.isOverdue).toBeFalsy();
  });

  it("should create an overdue task when due date is in the past", () => {
    const id = TaskId.create();
    const name = TaskName.create("Test Task");
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);
    const dueDate = TaskDueDate.create(pastDate);
    const priority = TaskPriority.create(1);

    const task = Task.create(id, name, dueDate, priority);
    expect(task.status.value).toBe(TaskStatusValue.OVERDUE);
    expect(task.isOverdue).toBeTruthy();
  });

  it("should update task properties correctly", () => {
    const task = createValidTask();
    const newName = TaskName.create("Updated Task");
    const newDueDate = TaskDueDate.create(new Date());
    const newPriority = TaskPriority.create(5);

    task.update(newName, newDueDate, newPriority);

    expect(task.name.value).toBe("Updated Task");
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
