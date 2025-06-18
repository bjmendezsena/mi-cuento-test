import { ValueObject } from "@/shared/domain";
import {
  TaskNameCannotBeEmptyException,
  TaskNameCannotBeLongerThan100CharactersException,
} from "@/task/domain";

export class TaskTitle extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.ensureValidName(value);
  }

  private ensureValidName(value: string): void {
    if (value.length < 1) {
      throw new TaskNameCannotBeEmptyException();
    }

    if (value.length > 100) {
      throw new TaskNameCannotBeLongerThan100CharactersException();
    }
  }

  static create(value: string): TaskTitle {
    return new TaskTitle(value);
  }
}
