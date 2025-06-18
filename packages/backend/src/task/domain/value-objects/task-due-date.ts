import { ValueObject } from "@/shared/domain";

export class TaskDueDate extends ValueObject<Date> {
  constructor(value: Date) {
    super(value);
    this.ensureValidDate(value);
  }

  private ensureValidDate(value: Date): void {
    if (!(value instanceof Date) || isNaN(value.getTime())) {
      throw new Error("Invalid due date");
    }
  }

  static create(value: string | Date): TaskDueDate {
    const date = value instanceof Date ? value : new Date(value);
    return new TaskDueDate(date);
  }

  isOverdue(): boolean {
    const now = new Date();
    return this.value < now;
  }

  toString(): string {
    return this.value.toISOString().split("T")[0];
  }
}
