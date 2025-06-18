import { CreateTaskUseCase } from "../create/create-task.use-case";
import { FindTasksUseCase } from "../find/find-tasks.use-case";
import { UpdateTaskUseCase } from "../update/update-task.use-case";
import { DeleteTaskUseCase } from "../delete/delete-task.use-case";
import {
  TaskStatusValue,
  Task,
  TaskId,
  TaskRepository,
  TaskName,
  TaskDueDate,
  TaskPriority,
} from "@/task/domain";

describe("Task Use Cases", () => {
  let mockRepository: jest.Mocked<TaskRepository>;

  beforeEach(() => {
    mockRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      findByStatus: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
    };
  });

  describe("CreateTaskUseCase", () => {
    it("should create a task successfully", async () => {
      const createTaskUseCase = new CreateTaskUseCase(mockRepository);
      const request = {
        name: "Test Task",
        dueDate: "2024-12-31",
        priority: 3,
      };

      await createTaskUseCase.execute(request);
      expect(mockRepository.save).toHaveBeenCalled();
    });
  });

  describe("FindTasksByStatusUseCase", () => {
    it("should find all tasks when no status is provided", async () => {
      const findTasksUseCase = new FindTasksUseCase(mockRepository);
      await findTasksUseCase.execute();
      expect(mockRepository.findAll).toHaveBeenCalled();
    });

    it("should find tasks by status when status is provided", async () => {
      const findTasksUseCase = new FindTasksUseCase(mockRepository);
      await findTasksUseCase.execute(TaskStatusValue.PENDING);
      expect(mockRepository.findByStatus).toHaveBeenCalledWith(
        TaskStatusValue.PENDING
      );
    });
  });

  describe("UpdateTaskUseCase", () => {
    it("should update a task successfully", async () => {
      const updateTaskUseCase = new UpdateTaskUseCase(mockRepository);
      const taskId = TaskId.create();
      const task = Task.create(
        taskId,
        TaskName.create("Original Task"),
        TaskDueDate.create("2024-01-01"),
        TaskPriority.create(1)
      );

      mockRepository.findById.mockResolvedValue(task);

      const request = {
        id: taskId.value,
        name: "Updated Task",
        dueDate: "2024-12-31",
        priority: 5,
      };

      await updateTaskUseCase.execute(request);
      expect(mockRepository.update).toHaveBeenCalled();
    });

    it("should throw error when task is not found", async () => {
      const updateTaskUseCase = new UpdateTaskUseCase(mockRepository);
      mockRepository.findById.mockResolvedValue(null);

      const request = {
        id: "non-existent-id",
        name: "Updated Task",
        dueDate: "2024-12-31",
        priority: 5,
      };

      await expect(updateTaskUseCase.execute(request)).rejects.toThrow();
    });
  });

  describe("DeleteTaskUseCase", () => {
    it("should delete a task successfully", async () => {
      const deleteTaskUseCase = new DeleteTaskUseCase(mockRepository);
      const taskId = TaskId.create();
      const task = Task.create(
        taskId,
        TaskName.create("Task to Delete"),
        TaskDueDate.create("2024-01-01"),
        TaskPriority.create(1)
      );

      mockRepository.findById.mockResolvedValue(task);

      await deleteTaskUseCase.execute(taskId.value);
      expect(mockRepository.delete).toHaveBeenCalled();
    });

    it("should throw error when task to delete is not found", async () => {
      const deleteTaskUseCase = new DeleteTaskUseCase(mockRepository);
      mockRepository.findById.mockResolvedValue(null);

      await expect(
        deleteTaskUseCase.execute("non-existent-id")
      ).rejects.toThrow();
    });
  });
});
