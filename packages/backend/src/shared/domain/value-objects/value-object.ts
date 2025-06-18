import { InvalidValueObjectException } from "@/shared/domain";
export abstract class ValueObject<T> {
  constructor(readonly value: T) {
    this.ensureValueIsDefined(value);
  }

  private ensureValueIsDefined(value: T): void {
    if (value === null || value === undefined) {
      throw new InvalidValueObjectException(
        this.constructor.name,
        "VALUE_OBJECT_IS_NOT_DEFINED"
      );
    }
  }

  equals(other: ValueObject<T>): boolean {
    return (
      other.constructor.name === this.constructor.name &&
      other.value === this.value
    );
  }
}
