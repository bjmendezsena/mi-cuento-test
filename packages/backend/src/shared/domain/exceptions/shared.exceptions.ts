import { ValidationError } from "class-validator";
import { BadRequestException } from "@nestjs/common";

export class InvalidValueObjectException extends BadRequestException {
  constructor(value: string, errorCode: string) {
    super(`The value ${value} is not a valid value object`, errorCode);
  }
}

export class ValidationException extends BadRequestException {
  constructor(errors: ValidationError[], errorCode: string) {
    super(
      `${errors
        .map(({ constraints = [] }) => Object.values(constraints).join(", "))
        .join(", ")}`,
      errorCode
    );
  }
}
