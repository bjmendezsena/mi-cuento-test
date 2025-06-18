import { BadRequestException } from "@nestjs/common";

export class InvalidDueDateException extends BadRequestException {
  constructor() {
    super("Invalid due date");
  }
}

export class TaskNotFoundException extends BadRequestException {
  constructor(field: string, value: string) {
    super(`Task with ${field}: ${value} not found`);
  }
}

export class TaskNameCannotBeEmptyException extends BadRequestException {
  constructor() {
    super("Task name cannot be empty");
  }
}

export class TaskNameCannotBeLongerThan100CharactersException extends BadRequestException {
  constructor() {
    super("Task name cannot be longer than 100 characters");
  }
}

export class PriorityMustBeAnIntegerException extends BadRequestException {
  constructor() {
    super("Priority must be an integer");
  }
}

export class PriorityMustBeBetween1And5Exception extends BadRequestException {
  constructor() {
    super("Priority must be between 1 and 5");
  }
}
