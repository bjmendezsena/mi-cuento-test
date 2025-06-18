import { ValueObject } from "@/shared/domain";

export class TaskPriority extends ValueObject<number> {
  constructor(value: number) {
    super(value);
    this.ensureValidPriority(value);
  }

  private ensureValidPriority(value: number): void {
    if (!Number.isInteger(value)) {
      throw new Error("Priority must be an integer");
    }

    if (value < 1 || value > 5) {
      throw new Error("Priority must be between 1 and 5");
    }
  }

  static create(value: number): TaskPriority {
    return new TaskPriority(value);
  }
}
