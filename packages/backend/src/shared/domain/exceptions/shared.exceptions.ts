import { ValidationError } from "class-validator";
import { BadRequestException } from "@nestjs/common";

export class InvalidValueObjectException extends BadRequestException {
  constructor(value: string) {
    super(`The value ${value} is not a valid value object`);
  }
}

export class ValidationException extends BadRequestException {
  constructor(errors: ValidationError[]) {
    super(
      `${errors
        .map(({ constraints = [] }) => Object.values(constraints).join(", "))
        .join(", ")}`
    );
  }
}
