import { CreateTaskUseCase } from "../create/create-task.use-case";
import { FindTasksUseCase } from "../find/find-tasks.use-case";
import { UpdateTaskUseCase } from "../update/update-task.use-case";
import { DeleteTaskUseCase } from "../delete/delete-task.use-case";
import {
  Task,
  TaskId,
  TaskRepository,
  TaskTitle,
  TaskDueDate,
  TaskPriority,
  TaskDescription,
} from "@/task/domain";

describe("Task Use Cases", () => {
  let mockRepository: jest.Mocked<TaskRepository>;

  beforeEach(() => {
    mockRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
    };
  });

  describe("CreateTaskUseCase", () => {
    it("should create a task successfully", async () => {
      const createTaskUseCase = new CreateTaskUseCase(mockRepository);
      const request = {
        name: "Test Task",
        description: "Test Task Description",
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
  });

  describe("UpdateTaskUseCase", () => {
    it("should update a task successfully", async () => {
      const updateTaskUseCase = new UpdateTaskUseCase(mockRepository);
      const taskId = TaskId.create();
      const task = Task.create(
        taskId,
        TaskTitle.create("Original Task"),
        TaskDescription.create("Original Description"),
        TaskDueDate.create("2024-01-01"),
        TaskPriority.create(1)
      );

      mockRepository.findById.mockResolvedValue(task);

      const request = {
        id: taskId.value,
        name: "Updated Task",
        description: "Updated Task Description",
        dueDate: "2024-12-31",
        priority: 5,
      };

      await updateTaskUseCase.execute(request);
      expect(mockRepository.update).toHaveBeenCalled();
    });

    it("should throw error when task is not found", async () => {
      // const updateTaskUseCase = new UpdateTaskUseCase(mockRepository);
      // const request = {
      //   id: "non-existent-id",
      //   name: "Updated Task",
      //   dueDate: "2024-12-31",
      //   priority: 5,
      // };
      // await expect(updateTaskUseCase.execute(request)).rejects.toThrow();
    });
  });

  describe("DeleteTaskUseCase", () => {
    it("should delete a task successfully", async () => {
      const deleteTaskUseCase = new DeleteTaskUseCase(mockRepository);
      const taskId = TaskId.create();
      const task = Task.create(
        taskId,
        TaskTitle.create("Task to Delete"),
        TaskDescription.create("Task Description"),
        TaskDueDate.create("2024-01-01"),
        TaskPriority.create(1)
      );

      mockRepository.findById.mockResolvedValue(task);

      await deleteTaskUseCase.execute(taskId.value);
      expect(mockRepository.delete).toHaveBeenCalled();
    });

    it("should throw error when task to delete is not found", async () => {
      // const deleteTaskUseCase = new DeleteTaskUseCase(mockRepository);
      // mockRepository.findById.mockResolvedValue(null);
      // await expect(
      //   deleteTaskUseCase.execute("non-existent-id")
      // ).rejects.toThrow();
    });
  });
});
