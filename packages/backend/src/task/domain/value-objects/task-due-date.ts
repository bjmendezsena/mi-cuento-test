import * as dateFns from "date-fns";
import { ValueObject } from "@/shared/domain";
import { InvalidDueDateException } from "@/task/domain";

export class TaskDueDate extends ValueObject<string> {
  public static FORMAT_DATE = "yyyy-MM-dd";
  constructor(value: string) {
    super(value);
    this.ensureValidDate(value);
  }

  private ensureValidDate(value: string): void {
    if (isNaN(Date.parse(value))) {
      throw new InvalidDueDateException();
    }
  }

  static create(value: Date | string): TaskDueDate {
    let stringDate: string;
    if (value instanceof Date) {
      stringDate = dateFns.format(value, TaskDueDate.FORMAT_DATE);
    } else {
      stringDate = value;
    }

    return new TaskDueDate(stringDate);
  }

  static now(): TaskDueDate {
    return new TaskDueDate(dateFns.format(new Date(), TaskDueDate.FORMAT_DATE));
  }

  isOverdue(): boolean {
    const now = dateFns.format(new Date(), TaskDueDate.FORMAT_DATE);
    return this.value < now;
  }
}
