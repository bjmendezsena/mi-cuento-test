import { ValueObject } from "@/shared/domain";

export class TaskName extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.ensureValidName(value);
  }

  private ensureValidName(value: string): void {
    if (value.length < 1) {
      throw new Error("Task name cannot be empty");
    }

    if (value.length > 100) {
      throw new Error("Task name cannot be longer than 100 characters");
    }
  }

  static create(value: string): TaskName {
    return new TaskName(value);
  }
}
