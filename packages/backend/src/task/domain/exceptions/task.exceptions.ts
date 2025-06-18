import { BadRequestException } from "@nestjs/common";

export class InvalidDueDateException extends BadRequestException {
  constructor() {
    super("Invalid due date");
  }
}

export class TaskNotFoundException extends BadRequestException {
  constructor(field: string, value: string) {
    super(`Task with ${field}: ${value} not found`, "TASK_NOT_FOUND");
  }
}

export class TaskNameCannotBeEmptyException extends BadRequestException {
  constructor() {
    super("Task name cannot be empty");
  }
}

export class TaskNameCannotBeLongerThan100CharactersException extends BadRequestException {
  constructor() {
    super(
      "Task name cannot be longer than 100 characters",
      "TASK_NAME_TOO_LONG"
    );
  }
}

export class PriorityMustBeAnIntegerException extends BadRequestException {
  constructor() {
    super("Priority must be an integer", "TASK_PRIORITY_MUST_BE_AN_INTEGER");
  }
}

export class PriorityMustBeBetween1And5Exception extends BadRequestException {
  constructor() {
    super(
      "Priority must be between 1 and 5",
      "TASK_PRIORITY_MUST_BE_BETWEEN_1_AND_5"
    );
  }
}
