import { v4 as uuidv4 } from "uuid";
import { ValueObject } from "@/shared/domain";

export class TaskId extends ValueObject<string> {
  constructor(value: string) {
    super(value);
  }

  static create(): TaskId {
    return new TaskId(uuidv4());
  }
}
