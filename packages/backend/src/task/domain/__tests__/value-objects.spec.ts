import * as dateFns from "date-fns";
import {
  TaskTitle,
  TaskDueDate,
  TaskPriority,
  TaskStatus,
  TaskStatusValue,
} from "@/task/domain";

describe("Task Value Objects", () => {
  describe("TaskName", () => {
    it("should create a valid task name", () => {
      const name = TaskTitle.create("Valid Task");
      expect(name.value).toBe("Valid Task");
    });

    it("should throw error for empty name", () => {
      expect(() => TaskTitle.create("")).toThrow("Task name cannot be empty");
    });

    it("should throw error for too long name", () => {
      const longName = "a".repeat(101);
      expect(() => TaskTitle.create(longName)).toThrow(
        "Task name cannot be longer than 100 characters"
      );
    });
  });

  describe("TaskDueDate", () => {
    it("should create a valid due date", () => {
      const date = new Date();
      const dueDate = TaskDueDate.create(date);
      expect(dueDate.value).toEqual(formatDate(date));
    });

    it("should throw error for invalid date", () => {
      expect(() => TaskDueDate.create("invalid-date")).toThrow(
        "Invalid due date"
      );
    });

    it("should correctly determine if task is overdue", () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 1);
      const overdueDueDate = TaskDueDate.create(pastDate);
      expect(overdueDueDate.isOverdue()).toBeTruthy();

      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 1);
      const pendingDueDate = TaskDueDate.create(futureDate);
      expect(pendingDueDate.isOverdue()).toBeFalsy();
    });
  });

  describe("TaskPriority", () => {
    it("should create a valid priority", () => {
      const priority = TaskPriority.create(3);
      expect(priority.value).toBe(3);
    });

    it("should throw error for priority below range", () => {
      expect(() => TaskPriority.create(0)).toThrow(
        "Priority must be between 1 and 5"
      );
    });

    it("should throw error for priority above range", () => {
      expect(() => TaskPriority.create(6)).toThrow(
        "Priority must be between 1 and 5"
      );
    });

    it("should throw error for non-integer priority", () => {
      expect(() => TaskPriority.create(2.5)).toThrow(
        "Priority must be an integer"
      );
    });
  });

  describe("TaskStatus", () => {
    it("should create pending status for future date", () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 1);
      const dueDate = TaskDueDate.create(futureDate);
      const status = TaskStatus.create(dueDate);

      expect(status.value).toBe(TaskStatusValue.PENDING);
      expect(status.isPending).toBeTruthy();
      expect(status.isOverdue).toBeFalsy();
    });

    it("should create overdue status for past date", () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 1);
      const dueDate = TaskDueDate.create(pastDate);
      const status = TaskStatus.create(dueDate);

      expect(status.value).toBe(TaskStatusValue.OVERDUE);
      expect(status.isOverdue).toBeTruthy();
      expect(status.isPending).toBeFalsy();
    });
  });
});

const formatDate = (date: Date) =>
  dateFns.format(date, TaskDueDate.FORMAT_DATE);
