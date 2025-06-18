import { ValueObject } from "@/shared/domain";

export class TaskDescription extends ValueObject<string> {
  constructor(value: string) {
    super(value);
  }

  static create(value: string): TaskDescription {
    return new TaskDescription(value);
  }
}
