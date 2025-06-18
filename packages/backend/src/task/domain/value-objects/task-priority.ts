import { ValueObject } from "@/shared/domain";
import {
  PriorityMustBeAnIntegerException,
  PriorityMustBeBetween1And5Exception,
} from "@/task/domain";

export class TaskPriority extends ValueObject<number> {
  constructor(value: number) {
    super(value);
    this.ensureValidPriority(value);
  }

  private ensureValidPriority(value: number): void {
    if (!Number.isInteger(value)) {
      throw new PriorityMustBeAnIntegerException();
    }

    if (value < 1 || value > 5) {
      throw new PriorityMustBeBetween1And5Exception();
    }
  }

  static create(value: number): TaskPriority {
    return new TaskPriority(value);
  }
}
